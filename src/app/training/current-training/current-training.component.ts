import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import * as fromStopTraining from './stop.training.component';

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
  exerciseTimeSecs = 30;
  stopExercise = false;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.timer = setInterval(() => {
      this.progress = this.progress + (100 / this.exerciseTimeSecs);
      this.progress = Math.round(this.progress);
      if (this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  onStop() {
    clearInterval(this.timer);

    const dialogRef = this.dialog.open(fromStopTraining.StopTrainingComponent, {
      width: '250px',
      data:  {stopExercise : this.stopExercise, progress: this.progress}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.stopExercise = result;
      console.log(this.stopExercise);
    });
  }
}

