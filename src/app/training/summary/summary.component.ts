import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleChartComponent } from 'angular-google-charts';
import { Observable } from 'rxjs';
import { Exercise } from '../exercise.model';
import { Store } from '@ngrx/store';

import * as fromTraining from '../store/training.reducer';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
canceledExercises$: Observable<Exercise[]>;
completedExercises$: Observable<Exercise[]>;

  myData = [
    ['London', 8136000],
    ['New York', 8538000],
    ['Paris', 2244000],
    ['Berlin', 3470000],
    ['Kairo', 19500000],
  ];


  options = {
    title: 'Exercise Summary',
    is3D: true,
    width: 650,
    height: 400,
  };

  @ViewChild('chart') chart: GoogleChartComponent;

  constructor(private store: Store<fromTraining.State>) { }

  ngOnInit(): void {
  }

}
