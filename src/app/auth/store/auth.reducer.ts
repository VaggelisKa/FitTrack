import * as AuthActions from './auth.actions';

export interface State {
    isAuthenticated: boolean;
}

export const initialState: State = {
    isAuthenticated: false
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
    switch (action.type) {
        case AuthActions.LOGGED_IN:
            return {
                ...state,
                isAuthenticated: true
            };

        case AuthActions.LOGGED_OUT:
            return {
                ...state,
                isAuthenticated: false
            };

        default:
            return state;
    }
}

export const getIsAuth = (state: State) => state.isAuthenticated;
