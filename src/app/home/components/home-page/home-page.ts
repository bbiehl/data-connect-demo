import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AuthStore } from '../../../auth/auth.store';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-home-page',
  imports: [
    JsonPipe,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  authStore = inject(AuthStore);

  topRatedMovies = [
    { title: 'Movie Title 1', rating: 9.5, poster: 'https://picsum.photos/200/300?random=1' },
    { title: 'Movie Title 2', rating: 9.2, poster: 'https://picsum.photos/200/300?random=2' },
    { title: 'Movie Title 3', rating: 9.0, poster: 'https://picsum.photos/200/300?random=3' },
  ];

  recentlyAddedMovies = [
    { title: 'Movie Title 4', added: '2025-11-28', poster: 'https://picsum.photos/200/300?random=4' },
    { title: 'Movie Title 5', added: '2025-11-27', poster: 'https://picsum.photos/200/300?random=5' },
    { title: 'Movie Title 6', added: '2025-11-26', poster: 'https://picsum.photos/200/300?random=6' },
  ];
}
