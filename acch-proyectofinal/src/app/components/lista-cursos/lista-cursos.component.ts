import { Component } from '@angular/core';
import { Curso } from '../../models/curso.model';
import { CursoService } from '../../services/curso.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardComponent } from '../card/card.component';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-lista-cursos',
  standalone: true,
  imports: [
    CardComponent,
    CommonModule,
    HeaderComponent,
    NgbModule,
    RouterModule
  ],
  templateUrl: './lista-cursos.component.html',
  styleUrl: './lista-cursos.component.scss'
})
export class ListaCursosComponent {
  cursos: Curso[] = [];

  constructor(private cursoService: CursoService) {
    this.cursoService.getCourses().subscribe(cursos => {
      this.cursos = cursos;
    });
  }
}
