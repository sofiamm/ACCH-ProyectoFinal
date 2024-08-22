import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { BannerComponent } from '../banner/banner.component';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-calificaciones',
  standalone: true,
  imports: [
    HeaderComponent,
    BannerComponent,
    MatIcon
  ],
  templateUrl: './calificaciones.component.html',
  styleUrl: './calificaciones.component.scss'
})
export class CalificacionesComponent {
  titulo: string = 'Mis Calificaciones';
  contenido: string = 'Acá puedes encontrar todas las calificaciones de tus cursos matriculados';
}
