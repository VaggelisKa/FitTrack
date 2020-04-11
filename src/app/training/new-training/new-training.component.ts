import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  constructor() {}

  @Output() exerciseStarted = new EventEmitter<void>();

  ngOnInit(): void {
  }

  onExerciseStart() {
    this.exerciseStarted.emit();
  }

}
