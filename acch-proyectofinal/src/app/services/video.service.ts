import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, updateDoc, arrayUnion, arrayRemove, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Video } from '../models/video.model';
import { getDownloadURL, ref, uploadBytes, Storage, deleteObject } from '@angular/fire/storage';
import { Curso } from '../models/curso.model';
import { Comentario } from '../models/comentario.model';


@Injectable({
    providedIn: 'root'
})
export class VideoService {
    private cursosCollection = collection(this.firestore, 'Cursos');
    tmpVideo: Video | null = null;

    constructor(private firestore: Firestore, private storage: Storage) { }

    // Obtiene todos los videos
    getVideos(cursoId: string): Observable<Video[]> {
        return collectionData(this.cursosCollection, cursoId, "videos", { idField: 'id' }) as Observable<Video[]>;
    }

    // Obtiene un video por su ID
    async getVideo(courseId: string, videoId: string): Promise<Video> {
        const courseRef = doc(this.cursosCollection, courseId);
        const courseDoc = await getDoc(courseRef);
        const courseData = courseDoc.data();
        const videos = courseData?.['videos'] as any[] | undefined;
        return videos?.find(v => v.id === videoId);
    }

    // Revisa si el curso ya tiene un video con el nombre del video nuevo
    async checkVideoExists(cursoId: string, videoId: string): Promise<boolean> {
        const cursoDocRef = doc(this.cursosCollection, cursoId);
        const cursoSnapshot = await getDoc(cursoDocRef);

        if (cursoSnapshot.exists()) {
            const cursoData = cursoSnapshot.data() as Curso;
            return cursoData.videos?.some(video => video.id === videoId) || false;
        }
        return false;
    }

    // Sube el video a Firebase Storage
    async uploadCourseVideo(courseId: string, file: File): Promise<string> {
        const storageRef = ref(this.storage, `videos-curso/${courseId}/${file.name}`);
        await uploadBytes(storageRef, file);
        try {
            const downloadURL = await getDownloadURL(storageRef);
            return downloadURL;
        } catch (error) {
            console.error('Error getting download URL:', error);
            throw error;
        }
    }

    // Agrega el video nuevo al curso
    async addVideoToCourse(courseId: string, video: Video): Promise<void> {
        const courseRef = doc(this.cursosCollection, courseId);
        await updateDoc(courseRef, {
            videos: arrayUnion(video)
        });
    }

    // Elimina el video de Firebase Storage
    async deleteVideoFromStorage(courseId: string, videoId: string): Promise<void> {
        const storageRef = ref(this.storage, `videos-curso/${courseId}/${videoId}.mp4`);
        try {
            await deleteObject(storageRef);
            await this.removeVideoFromCourse(courseId, videoId);
        } catch (error) {
            console.error('Error eliminando video:', error);
            throw error;
        }
    }

    // Elimina el video del curso
    async removeVideoFromCourse(courseId: string, videoId: string): Promise<void> {
        const courseRef = doc(this.cursosCollection, courseId);
        const videoToRemove = await this.getVideo(courseId, videoId);
        if (videoToRemove !== null) {
            await updateDoc(courseRef, {
                videos: arrayRemove(videoToRemove)
            });
        }
    }

    // Obtiene los comentarios de un video
    async getComments(video: Video): Promise<Comentario[]> {
        const comments = video?.comentarios || [];
        return comments.sort((a, b) => (a.fecha > b.fecha ? -1 : 1));
    }

    // Actualiza un video
    async updateVideo(courseId: string, videoId: string, updatedVideo: Video): Promise<void> {
        const cursoRef = doc(this.cursosCollection, courseId);
        const cursoDoc = await getDoc(cursoRef);

        if (cursoDoc.exists()) {
            const cursoData = cursoDoc.data() as Curso;
            const videos = cursoData.videos || [];
            const updatedVideos = videos.map(video =>
                video.id === videoId ? { ...video, ...updatedVideo } : video
            );

            await updateDoc(cursoRef, { videos: updatedVideos });
        } else {
            throw new Error('Curso no encontrado');
        }
    }

    // Agrega un comentario a un video
    async addComment(courseId: string, videoId: string, comentario: Comentario): Promise<void> {
        const video = await this.getVideo(courseId, videoId);
        if (video) {
            video.comentarios = Array.isArray(video.comentarios) ? [...video.comentarios, comentario] : [comentario];
            await this.updateVideo(courseId, videoId, video);
        }
        else {
            console.error('Video no encontrado');
        }
    }

    async updateVideoDescription(courseId: string, video: Video): Promise<void> {
        const videoTmp = await this.getVideo(courseId, video.id!);
        videoTmp.descripcion = video.descripcion;
        await this.updateVideo(courseId, video.id!, videoTmp);
    }

}