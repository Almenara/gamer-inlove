import { GamesService } from './../../../services/games.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public gallery!: any;
  
  public currentGame: any;
  public indexGame: number = 0;

  constructor(private gamesService: GamesService) {
    this.gamesService.getGames().subscribe(rest => {
      this.gallery = rest;
      this.currentGame = rest[this.indexGame];
    })
  }

  ngOnInit(): void {
    
  }

  next(){
    if(this.indexGame < 9){
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
