import * as signalR from '@microsoft/signalr';
import * as moment from 'moment';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private hubConnection: signalR.HubConnection | null = null;
  // private isConnected: boolean = true;

  public async startConnection(): Promise<void> {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5266/chathub')
      .build();

    try {
      await this.hubConnection?.start();

      const currentDateTime = moment().format('MMMM Do YYYY, h:mm:ss A');
      console.log('Connection started at ' + currentDateTime);

      await this.hubConnection?.send('NotifyBackendOfConnection', `Frontend connected at ${currentDateTime}!`);
    } catch (err) {
      console.error(err);
    }
  }

  public addTransferChatDataListener(callback: (user: string, message: string) => void): void {
    if (this.hubConnection != null) {
      this.hubConnection.on('ReceiveMessage', callback);
    } else {
      console.error('hubConnection is not initialized.');
    }
  }

  public sendChatMessage(user: string, message: string): void {
    if (this.hubConnection != null) {
      this.hubConnection.send('SendMessage', user, message)
        .catch(err => { console.error(err); });
    } else {
      console.error('hubConnection is not initialized.');
    }
  }
}
