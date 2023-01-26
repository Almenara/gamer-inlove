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
      
    const URLService = message.conversation ? this._URLService + "/api/message/postMessage"+ message.conversation :  this._URLService + "/api/message/postMessage/1" ;

    this._token = this.getToken()!;

    let headers = new HttpHeaders();
    headers = headers.append('Acept', 'application/json');
    headers = headers.append('Authorization', `Bearer ${this._token}`);

    return this.http.post<Message>(URLService, message, { headers });
  }
}
