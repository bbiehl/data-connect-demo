import { User } from '@angular/fire/auth';
import { signalStore, withState } from '@ngrx/signals';

type AuthState = {
  authenticatedUser: User | null;
  loading: boolean;
  error: Error | null;
};

const initialState: AuthState = {
  authenticatedUser: null,
  loading: false,
  error: null,
};

export const AuthStore = signalStore({ providedIn: 'root' }, withState(initialState));
