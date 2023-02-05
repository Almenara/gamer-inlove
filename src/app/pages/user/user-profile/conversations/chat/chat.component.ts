import { User } from 'src/app/interfaces/user';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Message } from 'src/app/interfaces/message';
import { AuthService } from 'src/app/services/auth.service';
import { ConversationsService } from 'src/app/services/conversations.service';
import { MessagesService } from 'src/app/services/messages.service';
import { ModalsService } from 'src/app/services/modals.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Conversation } from 'src/app/interfaces/conversation';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  //@Input() public messages!: Message[];

  private id: number = 0
  public user!: User;
  public conversation!: Conversation;
  public messages: Message[] = [];

  public contactForm: FormGroup = this.fb.group({
    message:  ['', [Validators.required, Validators.minLength(1)]],
  })

  constructor( 
      private fb: FormBuilder, 
      private conversationsService: ConversationsService,
      private messagesService: MessagesService,
      private router: Router, 
      private route: ActivatedRoute, 
      private authService: AuthService, 
      private modalsService: ModalsService
    ){
      this.user = this.authService.user;
      this.messages = this.conversationsService.messages;
      //this.conversation = this.conversationsService.conversation;
  }
  ngOnInit(): void {  
    
    this.user = this.authService.user;
    this.messages = this.conversationsService.messages;
    this.conversation = this.conversationsService.conversation;
    
    this.authService.userDataSubject.subscribe(data => {
      this.user = data;
    });
    this.route.paramMap.subscribe((params: ParamMap) => {
     
      const param = params.get('idConversation');

      this.id = Number(param);

      this.conversationsService.getConversation(this.id).subscribe({
        next: resp => { 
          console.log('oninit', resp)
          this.conversation = resp
        }
      })

      this.conversationsService.getChat(this.id).subscribe({
        next:(resp)=>{
          this.messages = resp.data;
        },
        error:(error)=>{
          console.log(error);
          this.router.navigate(['/404']);
        }
      })

    });
    
  }
  sendMessage(){
    console.log(this.conversation)
    let message:Message = {
      conversation_id:        this.id,
      conversation:           this.conversation,
      sender_user_id:         this.user.id,
      receiving_user_id:      this.conversation.buyer_user_id == this.user.id ? this.conversation.seller_user_id: this.conversation.buyer_user_id,
      product_id:             this.conversation.product_id,
      seen:                   false,
      malicious_message:      false,
      message:                this.contactForm.value.message,
    }
    this.messagesService.sendMessage(message).subscribe({
      next:(resp)=>{
        console.log(resp);
      },
      error:(error)=>{
        //TODO notificacion
        console.log(error);
      }
    });
  }
}
