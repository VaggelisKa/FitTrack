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
completedExercisesLength = 5;
chartData = [];


  options = {
    title: 'Exercise Summary',
    is3D: true,
    width: 900,
    height: 500,
    backgroundColor: '#303030',
    titleTextStyle: {color: 'white',
                    bold: true}
  };

  @ViewChild('chart') chart: GoogleChartComponent;

  constructor(private trainingService: TrainingService,
              private store: Store<fromTraining.State>) { }



  ngOnInit() {
    this.store.pipe(select(fromTraining.getCanceledExercisesLength)).subscribe(exerciselength => {
      this.chartData = [
        ['Canceled', exerciselength]
      ];
    });
  }
}
