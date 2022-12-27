import { Observable, tap, map, catchError, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { UserGame } from '../interfaces/user_game';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private _URLService:string = 'http://backendgamers.com';

  private _token!:string;

  public user!:User;

  

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
          this.user = resp;
        }
      }));

  }

  getUserCollection(id?: number): Observable<any>{
    
    const URLService = this._URLService + "/api/profile/collection";
    
    this._token = this.getToken()!;

    let headers = new HttpHeaders();
    headers = headers.append('Acept', 'application/json');
    headers = headers.append('Authorization', `Bearer ${this._token}`);

    return this.http.get<UserGame>(URLService,{ headers });

  }

  getUserById(id: number): Observable<any>{
    
    const URLService = this._URLService + `/api/user/${id}`;

    let headers = new HttpHeaders();
    headers = headers.append('Acept', 'application/json');

    return this.http.get<any>(URLService,{ headers });

  }

  editUser(user:User){

    const URLService = this._URLService + "/api/user/" + user.id;
    let headers = new HttpHeaders();
      
    headers = headers.append('Acept', 'application/json');
    headers = headers.append('Authorization', `Bearer ${localStorage.getItem('auth_token')}`);
    
    return this.http.put<User>(URLService,user,{headers});
  }

  editPassword(password: string, newpassword: string, id: number){

    const URLService = this._URLService + "/api/user/update-password/" + id;
    let headers = new HttpHeaders();
      
    headers = headers.append('Acept', 'application/json');
    headers = headers.append('Authorization', `Bearer ${localStorage.getItem('auth_token')}`);
    const data:Object = {
      password: password,
      newpassword: newpassword
    }
    return this.http.put<User>(URLService, data, {headers});
  }

  toggleToGameCollection(game_id: number , platform_id: number){
    const URLService = this._URLService + "/api/user/toggle-game-to-collection";
    let headers = new HttpHeaders();
      
    headers = headers.append('Acept', 'application/json');
    headers = headers.append('Authorization', `Bearer ${localStorage.getItem('auth_token')}`);
    const data:Object = {
      game_id: game_id,
      platform_id: platform_id
    }
    return this.http.post<any>(URLService, data, {headers});
  }
}
