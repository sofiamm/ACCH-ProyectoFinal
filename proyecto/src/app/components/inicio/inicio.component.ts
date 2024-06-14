import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

import { MatDividerModule } from '@angular/material/divider';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';


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

  constructor(private authService: AuthService, private router: Router) { 
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  loginGoogle() {
    this.authService.loginGoogle()
    .then(() => {
      this.router.navigate(['/']); // Redirigir al home
    })
    .catch(error => {
      console.error(error);
    });
  }

  login() {
    this.authService.login(this.email, this.password)
      .then(() => {
        this.router.navigate(['/']); // Redirigir al home
      })
      .catch(error => {
        console.error(error);
      });
  }
}
