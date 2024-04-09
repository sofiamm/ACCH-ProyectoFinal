import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { BannerComponent } from '../banner/banner.component';
import { HeaderComponent } from '../header/header.component';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [BannerComponent, HeaderComponent],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.scss'
})

export class ReportesComponent implements OnInit {
  titulo: string = 'Reportes del cuatrimestre';
  contenido: string = 'Acá puedes encontrar tus repostes destacados';

  public barChart: Chart | undefined;
  public lineChart: Chart | undefined;
  public pieChart: any;

  ngOnInit(): void {
    // ----- Datos para el gráfico de barras -----
    const barData = {
      labels: ['January', 'February', 'March', 'April'],
      datasets: [{
        label: 'Cantidad de alumnos que avanzaron de nivel en el último cuatrimestre',
        data: [65, 59, 80, 81],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)'
        ],
        borderWidth: 1
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
      },
    });

    // ----- Datos para el gráfico de líneas -----
    const lineData = {
      labels: ['January', 'February', 'March', 'April'],
      datasets: [{
        label: 'Alumnos matriculados en el último trimestre',
        data: [65, 59, 80, 81],
        fill: true,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };
    // Creamos la gráfica de líneas
    this.lineChart = new Chart("lineChart", {
      type: 'line' as ChartType, // tipo de la gráfica 
      data: lineData // datos 
    });

    // ----- Datos para el gráfico pastel -----
    const pieData = {
      labels: [
        'Curso 1',
        'Curso 2',
        'Curso 3',
        'Curso 4',
        'Curso 5'
      ],
      datasets: [{
        label: 'Alumnos matriculados por curosos',
        data: [11, 16, 7, 3, 14],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(75, 192, 192)',
          'rgb(255, 205, 86)',
          'rgb(201, 203, 207)',
          'rgb(54, 162, 235)'
        ]
      }]
    };

    // Creamos la gráfica de pastel
    this.pieChart = new Chart("pieChart", {
      type: 'pie' as ChartType, // tipo de la gráfica 
      data: pieData, // datos 
    });
  }
}