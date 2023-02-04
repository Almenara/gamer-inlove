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
  private link: string | null = null;
  constructor(private notificationsService: NotificationsService){
  }
  ngOnInit(): void {
    
  }

}
