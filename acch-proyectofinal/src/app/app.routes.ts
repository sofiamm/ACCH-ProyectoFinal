import { Routes } from '@angular/router';
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
import { ChatBotComponent } from './components/chat-bot/chat-bot.component';
import { IngresoComponent } from './ingreso/ingreso.component';

export const routes: Routes = [
    { path: '', component: CursosComponent }, // Ruta por defecto
    { path: 'cursos', component: CursosComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'perfil', component: PerfilComponent },
    { path: 'inicio', component: InicioComponent },
    { path: 'reportes', component: ReportesComponent },
    { path: 'ayuda', component: PreguntasComponent },
    { path: 'mis-cursos', component: MisCursosComponent },
    { path: 'pagar', component: PasarelaPagosComponent },
    { path: 'calificaciones', component: CalificacionesComponent },
    { path: 'editar', component: EditarPerfilComponent },
    { path: 'usuarios', component: UsuariosComponent },
    { path: 'chat-bot', component: ChatBotComponent },
    { path: 'ingreso', component: IngresoComponent },
  ];
