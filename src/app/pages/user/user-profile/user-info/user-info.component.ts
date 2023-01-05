import { ModalsService } from './../../../../services/modals.service';

import { ActivatedRoute } from '@angular/router';
import { Component, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { UserGame } from 'src/app/interfaces/user_game';
import { UsersService } from 'src/app/services/users.service';
import { UserWishgame } from 'src/app/interfaces/user_wishgame';
import { UserWishplatform } from 'src/app/interfaces/user_wishplatform';
import { UserPlatform } from 'src/app/interfaces/user_platform';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
@Injectable() 
export class UserInfoComponent implements OnInit {

  public gameCollection!: UserGame[];
  public gameWishlist!: UserWishgame[];
  public platformCollection!: UserPlatform[];
  public platformWishlist!: UserWishplatform[];

  private _user = this.userService.user;

  get user(){
    return this._user;
  }

  constructor(
    private userService:UsersService,
    private modalsService:ModalsService,
    ){ }

  ngOnInit(): void {
    this.userService.getUserCollectionAndWishlist().subscribe({
      next: resp => {
        this.gameCollection = resp.gameCollection;
        this.gameWishlist = resp.gameWishlist;
        this.platformCollection = resp.platformCollection;
        this.platformWishlist = resp.platformWishlist;
        console.log(resp)
      },
      error: error => {
        console.log(error);
      }
    })
  }
  openAddressModal(){
    this.modalsService.openModal('address');
  }
  openSellGameModal(userGame:UserGame){
    this.modalsService.openModal('sell-game', userGame);
  }
  openSellPlatformModal(userPlatform:UserPlatform){
    this.modalsService.openModal('sell-platform', userPlatform);
  }
  openCancelSaleGameModal(userGame:UserGame){
    this.modalsService.openModal('sell-game', userGame);
  }
  openCancelSalePlatformModal(userPlatform:UserPlatform){
    this.modalsService.openModal('sell-platform', userPlatform);
  }
  openSoldOutGameModal(userGame:UserGame){
    this.modalsService.openModal('confirmation', userGame);
  }
  openSoldOutPlatformModal(userPlatform:UserPlatform){
    this.modalsService.openModal('confirmation', userPlatform);
  }
}
