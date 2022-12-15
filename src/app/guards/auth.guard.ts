import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, CanMatch, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad, CanMatch {

  constructor(
    private authService: AuthService,
    private router: Router
   ){}

  canActivate(): Observable<boolean> | boolean{
    if(!this.authService.validateToken()) this.router.navigate(['/login']);
    return this.authService.validateToken();
  }
  canMatch(): Observable<boolean> | boolean{
    if(!this.authService.validateToken()) this.router.navigate(['/login']);
    return this.authService.validateToken();
  }
  canLoad(): Observable<boolean> | boolean{
    if(!this.authService.validateToken()) this.router.navigate(['/login']);
    return this.authService.validateToken();
  }

  
}
