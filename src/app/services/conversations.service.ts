import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { pipe, tap } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../interfaces/user';
import { Conversation } from '../interfaces/conversation';
import { Message } from '../interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class ConversationsService {

  private _URLService: string = environment.baseUrl;

  private _user: User = this.authService.user;
  get user(){
    return this._user;
  }



  private _conversations!: Conversation[];
  set conversations(conversations: Conversation[]){
    this._conversations = conversations;
  }
  get conversations(){
    return this._conversations;
  }


  private _messages!: Message[];
  set messages(messages: Message[]){
    this._messages = messages;
  }
  get messages(){
    return this._messages;
  }


  constructor(
    private authService: AuthService,
    private http: HttpClient, 
    ) {
    
  }

  getAllActiveConversations(){

    const URLService = this._URLService + "/api/profile/conversation/get-all-active";
    let headers = new HttpHeaders();
      
    headers = headers.append('Acept', 'application/json');
    headers = headers.append('Authorization', `Bearer ${localStorage.getItem('auth_token')}`);

    return this.http.get<any>(URLService, {headers}).pipe(
      tap(resp => {
        this.conversations = resp;
      }));

  }
  getChat(id: Number){

    const URLService = this._URLService + "/api/profile/conversation/" + id;
    let headers = new HttpHeaders();
      
    headers = headers.append('Acept', 'application/json');
    headers = headers.append('Authorization', `Bearer ${localStorage.getItem('auth_token')}`);

    return this.http.get<any>(URLService, {headers}).pipe(
      tap(resp => {
        this.messages = resp;
      }));

  }

}
