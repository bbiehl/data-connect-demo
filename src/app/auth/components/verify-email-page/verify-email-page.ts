import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthStore } from '../../auth.store';

@Component({
  selector: 'app-verify-email-page',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './verify-email-page.html',
  styleUrl: './verify-email-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerifyEmailPage {
  protected readonly authStore = inject(AuthStore);

  sendVerificationEmail(): void {
    console.log('VerifyEmailPage: sendVerificationEmail() called.');
    this.authStore.sendEmailVerificationEmail();
  }
}
