import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { MatIcon } from '@angular/material/icon';
import { Evento } from '../../models/evento.model';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-evento',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    FormsModule,
    HeaderComponent,
    MatIcon,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule
  ],
  templateUrl: './evento.component.html',
  styleUrl: './evento.component.scss'
})
export class EventoComponent {
  evento: Evento = {
    nombre: '',
    profesor: '',
    descripcion: '',
    fecha: '',
    hora: ''
  };

  guardarCambios() {
    console.log('Evento actualizado:', this.evento);
  }
}
