import { Component, OnInit } from '@angular/core';
import { ChatGptService } from '../../services/chatgpt.service';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-chat-bot',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    CdkScrollable,
    MatButtonModule,
    MatTooltipModule,
    MatIcon
  ],
  templateUrl: './chat-bot.component.html',
  styleUrl: './chat-bot.component.scss'
})

export class ChatBotComponent implements OnInit {
  usuarioLogeado : any
  nuevoMensaje: string = "";
  mensajes: any =[
    {
      emisor:"id",
      texto:"Hola que tal?"
    },
    {
      emisor:"id",
      texto:"Hola que tal?"
    },
    {
      emisor:"id",
      texto:"todo bn y vos"
    },
    {
      emisor:"id",
      texto:"todo bien"
    },
    {
      emisor:"id",
      texto:"Que bueno"
    }
  ]
  constructor() { }

  ngOnInit(): void {

  }

  enviarMensaje() {
    console.log(this.nuevoMensaje);
    this.nuevoMensaje = "";

  }
}