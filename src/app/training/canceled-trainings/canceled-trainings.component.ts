import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Exercise } from '../exercise.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-canceled-trainings',
  templateUrl: './canceled-trainings.component.html',
  styleUrls: ['./canceled-trainings.component.css']
})
export class CanceledTrainingsComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private trainingService: TrainingService) {}

  displayedColumns: string[] = [ 'name', 'date', 'calories', 'duration', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  private dataTableSub: Subscription;

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  ngOnInit() {
    this.trainingService.fetchCanceledExercises();
    this.dataTableSub = this.trainingService.canceledExercisesChanged.subscribe((exercises: Exercise[]) => {
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
