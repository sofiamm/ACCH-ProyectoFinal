import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ChatBotComponent } from '../chat-bot/chat-bot.component';
import { BannerComponent } from '../banner/banner.component';

@Component({
  selector: 'app-preguntas',
  standalone: true,
  imports: [
    HeaderComponent,
    BannerComponent,
    MatExpansionModule,
    ChatBotComponent
  ],
  templateUrl: './preguntas.component.html',
  styleUrl: './preguntas.component.scss'
})
export class PreguntasComponent {
  titulo: string = 'Preguntas frecuentes';
  contenido: string = 'Acá puedes encontrar todas respuestas a nuestras preguntas frecuentas';
}
