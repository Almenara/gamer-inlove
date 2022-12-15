import { Observable, tap, map, catchError, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private _URLService:string = 'http://backendgamers.com';

  private _token!:string;

  private _user!:User;

  get user(){
    return this._user;
  }

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
    
    return this.http.post<any>(URLService,{user},{headers});

  }
  getProfile(): Observable<any>{
    
    const URLService = this._URLService + "/api/profile";
    
    this._token = this.getToken()!;

    let headers = new HttpHeaders();
    headers = headers.append('Acept', 'application/json');
    headers = headers.append('Authorization', `Bearer ${this._token}`);

    return this.http.get<User>(URLService,{ headers }).pipe(
      tap(resp => {
        if(resp){
          this._user = resp;
          console.log(this._user)
        }
      }));

  }
  getUserById(id: number): Observable<any>{
    
    const URLService = this._URLService + `/api/user/${id}`;

    let headers = new HttpHeaders();
    headers = headers.append('Acept', 'application/json');

    return this.http.get<any>(URLService,{ headers });

  }

}
