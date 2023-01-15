import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

import { UserWishgame } from 'src/app/interfaces/user_wishgame';
import { UsersService } from 'src/app/services/users.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-game-wishlist',
  templateUrl: './user-game-wishlist.component.html',
  styleUrls: ['./user-game-wishlist.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class UserGameWishlistComponent  implements OnInit {

  public gameCollection!: UserWishgame[];

  @ViewChild('loader', {static: false}) private loader!: ElementRef<HTMLDivElement>;
  public nextPageUrl: string = "";
  public loadingMoreContent: boolean = true;

  private _user = this.usersService.user;


  public forRemove!: UserWishgame;
  public message: string = '';


  get user(){
    return this._user;
  }

  constructor(
    private usersService:UsersService,
    private modalService: NgbModal,
    ){ }

  ngOnInit(): void {
    this.usersService.getUserWishlist().subscribe({
      next: resp => {
        this.gameCollection = resp.data;
        this.nextPageUrl = resp.next_page_url;
      },
      error: error => {
        console.log(error);
      }
    })
  }
  nextPage(){
    this.loadingMoreContent = false;
    if(this.nextPageUrl && this.nextPageUrl != ""){
      this.usersService.getUserWishlist(this.nextPageUrl).subscribe(resp => {
        {
          resp.data.map((game: any) => this.gameCollection.push(game));
          this.nextPageUrl = resp.next_page_url
          
          if(this.nextPageUrl) 
            this.loadingMoreContent = true;
        }
      })
    }
  }

  removeElement(confirm: any, forRemove: UserWishgame){
    this.forRemove = forRemove;
    this.message = `Are you sure you want to remove ${forRemove.game?.name} from your collection?`
    this.modalService.open(confirm);
  }

  confirmRemove(){
    if('game' in this.forRemove && typeof this.forRemove.game === 'object'){
      let id = this.forRemove.game.id
      this.usersService.toggleToGameWishlist(this.forRemove.game_id, this.forRemove.platform_id).subscribe({
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
