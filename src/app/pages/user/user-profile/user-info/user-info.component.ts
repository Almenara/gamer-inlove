import { Game } from 'src/app/interfaces/game';
import { Component, Injectable, OnInit } from '@angular/core';

import { ModalsService } from 'src/app/services/modals.service';
import { UserGame } from 'src/app/interfaces/user_game';
import { UsersService } from 'src/app/services/users.service';
import { UserWishgame } from 'src/app/interfaces/user_wishgame';
import { UserWishplatform } from 'src/app/interfaces/user_wishplatform';
import { UserPlatform } from 'src/app/interfaces/user_platform';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
@Injectable() 
export class UserInfoComponent implements OnInit {

  public gameCollection!: UserGame[];
  public gameWishlist!: UserWishgame[];
  public platformCollection!: UserPlatform[];
  public platformWishlist!: UserWishplatform[];


  public forRemove!: UserGame | UserWishgame | UserPlatform | UserWishplatform;
  public forRemoveType: string =  "";
  public message: string =  "";

  private _user = this.usersService.user;

  get user(){
    return this._user;
  }

  constructor(
    private usersService:UsersService,
    private modalsService:ModalsService,
    private modalService: NgbModal
    ){ }

  ngOnInit(): void {
    this.usersService.getUserCollectionAndWishlist().subscribe({
      next: resp => {
        this.gameCollection = resp.gameCollection;
        this.gameWishlist = resp.gameWishlist;
        this.platformCollection = resp.platformCollection;
        this.platformWishlist = resp.platformWishlist;
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

  removeElement(confirm: any, forRemove: UserGame | UserWishgame | UserPlatform | UserWishplatform, objInterface: string){
    this.forRemove = forRemove;
    switch (objInterface) {
      case 'UserGame' :
        this.forRemoveType = 'UserGame';
        if('game' in forRemove && typeof forRemove.game === 'object'){
            this.message = `Are you sure you want to remove ${forRemove.game?.name} from your collection?`
        }         
        break;
      case 'UserWishgame' :
        this.forRemoveType = 'UserWishgame';
        if('game' in forRemove && typeof forRemove.game === 'object'){
            this.message = `Are you sure you want to remove ${forRemove.game?.name} from your wishlist?`
        }     
        break;
      case 'UserPlatform' :
        this.forRemoveType = 'UserPlatform';
        this.message = `Are you sure you want to remove ${forRemove.platform?.name} from your collection?`
        break;
      case 'UserWishplatform' :
        this.forRemoveType = 'UserWishplatform';
        this.message = `Are you sure you want to remove ${forRemove.platform?.name} from your wishlist?`
        break;
    }
    
    this.modalService.open(confirm);
  }

  confirmRemove(){
    switch (this.forRemoveType) {
      case 'UserGame' :
        if('game' in this.forRemove && typeof this.forRemove.game === 'object'){
          let id = this.forRemove.game.id
          this.usersService.toggleToGameCollection(this.forRemove.game_id, this.forRemove.platform_id).subscribe({
            next: resp => {
              this.gameCollection = this.gameCollection.filter( game => game.game_id != id)
              this.modalService.dismissAll();
            },
            error: error => {
              console.log(error);
            }
          })
        }
        break;
      case 'UserWishgame' :
        if('game' in this.forRemove && typeof this.forRemove.game === 'object'){
          let id = this.forRemove.game.id
          this.usersService.toggleToGameWishlist(this.forRemove.game_id, this.forRemove.platform_id).subscribe({
            next: resp => {
              this.gameWishlist = this.gameWishlist.filter( game => game.game_id != id)
              this.modalService.dismissAll();
            },
            error: error => {
              console.log(error);
            }
          })
        }
        break;
      case 'UserPlatform' :
        this.usersService.toggleToPlatformCollection(this.forRemove.platform_id).subscribe({
          next: resp => {
            this.platformCollection = this.platformCollection.filter( platform => platform.platform_id != this.forRemove.platform_id)
            this.modalService.dismissAll();
          },
          error: error => {
            console.log(error);
          }
        })
        break;
      case 'UserWishplatform' :
        this.usersService.toggleToPlatformWishlist(this.forRemove.platform_id).subscribe({
          next: resp => {
            this.platformWishlist = this.platformWishlist.filter( platform => platform.platform_id != this.forRemove.platform_id)
            this.modalService.dismissAll();
          },
          error: error => {
            console.log(error);
          }
        })
        break;
    }
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
