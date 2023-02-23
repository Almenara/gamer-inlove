import { Message } from 'src/app/interfaces/message';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { ConversationsService } from 'src/app/services/conversations.service';
import { Conversation } from 'src/app/interfaces/conversation';
import { User } from 'src/app/interfaces/user';
import { AlertService } from 'src/app/services/alert.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.scss']
})
export class ConversationsComponent implements OnInit{

  public conversations!: Conversation[];

  public buyer_conversations!: Conversation[];

  public seller_conversations!: Conversation[];

  public user!: User;

  public messages: Message[] = [];

  public userId: number = 0;

  @ViewChild('conversations') conversationsContainer!: ElementRef;

  public container!:HTMLElement;

  public avatarURL:string = environment.baseUrl + environment.avatarPath;
  
  constructor(
    private conversationService: ConversationsService,
    private alertService: AlertService,
    ){
    this.conversationService.getAllActiveConversations().subscribe({
      next: resp => {
        console.log(resp)
        this.conversations = resp;
        this.user = this.conversationService.user;
        this.userId = this.user.id ? this.user.id : 0 ;
        this.buyer_conversations = this.conversations.filter(conversation => conversation.buyer_user_id == this.user.id);
        this.seller_conversations = this.conversations.filter(conversation => conversation.seller_user_id == this.user.id);
      },
      error: error =>{
        this.alertService.error('There was an error, please try again later.', { keepAfterRouteChange: true, autoClose: true });
      }
    });
  }
  ngOnInit(): void {
  }
}
