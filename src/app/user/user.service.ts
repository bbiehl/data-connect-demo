import { inject, Injectable } from '@angular/core';
import { AuthStore } from '../auth/auth.store';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly authStore = inject(AuthStore);

  
  get currentUserId(): string | null {
    return this.authStore.authenticatedUser()?.uid ?? null;
  } 

}
