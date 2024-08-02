import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatDividerModule } from '@angular/material/divider';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario.model';
import { Validaciones } from '../../util/validaciones.component';
import { HeaderComponent } from '../header/header.component';
import { Notificaciones } from '../../util/notificaciones.component';
 
@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [MatDividerModule, FormsModule, ReactiveFormsModule, HeaderComponent],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
 
export class RegistroComponent {
  name: string = "";
  lastname: string = "";
  phone: string = "";
  email: string = "";
  password: string = "";
  confirm: string = "";
  registerForm: FormGroup;
  validations = new Validaciones();
  notifications = new Notificaciones();
  user: Usuario | null = null;
 
  constructor(private authService: AuthService, private router: Router) {
    this.registerForm = new FormGroup({
      name: new FormControl(''),
      lastname: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      confirm: new FormControl('')
    });
  }
 
  async signupGoogle() {
    try {
      await this.authService.signupGoogle();
      if (this.user?.rol === 'alumno' || this.user?.rol === 'instructor') {
        this.router.navigate(['/lista-cursos']);
      } else {
        this.router.navigate(['/reportes']);
      }
    } catch (error) {
      console.error(error);
    }
  }
 
  register() {
    let usuario: Usuario = this.formToUser();
    usuario.imagen = "https://firebasestorage.googleapis.com/v0/b/sagc-bd.appspot.com/o/imagenes-perfil%2FEUk5ZsfihJSJM005vjnV?alt=media&token=a90fde3e-cb71-40db-824e-4d91205d9d7e";
    let passConfirm = this.registerForm.get('confirm')?.value;
    if (usuario.contrasena === passConfirm) {
      let valid = this.validations.validarDatosUsuario(usuario);
      if (valid === '') {
        this.authService.register(usuario)
          .then(() => {
            this.router.navigate(['/inicio']);
          })
          .catch(error => {
            console.error(error);
          });
      } else {
        this.notifications.showErrorNotificacion(valid);
      }
    }
  }
 
  formToUser(): Usuario {
    let form = this.registerForm.value;
    return {
      nombre: form.name,
      apellido: form.lastname,
      telefono: form.phone,
      correoElectronico: form.email,
      contrasena: form.password,
      rol: 'alumno',
      cursos_inscritos: []
    };
  }
}