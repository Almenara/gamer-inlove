import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private _URLService:string = 'http://backendgamers.com';

  private _token!:string;

  constructor(
    private http: HttpClient, 
    public router: Router 
  ) { }
  getToken() {
    return localStorage.getItem('auth_token');
  }

  postRegister(user:any): Observable<any>{

    let URLService = this._URLService + "/api/users";
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    
    console.log(headers);
    return this.http.post<any>(URLService,{user},{headers});

  }
  getProfile(): Observable<any>{
    
    const URLService = this._URLService + "/api/profile";
    
    this._token = this.getToken()!;

    let headers = new HttpHeaders();
    headers = headers.append('Acept', 'application/json');
    headers = headers.append('Authorization', `Bearer ${this._token}`);

    return this.http.get<any>(URLService,{ headers });

  }

}
