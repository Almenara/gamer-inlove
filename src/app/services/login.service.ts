import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private issuer = {
    login: 'http://backendgamers.com/api/login',
    register: 'http://backendgamers.com/api/register',
  };
  private _URLService:string = 'http://backendgamers.com';
  constructor(private http: HttpClient) {}

  login(email:string, password: string): Observable<any>{
    let URLService = this._URLService + "/api/login";
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    //const formData = new FormData().entries();
    
    return this.http.post<any>(URLService,{email, password},{headers});

  }
  getToken() {
    return localStorage.getItem('auth_token');
  }
  // Verify the token
  isValidToken() {
    const token = this.getToken();
    if (token) {
      return true;
    } else {
      return false;
    }
  }
  // User state based on valid token
  isLoggedIn() {
    return this.isValidToken();
  }
  // Remove token
  removeToken() {
    localStorage.removeItem('auth_token');
  }
}
