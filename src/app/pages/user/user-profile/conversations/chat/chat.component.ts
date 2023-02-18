import { DeviceDetectorService } from './../../../../../services/device-detector.service';
import { User } from 'src/app/interfaces/user';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Event, ParamMap, Router } from '@angular/router';
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

  @ViewChild('conversation') chat!: ElementRef;

  private id: number = 0
  public user!: User;
  public conversation!: Conversation;
  public messages: Message[] = [];
  private destroy = false;

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
      private deviceDetectorService: DeviceDetectorService
    ){
      this.user = this.authService.user;
      this.messages = this.conversationsService.messages;
  }
  ngOnInit(): void {  
    document.querySelector('html')!.classList.add('chating');
    document.querySelector('app-footer')!.classList.add('chating');
    
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
          this.conversation = resp
        }
      })
      
    });
    this.refreshMessages();    
  }
  refreshMessages(){
    this.conversationsService.getChat(this.id).subscribe({
      next:(resp)=>{
        this.messages = resp.data;
        if(!this.destroy) setTimeout(()=>{this.refreshMessages()}, 10000)
        this.chat.nativeElement.scrollTo(0, this.chat.nativeElement.scrollHeight);
      },
      error:(error)=>{
        //console.log(error);
    }});     
  }
  sendMessage(){
    
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
    this.contactForm.reset();
    this.messagesService.sendMessage(message).subscribe({
      next:(resp)=>{
        this.messages.push(resp.data);
        this.conversationsService.getChat(this.id).subscribe({
          next:(resp)=>{
            this.messages = resp.data;
          },
          error:(error)=>{
            console.log(error);
            this.router.navigate(['/404']);
        }});
      },
      error:(error)=>{
        //TODO notificacion
        console.log(error);
      }
    });
  }
  sendIfEnter(event: KeyboardEvent){
    if(this.deviceDetectorService.isDesktop()){
       if(event.isTrusted && event.key === 'Enter') this.sendMessage();
    }
  }
  ngOnDestroy(): void {
    this.destroy = true;
    document.querySelector('html')!.classList.remove('chating');
    document.querySelector('app-footer')!.classList.remove('chating');
  }
}
