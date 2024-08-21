import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatDividerModule } from '@angular/material/divider';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario.model';
import { Validaciones } from '../../util/validaciones.component';
import { HeaderComponent } from '../header/header.component';
import { Notificaciones } from '../../util/notificaciones.component';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [MatDividerModule, FormsModule, ReactiveFormsModule, HeaderComponent],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})

export class RegistroComponent {
  usuarios: Usuario[] = [];
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

  constructor(private authService: AuthService, private router: Router, private usuarioService: UsuarioService) {
    this.usuarioService.getUsers().subscribe(usuarios => {
      this.usuarios = usuarios;
    });

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
      if (this.user?.rol === 'instructor') {
        this.router.navigate(['/lista-cursos']);
      }  if (this.user?.rol === 'alumno') {
        this.router.navigate(['/home']);  
      } else {
        this.router.navigate(['/reportes']);
      }
    } catch (error) {
      console.error(error);
    }
  }

  register() {
    let usuario: Usuario = this.formToUser();
    usuario.imagen = "https://firebasestorage.googleapis.com/v0/b/sagc-bd.appspot.com/o/imagenes-perfil%2Fdefault.jpg?alt=media&token=e14ee0cb-0647-4469-8e73-da62250f1f6b";
    if (this.userExists(usuario.correoElectronico)) {
      this.notifications.showErrorNotificacion('Ya existe un usuario con ese correo electrónico');
    } else {
      let passConfirm = this.registerForm.get('confirm')?.value;
      if (usuario.contrasena === passConfirm) {
        let valid = this.validations.validarDatosUsuario(usuario);
        if (valid === '') {
          this.authService.register(usuario)
            .then(() => {
              if (this.user?.rol === 'alumno' || this.user?.rol === 'instructor') {
                this.router.navigate(['/lista-cursos']);
              } else {
                this.router.navigate(['/reportes']);
              }
            })
            .catch(error => {
              console.error(error);
            });
        } else {
          this.notifications.showErrorNotificacion(valid);
        }
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

  userExists(email: string): boolean {
    return this.usuarios.some(u => u.correoElectronico.toLowerCase() === email.toLowerCase());
  }
}