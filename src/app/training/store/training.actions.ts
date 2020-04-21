import { Action } from '@ngrx/store';
import { Exercise } from '../exercise.model';

export const SET_AVAILABLE_TRAININGS = '[Training] Set Available Trainings';
export const SET_COMPLETED_TRAININGS = '[Training] Set Completed Trainings';
export const SET_CANCELED_TRAININGS = '[Training] Set Canceled Trainings';
export const START_TRAINING = '[Training] Start Training';
export const STOP_TRAINING = '[Training] Stop Training';
export const SET_CANCELED_TRAININGS_LENGTH = '[Training] Set Canceled Trainings Length';
export const SET_COMPLETED_TRAININGS_LENGTH = '[Training] Set Completed Trainings Length';


export class SetAvailableTrainings implements Action {
    readonly type = SET_AVAILABLE_TRAININGS;

    constructor(public payload: Exercise[]) {}
}

export class SetCompletedTrainings implements Action {
    readonly type = SET_COMPLETED_TRAININGS;

    constructor(public payload: Exercise[]) {}
}

export class SetCanceledTrainings implements Action {
    readonly type = SET_CANCELED_TRAININGS;

    constructor(public payload: Exercise[]) {}
}

export class StartTraining implements Action {
    readonly type = START_TRAINING;

    constructor(public payload: string) {}
}

export class StopTraining implements Action {
    readonly type = STOP_TRAINING;
}

export class SetCanceledTrainingsLength implements Action {
    readonly type = SET_CANCELED_TRAININGS_LENGTH;

    constructor(public payload: number) {}
}

export class SetCompletedTrainingsLength implements Action {
    readonly type = SET_COMPLETED_TRAININGS_LENGTH;

    constructor(public payload: number) {}
}

export type TrainingActions =
    | SetAvailableTrainings
    | SetCompletedTrainings
    | SetCanceledTrainings
    | StartTraining
    | StopTraining
    | SetCanceledTrainingsLength
    | SetCompletedTrainingsLength;
