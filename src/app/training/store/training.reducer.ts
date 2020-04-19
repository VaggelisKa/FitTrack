import { Exercise } from '../exercise.model';

import * as fromRoot from '../../app.reducer';
import * as TrainingActions from './training.actions';
import { TrainingService } from '../training.service';

export interface TrainingState {
    availableExercises: Exercise[];
    completedExercises: Exercise[];
    canceledExercises: Exercise[];
    activeExercise: Exercise;
}

export interface State extends fromRoot.State {
    training: TrainingService;
}

export const initialState: TrainingState = {
    availableExercises: [],
    completedExercises: [],
    canceledExercises: [],
    activeExercise: null
};

export function trainingReducer(state = initialState, action: TrainingActions.TrainingActions) {
    switch (action.type) {
        case TrainingActions.SET_AVAILABLE_TRAININGS:
            return {
                ...state,
                availableExercises: action.payload
            };

        case TrainingActions.SET_COMPLETED_TRAININGS:
            return {
                ...state,
                completedExercises: action.payload
            };

        case TrainingActions.SET_CANCELED_TRAININGS:
            return {
                ...state,
                canceledExercises: action.payload
            };

        case TrainingActions.START_TRAINING:
            return {
                ...state,
                activeExercise: action.payload
            };

        case TrainingActions.STOP_TRAINING:
            return {
                ...state,
                activeExercise: null
            };

        default:
            return state;
    }
}

export const getAvailableExercises = (state: TrainingState) => state.availableExercises;
export const getCompletedExercises = (state: TrainingState) => state.completedExercises;
export const getCanceledExercises = (state: TrainingState) => state.canceledExercises;
export const getActiveTraining = (state: TrainingState) => state.activeExercise;
