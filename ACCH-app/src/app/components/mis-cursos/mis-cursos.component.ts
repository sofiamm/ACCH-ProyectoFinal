import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from '../banner/banner.component';
import { CardComponent } from '../card/card.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-mis-cursos',
  standalone: true,
  imports: [
    HeaderComponent,
    BannerComponent,
    CardComponent,
    CommonModule
  ],
  templateUrl: './mis-cursos.component.html',
  styleUrl: './mis-cursos.component.scss'
})
export class MisCursosComponent {
  cursos: string[] = ['Curso 1', 'Curso 2']; // Ejemplo de lista de cursos
  icon: string = 'notes';
  button: string = 'Ver calificaciones';

  titulo: string = 'Mis Cursos';
  contenido: string = 'Acá puedes encontrar todos tus cursos matriculados';
}
