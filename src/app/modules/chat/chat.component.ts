import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Message, User } from 'src/app/api/models';
import { Chat } from 'src/app/api/model/chat';
import { AuthenticationService } from 'src/app/api/services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormState } from '../shared/model/form-state.model';
import { MessageService } from 'src/app/api/service/message.service';
import { ChatService } from 'src/app/api/service/chat.service';
import { formatDate } from '@angular/common';
import { Params, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @ViewChild('scroll') private myScrollContainer: ElementRef;
  private params: Params;
  currentUser: User;
  form: FormGroup;
  formState: FormState;
  messages: Array<Message>;
  recipient: User;
  chatIndex: number;
  chats: Array<Chat>;
  sequence: number;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private messageService: MessageService,
    private chatService: ChatService) { }

  ngOnInit(): void {
    this.currentUser = this.authenticationService.currentUserValue;
    this.route.params.subscribe(params => this.params = params);
    this.form = this.formBuilder.group({
      message: ['', Validators.maxLength(250)],
    });
    this.formState = new FormState(this.form);

    this.scrollToBottom();
    this.chatIndex = 0;
    this.chatService.getChat().subscribe((data: Array<Chat>) => {
      this.chats = data;
      console.log(data);
      if (data) {
        
        if (this.params.id) {
          data.forEach((chat, index) => {
            if (chat.id === parseInt(this.params.id)) {
              this.chatIndex = index;
            }
          });
        }
        this.onChatClick(this.chatIndex);
      }
    });
    
  }

  onChatClick(i: number) {
    this.chatIndex = i;
    let chat = this.chats[i];
    this.messages = chat.messages;
    if (chat.lastMessage && chat.lastMessage.sequence) {
      this.sequence = chat.lastMessage.sequence;
    } else {
      this.sequence = 0;
    }
    this.scrollToBottom();
  }

  onSubmit() {
    if (this.formState.valid) {
      if (this.form.controls.message.value.length !== 0) {
        let chat = this.chats[this.chatIndex];
        let message = new Message();
        message.message = this.form.controls.message.value;
        message.recipient = chat.recipientId;
        message.createdBy = this.currentUser.id;
        message.chatId = chat.id;
        message.sequence = this.sequence + 1;
        
        this.messageService.createMessage(message).subscribe(data => {
          message.id = data;
          message.createdAt = new Date;
          this.messages.push(message);
          chat.lastMessage = message;
          chat.messages = this.messages;
          this.chats[this.chatIndex].messages = this.messages;
          this.form.controls.message.setValue('');
        });
      }
      
    }
    
  }

  ngAfterViewChecked() {        
    this.scrollToBottom();        
  } 

  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
}

}
