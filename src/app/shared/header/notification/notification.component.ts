import { AlertService } from 'src/app/services/alert.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ConversationsService } from 'src/app/services/conversations.service';
import { UserNotification } from 'src/app/interfaces/user_notification';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  @Input() notification!: UserNotification;
  public text: string = "";
  public link: string | null = null;
  public notificationType: number = 0;

  constructor(
    private conversationsService: ConversationsService,
    private usersService: UsersService, 
    private router: Router,
    private alertService: AlertService
    ){}

  ngOnInit(): void {
    switch(this.notification.reason) { 
      case "New items for sale": { 
        this.notificationType = 1;
        this.text = `${this.notification.reason} of <b>${this.notification.product?.name}</b>`;
        this.link = `/game/${this.notification.product_id}`
        break; 
      } 
      case "Conversation request": { 
        console.log(this.notification)
        this.notificationType = 2;
        let username = this.notification.from_user.username;
        let character = username.substring(username.length - 1).toUpperCase();
        
        if( character == 'S' )
        this.text = `<b>${username}</b> conversation request to <b>buy ${this.notification.product?.name}</b>`;
        else
        this.text = `<b>${username}'s</b> conversation request to <b>buy ${this.notification.product?.name}</b>`;
        
        this.link = `/profile/conversations/${this.notification.conversation_id}`
        break; 
      } 
      case "New message": { 

        let href = this.router.url;
        if(href.includes(`/profile/conversations/${this.notification.conversation_id}`))
          break;

        this.notificationType = 3;
        this.text = `${this.notification.reason} from <b>${this.notification.from_user.username}</b> for <b>${this.notification.product?.name}</b>`;
        this.link = `/profile/conversations/${this.notification.conversation_id}`
        break; 
      }
      case "has sold you": { 

        let href = this.router.url;
        if(href.includes(`/profile/conversations/${this.notification.conversation_id}`))
          break;
          
        this.notificationType = 4;
        this.text = `<b>Congratulations!</b> ${this.notification.from_user.username} ${this.notification.reason} <b>${this.notification.product?.name}</b>`;
        this.link = `/profile/conversations/${this.notification.conversation_id}`
        break; 
      }
    } 
  }

  addToUserCollection(conversationId:number | undefined){

    if(conversationId){
      this.conversationsService.getConversation(conversationId).subscribe({
        next: resp => {
          let conversation = resp;
          this.usersService.toggleToGameCollection(conversation.product_id, conversation.platform_id).subscribe({
            next: resp => {
              this.alertService.success('Congratulations! The game is already in your collection!', { keepAfterRouteChange: true, autoClose: true });
            },
            error: error => {
              this.alertService.error('There was an error, please try again later.', { keepAfterRouteChange: true, autoClose: true });
            }
          });
        },
        error: error => {
          this.alertService.error('There was an error, please try again later.', { keepAfterRouteChange: true, autoClose: true });
        }
      })
    }
  }
}
