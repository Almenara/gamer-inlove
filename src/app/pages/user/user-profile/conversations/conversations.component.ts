import { Message } from 'src/app/interfaces/message';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { ConversationsService } from 'src/app/services/conversations.service';
import { Conversation } from 'src/app/interfaces/conversation';
import { User } from 'src/app/interfaces/user';

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
  
  constructor(
    private conversationService: ConversationsService
    ){
    this.conversationService.getAllActiveConversations().subscribe({
      next: resp => {
        this.conversations = resp;
        this.user = this.conversationService.user;
        this.userId = this.user.id ? this.user.id : 0 ;
        this.buyer_conversations = this.conversations.filter(conversation => conversation.buyer_user_id == this.user.id);
        this.seller_conversations = this.conversations.filter(conversation => conversation.seller_user_id == this.user.id);
      },
      error: error =>{
        //TODO añadir alerta
        console.log(error);
      }
    });
  }
  ngOnInit(): void {
  }
}
