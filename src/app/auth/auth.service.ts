import { inject, Injectable } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { User } from 'firebase/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);

  getAuthenticatedUser$(): Observable<User | null> {
    return authState(this.auth);
    //  return(throwError('Not implemented yet'));
  }
}
