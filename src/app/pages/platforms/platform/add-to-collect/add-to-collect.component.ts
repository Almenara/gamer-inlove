import { UsersService } from 'src/app/services/users.service';
import { Component, OnInit } from '@angular/core';
import { PlatformsService } from 'src/app/services/platforms.service';
import { PlatformData } from 'src/app/interfaces/platform_data';
import { UserWishplatform } from 'src/app/interfaces/user_wishplatform';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-add-to-collect',
  templateUrl: './add-to-collect.component.html',
  styleUrls: ['./add-to-collect.component.scss']
})
export class AddToCollectComponent implements OnInit{

  private _platform!: PlatformData;

  public userWishlist: UserWishplatform[] | undefined = [];

  get platform(){
    return this._platform;
  }
  set platform(platform: PlatformData){
    this._platform = platform;
  }

  get auth() {
    return this.authService.auth
  }

  constructor(
    private usersService: UsersService,
    private platformsService: PlatformsService,
    private authService: AuthService,
    private alertService: AlertService
    ){
      this.platform = this.platformsService.platformData;

      if(this.platform.collection){
        this.userWishlist = this.platform.wishlist;
      }

    }
  
  ngOnInit(): void {
    
  }

  toggleToUserWishlist(platformId:number, event: Event){
    let button = event.target as HTMLElement;
    button.classList.add('checking');
    this.usersService.toggleToGameWishlist(this.platform.platform.id, platformId).subscribe({
      next: resp => {
        button.classList.remove('checking');
        if(resp.delete){
          this.platformsService.platformData.wishlist = resp.wishlist;
          button.classList.remove('erasable');
          button.classList.remove('checked');
        }
        else{
          this.platformsService.platformData.wishlist = resp.wishlist;
          button.classList.add('checked');
        }
      },
      error: error => {
        button.classList.remove('checking');
        this.alertService.error('There was an error, please try again later.', { keepAfterRouteChange: true, autoClose: true });
      }
    });
  }

  addDeleteClass(event: Event){
    let button = event.target as HTMLElement;
    if(button.classList.contains("checked") || button.classList.contains("checking")){
      button.classList.add('erasable')
    }
  }
}
