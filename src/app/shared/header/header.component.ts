import { OpenMenuService } from './../../services/open-menu.service';
import { GamesService } from './../../services/games.service';
import { Component, ElementRef, HostListener, OnInit, SimpleChange, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public searchOpened: boolean = false;

  public searchResult: any;
  public games: any ;
  public platforms: any ;

  @ViewChild("searchInput") public input!: ElementRef;
  
  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if(this.searchOpened){ 
      this.searchResult = null;
      this.searchOpened = false;
      this.gamesService.closeSearching();
    }

  }
  
  constructor(
    private gamesService: GamesService, 
    private openMenuService: OpenMenuService, 
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
  search(event: Event){
    let gameName: string = this.input.nativeElement.value;
    this.gamesService.searchGames(gameName).subscribe(rest => { {
      this.searchResult = rest;
      this.games = this.searchResult.games.original;
      this.platforms = this.searchResult.platforms.original;
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
}
