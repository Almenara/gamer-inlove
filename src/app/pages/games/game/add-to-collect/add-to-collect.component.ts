import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from 'src/app/interfaces/game';
import { UserGame } from 'src/app/interfaces/user_game';
import { GameData } from 'src/app/interfaces/game_data';
import { AuthService } from 'src/app/services/auth.service';
import { GamesService } from 'src/app/services/games.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add-to-collect',
  templateUrl: './add-to-collect.component.html',
  styleUrls: ['./add-to-collect.component.scss']
})

export class AddToCollectComponent implements OnInit{

  private _game!: GameData;

  public auth = this.authService.auth;

  public userCollectionGame: UserGame[] | undefined = [];

  get game(){
    return this._game;
  }
  set game(game: GameData){
    this._game = game;
  }

  constructor( 
    private gamesService: GamesService, 
    private userService: UsersService, 
    public router: Router, 
    private route: ActivatedRoute, 
    private authService: AuthService ) {
      this.game = this.gamesService.gameData;

      if(this.game.collection){
        this.userCollectionGame = this.game.collection;
      }
     }

  ngOnInit(): void {
  
  }

  toggleToUserCollection(platformId:number, event: Event){
    let button = event.target as HTMLElement;
    button.classList.add('checking');
    this.userService.toggleToGameCollection(this.game.game.id, platformId).subscribe({
      next: resp => {
        button.classList.remove('checking');
        if(resp.delete){
          this.gamesService.gameData.collection = resp.collection;
          button.classList.remove('erasable', 'checked');
          button.classList.remove('checked');
        }
        else{
          this.gamesService.gameData.collection = resp.collection;
          button.classList.add('checked');
        }
      },
      error: error => {
        button.classList.remove('checking');
        //TODO mostrar modal con mensaje de error.
      }
    });
  }

  addDeleteClass(event: Event){
    let button = event.target as HTMLElement;
    if(button.classList.contains("checked") || button.classList.contains("checking")){
      button.classList.add('erasable')
    }
  }
}
