import { inject, Injectable, signal } from '@angular/core';
import {
  Auth,
  authState,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { asyncScheduler, from, Observable, scheduled, switchMap, throwError } from 'rxjs';

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
  }

  signInWithGoogle(): Observable<User | null> {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    return scheduled(signInWithPopup(this.auth, provider), asyncScheduler).pipe(
      switchMap(async (result) => result.user)
    );
  }

  signOut(): Observable<void> {
    this.router.navigate(['/']);
    return scheduled(this.auth.signOut(), asyncScheduler);
  }

  updateUserDisplayName(displayName: string): Observable<void> {
    const currentUser = this.auth.currentUser;
    if (!currentUser) {
      return throwError(() => new Error('Cannot update profile. User not authenticated.'));
    }
    return from(updateProfile(currentUser, { displayName }));
  }
}
