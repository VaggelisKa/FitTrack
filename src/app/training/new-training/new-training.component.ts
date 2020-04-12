import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises: Exercise[] = [];

  constructor(private trainingService: TrainingService) {}

  @Output() exerciseStarted = new EventEmitter<void>();

  ngOnInit() {
    this.exercises = this.trainingService.getAvailableExercises();
  }

  onExerciseStart() {
    this.exerciseStarted.emit();
  }

}
