import { inject, Injectable, signal } from '@angular/core';
import {
  Auth,
  authState,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  User,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { from, Observable, switchMap, throwError } from 'rxjs';

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
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(async (result) => result.user)
    );
  }

  signInWithGoogle(): Observable<User | null> {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    return from(signInWithPopup(this.auth, provider)).pipe(
      switchMap(async (result) => result.user)
    );
  }

  signOut(): Observable<void> {
    this.router.navigate(['/']);
    return from(this.auth.signOut());
  }

  updateUserDisplayName(displayName: string): Observable<void> {
    const currentUser = this.auth.currentUser;
    if (!currentUser) {
      return throwError(() => new Error('Cannot update profile. User not authenticated.'));
    }
    return from(updateProfile(currentUser, { displayName }));
  }
}
