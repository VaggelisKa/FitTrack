import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { GoogleChartComponent } from 'angular-google-charts';
import { Store, select } from '@ngrx/store';

import * as fromTraining from '../store/training.reducer';
import { TrainingService } from '../training.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  completedExerciseLength: number;
  canceledExercisesLength: number;
  chartData = [];

  options = {
    title: 'Exercise Summary',
    is3D: true,
    width: 900,
    height: 500,
    backgroundColor: '#303030',
    titleTextStyle: {color: 'white', fontSize: 19, bold: true},
    legend: {textStyle: {color: '#fff', fontSize: 17}}
  };

  @ViewChild('chart') chart: GoogleChartComponent;

  constructor(private store: Store<fromTraining.State>) { }



  ngOnInit() {
    this.store.pipe(select(fromTraining.getCanceledExercisesLength)).subscribe(exerciseLength => {
      this.canceledExercisesLength = exerciseLength;
      this.setChart();
    });

    this.store.pipe(select(fromTraining.getCompletedExercisesLength)).subscribe(completedExerciseLength => {
      this.completedExerciseLength = completedExerciseLength;
      this.setChart();
    });
  }

  private setChart() {
    this.chartData = [
      ['Completed', this.completedExerciseLength],
      ['Canceled', this.canceledExercisesLength]
    ];
  }
}
