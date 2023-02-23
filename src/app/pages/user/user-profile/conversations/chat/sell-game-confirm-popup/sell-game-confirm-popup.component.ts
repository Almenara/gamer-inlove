import { Conversation } from 'src/app/interfaces/conversation';
import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Game } from 'src/app/interfaces/game';
import { User } from 'src/app/interfaces/user';
import { UserGame } from 'src/app/interfaces/user_game';

import { ModalsService } from 'src/app/services/modals.service';
import { UsersService } from 'src/app/services/users.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-sell-game-confirm-popup',
  templateUrl: './sell-game-confirm-popup.component.html',
  styleUrls: ['./sell-game-confirm-popup.component.scss']
})
export class SellGameConfirmPopupComponent {

  @ViewChild('content') modalContent!:HTMLElement; 

  @Input() public buyer!: User;
  @Input() public userGame!: UserGame;
  @Input() public conversation!: Conversation;
  @Input() public game!: Game;

  public confirmSellGameForm!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private usersService: UsersService,
    private modalsService: ModalsService,
    private alertService: AlertService,
    private confirmSellModalService: NgbModal){
  
    this.confirmSellGameForm = this.fb.group({
      price:  [, [Validators.required, Validators.minLength(1)]],
    })
    this.modalsService.modals['confirmSellGame'] = this;
  }

  ConfirmGameSell(event: Event){
    let button = event.target as HTMLElement;
    button.classList.add('checking');
    this.userGame.for_sale = 0,
    
    this.usersService.putGameSoldOut(this.userGame, this.confirmSellGameForm.get(['price'])?.value, this.buyer).subscribe({
      next: resp => {
        button.classList.remove('checking');
        this.close();
        this.alertService.success('Message sended successfuly!', { keepAfterRouteChange: true, autoClose: true });
      },
      error: error =>{
        button.classList.remove('checking');
        this.close();
        this.alertService.error('There was an error, please try again later.', { keepAfterRouteChange: true, autoClose: true });
      }
    });
  }
  
  open(){
    console.log(this.conversation)
    this.confirmSellModalService.open(this.modalContent);
  }

  close(){
    this.confirmSellModalService.dismissAll()
  }
} 
