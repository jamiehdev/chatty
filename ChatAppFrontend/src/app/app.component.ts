/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Component, OnInit } from '@angular/core';
import { ChatService } from './services/chat.service';
import { AuthService } from './services/auth.service';
import { StateService } from './services/state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public messages: Array<{ user: string, message: string }> = [];
  public currentMessage: string = '';

  constructor (
    private readonly chatService: ChatService,
    public authService: AuthService,
    public stateService: StateService,
    private readonly router: Router) {}

  ngOnInit (): void {
    void this.chatService.startConnection();

    this.chatService.addTransferChatDataListener((user, message) => {
      this.messages.push({ user, message });
    });
  }

  sendMessage (): void {
    const currentUser = this.authService.getUsername();
    if (currentUser !== null && currentUser.trim() !== '' && this.currentMessage.trim() !== '') {
      this.chatService.sendChatMessage(currentUser, this.currentMessage);
      this.currentMessage = '';
    }
  }
}
