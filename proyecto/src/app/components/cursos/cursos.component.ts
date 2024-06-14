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
  cursos: {nombre: string, descripcion: string, imagen:string }[] = [
    { nombre: 'Pre-Encuentro', descripcion: 'Descubriendo mis dones',imagen:'https://img.freepik.com/fotos-premium/gente-religiosa-adorando-cruz-reunion-abarrotada_901408-9485.jpg' },
    { nombre: 'Post-Encuentro', descripcion: 'Descubriendo mis dones',imagen:'https://img.freepik.com/fotos-premium/jesucristo-ensena-ninos-cristianismo-biblia-pecados_888396-7035.jpg' },
    { nombre: 'Escuela de lideres o Ministerios', descripcion: 'Desarrollo de discipulo y liderazgo',imagen:'https://img.freepik.com/foto-gratis/personas-sosteniendo-libros-tiro-medio_23-2150062136.jpg' },
    { nombre: 'INSTE Nivel 1 ', descripcion: 'Desarrollo de liderazgo en mi ministerio (Escuela de teología por extensión)',imagen:'https://img.freepik.com/foto-gratis/hombre-alto-angulo-tomando-notas_23-2150062180.jpg' },
    { nombre: 'INSTE Nivel 2 ', descripcion: 'Desarrollo de liderazgo en mi ministerio (Escuela de teología por extensión)',imagen:'https://img.freepik.com/foto-gratis/gente-tiro-medio-leyendo-juntos_23-2150062148.jpg' }
  ]
  icon: string = 'description';
  button: string = 'Matricular';
  actionButton: string = '/pagar';
  titulo: string = 'Bienvenido';
  contenido: string = 'Acá puedes encontrar todos los cursos disponibles';

}