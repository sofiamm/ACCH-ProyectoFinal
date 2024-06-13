import { Component } from '@angular/core';
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

export class ChatBotComponent {
  messages: string[] = [];
  userInput: string = '';

  //constructor(private chatService: ChatGptService) { }

  sendMessage(): void {
    if (this.userInput.trim() === '') {
      return;
    }

    this.messages.push('You: ' + this.userInput);
    /* this.chatService.sendMessage(this.userInput).subscribe(response => {
      this.messages.push('ChatGPT: ' + response.choices[0].text.trim());
    }); */

    this.userInput = '';
  }
}