import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../auth.service';
import { AuthStore } from '../../auth.store';

@Component({
  selector: 'app-verify-email-page',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './verify-email-page.html',
  styleUrl: './verify-email-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerifyEmailPage {
  private readonly authStore = inject(AuthStore);
  
  sendVerificationEmail(): void {
    this.authStore.sendEmailVerificationEmail();
  }
}
