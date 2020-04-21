import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Exercise } from '../exercise.model';
import { Store, select } from '@ngrx/store';

import * as fromTraining from '../store/training.reducer';

@Component({
  selector: 'app-canceled-trainings',
  templateUrl: './canceled-trainings.component.html',
  styleUrls: ['./canceled-trainings.component.css']
})
export class CanceledTrainingsComponent implements OnInit, AfterViewInit {

  constructor(private trainingService: TrainingService,
              private store: Store<fromTraining.State>) {}

  displayedColumns: string[] = [ 'name', 'date', 'calories', 'duration', 'state'];
  dataSource = new MatTableDataSource<Exercise>();

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  ngOnInit() {
    this.trainingService.fetchCanceledExercises();

    this.store.pipe(select(fromTraining.getCanceledExercises)).subscribe((exercises: Exercise[]) => {
      this.dataSource.data = exercises;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
