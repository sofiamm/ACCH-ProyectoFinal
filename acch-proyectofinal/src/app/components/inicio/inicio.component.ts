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
      email: new FormControl(''),
      password: new FormControl('')
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
        this.router.navigate(['/']);
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
        this.router.navigate(['/']);
      })
      .catch(error => {
        if (error.message.indexOf("Firebase") >= 0) {
          console.log("");
        } else {
          console.error(error);
        }
      });
  }
}
 