import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { GameData } from '../interfaces/game_data';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private _URLService: string = environment.baseUrl;

  private _searching:Boolean = false;

  constructor(
    private http: HttpClient,
    ) { }

    search(query:string){
      this._searching = true;
      document.querySelector('html')!.classList.add('searching');
      return this.http.get<GameData[]>(this._URLService + '/api/search/' + query);
    }
    nextPage(urlNext:string){
      this._searching = true;
      document.querySelector('html')!.classList.add('searching');
      return this.http.get<GameData[]>(urlNext);
    }

}
