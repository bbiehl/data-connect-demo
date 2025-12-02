import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { Footer } from '../../../shared/components/footer/footer';

@Component({
  selector: 'app-sidenav',
  imports: [MatSidenavModule, RouterModule, Footer],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidenav {}
