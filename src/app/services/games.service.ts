import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, tap, map, catchError, of, Subject } from 'rxjs';

import { environment } from 'src/environments/environment';
import { GameData } from '../interfaces/game_data';
import { RankingGames } from 'src/app/interfaces/ranking_games';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GamesService{

  private _URLService: string = environment.baseUrl;

  private _searching:Boolean = false;

  private _auth = this.authService.auth;

  public gameData!: GameData;
  public gameDataSubject = new Subject<GameData>();

  constructor(
    private http: HttpClient,
    private authService: AuthService 
    ) { 
      this.authService.authOkSubject.subscribe( ok => this._auth.ok = ok ? true : false )
  }

  getGames(): Observable<GameData[]>{
    return this.http.get<GameData[]>(this._URLService + '/api/get10games');
  }
  getPopularGamesNow(): Observable<RankingGames[]>{
    return this.http.get<RankingGames[]>(this._URLService + '/api/games/get-popular-now');
  }
  getPopularGames(): Observable<RankingGames[]>{
    return this.http.get<RankingGames[]>(this._URLService + '/api/games/get-popular');
  }
  getWantedGames(): Observable<RankingGames[]>{
    return this.http.get<RankingGames[]>(this._URLService + '/api/games/get-wanted');
  }
  getExpensiveGames(): Observable<RankingGames[]>{
    return this.http.get<RankingGames[]>(this._URLService + '/api/games/get-expensive');
  }

  getGame(id: number): Observable<GameData>{
    let URLService = this._URLService + "/api/game/detail/" + id; 
    let headers = new HttpHeaders();
    headers = headers.append('Acept', 'application/json');
    if(this._auth.ok){
      headers = headers.append('Authorization', `Bearer ${this.getToken()}`);
      URLService = this._URLService + "/api/game/detailWithUserCollectionAndWishlistData/" + id; 
    }
    
    return this.http.get<GameData>(URLService, {headers})
      .pipe(
        tap(resp => {
          if(resp){
            this.gameData = resp;
            this.gameDataSubject.next(resp);
          }
        }),
        map(resp => resp),
        catchError(resp => of(resp))
      );
  }

  getNextPageGamesForSale(url:string){
    let URLService = url; 
    let headers = new HttpHeaders();
    headers = headers.append('Acept', 'application/json');
    if(this._auth.ok){
      headers = headers.append('Authorization', `Bearer ${this.getToken()}`);
      URLService = url; 
    }
    
    return this.http.get<any>(URLService, {headers})
  }

  getUpdateGameCollection(id: number): Observable<GameData>{
    let URLService = this._URLService + "/api/game/detail/" + id; 
    let headers = new HttpHeaders();
    headers = headers.append('Acept', 'application/json');
    const body = { id }

    if(this._auth.ok){
      headers = headers.append('Authorization', `Bearer ${this.getToken()}`);
      URLService = this._URLService + "/api/game/UserCollectionData/" + id; 
    }
    
    return this.http.get<GameData>(URLService, {headers});
  }
  getUpdateGameWishlist(id: number): Observable<GameData>{
    let URLService = this._URLService + "/api/game/detail/" + id; 
    let headers = new HttpHeaders();
    headers = headers.append('Acept', 'application/json');
    const body = { id }

    if(this._auth.ok){
      headers = headers.append('Authorization', `Bearer ${this.getToken()}`);
      URLService = this._URLService + "/api/game/UserWishlistData/" + id; 
    }
    
    return this.http.get<GameData>(URLService, {headers});
  }

  getToken(){
    return localStorage.getItem('auth_token');
  }

  closeSearching(){
    this._searching = false;
    document.querySelector('html')!.classList.remove('searching');
  }

}
