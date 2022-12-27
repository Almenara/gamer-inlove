import { Component, ElementRef, HostListener, OnInit, SimpleChange, ViewChild } from '@angular/core';

import { User } from './../../interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { OpenMenuService } from './../../services/open-menu.service';
import { GamesService } from './../../services/games.service';
import { Platform } from 'src/app/interfaces/platform';
import { Game } from 'src/app/interfaces/game';
import { Company } from 'src/app/interfaces/company';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public searchOpened: boolean = false;

  public searchResult: any;
  public games!: Game[] ;
  public platforms!: Platform[] ;
  public companies!: Company[] ;
  public users!: User[] ;

  get auth(){
    return this.authService.auth
  }

  @ViewChild("searchInput") public input!: ElementRef;
  
  constructor(
    private gamesService: GamesService, 
    private openMenuService: OpenMenuService, 
    private authService: AuthService
    ) { }

  get menuIsOpen(){
    return this.openMenuService.menuIsOpen;
  }
  
  ngOnInit(): void {
  }

  toggleMenu(event:Event){
    event.stopPropagation();
    this.openMenuService.toggleMenu()
  }

  openSearch(event:Event){
    event.stopPropagation();
    this.searchOpened = true;
    this.input.nativeElement.focus();
  }
  search(){
    let text: string = this.input.nativeElement.value;
    this.gamesService.search(text).subscribe(rest => { {
      this.searchResult = rest;
      this.games = this.searchResult.games.data;
      this.platforms = this.searchResult.platforms;
      this.companies = this.searchResult.companies;
      this.users = this.searchResult.users;
      console.log(this.searchResult);
    }})
  }
  closeMenu(){
    this.openMenuService.closeMenu()
  }
  closeSearch(){
    this.gamesService.closeSearching();
    this.searchResult = null;
  } 

  deleteSearch() {
    this.searchResult = null;
  }

  logOut(){
    this.authService.logout()
  }
}
