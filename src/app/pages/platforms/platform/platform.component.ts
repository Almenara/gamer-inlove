import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { GamesService } from 'src/app/services/games.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.scss']
})
export class PlatformComponent implements OnInit{


  public id!: number;

  public classes:string[] = ['bg-red', 'bg-blue', 'bg-yellow', 'bg-orange'];

  public bgColor:string = "";

  public secondaryColor:string = "";

  public auth = this.authService.auth;

  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute, 
    ){
  }
  ngOnInit(){
    this.route.paramMap.subscribe((params: ParamMap) => {
     
      this.getRandomPageColors();

      const param = params.get('idSlug')
     
      if(param) this.id = Number(param.split("-", 1));

      /*this.gamesService.getGame(this.id).subscribe({
        next:(resp)=>{
          this.gamesService.gameData = resp;
          this.game = resp.game;
          if(resp.collection){
            this.userCollectionGame = resp.collection;
          }
        },
        error:(error)=>{
          console.log(error);
          this.router.navigate(['/404']);
        }
      })*/

    });

  }

  getRandomPageColors() {
    this.bgColor = this.classes[Math.floor(Math.random() * this.classes.length)];
    this.secondaryColor = this.classes[Math.floor(Math.random() * this.classes.length)];
    while(this.secondaryColor == this.bgColor || this.secondaryColor == "bg-violet"){
        this.secondaryColor = this.classes[Math.floor(Math.random() * this.classes.length)];
    }

  }
}
