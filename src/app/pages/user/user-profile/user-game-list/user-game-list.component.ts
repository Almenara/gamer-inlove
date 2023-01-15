import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

import { ModalsService } from 'src/app/services/modals.service';
import { UserGame } from 'src/app/interfaces/user_game';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-game-list',
  templateUrl: './user-game-list.component.html',
  styleUrls: ['./user-game-list.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class UserGameListComponent implements OnInit {

  public gameCollection!: UserGame[];

  @ViewChild('loader', {static: false}) private loader!: ElementRef<HTMLDivElement>;
  public nextPageUrl: string = "";
  public loadingMoreContent: boolean = true;

  private _user = this.usersService.user;

  public forRemove!: UserGame;
  public message: string = '';

  get user(){
    return this._user;
  }

  constructor(
    private usersService:UsersService,
    private modalsService:ModalsService,
    private modalService: NgbModal,
    ){ }

  ngOnInit(): void {
    this.usersService.getUserCollection().subscribe({
      next: resp => {
        console.log(resp);
        this.gameCollection = resp.data;
        this.nextPageUrl = resp.next_page_url;
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
  removeElement(confirm: any, forRemove: UserGame){
    this.forRemove = forRemove;
    this.message = `Are you sure you want to remove ${forRemove.game?.name} from your collection?`
    this.modalService.open(confirm);
  }
  confirmRemove(){
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
  }
  @HostListener('document.scroll', ['$event'])
  loadNextPage(event: Event):void {
    if (this.loader && this.loadingMoreContent){
      let rect = this.loader.nativeElement.getBoundingClientRect();
      let topShown = rect.top <= window.innerHeight;
      if(topShown) this.nextPage();
    }
  }
}
