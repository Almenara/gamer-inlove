import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TwitchToken } from './twitchToken.interface';
import { TwitchService } from './twitch.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private URLService: string = "https://api.igdb.com/v4/platforms/?Client-ID=6ffwamznu9jjdfovt4eihez7fwdjue&Authorization=bearer d3h9t6rrelkfmfhwls6ak0yubrok06"

  private twitchToken!: TwitchToken;
  private headers = new HttpHeaders()
  .set("Client-ID", "6ffwamznu9jjdfovt4eihez7fwdjue")
  .set('Access-Control-Allow-Methods', "POST")
  .set('Access-Control-Allow-Headers', 'Authorization')
  .set('Access-Control-Allow-Origin', 'http://localhost:4200/')
  .set("Content-Type", "application/json")
  .set("Authorization", "bearer d3h9t6rrelkfmfhwls6ak0yubrok06");
  //
  private query = "fields *; fields platform_logo.*; limit 10;";

  private requestOptions = {
     method: 'POST',
     headers: this.headers,
     body: this.query,
     redirect: 'follow',
     mode: 'no-cors'
  };

  constructor(private twitchTokenService: TwitchService, private http: HttpClient ) { 
   // this.getToken()
    console.log('hola',this.headers)
  }
  
  getGames(){
     return this.http.post(this.URLService,this.query,this.requestOptions)
  }

  getToken(){
    this.twitchTokenService.getToken().subscribe(resp => {
      this.twitchToken = resp;
      console.log(this.twitchToken.access_token);
      this.headers.set("Authorization", `${this.twitchToken.token_type} ${this.twitchToken.access_token}`);
      
    })
  }
  
}
