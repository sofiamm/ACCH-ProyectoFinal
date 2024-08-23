import { Component, OnInit } from '@angular/core';
import { Curso } from '../../models/curso.model';
import { CursoService } from '../../services/curso.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardComponent } from '../card/card.component';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { firstValueFrom } from 'rxjs';

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
export class ListaCursosComponent implements OnInit {
  user = localStorage.getItem('usuario') ? JSON.parse(localStorage.getItem('usuario') || '') : null;
  id = this.user.id;
  cursos: Curso[] = [];
  cursosDisponibles: Curso[] = [];

  constructor(
    private cursoService: CursoService,
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadCursos();
  }

  redirectToPay(courseId: string) {
    localStorage.setItem('selectedCourse', courseId);
    this.router.navigate(['/pagar']);
  }

  async loadCursos() {
    try {
      this.cursoService.getCourses().subscribe(async cursos => {
        const allCourses = this.cursoService.getCourses();
        const userData = await this.usuarioService.getUserId(this.id);
        const cursosInscritos = userData?.cursos_inscritos || [];
        this.cursos = (await firstValueFrom(allCourses)).filter(curso =>
          !cursosInscritos.some(inscrito =>
            inscrito.id === curso.id &&
            inscrito.nombre === curso.nombre &&
            inscrito.imagen === curso.imagen
          )
        );
      });
    } catch (error) {
      console.error('Error loading courses:', error);
    }
  }
}
