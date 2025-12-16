import { inject, Injectable, signal } from '@angular/core';
import {
  Auth,
  authState,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { asyncScheduler, from, map, Observable, scheduled, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);
  public storedEmail = signal<string | null>(null);

  getAuthenticatedUser$(): Observable<User | null> {
    return authState(this.auth);
  }

  setStoredEmail(email: string): void {
    this.storedEmail.set(email);
  }

  signInWithEmailAndPassword(email: string, password: string): Observable<User | null> {
    return scheduled(signInWithEmailAndPassword(this.auth, email, password), asyncScheduler).pipe(
      switchMap(async (result) => result.user)
    );

    // return from(signInWithEmailAndPassword(this.auth, email, password).then(async (result) => {
    //   if (result.user) {
    //     return this.auth.currentUser;
    //   } else {
    //     return null;
    //   }
    // }));
  }

  signInWithGoogle(): Observable<User | null> {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    return from(
      signInWithPopup(this.auth, provider).then(async (result) => {
        if (result.user) {
          return this.auth.currentUser;
        } else {
          return null;
        }
      })
    );
  }

  signOut(): Observable<void> {
    this.router.navigate(['/']);
    return from(this.auth.signOut());
  }
}
