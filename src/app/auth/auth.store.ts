import { inject } from '@angular/core';
import { User } from '@angular/fire/auth';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  watchState,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';
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

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, authService = inject(AuthService)) => ({
    checkForAuthenticatedUser: rxMethod<void>(
      pipe(
        distinctUntilChanged(),
        tap(() => patchState(store, { pending: true, error: null })),
        switchMap(() => {
          return authService.getAuthenticatedUser$().pipe(
            tapResponse({
              next: (user) =>
                patchState(store, { authenticatedUser: user, pending: false, error: null }),
              error: (error: { message: string }) =>
                patchState(store, {
                  authenticatedUser: null,
                  pending: false,
                  error: error.message,
                }),
            })
          );
        })
      )
    ),
    signInWithEmailAndPassword: rxMethod<{ email: string; password: string }>(
      pipe(
        distinctUntilChanged(),
        tap(() => patchState(store, { pending: true, error: null })),
        switchMap(({ email, password }) => {
          return authService.signInWithEmailAndPassword(email, password).pipe(
            tapResponse({
              next: (user) =>
                patchState(store, { authenticatedUser: user, pending: false, error: null }),
              error: (error: { message: string }) =>
                patchState(store, {
                  authenticatedUser: null,
                  pending: false,
                  error: error.message,
                }),
            })
          );
        })
      )
    ),
    signInWithGoogle: rxMethod<void>(
      pipe(
        distinctUntilChanged(),
        tap(() => patchState(store, { pending: true, error: null })),
        switchMap(() => {
          return authService.signInWithGoogle().pipe(
            tapResponse({
              next: (user) =>
                patchState(store, { authenticatedUser: user, pending: false, error: null }),
              error: (error: { message: string }) =>
                patchState(store, {
                  authenticatedUser: null,
                  pending: false,
                  error: error.message,
                }),
            })
          );
        })
      )
    ),
    signOut: rxMethod<void>(
      pipe(
        distinctUntilChanged(),
        tap(() => patchState(store, { pending: true, error: null })),
        switchMap(() => {
          return authService.signOut().pipe(
            tapResponse({
              next: () =>
                patchState(store, { authenticatedUser: null, pending: false, error: null }),
              error: (error: { message: string }) =>
                patchState(store, { pending: false, error: error.message }),
            })
          );
        })
      )
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
