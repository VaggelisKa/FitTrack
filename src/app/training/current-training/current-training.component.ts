import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import * as fromStopTraining from './stop.training.component';
import { TrainingService } from '../training.service';

import * as fromTraining from '../store/training.reducer';
import { Store, select } from '@ngrx/store';
import { take } from 'rxjs/operators';

export interface DialogData {
  stopExercise: boolean;
}


@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: any;
  stopExercise = false;

  constructor(public dialog: MatDialog,
              private trainingService: TrainingService,
              private store: Store<fromTraining.State>) {}

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    this.store.pipe(take(1), select(fromTraining.getActiveTraining)).subscribe(exercise => {
      const step = exercise.duration / 100 * 1000;
      this.timer = setInterval(() => {
        this.progress = this.progress + 1;
        if (this.progress >= 100) {
          clearInterval(this.timer);
          this.trainingService.completeExercise();
        }
      }, step);
    });
  }

  onStop() {
    clearInterval(this.timer);

    const dialogRef = this.dialog.open(fromStopTraining.StopTrainingComponent, {
      width: '250px',
      data:  {stopExercise : this.stopExercise, progress: this.progress}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.stopExercise = result;
      if (result) {
        this.trainingService.cancelExercise(this.progress);
      }
      else {
        this.startOrResumeTimer();
      }
    });
  }
}

