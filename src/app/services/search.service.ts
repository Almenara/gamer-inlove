import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GameData } from '../interfaces/game_data';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private _URLService: string = "http://backendgamers.com/"

  private _searching:Boolean = false;

  constructor(
    private http: HttpClient,
    ) { }

    search(query:string){
      this._searching = true;
      document.querySelector('html')!.classList.add('searching');
      return this.http.get<GameData[]>(this._URLService + 'api/search/' + query);
    }
    nextPage(urlNext:string){
      this._searching = true;
      document.querySelector('html')!.classList.add('searching');
      return this.http.get<GameData[]>(urlNext);
    }

}
