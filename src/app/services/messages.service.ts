import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Message } from '../interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(
    private http: HttpClient,
    ) { }

  private _token!:string;
  private _URLService:string = environment.baseUrl;
  
  getToken() {
    return localStorage.getItem('auth_token');
  }
  sendMessage(message:Message){
      
    const URLService = message.conversation_id ? this._URLService + "/api/message/post_message/"+ message.conversation_id :  this._URLService + "/api/message/post_message" ;

    this._token = this.getToken()!;

    let headers = new HttpHeaders();
    headers = headers.append('Acept', 'application/json');
    headers = headers.append('Authorization', `Bearer ${this._token}`);

    return this.http.post<any>(URLService, message, { headers });
  }
}
