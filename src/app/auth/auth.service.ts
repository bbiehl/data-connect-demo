import { inject, Injectable, signal } from '@angular/core';
import {
  Auth,
  authState,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  User,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { catchError, from, Observable, of, switchMap, tap } from 'rxjs';

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

  sendResetPasswordEmail(email: string): Observable<void> {
    console.log('Initiating password reset for', this.auth.currentUser?.email);
    return from(sendPasswordResetEmail(this.auth, email));
  }

  sendEmailVerificationEmail(): Observable<void> {
    console.log('AuthService: sendEmailVerificationEmail called.');
    console.log('AuthService: Current user object:', this.auth.currentUser);

    if (!this.auth.currentUser) {
      console.error('AuthService: Cannot send verification email, user is null.');
      return of(undefined);
    }

    return from(sendEmailVerification(this.auth.currentUser)).pipe(
      tap(() => console.log('AuthService: sendEmailVerification successful (Promise resolved).')),
      catchError((error) => {
        console.error('AuthService: Error sending verification email:', error);
        return of(undefined);
      })
    );
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
}
