import { inject, Injectable, signal } from '@angular/core';
import {
  Auth,
  authState,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  User,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { from, Observable, switchMap } from 'rxjs';

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

  resetPassword(email: string): void {
    // check if email exists in the firebase auth system before sending reset email
    // should this be handled in the auth store?
    console.log('Initiating password reset for', email);
  }


  sendEmailVerificationEmail(): Observable<void> {
    console.log('Sending verification email to', this.auth.currentUser?.email);
    return from(sendEmailVerification(this.auth.currentUser!));
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
