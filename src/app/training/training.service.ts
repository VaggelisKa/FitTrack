import { Subject } from 'rxjs/Subject';
import { map } from 'rxjs/operators';

import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class TrainingService {
    exerciseChanged = new Subject<Exercise>();
    exercisesChanged = new Subject<Exercise[]>();
    finishedExercisesChanged = new Subject<Exercise[]>();

    constructor(private db: AngularFirestore) {}

    private availableExercises: Exercise[] = [];
    private runningExercise: Exercise;

    fetchAvailableExercises() {
        this.db
        .collection('availableExercises')
        .snapshotChanges()
        .pipe(map(docData => {
            return docData.map(doc => {
                const data: any = doc.payload.doc.data();
                return {
                    id: doc.payload.doc.data(),
                    ...data
                };
            });
        }))
        .subscribe((exercises: Exercise[]) => {
            this.availableExercises = exercises;
            this.exercisesChanged.next([...this.availableExercises]);
        });
    }

    private exercisesToDatabase(exercise: Exercise) {
        this.db.collection('finishedExercises').add(exercise);
    }

    startExercise(selectedId: string) {
        this.runningExercise = this.availableExercises.find(ex =>
            ex.id === selectedId);
        this.exerciseChanged.next({...this.runningExercise});
    }

    cancelExercise(progress: number) {
        this.exercisesToDatabase({
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
        this.exercisesToDatabase({
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

    fetchCompletedOrCanceledExercises() {
        this.db
        .collection('finishedExercises')
        .valueChanges()
        .subscribe((finishedExercises: Exercise[]) => {
            this.finishedExercisesChanged.next(finishedExercises);
        });
    }
}
