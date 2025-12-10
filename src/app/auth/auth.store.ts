import { User } from '@angular/fire/auth';
import { signalStore, type, watchState, withHooks, withState } from '@ngrx/signals';
import { eventGroup, on, withReducer } from '@ngrx/signals/events';

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
  withHooks({
    onInit(store) {
      watchState(store, (state) => {
        console.log('Auth State Changed', state);
      });
    },
  })
);
