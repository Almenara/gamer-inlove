import { AuthService } from 'src/app/services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlatformData } from '../interfaces/platform_data';

@Injectable({
  providedIn: 'root'
})
export class PlatformsService {

  private _URLService: string = "http://backendgamers.com/"

  private _searching:Boolean = false;

  private _auth = this.authService.auth;

  public platformData!: PlatformData;

  constructor(
    private http: HttpClient,
    private authService: AuthService ) { }
  
  getPlatform(id: number): Observable<PlatformData>{
    console.log('logueado', this._auth.ok);
    let URLService = this._URLService + "api/platform/detail/" + id; 
    let headers = new HttpHeaders();
    headers = headers.append('Acept', 'application/json');
    const body = { id }

    if(this._auth.ok){
      headers = headers.append('Authorization', `Bearer ${this.getToken()}`);
      URLService = this._URLService + "api/platform/detailWithUserCollectionAndWishlistData/" + id; 
    }
    
    return this.http.get<PlatformData>(URLService, {headers});
  }

  getUpdatePlatformCollection(id: number): Observable<PlatformData>{
    let URLService = this._URLService + "api/platform/detail/" + id; 
    let headers = new HttpHeaders();
    headers = headers.append('Acept', 'application/json');
    const body = { id }

    if(this._auth.ok){
      headers = headers.append('Authorization', `Bearer ${this.getToken()}`);
      URLService = this._URLService + "api/platform/UserCollectionData/" + id; 
    }
    
    return this.http.get<PlatformData>(URLService, {headers});
  }
  getUpdatePlatformWishlist(id: number): Observable<PlatformData>{
    let URLService = this._URLService + "api/platform/detail/" + id; 
    let headers = new HttpHeaders();
    headers = headers.append('Acept', 'application/json');
    const body = { id }

    if(this._auth.ok){
      headers = headers.append('Authorization', `Bearer ${this.getToken()}`);
      URLService = this._URLService + "api/platform/UserWishlistData/" + id; 
    }
    
    return this.http.get<PlatformData>(URLService, {headers});
  }

  search(platformName:string){
    this._searching = true;
    document.querySelector('html')!.classList.add('searching');
    return this.http.get<PlatformData[]>(this._URLService + 'api/search/' + platformName);
  }

  getToken(){
    return localStorage.getItem('auth_token');
  }

  closeSearching(){
    this._searching = false;
    document.querySelector('html')!.classList.remove('searching');
  }

}
