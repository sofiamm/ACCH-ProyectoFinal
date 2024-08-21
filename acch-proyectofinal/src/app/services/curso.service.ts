import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc, getDoc, arrayUnion, arrayRemove } from '@angular/fire/firestore';
import { Curso } from '../models/curso.model';
import { Observable } from 'rxjs';
import { Video } from '../models/video.model';
import { deleteObject, getDownloadURL, ref, uploadBytes, Storage } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private cursosCollection = collection(this.firestore, 'Cursos');

  constructor(private firestore: Firestore, private storage: Storage) { }

  createCourse(curso: Curso) {
    return addDoc(this.cursosCollection, curso);
  }

  getCourses(): Observable<Curso[]> {
    return collectionData(this.cursosCollection, { idField: 'id' }) as Observable<Curso[]>;
  }

  getCourseId(id: string): Promise<Curso | null> {
    try {
      const cursoDocRef = doc(this.cursosCollection, id);
      return getDoc(cursoDocRef).then((docSnapshot) => {
        if (docSnapshot.exists()) {
          return { id, ...docSnapshot.data() } as Curso;
        } else {
          console.log(`Curso no encontrado: ${id}`);
          return null;
        }
      });
    } catch (error) {
      console.error('Error: ', error);
      return Promise.resolve(null);
    }
  }

  updateCourse(curso: Partial<Curso>): Promise<void> {
    const cursoDocRef = doc(this.cursosCollection, curso.id);
    return updateDoc(cursoDocRef, curso);
  }

  deleteCourse(curso: Curso) {
    const cursoDocRef = doc(this.firestore, `Cursos/${curso.id}`);
    return deleteDoc(cursoDocRef);
  }
}