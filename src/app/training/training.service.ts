import { Subject } from 'rxjs/Subject';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';


import { Exercise } from './exercise.model';
import { Subscription } from 'rxjs';
import { GlobalUIService } from '../shared/globalUI.service';
import * as fromRoot from '.././app.reducer';
import * as UI from '../shared/ui.actions';
import { Store } from '@ngrx/store';

@Injectable()
export class TrainingService {
    exerciseChanged = new Subject<Exercise>();
    exercisesChanged = new Subject<Exercise[]>();
    finishedExercisesChanged = new Subject<Exercise[]>();
    canceledExercisesChanged = new Subject<Exercise[]>();

    constructor(private db: AngularFirestore,
                private globalUIService: GlobalUIService,
                private store: Store<fromRoot.State>) {}

    private availableExercises: Exercise[] = [];
    private runningExercise: Exercise;
    private fbSubs: Subscription[] = [];

    fetchAvailableExercises() {
        this.store.dispatch(new UI.StartLoading());
        this.fbSubs.push(this.db
        .collection('availableExercises')
        .snapshotChanges()
        .pipe(map(docData => {
            return docData.map(doc => {
                const data: any = doc.payload.doc.data();
                return {
                    id: doc.payload.doc.id,
                    ...data
                };
            });
        }))
        .subscribe((exercises: Exercise[]) => {
            this.store.dispatch(new UI.StopLoading());
            this.availableExercises = exercises;
            this.exercisesChanged.next([...this.availableExercises]);
        }, error => {
            this.globalUIService.getSnackbar('Fethcing Exercises fail', 'Close');
            this.store.dispatch(new UI.StopLoading());
            this.exercisesChanged.next(null);
        })
        );
    }

    private exercisesToDatabase(exercise: Exercise) {
        if (exercise.state === 'completed') {
            this.db.collection('finishedExercises').add(exercise);
        }
        else {
            this.db.collection('canceledExercises').add(exercise);
        }
    }

    startExercise(selectedId: string) {
        this.db.doc('/availableExercises/' + selectedId).update({lastSelected: new Date()});
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

    fetchCompletedExercises() {
        this.fbSubs.push(this.db
        .collection('finishedExercises')
        .valueChanges()
        .subscribe((finishedExercises: Exercise[]) => {
            this.finishedExercisesChanged.next(finishedExercises);
        })
        );
    }

    fetchCanceledExercises() {
        this.fbSubs.push(this.db
            .collection('canceledExercises')
            .valueChanges()
            .subscribe((canceledExercises: Exercise[]) => {
                this.canceledExercisesChanged.next(canceledExercises);
            })
            );
    }

    // Because we need to terminate token given to us by angularfire
    cancelSubscriptions() {
        this.fbSubs.forEach(sub => {
            sub.unsubscribe();
        });
    }
}
