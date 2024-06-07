import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

import { MatDividerModule } from '@angular/material/divider';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MatDividerModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent implements OnInit {
  email: string = '';
  password: string = '';
  loginForm: FormGroup;

  constructor(private authService: AuthService) { 
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
  }

  login() {
    this.authService.login(this.email, this.password)
      .then(() => {
        // Redirigir a la página principal
      })
  }
}
