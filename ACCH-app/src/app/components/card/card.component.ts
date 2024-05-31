import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() tituloCard: string = ''; // Declara la variable para almacenar el título
  @Input() icon: string = '';
  @Input() button: string = '';
  @Input() actionButton: string = '';
}
