import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { PreguntasComponent } from './components/preguntas/preguntas.component';
import { MisCursosComponent } from './components/mis-cursos/mis-cursos.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ChatBotComponent } from './components/chat-bot/chat-bot.component';
import { PasarelaPagosComponent } from './components/pasarela-pagos/pasarela-pagos.component';
import { CalificacionesComponent } from './components/calificaciones/calificaciones.component';
import { EditarPerfilComponent } from './components/editar-perfil/editar-perfil.component';
import { EventoComponent } from './components/evento/evento.component';
import { InstructoresComponent } from './instructores/instructores.component';

export const routes: Routes = [
    { path: '', component: InicioComponent }, // Ruta por defecto
    { path: 'registro', component: RegistroComponent },
    { path: 'perfil', component: PerfilComponent },
    { path: 'cursos', component: CursosComponent },
    { path: 'reportes', component: ReportesComponent },
    { path: 'ayuda', component: PreguntasComponent },
    { path: 'mis-cursos', component: MisCursosComponent },
    { path: 'calendario', component: CalendarioComponent },
    { path: 'chat-bot', component: ChatBotComponent },
    { path: 'pagar', component: PasarelaPagosComponent },
    { path: 'calificaciones', component: CalificacionesComponent },
    { path: 'editar', component: EditarPerfilComponent },
    { path: 'evento', component: EventoComponent },
    { path: 'instructores', component: InstructoresComponent },
  ];
