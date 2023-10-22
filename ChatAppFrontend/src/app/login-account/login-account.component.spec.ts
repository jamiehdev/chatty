/* eslint-disable @typescript-eslint/consistent-type-imports */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAccountComponent } from './login-account.component';

describe('LoginAccountComponent', () => {
  let component: LoginAccountComponent;
  let fixture: ComponentFixture<LoginAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginAccountComponent]
    });
    fixture = TestBed.createComponent(LoginAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
