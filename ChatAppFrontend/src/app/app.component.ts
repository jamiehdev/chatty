import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from './services/chat.service';
import { AuthService } from './services/auth.service';
import { StateService } from './services/state.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  username$!: Observable<string | null>;

  public messages: Array<{ user: string, message: string }> = [];
  public currentMessage: string = '';
  isActiveUsersModalOpen: boolean = false;

  constructor(
    private readonly chatService: ChatService,
    public authService: AuthService,
    public stateService: StateService) {}

  ngOnInit(): void {
    void this.chatService.startConnection();

    this.chatService.addTransferChatDataListener((user, message) => {
      this.messages.push({ user, message });
    });

    this.username$ = this.stateService.isLoggedIn$.pipe(
      map(loggedIn => loggedIn ? this.authService.getUsername() : null)
    );
  }

  sendMessage(): void {
    const currentUser = this.authService.getUsername();

    if (currentUser !== null && currentUser.trim() !== '' && this.currentMessage.trim() !== '') {
      this.chatService.sendChatMessage(currentUser, this.currentMessage);
      this.currentMessage = '';
    }
  }

  openActiveUsersModal(): void {
    this.isActiveUsersModalOpen = true;
  }

  closeActiveUsersModal(): void {
    this.isActiveUsersModalOpen = false;
  }
}
