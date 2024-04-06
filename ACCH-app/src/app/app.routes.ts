import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { PreguntasComponent } from './components/preguntas/preguntas.component';
import { MisCursosComponent } from './components/mis-cursos/mis-cursos.component';
import { CalendarioComponent } from './components/calendario/calendario.component';

export const routes: Routes = [
    { path: '', component: InicioComponent }, // Ruta por defecto
    { path: 'perfil', component: PerfilComponent },
    { path: 'cursos', component: CursosComponent },
    { path: 'reportes', component: ReportesComponent },
    { path: 'ayuda', component: PreguntasComponent },
    { path: 'mis-cursos', component: MisCursosComponent },
    { path: 'calendario', component: CalendarioComponent },

  ];
