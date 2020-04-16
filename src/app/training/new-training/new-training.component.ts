import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { Subscription } from 'rxjs';
import { GlobalUIService } from 'src/app/shared/globalUI.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  exercisesSubscription: Subscription;
  loadingStateSub: Subscription;
  isLoading = false;

  constructor(private trainingService: TrainingService,
              private globalUiService: GlobalUIService) {}

  ngOnInit() {
    this.loadingStateSub = this.globalUiService.isLoading.subscribe(result => {
      this.isLoading = result;
    });

    this.exercisesSubscription = this.trainingService.exercisesChanged.subscribe(exercises => {
      this.exercises = exercises;
    });
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  onExerciseStart(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
    console.log(form.value.exercise);
  }

  ngOnDestroy() {
    this.exercisesSubscription.unsubscribe();
    this.loadingStateSub.unsubscribe();
  }

}
