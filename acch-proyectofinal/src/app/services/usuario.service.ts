import { Injectable } from '@angular/core';
import { Firestore, collection, setDoc, collectionData, doc, deleteDoc, updateDoc, getDoc, addDoc, query, where, getDocs } from '@angular/fire/firestore';
import { Usuario } from '../models/usuario.model';
import { Observable } from 'rxjs';
import { ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { Storage } from '@angular/fire/storage';
import { Auth, updatePassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuariosCollection = collection(this.firestore, 'usuarios');

  constructor(private firestore: Firestore, private storage: Storage, private auth: Auth) { }

  // Crear usuario
  createUser(usuario: Usuario) {
    return addDoc(this.usuariosCollection, usuario);
  }

  // Crear usuario con google, se usa el id de Google para reconocer un usuario registrado
  createUserGoogle(usuario: Usuario) {
    const userDocRef = doc(this.usuariosCollection, usuario.id);
    return setDoc(userDocRef, usuario);
  }

  // Obtener todos los usuarios
  getUsers(): Observable<Usuario[]> {
    return collectionData(this.usuariosCollection, { idField: 'id' }) as Observable<Usuario[]>;
  }

  // Obtener usuario especifico
  async getUserId(id: string): Promise<Usuario | null> {
    try {
      const usuarioDocRef = doc(this.usuariosCollection, id);
      const docSnapshot = await getDoc(usuarioDocRef);
      if (docSnapshot.exists()) {
        return { id, ...docSnapshot.data() } as Usuario;
      } else {
        console.log(`Usuario no encontrado: ${id}`);
        return null;
      }
    } catch (error) {
      console.error('Error: ', error);
      return null;
    }
  }

  // Obtener usuario especifico por correo
  async getUserByEmail(email: string): Promise<Usuario | null> {
    try {
      const q = query(this.usuariosCollection, where("correoElectronico", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return { id: doc.id, ...doc.data() } as Usuario;
      } else {
        console.log(`Usuario no encontrado con email: ${email}`);
        return null;
      }
    } catch (error) {
      console.error('Error: ', error);
      return null;
    }
  }

  // Actualizar usuairo
  async updateUser(usuario: Partial<Usuario>): Promise<void> {
    const usuarioDocRef = doc(this.usuariosCollection, usuario.id);
    await updateDoc(usuarioDocRef, usuario);
    //actualiza contrasena de firebase authentication
    if (usuario.contrasena && this.auth.currentUser) {
      await updatePassword(this.auth.currentUser, usuario.contrasena);
    }
  }


  // Eliminar usuario
  deleteUser(usuario: Usuario) {
    const usuarioDocRef = doc(this.firestore, `usuarios/${usuario.id}`);
    return deleteDoc(usuarioDocRef);
  }

  // Sube la imagen al storage de firebase
  async uploadUserImage(userId: string, file: File): Promise<string> {
    const storageRef = ref(this.storage, `imagenes-perfil/${userId}`);
    await uploadBytes(storageRef, file);

    try {
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error('Error getting download URL:', error);
      throw error;
    }
  }
}