import { TwitchToken } from '../interfaces/twitchToken.interface';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TwitchService {
  private client_id: string = "6ffwamznu9jjdfovt4eihez7fwdjue";

  private client_secret: string = "ifzlr086lx9eja4mg37euaics0a2yg";

  private URLService: string = `https://id.twitch.tv/oauth2/token?client_id=${this.client_id}&client_secret=${this.client_secret}&grant_type=client_credentials`;

  public twitchToken!: TwitchToken;

  constructor(private http: HttpClient) {
  }
  getToken(){
    return this.http.post<TwitchToken>(this.URLService, null)
  }
}
