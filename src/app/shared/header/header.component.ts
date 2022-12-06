import { OpenMenuService } from './../../services/open-menu.service';
import { GamesService } from './../../services/games.service';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public searchOpened: boolean = false;

  @ViewChild("searchInput") public input!: ElementRef;
  @HostListener('document:click', ['$event'])
  clickout(event:Event) {
    if(this.searchOpened) this.searchOpened = false;
  }

  constructor(
    private gamesService: GamesService, 
    private openMenuService: OpenMenuService, 
    ) { }

  get menuIsOpen(){
    return this.openMenuService.menuIsOpen;
  }
  
  get games(){
    return 1
  }

  ngOnInit(): void {
    
    this.gamesService.getGames().subscribe(rest => {console.log(rest)})
  }

  toggleMenu(){
    this.openMenuService.toggleMenu()
  }

  openSearch(event:Event){
    event.stopPropagation();
    this.searchOpened = true;
    this.input.nativeElement.focus();
  }

  closeMenu(){
    this.openMenuService.closeMenu()
  }
}
