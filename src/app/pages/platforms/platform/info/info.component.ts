import { UsersService } from 'src/app/services/users.service';
import { PlatformData } from 'src/app/interfaces/platform_data';
import { PlatformsService } from 'src/app/services/platforms.service';
import { Component, OnInit } from '@angular/core';
import { UserWishplatform } from 'src/app/interfaces/user_wishplatform';
import { UserPlatform } from 'src/app/interfaces/user_platform';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit{

  public platform!: PlatformData;
  
  public indexGame: number = 0;

  public userWishlistPlatform: UserWishplatform[] = [];

  public userCollectionPlatform: UserPlatform[] = [];

  get auth() {
    return this.authService.auth
  }
  constructor(
    private platformsService: PlatformsService,
    private usersService: UsersService,
    private authService: AuthService,
    ){
      this.platform = this.platformsService.platformData;
      console.log(this.platform);
  }
  ngOnInit(): void {
  }

  toggleToUserWishlist(event: Event){
    let button = event.target as HTMLElement;
    button.classList.add('checking');
    this.usersService.toggleToPlatformWishlist(this.platform.platform.id).subscribe({
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
        //TODO mostrar modal con mensaje de error.
      }
    });
  }

  toggleToUserCollection(event: Event){
    let button = event.target as HTMLElement;
    if(!button.classList.contains("checking")){
      button.classList.add('checking');
      this.usersService.toggleToPlatformCollection(this.platform.platform.id).subscribe({
        next: resp => {
          button.classList.remove('checking');
          if(resp.delete){
            this.platformsService.platformData.collection = resp.collection;
            button.classList.remove('erasable', 'checked');
            button.classList.remove('checked');
          }
          else{
            this.platformsService.platformData.collection = resp.collection;
            button.classList.add('checked');
          }
        },
        error: error => {
          button.classList.remove('checking');
          //TODO mostrar modal con mensaje de error.
        }
      });
    }
  }

  addDeleteClass(event: Event){
    let button = event.target as HTMLElement;
    if(button.classList.contains("checked") || button.classList.contains("checking")){
      button.classList.add('erasable')
    }
  }
  
}
