import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';

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
export class PerfilComponent implements OnInit {

  user = localStorage.getItem('usuario') ? JSON.parse(localStorage.getItem('usuario') || '') : null;
  id = this.user.id;
  userTmp: Usuario | null = null;
  defaultImg = "https://i.pinimg.com/474x/31/ec/2c/31ec2ce212492e600b8de27f38846ed7.jpg"

  constructor(public router: Router, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.loadUserData();
  }

  private async loadUserData(): Promise<void> {
    try {
      this.userTmp = await this.usuarioService.getUserId(this.id);
      if (this.userTmp != null || this.userTmp != undefined) {
        this.userTmp.nombre = this.userTmp.nombre || this.userTmp.apellido;
        this.userTmp.imagen = this.userTmp.imagen || this.defaultImg;
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
}
