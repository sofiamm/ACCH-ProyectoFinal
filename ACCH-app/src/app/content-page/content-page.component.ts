import { Component } from '@angular/core';
import { CardComponent } from '../components/card/card.component';

@Component({
  selector: 'app-content-page',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './content-page.component.html',
  styleUrl: './content-page.component.scss'
})
export class ContentPageComponent {

}
