import { ModalsService } from './../../../services/modals.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { GamesService } from 'src/app/services/games.service';

import { Game } from 'src/app/interfaces/game';
import { UserGame } from 'src/app/interfaces/user_game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit{

  private _game!: Game;

  public userCollectionGame: UserGame[] | undefined = [];

  public id!: number;

  public classes:string[] = ['bg-red', 'bg-blue', 'bg-yellow', 'bg-orange'];

  public bgColor:string = "";

  public secondaryColor:string = "";

  get auth() {
    return this.authService.auth
  }

  get game(){
    return this._game;
  }
  set game(game: Game){
    this._game = game;
  }


  constructor( 
    private gamesService: GamesService,
    private router: Router, 
    private route: ActivatedRoute, 
    private authService: AuthService, 
    private modalsService: ModalsService ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
     
      this.getRandomPageColors();

      const param = params.get('idSlug')
     
      if(param) this.id = Number(param.split("-", 1));

      this.gamesService.getGame(this.id).subscribe({
        next:(resp)=>{
          this.game = resp.game;
          if(resp.collection){
            this.userCollectionGame = resp.collection;
          }
        },
        error:(error)=>{
          console.log(error);
          this.router.navigate(['/404']);
        }
      })

    });
  }

  getRandomPageColors() {
    this.bgColor = this.classes[Math.floor(Math.random() * this.classes.length)];
    this.secondaryColor = this.classes[Math.floor(Math.random() * this.classes.length)];
    while(this.secondaryColor == this.bgColor || this.secondaryColor == "bg-violet"){
        this.secondaryColor = this.classes[Math.floor(Math.random() * this.classes.length)];
    }

  }
  openLoginModal(){
    this.modalsService.openModal('log-in');
  }
}
