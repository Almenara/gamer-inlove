import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';

import { Auth } from '../interfaces/auth';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _URLService:string = 'http://backendgamers.com';
  private _user!: User;
  private _auth: Auth = { ok: false }; 
  
  get user(){
    return this._user;
  }

  get auth(){
    return this._auth;
  }

  constructor(private http: HttpClient, private router: Router) {
    if(localStorage.getItem('auth_token')){
      this._auth = { ok: true }
      this.validateToken()
    }
  }

  login(email:string, password: string){
    
    const URLService = this._URLService + "/api/login";
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = { email, password }

    return this.http.post<Auth>(URLService,body,{headers})
      .pipe(
        tap(resp => {
          if(resp.ok){
            this._auth = resp;
            localStorage.setItem('auth_token', this._auth.data?.accessToken!);
          }
        }),
        map(resp => resp),
        catchError(resp => of(resp))
      );

  }

  getToken() {
    return localStorage.getItem('auth_token');
  }
  
  logout() {
    this._auth = { ok: false }
    localStorage.removeItem('auth_token');
    this.router.navigate(['/']);
  }

  validateToken(){
    if(localStorage.getItem('auth_token') && !this._auth.data){
      this._auth = { ok: true }
    
      const URLService = this._URLService + "/api/renew-token";
      let headers = new HttpHeaders();
      
      headers = headers.append('Acept', 'application/json');
      headers = headers.append('Authorization', `Bearer ${localStorage.getItem('auth_token')}`);
      
      this.http.get<Auth>(URLService,{headers}).subscribe({
        next: resp =>{
          if(resp.ok){
            this._auth = resp;
            localStorage.setItem('auth_token', this._auth.data?.accessToken!);
          }
          else{
            this._auth = { ok: false }
            localStorage.removeItem('auth_token');
          }
        },
        error: () =>{
          localStorage.removeItem('auth_token');
        }
      })
    }
    return localStorage.getItem('auth_token') ? true : false
  }

}
