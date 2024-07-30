import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chart, ChartData, ChartOptions, ChartType } from 'chart.js/auto';
import { BannerComponent } from '../banner/banner.component';
import { HeaderComponent } from '../header/header.component';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { BehaviorSubject } from 'rxjs';
import { Curso } from '../../models/curso.model';
import { CursoService } from '../../services/curso.service';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [BannerComponent, HeaderComponent, MatCard, MatCardHeader, MatCardContent, MatCardTitle],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.scss'
})

export class ReportesComponent implements OnInit {
  usuarios: Usuario[] = [];
  totalUsuarios: number = 0;

  cursos: Curso[] = [];
  totalCursos: number = 0;

  private totalAdminSubject = new BehaviorSubject<number>(0);
  totalAdmin = this.totalAdminSubject.asObservable();

  private totalAlumnoSubject = new BehaviorSubject<number>(0);
  totalAlumno = this.totalAlumnoSubject.asObservable();

  private totalInstructorSubject = new BehaviorSubject<number>(0);
  totalInstructor = this.totalInstructorSubject.asObservable();

  public barChart: Chart | undefined;


  constructor(private usuarioService: UsuarioService, private cursoService: CursoService) {
    this.usuarioService.getUsers().subscribe(usuarios => {
      this.usuarios = usuarios;
      this.totalUsuarios = usuarios.length;
      this.calculateTotales(usuarios);
    });

    this.cursoService.getCourses().subscribe(cursos => {
      this.totalCursos = cursos.length;
    });
  }

  private calculateTotales(usuarios: Usuario[]) {
    const totalAdmin = usuarios.filter(usuario => usuario.rol === 'admin').length;
    const totalAlumno = usuarios.filter(usuario => usuario.rol === 'alumno').length;
    const totalInstructor = usuarios.filter(usuario => usuario.rol === 'instructor').length;

    this.totalAdminSubject.next(totalAdmin);
    this.totalAlumnoSubject.next(totalAlumno);
    this.totalInstructorSubject.next(totalInstructor);
  }

  averageSessionDuration = '2m 30s';
  dailyVisitors = [100, 120, 150, 180];
  deviceDistribution = {
    mobile: 60,
    desktop: 30,
    tablet: 10
  };

  // Datos de ejemplo para el gráfico
  lineChartData: ChartData<'line', number[], string> = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    datasets: [{
      label: "Cursos",
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1

    }]
  };

  // Configuraciones del gráfico
  lineChartOptions: ChartOptions<'line'> = {
    responsive: true
  };

  ngOnInit(): void {
    // Crear el gráfico utilizando Chart.js
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: this.lineChartData,
      options: this.lineChartOptions
    });

    // ----- Datos para el gráfico de barras -----
    this.totalAdmin.subscribe(totalAdmin => {
      this.totalAlumno.subscribe(totalAlumno => {
        this.totalInstructor.subscribe(totalInstructor => {
          this.ngOnDestroy();
          const barData = {
            labels: ['Admin', 'Alumno', 'Instructor'],
            datasets: [{
              label: "Usuarios",
              data: [totalAdmin, totalAlumno, totalInstructor]
            }]
          };

          // Creamos la gráfica de barras
          this.barChart = new Chart("barChart", {
            type: 'bar' as ChartType, // tipo de la gráfica 
            data: barData, // datos 
            options: { // opciones de la gráfica 
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });
        });
      });
    });
  }

  ngOnDestroy(): void {
    if (this.barChart) {
      this.barChart.destroy();
    }
  }
}
