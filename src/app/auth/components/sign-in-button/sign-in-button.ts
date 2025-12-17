import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { NavigationService } from '../../../navigation/navigation.service';
import { AuthStore } from '../../auth.store';

@Component({
  selector: 'app-sign-in-button',
  imports: [MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './sign-in-button.html',
  styleUrl: './sign-in-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInButton {
  protected readonly authStore = inject(AuthStore);
  private readonly navigationService = inject(NavigationService);

  onLinkClicked(): void {
    this.navigationService.closeSidenav();
  }

  signout(): void {
    this.authStore.signOut();
  }
}
