import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';

import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { Store, select } from '@ngrx/store';
import * as fromTraining from '../store/training.reducer';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit {

  constructor(private trainingService: TrainingService,
              private store: Store<fromTraining.State>) {}

  displayedColumns: string[] = [ 'name', 'date', 'calories', 'duration', 'state', 'delete'];
  dataSource = new MatTableDataSource<Exercise>();

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  ngOnInit() {
    this.trainingService.fetchCompletedExercises();
    this.store.pipe(select(fromTraining.getCompletedExercises)).subscribe((exercises: Exercise[]) => {
      this.dataSource.data = exercises;
    });
  }

  onDelete(id: any) {
    console.log(id);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
