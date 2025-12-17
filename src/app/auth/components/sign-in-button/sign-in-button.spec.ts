import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInButton } from './sign-in-button';

describe('SignInButton', () => {
  let component: SignInButton;
  let fixture: ComponentFixture<SignInButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignInButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignInButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
