import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TwitchService } from './twitch.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameData } from '../interfaces/game_data';
import { RankingGames } from 'src/app/interfaces/ranking_games';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private _URLService: string = "http://backendgamers.com/"

  private _searching:Boolean = false;

  private _auth = this.authService.auth;

  public gameData!: GameData;

  constructor(
    private twitchTokenService: TwitchService, 
    private http: HttpClient,
    private authService: AuthService ) { }
  

  getGames(): Observable<GameData[]>{
    return this.http.get<GameData[]>(this._URLService + 'api/get10games');
  }

  getPopularGamesNow(): Observable<GameData[]>{
    return this.http.get<GameData[]>(this._URLService + 'api/games/get-popular-now');
  }
  getPopularGames(): Observable<RankingGames[]>{
    return this.http.get<RankingGames[]>(this._URLService + 'api/games/get-popular');
  }
  getWantedGames(): Observable<RankingGames[]>{
    return this.http.get<RankingGames[]>(this._URLService + 'api/games/get-wanted');
  }
  getExpensiveGames(): Observable<RankingGames[]>{
    return this.http.get<RankingGames[]>(this._URLService + 'api/games/get-expensive');
  }

  getGame(id: number): Observable<GameData>{
    let URLService = this._URLService + "api/game/detail/" + id; 
    let headers = new HttpHeaders();
    headers = headers.append('Acept', 'application/json');
    const body = { id }

    if(this._auth.ok){
      headers = headers.append('Authorization', `Bearer ${this.getToken()}`);
      URLService = this._URLService + "api/game/detailWithUserCollectionAndWishlistData/" + id; 
    }
    
    return this.http.get<GameData>(URLService, {headers});
  }

  getUpdateGameCollection(id: number): Observable<GameData>{
    let URLService = this._URLService + "api/game/detail/" + id; 
    let headers = new HttpHeaders();
    headers = headers.append('Acept', 'application/json');
    const body = { id }

    if(this._auth.ok){
      headers = headers.append('Authorization', `Bearer ${this.getToken()}`);
      URLService = this._URLService + "api/game/UserCollectionData/" + id; 
    }
    
    return this.http.get<GameData>(URLService, {headers});
  }
  getUpdateGameWishlist(id: number): Observable<GameData>{
    let URLService = this._URLService + "api/game/detail/" + id; 
    let headers = new HttpHeaders();
    headers = headers.append('Acept', 'application/json');
    const body = { id }

    if(this._auth.ok){
      headers = headers.append('Authorization', `Bearer ${this.getToken()}`);
      URLService = this._URLService + "api/game/UserWishlistData/" + id; 
    }
    
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
