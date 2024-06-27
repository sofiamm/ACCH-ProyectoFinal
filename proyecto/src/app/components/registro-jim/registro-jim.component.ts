import { Component } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { register } from 'module';

@Component({
  selector: 'app-registro-jim',
  standalone: true,
  imports: [],
  templateUrl: './registro-jim.component.html',
  styleUrl: './registro-jim.component.scss'
})
export class RegistroJimComponent {

  datos : Usuario = {
       // id?: string; // Identificador único del usuario (opcional, ya que Firebase proporciona su propio ID)
   // nombre: string;
   // apellido: string;
   uid: '',
   email: '',
   contraseña: '',
  // telefono: string;
   perfil : 'estudiante'
  }

  constructor() {
   // ngOnInit(){}
    //register(){}

  }




}
