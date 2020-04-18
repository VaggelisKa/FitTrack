import { Action } from '@ngrx/store';

export const LOGGED_IN = '[Auth] Logged In';
export const LOGGED_OUT = '[Auth] Logged Out';

export class LoggedIn implements Action {
    readonly type = LOGGED_IN;
}

export class LoggedOut implements Action {
    readonly type = LOGGED_OUT;
}

export type AuthActions = LoggedIn | LoggedOut;
