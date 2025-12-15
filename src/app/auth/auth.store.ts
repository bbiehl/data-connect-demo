import { inject } from '@angular/core';
import { User } from '@angular/fire/auth';
import { mapResponse } from '@ngrx/operators';
import { signalStore, type, watchState, withHooks, withState } from '@ngrx/signals';
import {
  eventGroup,
  Events,
  injectDispatch,
  on,
  withEventHandlers,
  withReducer,
} from '@ngrx/signals/events';
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
    setAuthenticatedUser: type<User>(),
    setAuthenticatedUserNull: type<void>(),
    signInWithGoogle: type<void>(),
    // signInWithEmailAndPassword: type<{ email: string; password: string }>(),
    signOut: type<void>(),
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
    on(authAPIEvents.setAuthenticatedUser, ({ payload: user }) => ({
      authenticatedUser: user,
      pending: false,
      error: null,
    })),
    on(authAPIEvents.setAuthenticatedUserNull, () => ({
      authenticatedUser: null,
      pending: false,
      error: null,
    })),
    on(authAPIEvents.signInWithGoogle, () => ({
      authenticatedUser: null,
      pending: true,
      error: null,
    })),
    // on(
    //   authAPIEvents.signInWithEmailAndPassword, ({ payload: { email, password } }) => ({
    //     authenticatedUser: null,
    //     pending: true,
    //     error: null,
    //   })
    // ),
    on(authAPIEvents.signOut, () => ({
      authenticatedUser: null,
      pending: true,
      error: null,
    })),
    on(authAPIEvents.error, ({ payload: error }) => ({
      authenticatedUser: null,
      pending: false,
      error: error,
    }))
  ),
  withEventHandlers(
    (
      store,
      events = inject(Events),
      authService = inject(AuthService),
      dispatch = injectDispatch(authAPIEvents)
    ) => ({
      checkForAuthenticatedUser$: events.on(authAPIEvents.checkforAuthenticatedUser).pipe(
        switchMap(() =>
          authService.getAuthenticatedUser$().pipe(
            mapResponse({
              next: (user) => {
                if (user) {
                  dispatch.setAuthenticatedUser(user);
                } else {
                  dispatch.setAuthenticatedUserNull();
                }
              },
              error: (error: { message: string }) => {
                dispatch.error(error.message);
              },
            })
          )
        )
      ),
      signInWithGoogle$: events.on(authAPIEvents.signInWithGoogle).pipe(
        switchMap(() =>
          authService.signInWithGoogle().pipe(
            mapResponse({
              next: (user) => {
                if (user) {
                  dispatch.setAuthenticatedUser(user);
                } else {
                  dispatch.setAuthenticatedUserNull();
                }
              },
              error: (error: { message: string }) => {
                dispatch.error(error.message);
              },
            })
          )
        )
      ),
      signOut$: events.on(authAPIEvents.signOut).pipe(
        switchMap(() =>
          authService.signOut().pipe(
            mapResponse({
              next: () => {
                dispatch.setAuthenticatedUserNull();
              },
              error: (error: { message: string }) => {
                dispatch.error(error.message);
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
    })
  ),
  withHooks({
    onInit(store) {
      watchState(store, (state) => {
        console.log('Auth State Changed', state);
      });
    },
  })
);
