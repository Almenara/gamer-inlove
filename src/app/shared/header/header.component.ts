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
  public user_notifications!: UserNotification[];
  public newNotifications: boolean = false;
  public noSeenNotifications: boolean = true;
  public notificationListIsOpen: boolean = this.openMenuService.notificationsIsOpen;

  public query: string = "";
  public nextPageUrl: string = "";
  public loadingMoreSearchContent: boolean = false;

  get auth() {
    return this.authService.auth
  }

  @ViewChild("searchInput") public input!: ElementRef;

  constructor(
    private gamesService: GamesService,
    private openMenuService: OpenMenuService,
    private authService: AuthService,
    private searchService: SearchService
  ) {     
    this.authService.userDataSubject.subscribe(data => {
      this.user = data,
      this.user_notifications = this.user.user_notifications ? this.user.user_notifications : []
      if(this.user_notifications.length > 0){
        this.notificationAlert();
      }
    });
  }

  @HostListener('document:click', ['$event'])
  clickout(event:Event) {
    this.openMenuService.closeMenu();
    this.notificationListIsOpen = this.openMenuService.closeNotificationList();
  }
  get menuIsOpen() {
    return this.openMenuService.menuIsOpen;
  }

  ngOnInit(): void {
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
  @HostListener('scroll', ['$event'])
  searchScroll(event: Event):void {
    let element = event.target as HTMLElement;
    if (element.offsetHeight + element.scrollTop >= element.scrollHeight) {
      if(this.nextPageUrl && this.nextPageUrl != ""){
        this.loadingMoreSearchContent = true;
        this.searchService.nextPage(this.nextPageUrl).subscribe(rest => {
          {
            this.searchResult = rest;
            this.searchResult.games.data.map((game: any) => this.games.push(game));
            console.log(rest);
            this.nextPageUrl = this.searchResult.games.next_page_url
            this.loadingMoreSearchContent = false;
          }
        })
      }
    }
  }
  notificationAlert(){
    if(this.user_notifications.map( not => { not.seen })) this.noSeenNotifications = false;
    this.newNotifications = true;
    
  }
  openNotificationList(event: Event){
    event.stopPropagation();
    this.notificationListIsOpen = this.openMenuService.toggleNotificationList();
    this.closeSearch();
  }
}
