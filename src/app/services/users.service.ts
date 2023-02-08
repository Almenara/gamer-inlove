import { Observable, tap, Subject, Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Address } from 'src/app/interfaces/user';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';
import { UserGame } from '../interfaces/user_game';
import { UserPlatform } from '../interfaces/user_platform';
import { UserWishplatform } from '../interfaces/user_wishplatform';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private _URLService:string = environment.baseUrl;

  public userDataSubject:Subscription = this.authService.getCacheUser().subscribe();

  private userProfileSubject = new Subject<User>();

  private _token!:string;

  private _user!:User;

//  private _userProfile!:User;
  

  get user(){
    return this._user;
  }
  
  set user(user: User){
    this._user = user;
  }

  getUserProfile(): Subject<User>{
    return this.userProfileSubject;
  }

  

  constructor(
    private http: HttpClient, 
    private authService: AuthService,
    public router: Router 
  ) { 
  }

  getToken() {
    return localStorage.getItem('auth_token');
  }

  postRegister(user:User): Observable<User>{

    let URLService = this._URLService + "/api/users";
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    
    return this.http.post<User>(URLService,{user},{headers});

  }

  addAddress(address: Address){
    const URLService = this._URLService + "/api/address/add" ;

    this._token = this.getToken()!;

    let headers = new HttpHeaders();
    headers = headers.append('Acept', 'application/json');
    headers = headers.append('Authorization', `Bearer ${this._token}`);

    return this.http.post<any>(URLService, address, { headers }).pipe(
      tap(resp => {
        if(resp){
          if(!this.user)
            this.user = this.authService.user;
            this.user.address = resp.data;
            this.authService.user = this.user;
        }
      })
    );
  }

  getProfile(): Observable<User>{
    
    const URLService = this._URLService + "/api/profile";
    
    this._token = this.getToken()!;

    let headers = new HttpHeaders();
    headers = headers.append('Acept', 'application/json');
    headers = headers.append('Authorization', `Bearer ${this._token}`);

    return this.http.get<User>(URLService,{ headers }).pipe(
      tap(resp => {
        if(resp){
          this.user = resp;
          this.userProfileSubject.next(resp);
        }
      }));

  }

  newUserAddress(user:User){
    const URLService = this._URLService + "/api/address/new" + user.id;

    this._token = this.getToken()!;

    let headers = new HttpHeaders();
    headers = headers.append('Acept', 'application/json');
    headers = headers.append('Authorization', `Bearer ${this._token}`);

    return this.http.get<User>(URLService,{ headers });
  }

  getUserCollection(url?: null | string, idUser?: null|number): Observable<any>{
    
    let URLService = url? url : this._URLService + "/api/profile/collection";
    if(idUser)
      URLService = url? url : this._URLService + `/api/user/${idUser}/collection`;
    
    this._token = this.getToken()!;

    let headers = new HttpHeaders();
    headers = headers.append('Acept', 'application/json');
    headers = headers.append('Authorization', `Bearer ${this._token}`);

    return this.http.get<UserGame>(URLService,{ headers });

  }
  
  getUserForSale(url?: null | string, idUser?: null|number): Observable<any>{
    
    let URLService = url? url : this._URLService + "/api/profile/for-sale";
    if(idUser)
      URLService = url? url : this._URLService + `/api/user/${idUser}/for-sale`;

    this._token = this.getToken()!;

    let headers = new HttpHeaders();
    headers = headers.append('Acept', 'application/json');
    headers = headers.append('Authorization', `Bearer ${this._token}`);

    return this.http.get<UserGame>(URLService,{ headers });

  }
  getUserWishlist(url?: null | string, idUser?: null|number): Observable<any>{
    
    let URLService = url? url : this._URLService + "/api/profile/wishlist";
    if(idUser)
      URLService = url? url : this._URLService + `/api/user/${idUser}/wishlist`;
    
    this._token = this.getToken()!;

    let headers = new HttpHeaders();
    headers = headers.append('Acept', 'application/json');
    headers = headers.append('Authorization', `Bearer ${this._token}`);

    return this.http.get<UserGame>(URLService,{ headers });

  }
  getUserPlatformCollection(url?: string): Observable<any>{
    
    const URLService = url? url : this._URLService + "/api/profile/platform-collection";
    
    this._token = this.getToken()!;

    let headers = new HttpHeaders();
    headers = headers.append('Acept', 'application/json');
    headers = headers.append('Authorization', `Bearer ${this._token}`);

    return this.http.get<UserPlatform>(URLService,{ headers });

  }
  getUserPlatformForSale(url?: string): Observable<any>{
    
    const URLService = url? url : this._URLService + "/api/profile/platform-for-sale";
    
    this._token = this.getToken()!;

    let headers = new HttpHeaders();
    headers = headers.append('Acept', 'application/json');
    headers = headers.append('Authorization', `Bearer ${this._token}`);

    return this.http.get<UserPlatform>(URLService,{ headers });

  }
  getUserPlatformWishlist(url?: string): Observable<any>{
    
    const URLService = url? url : this._URLService + "/api/profile/platform-wishlist";
    
    this._token = this.getToken()!;

    let headers = new HttpHeaders();
    headers = headers.append('Acept', 'application/json');
    headers = headers.append('Authorization', `Bearer ${this._token}`);

    return this.http.get<UserWishplatform>(URLService,{ headers });

  }

  getUserCollectionAndWishlist(id?: number): Observable<any>{
    
    let URLService = this._URLService + "/api/profile/collection-and-wishlist";
    if(id) URLService = this._URLService + `/api/user/${id}/collection-and-wishlist`;
    
    this._token = this.getToken()!;

    let headers = new HttpHeaders();
    headers = headers.append('Acept', 'application/json');
    headers = headers.append('Authorization', `Bearer ${this._token}`);
    
    //TODO entender porque esto no funciona ->   return this.http.get<[collection: UserGame, wishList: UserWishgame]>(URLService,{ headers });
    
    return this.http.get<any>(URLService,{ headers });

  }
  getUserAllForSale(id?: number): Observable<any>{
    
    let URLService = this._URLService + "/api/profile/all-for-sale";
    if(id) URLService = this._URLService + `/api/user/${id}/all-for-sale`;
    
    this._token = this.getToken()!;

    let headers = new HttpHeaders();
    headers = headers.append('Acept', 'application/json');
    headers = headers.append('Authorization', `Bearer ${this._token}`);
    
    //TODO entender porque esto no funciona ->   return this.http.get<[collection: UserGame, wishList: UserWishgame]>(URLService,{ headers });
    
    return this.http.get<any>(URLService,{ headers });

  }
  getUserById(id: number): Observable<User>{
    
    const URLService = this._URLService + `/api/user/${id}`;

    let headers = new HttpHeaders();
    headers = headers.append('Acept', 'application/json');

    return this.http.get<User>(URLService,{ headers }).pipe(
      tap(resp => {
        if(resp){
          this.user = resp;
          this.userProfileSubject.next(resp);
        }
      })
    );

  }

  editUser(user:User){

    const URLService = this._URLService + "/api/user/" + user.id;
    let headers = new HttpHeaders();
      
    headers = headers.append('Acept', 'application/json');
    headers = headers.append('Authorization', `Bearer ${localStorage.getItem('auth_token')}`);
    
    return this.http.put<any>(URLService,user,{headers}).pipe(
      tap(resp => {
        this.user = resp.user;
        this.userProfileSubject.next(resp.user);
        this.authService.userDataSubject.next(resp.user);
      }));
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

  editAddress(address: Address){
    const URLService = this._URLService + "/api/address/update" ;

    this._token = this.getToken()!;

    let headers = new HttpHeaders();
    headers = headers.append('Acept', 'application/json');
    headers = headers.append('Authorization', `Bearer ${this._token}`);

    return this.http.put<Address>(URLService, address, { headers }).pipe(
      tap(resp => {
        if(resp){
          this.user.address = resp;
          this.userProfileSubject.next(this.user);
        }
      }));
  }

  putGameForSale(userGame:UserGame){
    
    const URLService = this._URLService + "/api/user/game-for-sale";
    let headers = new HttpHeaders();
      
    headers = headers.append('Acept', 'application/json');
    headers = headers.append('Authorization', `Bearer ${localStorage.getItem('auth_token')}`);

    return this.http.post<UserGame>(URLService, userGame, {headers});
  }

  putGameSoldOut(userGame:UserGame){
    
    const URLService = this._URLService + "/api/user/game-sold-out";
    let headers = new HttpHeaders();
      
    headers = headers.append('Acept', 'application/json');
    headers = headers.append('Authorization', `Bearer ${localStorage.getItem('auth_token')}`);

    return this.http.post<UserGame>(URLService, userGame, {headers});
  }

  cancelGameForSale(userGame:UserGame){
    
    const URLService = this._URLService + "/api/user/game-for-sale";
    let headers = new HttpHeaders();
      
    headers = headers.append('Acept', 'application/json');
    headers = headers.append('Authorization', `Bearer ${localStorage.getItem('auth_token')}`);

    return this.http.post<UserGame>(URLService, userGame, {headers});
  }
  
  putPlatformForSale(userPlatform:UserPlatform){
    
    const URLService = this._URLService + "/api/user/platform-for-sale";
    let headers = new HttpHeaders();
      
    headers = headers.append('Acept', 'application/json');
    headers = headers.append('Authorization', `Bearer ${localStorage.getItem('auth_token')}`);

    return this.http.post<UserPlatform>(URLService, userPlatform, {headers});
  }
  
  putPlatformSoldOut(userPlatform:UserPlatform){
    
    const URLService = this._URLService + "/api/user/platform-sold-out";
    let headers = new HttpHeaders();
      
    headers = headers.append('Acept', 'application/json');
    headers = headers.append('Authorization', `Bearer ${localStorage.getItem('auth_token')}`);

    return this.http.post<UserPlatform>(URLService, userPlatform, {headers});
  }

  cancelPlatformForSale(userPlatform:UserPlatform){
    
    const URLService = this._URLService + "/api/user/platform-for-sale";
    let headers = new HttpHeaders();
      
    headers = headers.append('Acept', 'application/json');
    headers = headers.append('Authorization', `Bearer ${localStorage.getItem('auth_token')}`);

    return this.http.post<UserPlatform>(URLService, userPlatform, {headers});
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

  toggleToGameWishlist(game_id: number , platform_id: number){
    const URLService = this._URLService + "/api/user/toggle-game-to-wishlist";
    let headers = new HttpHeaders();
      
    headers = headers.append('Acept', 'application/json');
    headers = headers.append('Authorization', `Bearer ${localStorage.getItem('auth_token')}`);
    const data:Object = {
      game_id: game_id,
      platform_id: platform_id
    }
    return this.http.post<any>(URLService, data, {headers});
  }

  toggleToPlatformCollection(platform_id: number){
    const URLService = this._URLService + "/api/user/toggle-platform-to-collection";
    let headers = new HttpHeaders();
      
    headers = headers.append('Acept', 'application/json');
    headers = headers.append('Authorization', `Bearer ${localStorage.getItem('auth_token')}`);
    const data:Object = {
      platform_id: platform_id
    }
    return this.http.post<any>(URLService, data, {headers});
  }

  toggleToPlatformWishlist( platform_id: number){
    const URLService = this._URLService + "/api/user/toggle-platform-to-wishlist";
    let headers = new HttpHeaders();
      
    headers = headers.append('Acept', 'application/json');
    headers = headers.append('Authorization', `Bearer ${localStorage.getItem('auth_token')}`);
    const data:Object = {
      platform_id: platform_id
    }
    return this.http.post<any>(URLService, data, {headers});
  }
}
