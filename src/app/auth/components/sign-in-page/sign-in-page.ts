import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { email, Field, form, required } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { GOOGLE_ICON } from '../../../shared/constants/icons.const';
import { AuthService } from '../../auth.service';
import { AuthStore } from '../../auth.store';

interface SignInData {
  email: string;
  password: string;
}
@Component({
  selector: 'app-sign-in-page',
  imports: [
    Field,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
    JsonPipe,
  ],
  templateUrl: './sign-in-page.html',
  styleUrl: './sign-in-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInPage {
  private readonly authService = inject(AuthService);
  protected readonly authStore = inject(AuthStore);
  hidePassword = signal(true);
  signInModel = signal<SignInData>({
    email: '',
    password: '',
  });
  signInForm = form(this.signInModel, (schemaPath) => {
    required(schemaPath.email, { message: 'Email is required' });
    email(schemaPath.email, { message: 'Enter a valid email address' });
    required(schemaPath.password, { message: 'Password is required' });
  });

  constructor() {
    const iconRegistry = inject(MatIconRegistry);
    const sanitizer = inject(DomSanitizer);
    iconRegistry.addSvgIconLiteral('google-icon', sanitizer.bypassSecurityTrustHtml(GOOGLE_ICON));
  }

  setStoredEmail(): void {
    if (this.signInForm.email().valid()) {
      const email = this.signInForm.email().value();
      this.authService.setStoredEmail(email);
    }
  }

  signInWithGoogle(): void {
    this.authStore.signInWithGoogle();
  }

  // This is temporary until we implement a user profile page
  signOut(): void {
    this.authStore.signOut();
  }

  signInWithEmail(event: Event): void {
    event.preventDefault();
    const credentials = this.signInModel();
    this.authStore.signInWithEmailAndPassword(credentials);
  }

  togglePasswordVisibility(): void {
    this.hidePassword.update((current) => !current);
  }
}
