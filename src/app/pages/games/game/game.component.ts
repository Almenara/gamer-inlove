import { AuthService } from 'src/app/services/auth.service';

import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Component } from '@angular/core';
import { Game } from 'src/app/interfaces/game';
import { GamesService } from 'src/app/services/games.service';
import { UsersService } from 'src/app/services/users.service';
import { UserGame } from 'src/app/interfaces/user_game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {

  private _game!: Game;

  public userCollectionGame: UserGame[] | undefined = [];

  public id!: number;

  public classes:string[] = ['bg-red', 'bg-blue', 'bg-yellow', 'bg-orange'];

  public bgColor:string = "";

  public secondaryColor:string = "";

  public auth = this.authService.auth;

  get game(){
    return this._game;
  }
  set game(game: Game){
    this._game = game;
  }


  constructor( 
    private gamesService: GamesService, 
    private userService: UsersService, 
    public router: Router, 
    private route: ActivatedRoute, 
    private authService: AuthService ) { }

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
  toggleToUserCollection(platformId:number, event: Event){
    let button = event.target as HTMLElement;
    button.classList.add('checking');
    this.userService.toggleToGameCollection(this.game.id, platformId).subscribe({
      next: resp => {
        button.classList.remove('checking');
        if(resp.delete){
          button.classList.remove('erasable');
          button.classList.remove('checked');
        }
        else
          button.classList.add('checked');
      },
      error: error => {
        button.classList.remove('checking');
        button.classList.remove('checked');
        button.classList.remove('erasable');
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
