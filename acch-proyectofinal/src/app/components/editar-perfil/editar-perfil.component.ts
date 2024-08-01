import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { CommonModule } from '@angular/common';
import { Notificaciones } from '../../util/notificaciones.component';
import { Validaciones } from '../../util/validaciones.component';

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
    MatIcon,
    CommonModule
  ],
  templateUrl: './editar-perfil.component.html',
  styleUrl: './editar-perfil.component.scss'
})

export class EditarPerfilComponent implements OnInit {
  editUserForm: FormGroup;
  user = localStorage.getItem('usuario') ? JSON.parse(localStorage.getItem('usuario') || '') : null; //obtiene el usuario en sesion
  id = this.user.id;
  userTmp: Usuario | null = null;
  photo: string | null = null;
  notificaciones = new Notificaciones();
  validaciones = new Validaciones();
  defaultImg = "https://firebasestorage.googleapis.com/v0/b/sagc-bd.appspot.com/o/imagenes-perfil%2FEUk5ZsfihJSJM005vjnV?alt=media&token=a90fde3e-cb71-40db-824e-4d91205d9d7e"

  constructor(public router: Router, private usuarioService: UsuarioService) {
    //inicializar el formulario
    this.editUserForm = new FormGroup({
      id: new FormControl(''),
      nombre: new FormControl(''),
      apellido: new FormControl(''),
      telefono: new FormControl(''),
      correoElectronico: new FormControl(''),
      contrasena: new FormControl(''),
      confirma: new FormControl(''),
      rol: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  //llena el formulario con los datos del usuario actual
  private async loadUserData(): Promise<void> {
    try {
      this.userTmp = await this.usuarioService.getUserId(this.id);
      this.photo = this.getUserPhoto();
      this.fillForm();
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  }

  //llena el formulario con los valores del usuario actual
  private async fillForm(): Promise<void> {
    if (this.userTmp) {
      this.editUserForm.patchValue({
        id: this.userTmp.id,
        nombre: this.userTmp.nombre,
        apellido: this.userTmp.apellido,
        telefono: this.userTmp.telefono,
        correoElectronico: this.userTmp.correoElectronico,
        contrasena: "",
        confirma: "",
        rol: this.user.rol,
        imagen: this.userTmp.imagen
      });
      if (this.userTmp?.cuentaGoogle) { //desactiva los campos de correo y contrasena por que tiene una cuenta asociada
        this.editUserForm.get('correoElectronico')?.disable();
        this.editUserForm.get('contrasena')?.disable();
        this.editUserForm.get('confirma')?.disable();
      }
      this.photo = this.getUserPhoto();
    }
  }

  //Obtiene la foto del usuario
  getUserPhoto(): string {
    if (this.userTmp == null || undefined) return this.defaultImg;
    let photo = this.userTmp.imagen;
    return (photo == null || undefined) ? this.defaultImg : photo;
  }

  guardarCambios() {
    let userEdit = this.editUserForm.value;
    if (!this.user.cuentaGoogle) { //si no es un usuario de google, se validan las contrasenas
if (userEdit.contrasena === "" || userEdit.contrasena === null) {
        userEdit.contrasena = this.userTmp?.contrasena;
        userEdit.confirma = this.userTmp?.contrasena;
}
      if (userEdit.contrasena != userEdit.confirma) {
        this.notificaciones.showErrorNotificacion("Las contraseñas no coinciden");
        return;
      }
    }
    
    let usernew = this.formToUser();
    usernew.cuentaGoogle = this.user.cuentaGoogle === undefined ? false : this.user.cuentaGoogle;
    let validData = this.validaciones.validarDatosUsuario(usernew); //validar datos
    if (validData === '') {
      this.usuarioService.updateUser(usernew);
      this.router.navigate(['/perfil']);
    } else {
      this.notificaciones.showErrorNotificacion(validData);
    }
  }

  //Llama al servicio para subir la imagen, retorna la url de la imagen en la nube
  async uploadImage(userId: string, file: any) {
    if (file) {
      const imageUrl = await this.usuarioService.uploadUserImage(userId, file);
      return imageUrl
    } else {
      return this.userTmp?.imagen;
    }
  }

  //Evento que se dispara al seleccionar una imagen
  async onFileSelected(event: any): Promise<void> {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e: any) => {
        const imageUrl = await this.uploadImage(this.id, file);
        if (imageUrl !== undefined && imageUrl !== null) {
          this.photo = imageUrl;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  //convierte el formulario en un usuario
  formToUser(): Usuario {
    let formUser = this.editUserForm.value;
    let user: Usuario = {
      id: formUser.id,
      nombre: formUser.nombre,
      apellido: formUser.apellido,
      telefono: formUser.telefono,
      correoElectronico: this.user.cuentaGoogle ? this.user.correoElectronico : formUser.correoElectronico,
      contrasena: this.user.cuentaGoogle ? "-" : formUser.contrasena,
      imagen: this.photo ?? this.defaultImg,
      rol: formUser.rol,
      cuentaGoogle: this.user.cuentaGoogle
    }
    return user;
  }
}