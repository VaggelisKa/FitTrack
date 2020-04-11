import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: any;
  exerciseTimeSecs = 30;

  constructor() {}

  ngOnInit(): void {
    this.timer = setInterval(() => {
      this.progress = this.progress + (100 / this.exerciseTimeSecs);
      this.progress = Math.round(this.progress);
      if (this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, 1000);
  }
}
