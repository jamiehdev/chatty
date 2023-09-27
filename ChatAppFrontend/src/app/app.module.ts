import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ChatService } from './services/chat.service';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CreateAccountComponent } from './create-account/create-account.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginAccountComponent } from './login-account/login-account.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateAccountComponent,
    LoginAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
