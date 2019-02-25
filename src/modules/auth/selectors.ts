import { AppState, AuthState } from '../';

export const selectSignInRequire2FA = (state: AppState): AuthState['require2FA'] | undefined =>
    state.auth.require2FA;
