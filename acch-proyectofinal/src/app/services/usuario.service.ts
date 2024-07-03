import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc, getDoc } from '@angular/fire/firestore';
import { Usuario } from '../models/usuario.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuariosCollection = collection(this.firestore, 'usuarios');

  constructor(private firestore: Firestore) { }

  // Create
  createUser(usuario: Usuario) {
    return addDoc(this.usuariosCollection, usuario);
  }

  // Read
  getUsers(): Observable<Usuario[]> {
    return collectionData(this.usuariosCollection, { idField: 'id' }) as Observable<Usuario[]>;
  }

  getUserId(id: string): Promise<Usuario | null> {
    const usuarioDocRef = doc(this.usuariosCollection, id);
    return getDoc(usuarioDocRef).then((docSnapshot) => {
      if (docSnapshot.exists()) {
        return docSnapshot.data() as Usuario;
      } else {
        return null;
      }
    });
  }

  // Update
  updateUser(usuario: Partial<Usuario>): Promise<void> {
    const usuarioDocRef = doc(this.usuariosCollection, usuario.id);
    return updateDoc(usuarioDocRef, usuario);
  }

  // Delete
  deleteUser(usuario: Usuario) {
    const usuarioDocRef = doc(this.firestore, `usuarios/${usuario.id}`);
    return deleteDoc(usuarioDocRef);
  }
}