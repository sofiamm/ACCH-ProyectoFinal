import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc, getDoc, getDocs, query, where } from '@angular/fire/firestore';
import { Curso } from '../models/curso.model';
import { Usuario } from '../models/usuario.model';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private cursosCollection = collection(this.firestore, 'Cursos');
  private usuariosCollection = collection(this.firestore, 'usuarios');

  constructor(private firestore: Firestore) { }

  // Create
  createCourse(curso: Curso) {
    return addDoc(this.cursosCollection, curso);
  }

  // Read 
  getCourses(): Observable<Curso[]> {
    const cursosObservable = collectionData(this.cursosCollection, { idField: 'id' }) as Observable<Curso[]>;
    const usuariosObservable = collectionData(this.usuariosCollection, { idField: 'id' }) as Observable<Usuario[]>;

    return combineLatest([cursosObservable, usuariosObservable]).pipe(
      map(([cursos, usuarios]) => {
        return cursos.map(curso => {
          const instructor: Usuario | undefined = curso.instructor ? usuarios.find(usuario => usuario.id === curso.instructor!.id) : undefined;
          return { ...curso, instructor };
        });
      })
    );
  }

  getCourseId(id: string): Promise<Curso | null> {
    const cursoDocRef = doc(this.cursosCollection, id);
    return getDoc(cursoDocRef).then((docSnapshot) => {
      if (docSnapshot.exists()) {
        return docSnapshot.data() as Curso;
      } else {
        return null;
      }
    });
  }

  // Update
  updateCourse(curso: Partial<Curso>): Promise<void> {
    const cursoDocRef = doc(this.cursosCollection, curso.id);
    return updateDoc(cursoDocRef, curso);
  }

  // Delete
  deleteCourse(curso: Curso) {
    const cursoDocRef = doc(this.firestore, `Cursos/${curso.id}`);
    return deleteDoc(cursoDocRef);
  }
}