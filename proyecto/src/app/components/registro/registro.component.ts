import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

import { MatDividerModule } from '@angular/material/divider';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [MatDividerModule, FormsModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent implements OnInit {
  email: string = "";
  password: string = "";
  uid : string = '';
  registerForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, private firestore:Firestore) {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
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
  
  async register() {
   this.email = this.registerForm.getRawValue().email;
   this.password = this.registerForm.getRawValue().password;

    const res = await this.authService.register(this.email, this.password)
    //ingreso de datos usuario a la tabla de usuarios
    if (res) {
      console.log('exito al crear el usuario en la tabla');
      const path = 'UsuariosFirebase';
      const id =res.user.uid;
      this.uid = id;
      this.password = '';
      await this.firestore.createDoc(this.email,this.password,path.id)
      console.log('registrado en la tabla de usuarios con exito')


    }
      /*.then(() => {
        this.router.navigate(['/']); // Redirigir al home
      })*/
      /*.catch(error => {
        console.error(error);
      })*/

    


  }
}