import { Component, OnInit } from '@angular/core';
import { RankingGames } from 'src/app/interfaces/ranking_games';
import { GamesService } from './../../../services/games.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public gallery!: RankingGames[];
  
  public currentGame: any;
  public indexGame: number = 0;

  constructor(private gamesService: GamesService) {
    this.gamesService.getPopularGamesNow().subscribe(rest => {
      this.gallery = rest;
      console.log(this.gallery);
      this.currentGame = rest[this.indexGame];
    })
  }

  ngOnInit(): void {
    
  }

  next(){
    if(this.indexGame < (this.gallery.length - 1)){
      this.indexGame ++;
      this.currentGame = this.gallery[this.indexGame]
    }
  }
  prev(){
    if(this.indexGame > 0){
      this.indexGame --;
      this.currentGame = this.gallery[this.indexGame]
    }
  }

}
