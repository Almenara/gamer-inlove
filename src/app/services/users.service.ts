import { LaravelPostTokenService } from './laravel-post-token.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private _URLService:string = 'http://backendgamers.com';

  private csrf_token: string = 'XSlI8pl8Qsc5edwUSghj3LDrs1Id8wN10b5IKhmB';

  constructor(private http: HttpClient, private postTokenService: LaravelPostTokenService) { 
    //this.csrf_token = postTokenService.postToken;

 
  }


  postRegister(user:any): Observable<any>{
    let URLService = this._URLService + "/api/users";
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    //const formData = new FormData().entries();
    
    console.log(headers);
    return this.http.post<any>(URLService,{data: user},{headers});

  }

}
