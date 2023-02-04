import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/interfaces/message';
import { ConversationsService } from 'src/app/services/conversations.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  //@Input() public messages!: Message[];

  public messages = this.conversationsService.messages
  
  constructor( private conversationsService: ConversationsService ){

    this.messages = this.conversationsService.messages
  }
  ngOnInit(): void {
    console.log('hola',this.messages)
  }
}
