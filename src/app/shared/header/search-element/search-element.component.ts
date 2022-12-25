import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { GamesService } from './../../../services/games.service';

import { Platform } from 'src/app/interfaces/platform';
import { Game } from 'src/app/interfaces/game';
import { User } from 'src/app/interfaces/user';
import { Company } from 'src/app/interfaces/company';

@Component({
  selector: 'app-search-element',
  templateUrl: './search-element.component.html',
  styleUrls: ['./search-element.component.scss']
})
export class SearchElementComponent implements OnInit {
  @Input() public game!: Game;

  @Input() public platform!: Platform;

  @Input() public company!: Company;

  @Input() public user!: User;

  @Output() delelteSearchResult = new EventEmitter<string>();

  constructor( private gamesService: GamesService ) { 
    
  }

  closeSearch(){
    this.gamesService.closeSearching();
    this.delelteSearchResult.emit(undefined)
  }

  ngOnInit(): void {

  }

}
