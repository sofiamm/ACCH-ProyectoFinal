import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ChatGptService {
  private apiUrl = 'https://api.openai.com/v1/engines/davinci/completions';
  private apiKey = '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'; // Reemplazar con la clave de API

  constructor(private http: HttpClient) { }

  sendMessage(message: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.apiKey}`);

    return this.http.post<any>(this.apiUrl, { prompt: message }, { headers });
  }
}
