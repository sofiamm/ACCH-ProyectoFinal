import { Component, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { BannerComponent } from '../banner/banner.component';
import { HeaderComponent } from '../header/header.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Notificaciones } from '../../util/notificaciones.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableModule, Columns, Config, DefaultConfig, APIDefinition, API } from 'ngx-easy-table';
import { Validaciones } from '../../util/validaciones.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    BannerComponent,
    HeaderComponent,
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    TableModule,
  ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss',
})

export class UsuariosComponent {

  /**
   * Variables
   */
  validaciones = new Validaciones();
  notificaciones = new Notificaciones();
  newUserForm: FormGroup;
  editUserForm: FormGroup;
  usuarios: Usuario[] = [];
  public configuration!: Config;
  public columns!: Columns[];

  @ViewChild('addUserModal') addUserModal!: ElementRef;
  @ViewChild('editUserModal') editUserModal!: ElementRef;
  @ViewChild('table') table!: APIDefinition;
  @ViewChild('actionTpl', { static: true }) actionTpl!: TemplateRef<any>;

  /**
   * Funciones
   */
  constructor(private usuarioService: UsuarioService, private authService: AuthService) {
    this.usuarioService.getUsers().subscribe(usuarios => {
      this.usuarios = usuarios;
    });

    this.newUserForm = new FormGroup({
      nombre: new FormControl(),
      apellido: new FormControl(),
      telefono: new FormControl(),
      correoElectronico: new FormControl(),
      contrasena: new FormControl(),
      rol: new FormControl(),
      cursos_inscritos: new FormControl(),
      imagen: new FormControl()
    });

    this.editUserForm = new FormGroup({
      id: new FormControl(),
      nombre: new FormControl(),
      apellido: new FormControl(),
      telefono: new FormControl(),
      correoElectronico: new FormControl(),
      contrasena: new FormControl(),
      rol: new FormControl()
    });
  }

  async createUser() {
    let usuario = this.newUserForm.value;
    usuario.cuentaGoogle = false;
    let validData = this.validaciones.validarDatosUsuario(usuario);
    if (validData === '') {
      await this.usuarioService.createUser(usuario)
        .then(docRef => {
          this.authService.register(usuario)
          this.notificaciones.showSuccessNotificacion('Usuario creado exitosamente');
          this.closeModal('add');
        })
        .catch(error => {
          this.notificaciones.showErrorNotificacion(error);
        });
    } else {
      this.notificaciones.showErrorNotificacion(validData);
    }
  }

  async updateUser() {
    let usuario = this.editUserForm.value;
    let validData = this.validaciones.validarDatosUsuario(usuario);
    if (validData === '') {
      await this.usuarioService.updateUser(usuario)
        .then(docRef => {
          this.notificaciones.showSuccessNotificacion('Usuario actualizado exitosamente');
          this.closeModal('edit');
        })
        .catch(error => {
          this.notificaciones.showErrorNotificacion(error);
        });
    } else {
      this.notificaciones.showErrorNotificacion(validData);
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
      { key: 'apellido', title: 'Apellidos' },
      { key: 'telefono', title: 'Telefono' },
      { key: 'correoElectronico', title: 'Correo Electronico' },
      { key: 'rol', title: 'Rol' },
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
    modalElement = kind === 'add' ? this.addUserModal.nativeElement : this.editUserModal.nativeElement;
    const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
    modal.hide();
    this.newUserForm.reset();
  }

  openEditModal(usuario: Usuario) {
    this.editUserForm.patchValue({
      id: usuario.id,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      telefono: usuario.telefono,
      correoElectronico: usuario.correoElectronico,
      contrasena: usuario.contrasena,
      rol: usuario.rol
    });
  }

  openDeleteModal(usuario: Usuario) {
    this.notificaciones.showConfirmacion('¿Desea eliminar el usaurio ' + usuario.nombre + '?', 'danger', () => {
      this.usuarioService.deleteUser(usuario);
      this.notificaciones.showSuccessNotificacion('Usuario eliminado exitosamente');
    });
  }
}


