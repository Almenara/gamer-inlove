import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, Subject, tap } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _URLService:string = environment.baseUrl;
  private _user!: User;
  private _auth: Auth = { ok: false }; 
  private _token!:string;

  userDataSubject = new Subject<User>();
  
  get user(){      
    return this._user;

  }

  set user(user: User){
    this._user = user;
  }

  get auth(){
    return this._auth;
  }

  set auth(auth: Auth){
    this._auth = auth;
  }

  get token(){
    return this._token;
  }

  set token(token:string){
    this._token = token;
  }

  constructor(private http: HttpClient, private router: Router) {
    if(localStorage.getItem('auth_token')){
      this._auth = { ok: true }
      this.validateToken()
    }
    if(!this.user){
      this.getProfile();
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
            this.auth = resp;
            localStorage.setItem('auth_token', this._auth.data?.accessToken!);
            this.getProfile();
          }
        }),
        map(resp => resp),
        catchError(resp => of(resp))
      );

  }
  getCacheUser(): Subject<User>{
   return this.userDataSubject;
  }
  getUserNotifications(){
    
  }
  getProfile(){
    if(this.auth.ok){
      if (!this.user?.id) {
        const URLService = this._URLService + "/api/profile";
        let headers = new HttpHeaders();
        
        headers = headers.append('Acept', 'application/json');
        headers = headers.append('Authorization', `Bearer ${localStorage.getItem('auth_token')}`);
        this.http.get<User>(URLService,{headers}).subscribe(data => {
          this.user = data;
          this.userDataSubject.next(this.user);
        });
      }
    }
  }

  getToken() {
    return localStorage.getItem('auth_token');
  }
  
  logout() {
    this.auth = { ok: false }
    localStorage.removeItem('auth_token');
    this.router.navigate(['/']);
    this.user = {
      id : undefined,
      name : undefined,
      surname : undefined,
      username : "",
      email : undefined,
      address : undefined,
      avatar : undefined,
      is_shop: false,
      user_notifications:[]

    };
  }

  validateToken(){
    if(localStorage.getItem('auth_token') && !this._auth.data){
      this.auth = { ok: true }
    
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
            this.auth = { ok: false }
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
