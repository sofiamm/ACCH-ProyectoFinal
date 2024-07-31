import { Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { CursoService } from '../../services/curso.service';
import { Curso } from '../../models/curso.model';
import { CommonModule } from '@angular/common';
import { Notificaciones } from '../../util/notificaciones.component';
import { VideoService } from '../../services/video.service';
import { Video } from '../../models/video.model';
import { Comentario } from '../../models/comentario.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-vista-curso',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    ReactiveFormsModule,
    NgbModule
  ],
  templateUrl: './vista-curso.component.html',
  styleUrl: './vista-curso.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class VistaCursoComponent implements OnInit {
  private commentUpdateInterval: any;

  user = localStorage.getItem('usuario') ? JSON.parse(localStorage.getItem('usuario') ?? '') : null;
  userId = this.user.id;
  instructor: Usuario | null = null;
  course: Curso | null = null;
  notificaciones = new Notificaciones();
  videoSelected: Video | null = null;
  tmpVideo: Video | null = null;
  comments: Comentario[] = [];

  @ViewChild('video') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('editVideoModal') editVideoModal!: ElementRef;
  addCommentForm: FormGroup;
  editVideoDescForm: FormGroup;


  constructor(
    private usuarioService: UsuarioService,
    private cursoService: CursoService,
    private videoService: VideoService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    this.addCommentForm = new FormGroup({
      comment: new FormControl(''),
    });

    this.editVideoDescForm = new FormGroup({
      descripcion: new FormControl(''),
    });
  }

  /**
   * Al iniciar cargar el curso seleccionado y el usuario
   */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.loadUser();
        this.loadCourse(id);
        this.refresh();
      } else {
        alert('No se encontró el curso.');
      }
    });
  }

  /**
   * Se encarga de actualizar la seccion de comentarios cada 1 segundo
   */
  async refresh(): Promise<void> {
    this.commentUpdateInterval = setInterval(async () => {
      if (this.videoSelected?.id && this.course?.id) {
        this.tmpVideo = await this.videoService.getVideo(this.course.id, this.videoSelected.id);
        await this.getComments(this.tmpVideo);
        this.cdr.markForCheck();
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.commentUpdateInterval) {
      clearInterval(this.commentUpdateInterval);
    }
  }

  /**
   * Cargar el primer video del curso o el video seleccionado y los comentarios
   * @param id string
   * @param index number
   */
  private async loadCourse(id: string, index?: number): Promise<void> {
    try {
      this.course = await this.cursoService.getCourseId(id);
      if (this.course) {
        if (this.course.instructor) {
          this.instructor = this.course.instructor;
        } else {
          throw new Error('No se encontró el instructor del curso.');
        }
        this.cdr.markForCheck();
        if (this.course.videos && this.course.videos.length > 0) {
          if (index !== undefined && index >= 0 && index < this.course.videos.length) {
            this.loadVideo(this.course.videos[index]);
          } else {
            this.loadVideo(this.course.videos[0]);
          }
        } else {
          this.notificaciones.showInfoNotificacion('Este curso no tiene videos aún.');
        }
      } else {
        throw new Error('No se pudo cargar la información del curso.');
      }
    } catch (error) {
      alert('Error: ' + error);
    }
  }


  /**
   * Cargar los datos del video indicado
   * @param video Video
   * @param event any
   */
  public async loadVideo(video: Video, event?: any): Promise<void> {
    if (event) { event.preventDefault(); }
    this.videoSelected = video;
    const videoElement = this.videoElement.nativeElement;
    videoElement.src = this.videoSelected.url;
    videoElement.load();
    await this.getComments(video);
  }

  /**
   * Obtiene los comentarios del video indicado
   * @param video
   */
  async getComments(video: Video): Promise<void> {
    this.videoService.getComments(video).then(comments => {
      this.comments = comments;
    });
  }

  //Cargar el usuario en sesion
  private async loadUser(): Promise<void> {
    try {
      this.user = await this.usuarioService.getUserId(this.userId);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  //despues de seleccionar el video, lo carga al reproductor
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const videoElement = this.videoElement.nativeElement;
      videoElement.src = URL.createObjectURL(file);
      videoElement.load();
      this.videoSelected = null;
    }
  }

  /**
   * Subir video a Storage y actualiza el curso con el video
   * @returns Promise<void>
   */
  async uploadCourseVideo(): Promise<void> {
    const fileInput = document.getElementById('newVideoFile') as HTMLInputElement;
    const file = fileInput?.files?.[0];

    if (file && this.course?.id) {
      const fileName = file.name;

      // Revisa que no haya otro video con el mismo nombre en el mismo curso
      const videoExists = await this.videoService.checkVideoExists(this.course.id, fileName);
      if (videoExists) {
        this.notificaciones.showErrorNotificacion('Ya existe un video con el mismo nombre en este curso.');
        return;
      }

      try {
        this.notificaciones.showLoadingNotificacion('Subiendo video...');
        const videoUrl = await this.videoService.uploadCourseVideo(this.course.id, file);
        let videoDesc = (<HTMLInputElement>document.getElementById("videoDesc")).value;
        let videoDuration = parseDuration(this.videoElement.nativeElement.duration);

        await this.videoService.addVideoToCourse(this.course.id, {
          id: fileName.replace(".mp4", ""),
          duracion: videoDuration,
          url: videoUrl,
          comentarios: [],
          descripcion: videoDesc
        });

        this.notificaciones.closeLoadingNotificacion();
        this.notificaciones.showSuccessNotificacion('Video subido correctamente', () => {
          document.location.reload();
        });
      } catch (error) {
        this.notificaciones.closeLoadingNotificacion();
        this.notificaciones.showErrorNotificacion('Error subiendo el archivo: ' + error);
      }
    } else {
      this.notificaciones.showErrorNotificacion('Debe seleccionar un archivo antes de subirlo.');
    }
  }

  /**
   * Elimina el video del Storage y del curso
   * @param event any
   * @param videoId string
   */
  async deleteVideo(event: any, videoId: string): Promise<void> {
    event.preventDefault();
    if (this.course?.id) {
      try {
        await this.videoService.deleteVideoFromStorage(this.course.id, videoId);
        this.notificaciones.showSuccessNotificacion('Video eliminado correctamente', () => {
          document.location.reload();
        });
      } catch (error) {
        this.notificaciones.showErrorNotificacion('Error al eliminar el video: ' + error);
      }
    } else {
      this.notificaciones.showErrorNotificacion('No se pudo eliminar el video. Información del curso no disponible.');
    }
  }

  /**
   * Agrega un comentario al video
   * @param courseId string
   * @param videoId string
   */
  async addComment(courseId?: string, videoId?: string): Promise<void> {
    const commentText = this.addCommentForm.get('comment')?.value;;
    if (courseId && videoId && commentText.trim() !== '') {
      try {
        const newComment: Comentario = {
          usuarioImg: this.user.imagen,
          usuarioNombre: this.user.nombre + ' ' + this.user.apellido,
          comentario: commentText,
          fecha: new Date()
        };
        await this.videoService.addComment(courseId, videoId, newComment);
        this.addCommentForm.get('comment')?.reset();
        this.refresh();
      } catch (error) {
        this.notificaciones.showErrorNotificacion('Error al agregar el comentario: ' + error);
      }
    }
  }

  openEditModal(event: any, video: Video) {
    event.preventDefault();
    this.videoSelected = video;
    this.editVideoDescForm.patchValue({
      id: video.id,
      duracion: video.duracion,
      url: video.url,
      comentarios: video.comentarios,
      descripcion: video.descripcion
    });
  }

  updateVideoDesc() {
    if (this.videoSelected && this.course?.id) {
      const newDescription = this.editVideoDescForm.get('descripcion')?.value;
      this.videoSelected.descripcion = newDescription;
      this.videoService.updateVideoDescription(this.course.id, this.videoSelected)
        .then(() => {
          this.closeModal();
          this.notificaciones.showSuccessNotificacion('Descripción del video actualizada exitosamente');
          this.loadVideo(this.videoSelected!);
        })
        .catch(error => {
          this.notificaciones.showErrorNotificacion('Error al actualizar la descripción del video');
          console.error(error);
        });
    }
  }

  closeModal() {
    const modal = (window as any).bootstrap.Modal.getInstance(this.editVideoModal.nativeElement);
    modal.hide();
  }

}

/**
 * Convierte la duracion del video a minutos o segundos
 * @param unparsed number
 * @returns string
 */
function parseDuration(unparsed: number): string {
  let formattedDuration: string;

  if (unparsed > 60) {
    let minutes = Math.floor(unparsed / 60);
    formattedDuration = `${minutes} min`;
  } else {
    formattedDuration = `${Math.round(unparsed)} seg`;
  }

  return formattedDuration;
}