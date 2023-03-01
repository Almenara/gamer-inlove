import { filter } from 'rxjs/operators';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalsService } from 'src/app/services/modals.service';
import { UsersService } from 'src/app/services/users.service';
import { GamesService } from 'src/app/services/games.service';
import { Game } from 'src/app/interfaces/game';
import { UserGame } from 'src/app/interfaces/user_game';

@Component({
  selector: 'app-sell-game-popup',
  templateUrl: './sell-game-popup.component.html',
  styleUrls: ['./sell-game-popup.component.scss']
})
export class SellGamePopupComponent implements OnInit {

  @ViewChild('content') modalContent!:HTMLElement; 
  
  public sellGameForm!: FormGroup;

  public game!: Game;

  public userGame!: UserGame;

  public status: { [key: number]: string } = {1:'New',2:'Like new',3:'External damage',4:"It doesn't work"};

  constructor( 
    private fb: FormBuilder, 
    private usersService: UsersService,
    private modalsService: ModalsService,
    private gamesService: GamesService,
    private gameModalService: NgbModal){

    this.sellGameForm = this.fb.group({
      price:      ['', [Validators.required, Validators.minLength(1),Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]],
      status:     ['', [Validators.required, Validators.minLength(1)]],
      comments:   ['', [Validators.minLength(3)]],
    })

    this.modalsService.modals['sell-game'] = this;
    
  }
  gameForSale() {
    this.userGame.price = this.sellGameForm.value.price;
    
    let statusSelected = this.sellGameForm.value.status;
    this.userGame.status = this.status[statusSelected]
    
    this.userGame.for_sale = 1;
    this.userGame.comments = this.sellGameForm.value.comments;
    this.usersService.putGameForSale(this.userGame).subscribe({
      next: resp => {
        this.close();
        this.sellGameForm.reset();
      },
      error: error => console.log(error)
    });
  }
  ngOnInit(): void {

  }

  open(userGame:UserGame){
    this.userGame = userGame;
    this.gamesService.getGame(userGame.game_id).subscribe({
      next: resp=>{
        this.game = resp.game;
        this.gameModalService.open(this.modalContent);
      },
      error: error => console.log(error)
    });
  }

  close(){
    this.gameModalService.dismissAll()
  }
}