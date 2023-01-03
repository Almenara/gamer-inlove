import { ModalsService } from './services/modals.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gamer-inlove';
  
  get auth() {
    return this.authService.auth
  }

  constructor(private authService: AuthService, private modalsService: ModalsService){

  }
}
