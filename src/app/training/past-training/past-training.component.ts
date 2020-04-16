import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';

import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private trainingService: TrainingService) {}

  displayedColumns: string[] = [ 'name', 'date', 'calories', 'duration', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  private dataTableSub: Subscription;

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  ngOnInit() {
    this.trainingService.fetchCompletedOrCanceledExercises();
    this.dataTableSub = this.trainingService.finishedExercisesChanged.subscribe((exercises: Exercise[]) => {
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

  ngOnDestroy() {
    if (this.dataTableSub) {
      this.dataTableSub.unsubscribe();
    }
  }

}
