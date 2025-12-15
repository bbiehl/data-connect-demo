import { effect, inject } from '@angular/core';
import { User } from '@angular/fire/auth';
import { mapResponse } from '@ngrx/operators';
import { getState, signalStore, type, watchState, withHooks, withState } from '@ngrx/signals';
import { eventGroup, Events, on, withEventHandlers, withReducer } from '@ngrx/signals/events';
import { switchMap, tap } from 'rxjs';
import { AuthService } from './auth.service';

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

export const authAPIEvents = eventGroup({
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
    on(authAPIEvents.checkforAuthenticatedUser, () => ({
      authenticatedUser: null,
      pending: true,
      error: null,
    })),
    on(authAPIEvents.setAuthenticatedUserSuccess, ({ payload: user }) => ({
      authenticatedUser: user,
      pending: false,
      error: null,
    })),
    on(authAPIEvents.setAuthenticatedUserFail, () => ({
      authenticatedUser: null,
      pending: false,
      error: null,
    })),
    on(authAPIEvents.error, ({ payload: error }) => ({
      authenticatedUser: null,
      pending: false,
      error: error,
    }))
  ),
  withEventHandlers((store, events = inject(Events), authService = inject(AuthService)) => ({
    checkForAuthenticatedUser$: events.on(authAPIEvents.checkforAuthenticatedUser).pipe(
      switchMap(() =>
        authService.getAuthenticatedUser$().pipe(
          mapResponse({
            next: (user) => {
              if (user) {
                console.log('AuthStore - Authenticated user found:', user);
                authAPIEvents.setAuthenticatedUserSuccess(user);
              } else {
                console.log('AuthStore - No authenticated user found');
                authAPIEvents.setAuthenticatedUserFail();
              }
            },
            error: (error: { message: string }) => {
              console.error('AuthStore - Error fetching authenticated user:', error);
              authAPIEvents.error(error.message);
            },
          })
        )
      )
    ),
    logError$: events.on(authAPIEvents.error).pipe(
      tap(({ payload: error }) => {
        console.error('Auth Error:', error);
      })
    ),
  })),
  withHooks({
    onInit(store) {
      watchState(store, (state) => {
        console.log('Auth State Changed', state);
      });
    },
  })
);
