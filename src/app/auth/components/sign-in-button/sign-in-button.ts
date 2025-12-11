import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { NavigationService } from '../../../navigation/navigation.service';

@Component({
  selector: 'app-sign-in-button',
  imports: [MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './sign-in-button.html',
  styleUrl: './sign-in-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInButton {
  private navigationService = inject(NavigationService);

  onLinkClicked(): void {
    this.navigationService.closeSidenav();
  }
}
