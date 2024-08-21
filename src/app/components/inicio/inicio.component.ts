import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatDividerModule } from '@angular/material/divider';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MatDividerModule, FormsModule, ReactiveFormsModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})

export class InicioComponent implements OnInit {
  email: string = '';
  password: string = '';
  loginForm: FormGroup;
  user: Usuario | null = null;
  resertPasswordForm: FormGroup;

  @ViewChild('resertPasswordModal') resertPasswordModal!: ElementRef;

  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });

    this.resertPasswordForm = new FormGroup({
      correoElectronico: new FormControl()
    });
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('',),
      password: new FormControl('',)
    });
  }

  loginGoogle() {
    this.authService.loginGoogle()
      .then(() => {
        if (this.user?.rol === 'instructor') {
          this.router.navigate(['/lista-cursos']);
        }  if (this.user?.rol === 'alumno') {
          this.router.navigate(['/home']);  
        }
        else {
          this.router.navigate(['/reportes']);
        }
      })
      .catch(error => {
        if (error.message.indexOf("Firebase") >= 0) {
          console.log("");
        } else {
          console.error(error);
        }
      });
  }

  login() {
    this.email = this.loginForm.get("email")?.value;
    this.password = this.loginForm.get("password")?.value;
    this.authService.login(this.email, this.password)
      .then(() => {
        if (this.user?.rol === 'instructor') {
          this.router.navigate(['/lista-cursos']);
        }  if (this.user?.rol === 'alumno') {
          this.router.navigate(['/home']);  
        } else {
          this.router.navigate(['/reportes']);
        }
      })
      .catch(error => {
        if (error.message.indexOf("Firebase") >= 0) {
          console.log("");
        } else {
          console.error(error);
        }
      });
  }

  resertPassword() {
    const email = this.resertPasswordForm.get("correoElectronico")?.value;
    this.authService.resetPassword(email)
      .then(() => {
        console.log('Email sent');
        let modalElement = this.resertPasswordModal.nativeElement;
        const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
        modal.hide();
        this.resertPasswordForm.reset();
      })
      .catch(error => {
        console.error(error);
      });
  }
}