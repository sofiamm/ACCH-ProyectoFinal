import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from '../banner/banner.component';
import { CardComponent } from '../card/card.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [
    BannerComponent,
    CardComponent,
    HeaderComponent,
    CommonModule
  ],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.scss'
})
export class CursosComponent {
  cursos: string[] = ['Curso 1', 'Curso 2', 'Curso 3', 'Curso 4', 'Curso 5']; // Ejemplo de lista de cursos
  icon: string = 'description';
  button: string = 'Matricular';
  actionButton: string = '/pagar';


  titulo: string = 'Bienvenido';
  contenido: string = 'Acá puedes encontrar todos los cursos disponibles';
}
