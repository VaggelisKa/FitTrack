import * as UiActions from './ui.actions';

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
                isLoading: true
            };

        case UiActions.STOP_LOADING:
            return{
                ...state,
               isLoading: false
            };

        default:
            return state;
    }
}

export const getIsLoading = (state: State) => state.isLoading;
