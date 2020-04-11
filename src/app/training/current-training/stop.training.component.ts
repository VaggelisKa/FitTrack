import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as fromCurrenTraining from './current-training.component';

@Component({
    selector: 'app-stop-training',
    template: `<h1 mat-dialog-title>Are you sure?</h1>
                  <mat-dialog-content>
                      <p>You already got {{data.progress}}% done</p>
                  </mat-dialog-content>
                  <mat-dialog-actions>
                  <button mat-raised-button [mat-dialog-close]="true" color="warn">Yes</button>
                  <button mat-button [mat-dialog-close]="false" color="accent">No</button>
                  </mat-dialog-actions>
                `
  })
  export class StopTrainingComponent {

    constructor(
      public dialogRef: MatDialogRef<fromCurrenTraining.CurrentTrainingComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {}

    // onNoClick(): void {
    //   this.dialogRef.close();
    // }

}
