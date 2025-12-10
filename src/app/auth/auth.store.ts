import { effect } from '@angular/core';
import { User } from '@angular/fire/auth';
import { getState, signalStore, type, watchState, withHooks, withState } from '@ngrx/signals';
import { eventGroup, on, withReducer } from '@ngrx/signals/events';
// import { authEvents } from './auth.events';

type AuthState = {
  authenticatedUser: User | null;
  pending: boolean;
  error: string | null;
};

const initialState: AuthState = {
  authenticatedUser: null,
  pending: false,
  error: null,
};

export const authEvents = eventGroup({
  source: 'Auth API',
  events: {
    checkforAuthenticatedUser: type<void>(),
    setAuthenticatedUserSuccess: type<User>(),
    setAuthenticatedUserFail: type<void>(),
    error: type<string>(),
  },
});

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withReducer(
    on(authEvents.checkforAuthenticatedUser, () => ({
      authenticatedUser: null,
      pending: true,
      error: null,
    })),
    on(authEvents.setAuthenticatedUserSuccess, ({ payload: user }) => ({
      authenticatedUser: user,
      pending: false,
      error: null,
    })),
    on(authEvents.setAuthenticatedUserFail, () => ({
      authenticatedUser: null,
      pending: false,
      error: null,
    })),
    on(authEvents.error, ({ payload: error }) => ({
      authenticatedUser: null,
      pending: false,
      error: error,
    }))
  ),
  withHooks({
    onInit(store) {
      watchState(store, (state) => {
        console.log('Auth State Changed', state);
      });

      effect(() => {
        console.log('[effect] Authenticated User:', getState(store));
      });
    },
  })
);
