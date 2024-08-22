import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc, getDoc, arrayUnion, arrayRemove, query, where, getDocs } from '@angular/fire/firestore';
import { Curso } from '../models/curso.model';
import { Observable } from 'rxjs';
import { Video } from '../models/video.model';
import { deleteObject, getDownloadURL, ref, uploadBytes, Storage, listAll } from '@angular/fire/storage';


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

  async getCourseId(id: string): Promise<Curso | null> {
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

  async getCourseByName(name: string): Promise<Curso | null> {
    try {
      const q = query(this.cursosCollection, where("nombre", "==", name));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return { id: doc.id, ...doc.data() } as Curso;
      } else {
        console.log(`Curso no encontrado con nombre: ${name}`);
        return null;
      }
    } catch (error) {
      console.error('Error: ', error);
      return null;
    }
  }

  updateCourse(curso: Partial<Curso>): Promise<void> {
    const cursoDocRef = doc(this.cursosCollection, curso.id);
    return updateDoc(cursoDocRef, curso);
  }

  async deleteCourse(curso: Curso) {
    const cursoDocRef = doc(this.firestore, `Cursos/${curso.id}`);
    await this.deleteCourseVideos(curso.id!);
    return deleteDoc(cursoDocRef);
  }

  async deleteCourseVideos(courseId: string): Promise<void> {
    const folderRef = ref(this.storage, `videos-curso/${courseId}`);
    try {
      const listResult = await listAll(folderRef);

      const deletePromises = listResult.items.map(item => deleteObject(item));
      await Promise.all(deletePromises);
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  }
}