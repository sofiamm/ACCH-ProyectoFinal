import { Component, OnInit} from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';

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
export class PasarelaPagosComponent implements OnInit{
  cursoSeleccionado: String = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.cursoSeleccionado = params['curso'];
    });
  }
}
