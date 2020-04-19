import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { Subscription, Observable } from 'rxjs';
import * as fromRoot from '../../app.reducer';
import * as fromTraining from '../store/training.reducer';
import * as TrainingActions from '../store/training.reducer';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises$: Observable<Exercise[]>;
  isLoading$: Observable<boolean>;

  constructor(private trainingService: TrainingService,
              private store: Store<fromTraining.State>) {}

  ngOnInit() {
    this.isLoading$ = this.store.pipe(select(fromRoot.getIsLoading));

    this.exercises$ = this.store.pipe(select(TrainingActions.getAvailableExercises));
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  onExerciseStart(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
    console.log(form.value.exercise);
  }

}
