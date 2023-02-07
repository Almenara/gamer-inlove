import { Component, Input, OnInit } from '@angular/core';

import { UserNotification } from 'src/app/interfaces/user_notification';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  @Input() notification!: UserNotification;
  public text: string = "";
  public link: string | null = null;
  constructor(private notificationsService: NotificationsService){
  }
  ngOnInit(): void {
    switch(this.notification.reason) { 
      case "New items for sale": { 
        this.text = `${this.notification.reason} of ${this.notification.product?.name}`;
        this.link = `/game/${this.notification.product_id}`
        break; 
      } 
      case "Conversation request": { 
        let username = this.notification.from_user.username;
        let character = username.substring(username.length - 1).toUpperCase();
        
        if( character == 'S' )
          this.text = `${username} conversation request to buy ${this.notification.product?.name}`;
        else
          this.text = `${username}'s conversation request to buy ${this.notification.product?.name}`;
        
          this.link = `/profile/conversations/${this.notification.conversation_id}`
        break; 
      } 
      case "New message": { 
        this.text = `${this.notification.reason} from ${this.notification.from_user.username} for ${this.notification.product?.name}`;
        this.link = `/profile/conversations/${this.notification.conversation_id}`
        break; 
      }
    } 
  }
}
