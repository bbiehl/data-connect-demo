import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { Navlinks } from '../../../shared/components/navlinks/navlinks';
import { Theme } from '../../../theme/components/theme/theme';
import { NavigationService } from '../../navigation.service';
import { SignInButton } from '../../../auth/components/sign-in-button/sign-in-button';

@Component({
  selector: 'app-navbar',
  imports: [MatButtonModule, MatIconModule, MatToolbarModule, RouterModule, Navlinks, SignInButton, Theme],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {
  navigationService = inject(NavigationService);
}
