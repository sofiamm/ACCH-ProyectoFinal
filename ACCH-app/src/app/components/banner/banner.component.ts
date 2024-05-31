import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent {
  @Input() tituloBanner: string = ''; // Declara la variable para almacenar el título
  @Input() contenidoBanner: string = ''; // Declara la variable para almacenar el contenido
}
