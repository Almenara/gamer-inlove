import { Component, OnInit } from '@angular/core';
import { RankingGames } from 'src/app/interfaces/ranking_games';
import { GamesService } from 'src/app/services/games.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public popularGames!: RankingGames[] 
  public wantedGames!: RankingGames[] 
  public expensiveGames!: RankingGames[] 

  constructor(private gamesService:GamesService) { 
    gamesService.getPopularGames().subscribe({
      next:(resp) => this.popularGames = resp,
      error:(error) => { console.log(error) }
    })
    gamesService.getWantedGames().subscribe({
      next:(resp) => this.wantedGames = resp,
      error:(error) => { console.log(error) }
    })
    gamesService.getExpensiveGames().subscribe({
      next:(resp) => this.expensiveGames = resp,
      error:(error) => { console.log(error) }
    })
  }

  ngOnInit(): void {
  }

}
