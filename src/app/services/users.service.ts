import { LaravelPostTokenService } from './laravel-post-token.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private _URLService:string = 'http://backendgamers.com';

  private _token:string | null = null;

  constructor(
    private http: HttpClient, 
    public router: Router 
  ) { 
 
  }
  getToken() {
    return localStorage.getItem('auth_token');
  }

  postRegister(user:any): Observable<any>{
    let URLService = this._URLService + "/api/users";
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    //const formData = new FormData().entries();
    
    console.log(headers);
    return this.http.post<any>(URLService,{user},{headers});

  }
  getProfile(): Observable<any>{
    
    const user:any = localStorage.getItem('user');
    const userObj = JSON.parse(user);
    this._token = userObj.data.token.accessToken;
    console.log(this._token)
    if(!this._token) this.router.navigate(['/login']);
      
    let URLService = this._URLService + "/api/profile";
    let headers = new HttpHeaders();
    headers = headers.append('Acept', 'application/json');
    headers = headers.append('Authorization', `Bearer ${this._token}`);
    console.log(headers);

    return this.http.get<any>(URLService,{headers: headers});

  }



}
