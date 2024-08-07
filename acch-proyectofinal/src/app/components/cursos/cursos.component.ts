import { Component, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from '../banner/banner.component';
import { CardComponent } from '../card/card.component';
import { HeaderComponent } from '../header/header.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Notificaciones } from '../../util/notificaciones.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableModule, Columns, Config, DefaultConfig, APIDefinition, API } from 'ngx-easy-table';
import { Curso } from '../../models/curso.model';
import { CursoService } from '../../services/curso.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Validaciones } from '../../util/validaciones.component';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [
    BannerComponent,
    CardComponent,
    HeaderComponent,
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    TableModule
  ],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.scss'
})

export class CursosComponent {
  /**
   * Variables
   */
  validaciones = new Validaciones();
  notificaciones = new Notificaciones();
  newCourseForm: FormGroup;
  editCourseForm: FormGroup;
  cursos: Curso[] = [];
  instructores: Usuario[] = [];
  public configuration!: Config;
  public columns!: Columns[];

  @ViewChild('addCourseModal') addCourseModal!: ElementRef;
  @ViewChild('editCourseModal') editCourseModal!: ElementRef;
  @ViewChild('table') table!: APIDefinition;
  @ViewChild('instructorTemplate', { static: true }) instructorTemplate!: TemplateRef<any>;
  @ViewChild('imageTemplate', { static: true }) imageTemplate!: TemplateRef<any>;
  @ViewChild('actionTpl', { static: true }) actionTpl!: TemplateRef<any>;

  /**
   * Funciones
   */
  constructor(private cursoService: CursoService, private usuarioService: UsuarioService) {
    this.cursoService.getCourses().subscribe(cursos => {
      this.cursos = cursos;
    });

    this.usuarioService.getUsers().subscribe(usuarios => {
      this.instructores = usuarios.filter(usuario => usuario.rol === 'instructor');
    });

    this.newCourseForm = new FormGroup({
      nombre: new FormControl(),
      descripcion: new FormControl(),
      evaluacion: new FormControl(),
      imagen: new FormControl(),
      instructor: new FormControl(),
    });

    this.editCourseForm = new FormGroup({
      id: new FormControl(),
      nombre: new FormControl(),
      descripcion: new FormControl(),
      evaluacion: new FormControl(),
      imagen: new FormControl(),
      instructor: new FormControl(),
    });
  }

  async createCourse() {
    let instructorId = this.newCourseForm.value.instructor;
    if (instructorId) {
      let instructor = this.instructores.find(usuario => usuario.id === instructorId);
      this.newCourseForm.value.instructor = instructor;
    } else {
      this.newCourseForm.value.instructor = null;
    }

    let curso = this.newCourseForm.value;
    if (this.courseExists(curso.nombre)) {
      this.notificaciones.showErrorNotificacion('Ya existe un curso con ese nombre');
    } else {
      let validData = this.validaciones.validarDatosCurso(curso);
      if (validData === '') {
        await this.cursoService.createCourse(curso)
          .then(docRef => {
            this.notificaciones.showSuccessNotificacion('Curso creado exitosamente');
            this.closeModal('add');
          })
          .catch(error => {
            this.notificaciones.showErrorNotificacion(error);
          });
      } else {
        this.notificaciones.showErrorNotificacion(validData);
      }
    }
  }

  async updateCourse() {
    let instructorId = this.editCourseForm.value.instructor;
    let instructor = this.instructores.find(usuario => usuario.id === instructorId);
    let curso = this.editCourseForm.value;
    curso.instructor = instructor;
    if (this.courseExists(curso.nombre)) {
      this.notificaciones.showErrorNotificacion('Ya existe un curso con ese nombre');
    } else {
      let validData = this.validaciones.validarDatosCurso(curso);
      if (validData === '') {
        await this.cursoService.updateCourse(curso)
          .then(docRef => {
            this.notificaciones.showSuccessNotificacion('Curso actualizado exitosamente');
            this.closeModal('edit');
          })
          .catch(error => {
            this.notificaciones.showErrorNotificacion(error);
          });
      } else {
        this.notificaciones.showErrorNotificacion(validData);
      }
    }
  }

  /**
   * Helpers
   */

  ngOnInit(): void {
    this.configuration = { ...DefaultConfig };
    this.configuration.tableLayout.striped = true;
    this.columns = [
      { key: 'nombre', title: 'Nombre' },
      { key: 'descripcion', title: 'Descripción' },
      { key: 'evaluacion', title: 'Evaluación' },
      { key: 'imagen', title: 'Imagen', cellTemplate: this.imageTemplate, orderEnabled: false },
      { key: '', title: 'Instructor', cellTemplate: this.instructorTemplate },
      { key: 'actions', title: 'Acciones', orderEnabled: false, cellTemplate: this.actionTpl }
    ]
  }

  onChange(event: Event): void {
    this.table.apiEvent({
      type: API.onGlobalSearch,
      value: (event.target as HTMLInputElement).value,
    });
  }

  closeModal(kind: string) {
    let modalElement;
    modalElement = kind === 'add' ? this.addCourseModal.nativeElement : this.editCourseModal.nativeElement;
    const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
    modal.hide();
    this.newCourseForm.reset();
  }

  openEditModal(curso: Curso) {
    let imgSource = '';
    if (curso.imagen !== '' && curso.imagen !== null) {
      imgSource = curso.imagen.startsWith('/assets') ? '' : curso.imagen;
    }
    this.editCourseForm.patchValue({
      id: curso.id,
      nombre: curso.nombre,
      descripcion: curso.descripcion,
      evaluacion: curso.evaluacion,
      imagen: imgSource,
      instructor: curso.instructor?.id
    });
  }

  openDeleteModal(curso: Curso) {
    this.notificaciones.showConfirmacion('¿Desea eliminar el curso ' + curso.nombre + '?', 'danger', () => {
      this.cursoService.deleteCourse(curso);
      this.notificaciones.showSuccessNotificacion('Curso eliminado exitosamente');
    });
  }

  loadDefaultImg(curso: Curso) {
    curso.imagen = '/assets/empty_img.jpeg';
  }

  courseExists(curso: string): boolean {
    console.log(curso);
    return this.cursos.some(c => c.nombre.toLowerCase() === curso.toLowerCase());
  }
}