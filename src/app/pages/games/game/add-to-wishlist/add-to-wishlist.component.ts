import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GameData } from 'src/app/interfaces/game_data';
import { UserWishgame } from 'src/app/interfaces/user_wishgame';
import { AuthService } from 'src/app/services/auth.service';
import { GamesService } from 'src/app/services/games.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add-to-wishlist',
  templateUrl: './add-to-wishlist.component.html',
  styleUrls: ['./add-to-wishlist.component.scss']
})
export class AddToWishlistComponent implements OnInit{

  private _game!: GameData;

  public auth = this.authService.auth;

  public userWishlist: UserWishgame[] | undefined = [];

  get game(){
    return this._game;
  }
  set game(game: GameData){
    this._game = game;
  }

  constructor( 
    private gamesService: GamesService, 
    private usersService: UsersService, 
    public router: Router, 
    private route: ActivatedRoute, 
    private authService: AuthService ) {
      this.game = this.gamesService.gameData;

      if(this.game.collection){
        this.userWishlist = this.game.wishlist;
      }
     }

  ngOnInit(): void {
  
  }

  toggleToUserWishlist(platformId:number, event: Event){
    let button = event.target as HTMLElement;
    button.classList.add('checking');
    this.usersService.toggleToGameWishlist(this.game.game.id, platformId).subscribe({
      next: resp => {
        button.classList.remove('checking');
        if(resp.delete){
          this.gamesService.gameData.wishlist = resp.wishlist;
          button.classList.remove('erasable');
          button.classList.remove('checked');
        }
        else{
          this.gamesService.gameData.wishlist = resp.wishlist;
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
