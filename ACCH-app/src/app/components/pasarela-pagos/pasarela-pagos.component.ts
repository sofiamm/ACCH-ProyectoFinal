import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-pasarela-pagos',
  standalone: true,
  imports: [
    HeaderComponent,
    MatDividerModule,
    MatIcon
  ],
  templateUrl: './pasarela-pagos.component.html',
  styleUrl: './pasarela-pagos.component.scss'
})
export class PasarelaPagosComponent {

}
