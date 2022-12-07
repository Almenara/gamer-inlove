import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TwitchToken } from './twitchToken.interface';
import { TwitchService } from './twitch.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private URLService: string = "http://backendgamers.com/getallgames"

  private twitchToken!: TwitchToken;

  constructor(private twitchTokenService: TwitchService, private http: HttpClient ) { 
   // this.getToken()
  }
  
  getGames(): Observable<any[]>{
     return this.http.get<any[]>(this.URLService)
  }

  getToken(){
    this.twitchTokenService.getToken().subscribe(resp => {
      this.twitchToken = resp;
      console.log(this.twitchToken.access_token);
            
    })
  }
  
}
