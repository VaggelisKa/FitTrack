import { Action } from '@ngrx/store';
import * as UiActions from './ui.actions';
import { from } from 'rxjs';

export interface State {
    isLoading: boolean;
}

const initialState: State = {
    isLoading: false
};

export function uiReducer(state = initialState, action: UiActions.UIActions) {
    switch (action.type) {
        case UiActions.START_LOADING:
            return{
                ...state,
                return: true
            };

        case UiActions.STOP_LOADING:
            return{
                ...state,
                return: false
            };

        default:
            return state;
    }
}

export const getIsLoading = (state: State) => state.isLoading;
