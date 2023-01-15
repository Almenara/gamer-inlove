import { UserWishplatform } from 'src/app/interfaces/user_wishplatform';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

import { ModalsService } from 'src/app/services/modals.service';
import { UsersService } from 'src/app/services/users.service';
import { UserPlatform } from 'src/app/interfaces/user_platform';

@Component({
  selector: 'app-user-platform-wishlist',
  templateUrl: './user-platform-wishlist.component.html',
  styleUrls: ['./user-platform-wishlist.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class UserPlatformWishlistComponent implements OnInit {

  public platformWishlist!: UserWishplatform[];

  @ViewChild('loader', {static: false}) private loader!: ElementRef<HTMLDivElement>;
  public nextPageUrl: string = "";
  public loadingMoreContent: boolean = true;

  private _user = this.usersService.user;

  public forRemove!: UserWishplatform;
  public message: string = '';

  get user(){
    return this._user;
  }

  constructor(
    private usersService:UsersService,
    private modalService: NgbModal,
    ){ }

  ngOnInit(): void {
    this.usersService.getUserPlatformWishlist().subscribe({
      next: resp => {
        console.log(resp);
        this.platformWishlist = resp.data;
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
      this.usersService.getUserPlatformWishlist(this.nextPageUrl).subscribe(resp => {
        {
          resp.data.map((platform: any) => this.platformWishlist.push(platform));
          this.nextPageUrl = resp.next_page_url
          
          if(this.nextPageUrl) 
            this.loadingMoreContent = true;
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


  removeElement(confirm: any, forRemove: UserWishplatform){
    this.forRemove = forRemove;
    this.message = `Are you sure you want to remove ${forRemove.platform?.name} from your wishlist?`
    this.modalService.open(confirm);
  }

  confirmRemove(){
    this.usersService.toggleToPlatformWishlist(this.forRemove.platform_id).subscribe({
      next: resp => {
        this.platformWishlist = this.platformWishlist.filter( platform => platform.platform_id != this.forRemove.platform_id)
      },
      error: error => {
        console.log(error);
      }
    })
  }
}
