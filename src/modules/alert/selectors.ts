import { AppState, AlertState } from '../';

export const selectAlertState = (state: AppState): AlertState => state.alert;
