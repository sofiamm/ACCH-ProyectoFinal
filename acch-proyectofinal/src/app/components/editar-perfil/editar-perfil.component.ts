import { Component } from '@angular/core';
import { Usuario } from '../../models/usuario.model'; // Suponiendo que tienes un modelo de usuario
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { MatIcon } from '@angular/material/icon';
//import { AngularFireDatabase } from '@angular/fire/database'; // Importa AngularFireDatabase para interactuar con Firebase

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [
    FormsModule,
    HeaderComponent,
    MatIcon
  ],
  templateUrl: './editar-perfil.component.html',
  styleUrl: './editar-perfil.component.scss'
})
export class EditarPerfilComponent {
  usuario: Usuario = {
    nombre: 'Sofía',
    apellido: 'Mora',
    correoElectronico: 'somora@gmail.com',
    telefono: '+506 8456-8267',
    contrasena: '123',
    rol: 'alumno'
  };

  guardarCambios() {
    console.log('Perfil actualizado:', this.usuario);
  }
}


/* usuario: Usuario = {
  nombre: '',
  apellido: '',
  email: '',
  telefono: ''
};

constructor(private db: AngularFireDatabase) {} // Inyecta AngularFireDatabase en el constructor

guardarCambios() {
  // Agregar lógica para guardar los cambios del perfil en Firebase
  // Por ejemplo, puedes utilizar db.list('usuarios').push(this.usuario) para agregar el usuario a una lista 'usuarios' en la base de datos
  // Aquí debes manejar las promesas o observables según corresponda
  // Consulta la documentación de AngularFireDatabase para obtener más detalles: https://firebaseopensource.com/projects/angular/angularfire/
}
} */