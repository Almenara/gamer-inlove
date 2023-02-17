
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

import { ModalsService } from 'src/app/services/modals.service';
import { UserGame } from 'src/app/interfaces/user_game';
import { UsersService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/user';
import { UserWishgame } from 'src/app/interfaces/user_wishgame';
import { UserWishplatform } from 'src/app/interfaces/user_wishplatform';
import { UserPlatform } from 'src/app/interfaces/user_platform';

@Component({
  selector: 'app-user-game-list',
  templateUrl: './user-game-list.component.html',
  styleUrls: ['./user-game-list.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class UserGameListComponent implements OnInit {


  private _userProfile!: User;

  public gameCollection!: UserGame[];
  public gameWishlist!: UserWishgame[];
  public platformCollection!: UserWishplatform[];
  public platformWishlist!: UserWishplatform[];
  public title = "My game collection";

  public forRemove!: UserGame | UserWishgame | UserPlatform | UserWishplatform;
  public forRemoveType: string =  "";
  public message: string =  "";


  @ViewChild('loader', {static: false}) private loader!: ElementRef<HTMLDivElement>;
  public nextPageUrl: string = "";
  public loadingMoreContent: boolean = false;

  public product: string = "";
  public filter: string = "";

  public id:number = 0;

  public userLoggedProfile: boolean = false;

  get auth() {
    return this.authService.auth;
  }

  get user(){
    return this.authService.user;
  }

  set userPorfile(user: User){
    this._userProfile = user;
  }


  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private modalsService: ModalsService,
    private modalService: NgbModal,
    private route: ActivatedRoute
    ){
      this.product = this.route.snapshot.data['product'];
      this.filter = this.route.snapshot.data['filter'];
      
      this.route.paramMap.subscribe((params: ParamMap) => {
      
        let param = params.get('idSlug');

        if(param){
          this.userLoggedProfile = false;
          this.id = Number(param.split("-", 1))
        }
        else{
          this.userLoggedProfile = true;
        }
        this.getProductList(this.id);

      });
    }

  ngOnInit(): void {
  }

  getProductList(id: number){
    switch(this.product + "|" + this.filter){
      case "game|collection":
        this.usersService.getUserCollection(null, id).subscribe({
          next: resp => {
            this.title = "My game collection";
            this.gameCollection = resp.data;
            this.nextPageUrl = resp.next_page_url;
            this.loadingMoreContent = this.nextPageUrl ? true: false;
          },
          error: error => {
            //TODO arlerta
            console.log(error);
          }
        })
        break;
      case "game|wishlist":
        this.usersService.getUserWishlist(null, id).subscribe({
          next: resp => {
            this.title = "My Wishlist";
            this.gameCollection = resp.data;
            this.nextPageUrl = resp.next_page_url;
            this.loadingMoreContent = this.nextPageUrl ? true: false;
          },
          error: error => {
            //TODO arlerta
            console.log(error);
          }
        })
        break;
      case "game|for-sale":
        this.usersService.getUserForSale(null, id).subscribe({
          next: resp => {
            this.title = "My games for sale";
            this.gameCollection = resp.data;
            this.nextPageUrl = resp.next_page_url;
            this.loadingMoreContent = this.nextPageUrl ? true: false;
          },
          error: error => {
            //TODO arlerta
            console.log(error);
          }
        })
        break;
      default:
        break;
    }
  }

  openAddressModal(){
    this.modalsService.openModal('address');
  }

  openSellGameModal(userGame:UserGame){
    this.modalsService.openModal('sell-game', userGame);
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

  openContactModal(userGame:UserGame){
    this.modalsService.openModal('contact', userGame);
  }
  
  openLoginModal(){
    this.modalsService.openModal('log-in');
  }

  nextPage(){
    this.loadingMoreContent = false;
    if(this.nextPageUrl && this.nextPageUrl != ""){
      this.usersService.getUserCollection(this.nextPageUrl).subscribe(resp => {
        {
          resp.data.map((game: any) => this.gameCollection.push(game));
          this.nextPageUrl = resp.next_page_url
          
          if(this.nextPageUrl) 
            this.loadingMoreContent = true;
        }
      })
    }
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

  @HostListener('document:scroll', ['$event'])
  loadNextPage(event: Event):void {
    if (this.loader && this.loadingMoreContent){
      let rect = this.loader.nativeElement.getBoundingClientRect();
      let topShown = rect.top <= window.innerHeight;
      if(topShown) this.nextPage();
    }
  }

}
