import { Injectable } from '@angular/core';
import { Firestore, collection, setDoc, collectionData, doc, deleteDoc, updateDoc, getDoc, addDoc, query, where, getDocs } from '@angular/fire/firestore';
import { Usuario } from '../models/usuario.model';
import { Observable } from 'rxjs';
import { ref, uploadBytes, getDownloadURL, Storage, deleteObject } from '@angular/fire/storage';
import { Auth, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from '@angular/fire/auth';
import { Curso } from '../models/curso.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuariosCollection = collection(this.firestore, 'usuarios');
  private invoiceCollection = collection(this.firestore, 'contable');

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
    try {
      let tmpUser = await this.getUserId(usuario?.id!);
      const usuarioDocRef = doc(this.usuariosCollection, usuario.id);
      await updateDoc(usuarioDocRef, usuario);
      //actualiza contrasena de firebase authentication
      if (this.auth.currentUser && usuario.contrasena && tmpUser?.contrasena !== usuario.contrasena) {
        const credential = EmailAuthProvider.credential(this.auth.currentUser.email!, tmpUser?.contrasena!);
        await reauthenticateWithCredential(this.auth.currentUser, credential);
        await updatePassword(this.auth.currentUser, usuario.contrasena);
      }
    } catch (error) {
      console.error('Error: ', error);
      throw error;
    }
  }

  // Eliminar usuario
  async deleteUser(usuario: Usuario) {
    const usuarioDocRef = doc(this.firestore, `usuarios/${usuario.id}`);
    await this.deleteUserImage(usuario.id!);
    let courses = await this.getUserCourses(usuario.id!);
    return deleteDoc(usuarioDocRef);
  }

  //Obtener cursos inscritos
  async getUserCourses(userId: string): Promise<Curso[]> {
    try {
      const userDocRef = doc(this.usuariosCollection, userId);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        return userData['cursosInscritos'] || [];
      } else {
        console.log(`Usuario no encontrado: ${userId}`);
        return [];
      }
    } catch (error) {
      console.error('Error: ', error);
      return [];
    }
  }

  // Borrar recibo
  async deleteInvoice(id: string): Promise<void> {
    const invoiceDocRef = doc(this.invoiceCollection, id);
    return await deleteDoc(invoiceDocRef);
  }

  // Elimina la imagen del storage
  async deleteUserImage(userId: string): Promise<void> {
    const storageRef = ref(this.storage, `imagenes-perfil/${userId}`);
    try {
      await deleteObject(storageRef);
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
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

  // Agrega cursos a la lista de cursos del usuario
  async registerUserCourse(userId: string, course: Curso): Promise<void> {
    const courseInfo = {
      id: course.id,
      nombre: course.nombre,
      imagen: course.imagen,
    };

    let usr = await this.getUserByEmail(userId);
    if (usr !== null) {
      const cursos = usr.cursos_inscritos || [];
      cursos.push(courseInfo);
      usr.cursos_inscritos = cursos;
      await this.updateUser(usr);
    }
  }
}