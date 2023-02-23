import { AlertService } from './../../services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { User } from 'src/app/interfaces/user';
import { Message } from 'src/app/interfaces/message';
import { MessagesService } from 'src/app/services/messages.service';
import { UsersService } from 'src/app/services/users.service';
import { ModalsService } from 'src/app/services/modals.service';
import { UserGame } from 'src/app/interfaces/user_game';
import { Game } from 'src/app/interfaces/game';

@Component({
  selector: 'app-contact-popup',
  templateUrl: './contact-popup.component.html',
  styleUrls: ['./contact-popup.component.scss']
})
export class ContactPopupComponent implements OnInit {

  @ViewChild('content') modalContent!:HTMLElement; 

  public user!: User;
  public game!: Game;
  public userGame!: UserGame;

  public contactForm: FormGroup = this.fb.group({
    message:  ['', [Validators.required, Validators.minLength(1)]],
  })

  constructor( 
    private fb: FormBuilder, 
    private alertService: AlertService,
    private authService: AuthService,
    private messagesService: MessagesService,
    private modalsService: ModalsService,
    private contactModalService: NgbModal) {
      this.modalsService.modals['contact'] = this; 
      this.authService.userDataSubject.subscribe(data => {
        this.user = data;
      });
  } 

  ngOnInit(): void {
  }

  open(userGame:UserGame){
    this.userGame = userGame;
    this.contactModalService.open(this.modalContent, { size: 'lg' });
  }

  close(){
    this.contactModalService.dismissAll()
  }

  sendMessage(){
    let message:Message = {
      sender_user_id:         this.user.id,
      receiving_user_id:      this.userGame.user_id,
      product_id:             this.userGame.game_id,
      platform_id:            this.userGame.platform_id,
      seen:                   false,
      malicious_message:      false,
      message:                this.contactForm.value.message,
    }
    this.messagesService.sendMessage(message).subscribe({
      next:(resp)=>{
        this.close();
        this.alertService.success('Message sended successfuly!', { keepAfterRouteChange: true, autoClose: true });
      },
      error:(error)=>{
        this.close();
        this.alertService.error('There was an error, please try again later.', { keepAfterRouteChange: true, autoClose: true });
      }
    });
  }

  openLogInModal(){
    this.close();
    this.modalsService.openModal('contact');
  }

}
