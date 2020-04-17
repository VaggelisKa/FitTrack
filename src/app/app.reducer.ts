export interface State {
    isLoading: boolean;
}

const initialState: State = {
    isLoading: false,
};

export function appReducer(state = initialState, action) {
    switch (action.type) {
        case 'START_LOADING':
            return {
                ...state,
                isLoading: true
            };

        case 'STOP_LOADING':
            return {
                ...state,
                isLoading: false
            };

        default:
            return state;
    }
}
