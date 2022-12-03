import { GamesService } from './../../services/games.service';
import { TwitchService } from './../../services/twitch.service';
import { TwitchToken } from './../../services/twitchToken.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private gamesService: GamesService) { }
  
  get games(){
    return 1
  }
  ngOnInit(): void {
    
    this.gamesService.getGames().subscribe(rest => {console.log(rest)})
  }

}
