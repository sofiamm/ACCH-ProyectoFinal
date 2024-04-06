import { Component } from '@angular/core';
import { BannerComponent } from '../banner/banner.component';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [
    BannerComponent,
    CardComponent
  ],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.scss'
})
export class CursosComponent {

}
