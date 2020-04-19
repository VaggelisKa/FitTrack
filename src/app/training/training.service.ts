import { Subject } from 'rxjs/Subject';
import { map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';


import { Exercise } from './exercise.model';
import { Subscription } from 'rxjs';
import { GlobalUIService } from '../shared/globalUI.service';
import * as fromTraining from './store/training.reducer';
import * as UI from '../shared/ui.actions';
import * as TrainingActions from './store/training.actions';
import { Store, select } from '@ngrx/store';

@Injectable()
export class TrainingService {
    exerciseChanged = new Subject<Exercise>();
    exercisesChanged = new Subject<Exercise[]>();
    finishedExercisesChanged = new Subject<Exercise[]>();
    canceledExercisesChanged = new Subject<Exercise[]>();

    constructor(private db: AngularFirestore,
                private globalUIService: GlobalUIService,
                private store: Store<fromTraining.State>) {}

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
            this.store.dispatch(new TrainingActions.SetAvailableTrainings(exercises));
        }, error => {
            this.globalUIService.getSnackbar('Fethcing Exercises fail', 'Close');
            this.store.dispatch(new UI.StopLoading());
            this.store.dispatch(new TrainingActions.SetAvailableTrainings(null));
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
        this.store.dispatch(new TrainingActions.StartTraining(selectedId));
    }

    cancelExercise(progress: number) {
        this.store.pipe(take(1), select(fromTraining.getActiveTraining)).subscribe((exercise: Exercise) => {
            this.exercisesToDatabase({
                ...exercise,
                duration: exercise.duration * (progress / 100),
                calories: exercise.calories * (progress / 100),
                date: new Date(),
                state: 'canceled'
            });
            this.store.dispatch(new TrainingActions.StopTraining());
        });
    }

    completeExercise() {
        this.store.pipe(take(1), select(fromTraining.getActiveTraining)).subscribe((exercise: Exercise) => {
            this.exercisesToDatabase({
                ...exercise,
                date: new Date(),
                state: 'completed'
            });
            this.store.dispatch(new TrainingActions.StopTraining());
        });

    }

    fetchCompletedExercises() {
        this.fbSubs.push(this.db
        .collection('finishedExercises')
        .valueChanges()
        .subscribe((finishedExercises: Exercise[]) => {
            this.store.dispatch(new TrainingActions.SetCompletedTrainings(finishedExercises));
        })
        );
    }

    fetchCanceledExercises() {
        this.fbSubs.push(this.db
            .collection('canceledExercises')
            .valueChanges()
            .subscribe((canceledExercises: Exercise[]) => {
                this.store.dispatch(new TrainingActions.SetCanceledTrainings(canceledExercises));
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
