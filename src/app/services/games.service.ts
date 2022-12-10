import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TwitchToken } from './twitchToken.interface';
import { TwitchService } from './twitch.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private URLService: string = "http://backendgamers.com/"

  private _searching:Boolean = false;

  private twitchToken!: TwitchToken;

  constructor(private twitchTokenService: TwitchService, private http: HttpClient ) { 
   // this.getToken()
  }
  
  getGames(): Observable<any[]>{
    return this.http.get<any[]>(this.URLService + 'getallgames');
  }
  searchGames(gameName:string){
    this._searching = true;
    document.querySelector('html')!.classList.add('searching');
    return this.http.get<any[]>(this.URLService + 'searchgames/'+gameName);
  }
  getToken(){
    this.twitchTokenService.getToken().subscribe(resp => {
      this.twitchToken = resp;
      console.log(this.twitchToken.access_token);         
    })
  }
  closeSearching(){
    this._searching = false;
    document.querySelector('html')!.classList.remove('searching')    ;
  }
}
