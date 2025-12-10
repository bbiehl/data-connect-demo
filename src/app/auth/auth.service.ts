import { inject, Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Auth, authState } from '@angular/fire/auth';
import { User } from 'firebase/auth';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);

  checkForAuthenticatedUser(): Signal<User | null> {
    return toSignal(authState(this.auth).pipe(map((user) => user ?? null)), { initialValue: null });
  }
}
