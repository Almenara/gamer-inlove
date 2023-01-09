import { ActivatedRoute } from '@angular/router';
import { Component, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';


import { User } from 'src/app/interfaces/user';
import { ModalsService } from 'src/app/services/modals.service';
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

  private _user = this.usersService.user;

  get user(){
    return this._user;
  }

  constructor(
    private usersService:UsersService,
    private modalsService:ModalsService,
    ){ }

  ngOnInit(): void {
    this.usersService.getUserCollectionAndWishlist().subscribe({
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
  openCancelSaleGameModal(userGame:UserGame, event: Event){
    //TODO añadir modal de confirmación
    let button = event.target as HTMLElement;
    button.classList.add('checking');
    userGame.for_sale = 0,
    this.usersService.cancelGameForSale(userGame).subscribe({
      next: resp => {
        button.classList.remove('checking');
      },
      error: error =>{
        console.log(error)
        button.classList.remove('checking');
      }
    });
  }
  openCancelSalePlatformModal(userPlatform:UserPlatform, event: Event){
    //TODO añadir modal de confirmación
    let button = event.target as HTMLElement;
    button.classList.add('checking');
    userPlatform.for_sale = 0,
    this.usersService.cancelPlatformForSale(userPlatform).subscribe({
      next: resp => {
        button.classList.remove('checking');
      },
      error: error =>{
        console.log(error)
        button.classList.remove('checking');
      }
    });
  }
  openSoldOutGameModal(userGame:UserGame, event: Event){
    //TODO añadir modal de confirmación
    let button = event.target as HTMLElement;
    button.classList.add('checking');
    userGame.for_sale = 0,
    this.usersService.putGameSoldOut(userGame).subscribe({
      next: resp => {
        button.classList.remove('checking');
        this.gameCollection = this.gameCollection.filter( game => game.game_id != userGame.game_id)
      },
      error: error =>{
        console.log(error)
        button.classList.remove('checking');
      }
    });
  }
  openSoldOutPlatformModal(userPlatform:UserPlatform, event: Event){
    //TODO añadir modal de confirmación
    let button = event.target as HTMLElement;
    button.classList.add('checking');
    userPlatform.for_sale = 0,
    this.usersService.putPlatformSoldOut(userPlatform).subscribe({
      next: resp => {
        button.classList.remove('checking');
        this.platformCollection = this.platformCollection.filter( platform => platform.platform_id != userPlatform.platform_id)
      },
      error: error =>{
        console.log(error)
        button.classList.remove('checking');
      }
    });
  }
}
