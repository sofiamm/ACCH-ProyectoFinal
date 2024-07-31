import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { InicioComponent } from './components/inicio/inicio.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { PreguntasComponent } from './components/preguntas/preguntas.component';
import { MisCursosComponent } from './components/mis-cursos/mis-cursos.component';
import { RegistroComponent } from './components/registro/registro.component';
import { PasarelaPagosComponent } from './components/pasarela-pagos/pasarela-pagos.component';
import { CalificacionesComponent } from './components/calificaciones/calificaciones.component';
import { EditarPerfilComponent } from './components/editar-perfil/editar-perfil.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { VistaCursoComponent } from './components/vista-curso/vista-curso.component';
import { ListaCursosComponent } from './components/lista-cursos/lista-cursos.component';

export const routes: Routes = [
  { path: '', component: ListaCursosComponent }, // Ruta por defecto
  { path: 'cursos', component: CursosComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'registro', component: RegistroComponent },
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard], data: { roles: ['admin', 'alumno', 'instructor'] } },
  { path: 'inicio', component: InicioComponent },
  { path: 'reportes', component: ReportesComponent, canActivate: [AuthGuard], data: { roles: ['admin', 'alumno', 'instructor'] } },
  { path: 'ayuda', component: PreguntasComponent, canActivate: [AuthGuard], data: { roles: ['admin', 'alumno', 'instructor'] } },
  { path: 'mis-cursos', component: MisCursosComponent, canActivate: [AuthGuard], data: { roles: ['admin', 'alumno', 'instructor'] } },
  { path: 'pagar', component: PasarelaPagosComponent, canActivate: [AuthGuard], data: { roles: ['admin', 'alumno', 'instructor'] } },
  { path: 'calificaciones', component: CalificacionesComponent, canActivate: [AuthGuard], data: { roles: ['admin', 'alumno', 'instructor'] } },
  { path: 'editar', component: EditarPerfilComponent, canActivate: [AuthGuard], data: { roles: ['admin', 'alumno', 'instructor'] } },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'vista-curso/:id', component: VistaCursoComponent, canActivate: [AuthGuard], data: { roles: ['admin', 'alumno', 'instructor'] } },
  { path: 'lista-cursos', component: ListaCursosComponent, canActivate: [AuthGuard], data: { roles: ['admin', 'alumno'] } },
];
