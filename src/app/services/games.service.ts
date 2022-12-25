import { AuthService } from 'src/app/services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TwitchToken } from './twitchToken.interface';
import { TwitchService } from './twitch.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../interfaces/game';
import { GameData } from '../interfaces/user_game copy';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private _URLService: string = "http://backendgamers.com/"

  private _searching:Boolean = false;

  private _auth = this.authService.auth;

  private twitchToken!: TwitchToken;

  public game!: Game;

  constructor(
    private twitchTokenService: TwitchService, 
    private http: HttpClient,
    private authService: AuthService ) { }
  

  getGames(): Observable<GameData[]>{
    return this.http.get<GameData[]>(this._URLService + 'api/get10games');
  }

  getGame(id: number): Observable<GameData>{
    let URLService = this._URLService + "api/game/detail/" + id; 
    let headers = new HttpHeaders();
    headers = headers.append('Acept', 'application/json');
    const body = { id }

    if(this._auth.ok){
      headers = headers.append('Authorization', `Bearer ${this.getToken()}`);
      URLService = this._URLService + "api/game/detailWithUserCollectionData/" + id; 
    }
    console.log(URLService);
    //URLService = this._URLService + "api/game/detail/" + id; 
    console.log(headers);
    return this.http.get<GameData>(URLService, {headers});
  }

  search(gameName:string){
    this._searching = true;
    document.querySelector('html')!.classList.add('searching');
    return this.http.get<GameData[]>(this._URLService + 'api/search/' + gameName);
  }

  getToken(){
    return localStorage.getItem('auth_token');
  }

  closeSearching(){
    this._searching = false;
    document.querySelector('html')!.classList.remove('searching');
  }

}
