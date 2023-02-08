import { SearchService } from './../../services/search.service';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

import { User } from './../../interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { OpenMenuService } from './../../services/open-menu.service';
import { GamesService } from './../../services/games.service';
import { Platform } from 'src/app/interfaces/platform';
import { Game } from 'src/app/interfaces/game';
import { Company } from 'src/app/interfaces/company';
import { UserNotification } from 'src/app/interfaces/user_notification';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public searchOpened: boolean = false;

  public searchResult: any;
  public games!: Game[];
  public platforms!: Platform[];
  public companies!: Company[];
  public users!: User[];

  public user!: User;
  public user_notifications!: UserNotification[] | null;
  public newNotifications: boolean = false;
  public hasNotifications: boolean = false;
  public noSeenNotifications: boolean = true;
  public notificationListIsOpen: boolean = this.openMenuService.notificationsIsOpen;

  public query: string = "";
  public nextPageUrl: string = "";
  public loadingMoreSearchContent: boolean = false;

  get auth() {
    return this.authService.auth
  }

  @ViewChild('searchInput') public input!: ElementRef;
  @ViewChild('notificationList') public notificationPopup!: ElementRef;

  constructor(
    private gamesService: GamesService,
    private openMenuService: OpenMenuService,
    private authService: AuthService,
    private searchService: SearchService,
    private notificationsService: NotificationsService
  ) {     
      this.notificationsService.getHasNotifications().subscribe(hasNotifications =>{
        this.hasNotifications = hasNotifications;
      }) 
      this.notificationsService.getNewNotifications().subscribe(newNotifications =>{
        this.newNotifications = newNotifications;
        this.noSeenNotifications = newNotifications;
      })
  }


  get menuIsOpen() {
    return this.openMenuService.menuIsOpen;
  }

  ngOnInit(): void {
    if(this.authService.auth.ok) this.notificationsService.refreshNotifications()
  }


  @HostListener('document:click', ['$event'])
  clickout(event:Event) {
    this.closeSearch();
    this.notificationListIsOpen = this.openMenuService.closeNotificationList();
  }

  @HostListener('document:keydown.escape', ['$event']) 
  onKeydownHandler(event: KeyboardEvent) {

    if(this.openMenuService.menuIsOpen)
      this.openMenuService.closeMenu();
    
    else if(this.searchOpened)
      this.searchOpened = !this.searchOpened;
  
  }

  @HostListener('scroll', ['$event'])
  searchScroll(event: Event):void {
    let element = event.target as HTMLElement;
    if (element.offsetHeight + element.scrollTop >= element.scrollHeight) {
      if(this.nextPageUrl && this.nextPageUrl != "" && !this.loadingMoreSearchContent){
        this.loadingMoreSearchContent = true;
        this.searchService.nextPage(this.nextPageUrl).subscribe(rest => {
          {
            this.searchResult = rest;
            this.searchResult.games.data.map((game: any) => this.games.push(game));
            this.nextPageUrl = this.searchResult.games.next_page_url
            this.loadingMoreSearchContent = false;
          }
        })
      }
    }
  }


  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  toggleMenu(event: Event) {
    event.stopPropagation();
    this.openMenuService.toggleMenu()
    this.notificationListIsOpen = this.openMenuService.closeNotificationList();
  }

  openSearch(event: Event) {
    event.stopPropagation();
    this.searchOpened = true;
    this.input.nativeElement.focus();
    if(this.searchResult){
      document.querySelector('html')!.classList.add('searching');
      this.searchOpened = true;
    }
    this.notificationListIsOpen = this.openMenuService.closeNotificationList();
  }

  search() {
    this.query = this.input.nativeElement.value;
    if(this.query != ''){
      this.searchResult = null;
      this.games = [];
      this.platforms = []
      this.companies = []
      this.users = []
      this.nextPageUrl = ""
      this.searchService.search(this.query).subscribe(rest => {
        {

          this.searchResult = rest;
          this.games = this.searchResult.games.data;
          this.platforms = this.searchResult.platforms;
          this.companies = this.searchResult.companies;
          this.users = this.searchResult.users;
          this.nextPageUrl = this.searchResult.games.next_page_url
        }
      })
    }
  }

  closeMenu() {
    this.openMenuService.closeMenu()
  }

  closeSearch() {
    this.gamesService.closeSearching();
    this.searchOpened = false;
  }

  logOut() {
    this.authService.logout()
  }


  openNotificationList(event: Event){
    this.notificationPopup.nativeElement.classList.add('loading')
    event.stopPropagation();
    this.notificationListIsOpen = this.openMenuService.toggleNotificationList();
    this.closeSearch();
    
    if(this.notificationListIsOpen) this.user_notifications = [];
    
    if(this.notificationListIsOpen && this.hasNotifications){
      this.notificationsService.getAllUserNotifications().subscribe({
        next: resp =>{
          this.user_notifications = resp;
          this.notificationPopup.nativeElement.classList.remove('loading');
        },
        error: error => console.log(error)
      })
    }
    this.newNotifications = false;
    this.notificationsService.newNotificationAlertActive = false;
  }

  deleteAllNotifications(){
    this.notificationListIsOpen = this.openMenuService.toggleNotificationList();
    this.notificationsService.deleteAllNotifications();
    this.hasNotifications = false;
    this.newNotifications = false;
  }

  deleteNotification(id: number){
    this.notificationsService.deleteNotification(id);
    if(this.user_notifications?.length == 1){
      this.hasNotifications = false;
      this.newNotifications = false;
      this.user_notifications = null;
    }
  }

}
