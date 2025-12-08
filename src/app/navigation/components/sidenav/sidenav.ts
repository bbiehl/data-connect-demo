import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatSidenavContainer, MatSidenavModule } from '@angular/material/sidenav';
import { DomSanitizer } from '@angular/platform-browser';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  Router,
  RouterModule,
} from '@angular/router';
import { Footer } from '../../../shared/components/footer/footer';
import { Navlinks } from '../../../shared/components/navlinks/navlinks';
import { GITHUB_ICON, LINKEDIN_ICON, TWITTER_ICON } from '../../../shared/constants/icons.const';
import { Theme } from '../../../theme/components/theme/theme';
import { NavigationService } from '../../navigation.service';

@Component({
  selector: 'app-sidenav',
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatSidenavModule,
    RouterModule,
    Navlinks,
    Footer,
    Theme,
  ],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidenav implements AfterViewInit {
  @ViewChild(MatSidenavContainer) sideNavContainer!: MatSidenavContainer;
  navigationService = inject(NavigationService);
  showBackToTopFab = signal(false);
  private router = inject(Router);

  constructor() {
    const iconRegistry = inject(MatIconRegistry);
    const sanitizer = inject(DomSanitizer);
    iconRegistry.addSvgIconLiteral(
      'linkedin-icon',
      sanitizer.bypassSecurityTrustHtml(LINKEDIN_ICON)
    );
    iconRegistry.addSvgIconLiteral('github-icon', sanitizer.bypassSecurityTrustHtml(GITHUB_ICON));
    iconRegistry.addSvgIconLiteral('twitter-icon', sanitizer.bypassSecurityTrustHtml(TWITTER_ICON));

    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.sideNavContainer.scrollable.scrollTo({ top: 0 });
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  ngAfterViewInit(): void {
    this.sideNavContainer.scrollable.elementScrolled().subscribe(() => {
      const scrollTop = this.sideNavContainer.scrollable.measureScrollOffset('top');
      this.showBackToTopFab.set(scrollTop > window.innerHeight);
    });
  }

  scrollToTop(): void {
    this.sideNavContainer.scrollable.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
