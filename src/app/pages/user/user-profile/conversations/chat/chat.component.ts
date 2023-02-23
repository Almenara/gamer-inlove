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
import { AlertService } from 'src/app/services/alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  //@Input() public messages!: Message[];

  @ViewChild('conversationContainer') chat!: ElementRef;
  @ViewChild('messageInput') messageInput!: ElementRef;

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
      private route: ActivatedRoute, 
      private authService: AuthService,
      private deviceDetectorService: DeviceDetectorService,
      private alertService: AlertService,
      private modalsService: ModalsService,
      private modalService: NgbModal,
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
          this.chat.nativeElement.scrollTo(0, this.chat.nativeElement.scrollHeight);
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

    let textArea = this.messageInput.nativeElement as HTMLInputElement
    textArea.style.height = `28px`;
    this.contactForm.reset();
    this.messagesService.sendMessage(message).subscribe({
      next:(resp)=>{
        this.messages.push(resp.data);
        this.chat.nativeElement.scrollTo(0, this.chat.nativeElement.scrollHeight);
        this.contactForm.reset();
      },
      error:()=>{
        this.alertService.error('There was an error, please try again later.', { keepAfterRouteChange: true, autoClose: true });
      }
    });

  }
  sendIfEnter(event: KeyboardEvent){

    let textarea = this.messageInput.nativeElement as HTMLInputElement
    textarea.style.height = `${textarea.scrollHeight}px`;

    if(this.deviceDetectorService.isDesktop()){
       if(event.isTrusted && event.key === 'Enter' && !event.shiftKey) this.sendMessage();
    }
    
    if ((event.key === 'Backspace' || event.key === 'Delete') && textarea.value.length === 0) {
      const minHeight = 28;
      const maxHeight = parseInt(textarea.style.maxHeight);
      const contentHeight = textarea.scrollHeight - textarea.clientHeight;
      const newHeight = Math.min(maxHeight, Math.max(minHeight, contentHeight));
      textarea.style.height = `${newHeight}px`;
    }

  }
  ngOnDestroy(): void {
    this.destroy = true;
    document.querySelector('html')!.classList.remove('chating');
    document.querySelector('app-footer')!.classList.remove('chating');
  }
  openConfirmSellGameModal(){
    this.modalsService.openModal('confirmSellGame');
  }
}
