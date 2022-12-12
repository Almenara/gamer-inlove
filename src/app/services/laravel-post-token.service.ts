import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LaravelPostTokenService {

  public postToken!: string;
  private _URLService: string = 'http://backendgamers.com/getposttoken';

  constructor( private http: HttpClient) {
    let headers = new HttpHeaders();

    this.http.get<string>(`${this._URLService}`,{headers:headers})
      .subscribe(resp => {
        console.log(resp)
        //return (resp.results)
       this.postToken = resp;
      })
   }
}
