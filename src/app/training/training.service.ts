import { Subject } from 'rxjs/Subject';

import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class TrainingService {
    exerciseChanged = new Subject<Exercise>();

    constructor(private db: AngularFirestore) {}

    private availableExercises: Exercise[] = [];
    private runningExercise: Exercise;
    private exerciseSummary: Exercise[] = [];

    fetchAvailableExercises() {
        return this.availableExercises.slice();
    }

    startExercise(selectedId: string) {
        this.runningExercise = this.availableExercises.find(ex =>
            ex.id === selectedId);
        this.exerciseChanged.next({...this.runningExercise});
    }

    cancelExercise(progress: number) {
        this.exerciseSummary.push({
            ...this.runningExercise,
            duration: this.runningExercise.duration * (progress / 100),
            calories: this.runningExercise.calories * (progress / 100),
            date: new Date(),
            state: 'canceled'
        });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    completeExercise() {
        this.exerciseSummary.push({
            ...this.runningExercise,
            date: new Date(),
            state: 'completed'
        });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    getRunningExercise() {
        return {...this.runningExercise};
    }

    getCompletedOrCanceledExercises() {
        return this.exerciseSummary.slice();
    }
}
