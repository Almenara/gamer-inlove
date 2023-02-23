import { Component, Injectable, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserStats } from 'src/app/interfaces/user_stats';
import { environment } from 'src/environments/environment';
import { Game } from 'src/app/interfaces/game';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
@Injectable() 
export class UserInfoComponent implements OnInit {

  public userProfile!: User;

  public filter: string = "";

  public userStats!: UserStats;

  public totalGames: number = 0;

  public avatarURL:string = environment.baseUrl + environment.avatarPath;

  public maxCollectionPrice: number = 0;
  public minCollectionPrice: number = 0;

  public lastGame!: Game;

  public id:number = 0;

  get auth() {
    return this.authService.auth;
  }

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private gamesService: GamesService,
    public router: Router 
  ){ 
    this.route.paramMap.subscribe((params: ParamMap) => {

      let param = params.get('idSlug');

      if(param){

        let id = Number(param.split("-", 1));

        this.usersService.getUserById(id).subscribe({
          next:(resp)=>{
            this.userProfile = resp;
          },
          error:()=>{
            this.router.navigate(['/404']);
          }
        });

        this.usersService.getUserStats(id).subscribe({
          next:(resp)=>{
            this.userStats = resp;
            this.calculateStats();
          }
        });

      }
      else{
        
        this.userProfile = authService.user;

        this.usersService.getUserStats().subscribe({
          next:(resp)=>{
            this.userStats = resp;
            this.calculateStats();
          }
        });

      }

    });

  }

  ngOnInit(): void {
    

  }

  calculateStats(){
    this.totalGames = this.userStats.stats.length;
    this.gamesService.getGame(this.userStats.stats[this.userStats.stats.length - 1].game_id).subscribe({
      next: resp => this.lastGame = resp.game
    });
    console.log(this.lastGame)
    this.userStats.stats.map((game: any) => {
      if(game.game_sale.length > 1){
        this.minCollectionPrice += game.game_sale.reduce((acc:any, val:any) => {
          return acc.price < val.price ? acc.price : val.price;
        })
        this.maxCollectionPrice += game.game_sale.reduce((acc:any, val:any) => {
          return acc.price > val.price ? acc.price : val.price;
        })
      }
      if(game.game_sale.length == 1) {
        this.minCollectionPrice += game.game_sale[0].price;
        this.maxCollectionPrice += game.game_sale[0].price;
      }
    })
  }

}
