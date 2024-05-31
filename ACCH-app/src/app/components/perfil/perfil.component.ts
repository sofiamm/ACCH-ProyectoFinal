import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    HeaderComponent,
    MatIcon
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent {
  email: string = "somora@gmail.com";
}
