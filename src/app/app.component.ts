import { OpenMenuService } from './services/open-menu.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'My Game Lore - Compelete your videogame collection!';
  
  get auth() {
    return this.authService.auth;
  }
  constructor(
    private authService: AuthService
    ){

  }
}
