import { Platform } from 'src/app/interfaces/platform';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

import { ModalsService } from 'src/app/services/modals.service';
import { UsersService } from 'src/app/services/users.service';
import { UserPlatform } from 'src/app/interfaces/user_platform';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-platform-list',
  templateUrl: './user-platform-list.component.html',
  styleUrls: ['./user-platform-list.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class UserPlatformListComponent implements OnInit {

  public platformCollection!: UserPlatform[];

  @ViewChild('loader', {static: false}) private loader!: ElementRef<HTMLDivElement>;
  public nextPageUrl: string = "";
  public loadingMoreContent: boolean = true;

  private _user = this.usersService.user;

  public userType: string = "";
  public product: string = "";
  public filter: string = "";

  public forRemove!: UserPlatform;
  public message: string = '';

  get user(){
    return this._user;
  }

  constructor(
    private usersService:UsersService,
    private modalsService:ModalsService,
    private modalService: NgbModal,
    private route: ActivatedRoute
    ){ 
      this.userType = this.route.snapshot.data['user'];
      this.product = this.route.snapshot.data['product'];
      this.filter = this.route.snapshot.data['filter'];
  }

  ngOnInit(): void {

    switch(this.product + "|" + this.filter){

      case "platform|collection":
        this.usersService.getUserPlatformCollection().subscribe({
          next: resp => {
            this.platformCollection = resp.data;
            this.nextPageUrl = resp.next_page_url;
          },
          error: error => {
            console.log(error);
          }
        })
        break;

      case "platform|wishlist":
        this.usersService.getUserPlatformWishlist().subscribe({
          next: resp => {
            this.platformCollection = resp.data;
            this.nextPageUrl = resp.next_page_url;
          },
          error: error => {
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
  openSellPlatformModal(userPlatform:UserPlatform){
    this.modalsService.openModal('sell-platform', userPlatform);
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
  nextPage(){
    this.loadingMoreContent = false;
    if(this.nextPageUrl && this.nextPageUrl != ""){
      this.usersService.getUserCollection(this.nextPageUrl).subscribe(resp => {
        {
          resp.data.map((game: any) => this.platformCollection.push(game));
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

  removeElement(confirm: any, forRemove: UserPlatform){
    this.forRemove = forRemove;
    this.message = `Are you sure you want to remove ${forRemove.platform?.name} from your collection?`;
    this.modalService.open(confirm);
  }

  confirmRemove(){
    this.usersService.toggleToPlatformCollection(this.forRemove.platform_id).subscribe({
      next: resp => {
        this.platformCollection = this.platformCollection.filter( platform => platform.platform_id != this.forRemove.platform_id);
        this.modalService.dismissAll();
      },
      error: error => {
        console.log(error);
      }
    })
  }

  openContactModal(platform:UserPlatform){
    alert('contact')
    //this.modalsService.openModal('log-in');
  }

  openLoginModal(){
    this.modalsService.openModal('log-in');
  }
}
