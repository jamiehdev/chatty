/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Component, type OnInit } from '@angular/core';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title (title: any): void {
    throw new Error('Method not implemented.');
  }

  public messages: Array<{ user: string, message: string }> = [];
  public currentUser: string = '';
  public currentMessage: string = '';

  constructor (private readonly chatService: ChatService) {}

  ngOnInit (): void {
    void this.chatService.startConnection();

    this.chatService.addTransferChatDataListener((user, message) => {
      this.messages.push({ user, message });
    });
  }

  sendMessage (): void {
    if ((this.currentUser.length > 0) && (this.currentMessage.length > 0)) {
      this.chatService.sendChatMessage(this.currentUser, this.currentMessage);
      this.currentMessage = ''; // clear the input field
    }
  }
}
