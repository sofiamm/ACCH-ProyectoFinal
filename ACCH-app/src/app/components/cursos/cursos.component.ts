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
  titulo = 'Listado de Cursos';  // Definimos la propiedad titulo
  contenido = 'Aquí puedes encontrar una variedad de cursos disponibles.';  // Definimos la propiedad contenido
  cursos = [
    {
      nombre: 'Pre-Encuentro',
      descripcion: 'Descubriendo mis dones',
      button: 'Matricular',
      icon: 'school',
      imageUrl: 'https://unsplash.com/es/fotos/mujer-rezando-qYanN54gIrI.jpg',
      action: 'preEncuentro'
    },
    {
      nombre: 'Post-Encuentro',
      descripcion: 'Descubriendo mis dones',
      button: 'Matricular',
      icon: 'school',
      imageUrl: 'https://example.com/path/to/post-encuentro.jpg',
      action: 'postEncuentro'
    },
    {
      nombre: 'Escuela de Líderes Ministerios',
      descripcion: 'Desarrollo de discípulo y liderazgo',
      button: 'Matricular',
      icon: 'school',
      imageUrl: 'https://example.com/path/to/escuela-de-lideres.jpg',
      action: 'escuelaLideres'
    },
    {
      nombre: 'INSTE Nivel 1',
      descripcion: `Desarrollo de liderazgo en mi ministerio
(Escuela de teología por extensión)`,
      button: 'Matricular',
      icon: 'school',
      imageUrl: 'https://example.com/path/to/inste-nivel1.jpg',
      action: 'insteNivel1'
    },
    {
      nombre: 'INSTE Nivel 2',
      descripcion: `Desarrollo de liderazgo en mi ministerio
(Escuela de teología por extensión)`,
      button: 'Matricular',
      icon: 'school',
      imageUrl: 'https://example.com/path/to/inste-nivel2.jpg',
      action: 'insteNivel2'
    }
  ];

  preEncuentro() {
    console.log('Pre-Encuentro matriculado');
  }

  postEncuentro() {
    console.log('Post-Encuentro matriculado');
  }

  escuelaLideres() {
    console.log('Escuela de Líderes matriculado');
  }

  insteNivel1() {
    console.log('INSTE Nivel 1 matriculado');
  }

  insteNivel2() {
    console.log('INSTE Nivel 2 matriculado');
  }

  handleAction(action: string) {
    switch(action) {
      case 'preEncuentro':
        this.preEncuentro();
        break;
      case 'postEncuentro':
        this.postEncuentro();
        break;
      case 'escuelaLideres':
        this.escuelaLideres();
        break;
      case 'insteNivel1':
        this.insteNivel1();
        break;
      case 'insteNivel2':
        this.insteNivel2();
        break;
    }
  }
}
