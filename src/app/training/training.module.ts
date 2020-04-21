import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';

import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { StopTrainingComponent } from './current-training/stop.training.component';
import { TrainingRoutingModule } from './training-routing.module';
import { CanceledTrainingsComponent } from './canceled-trainings/canceled-trainings.component';
import { trainingReducer } from './store/training.reducer';
import { SummaryComponent } from './summary/summary.component';
import { GoogleChartsModule } from 'angular-google-charts';

@NgModule({
    declarations: [
        TrainingComponent,
        CurrentTrainingComponent,
        NewTrainingComponent,
        PastTrainingComponent,
        StopTrainingComponent,
        CanceledTrainingsComponent,
        SummaryComponent,
    ],

    imports: [
        SharedModule,
        TrainingRoutingModule,
        StoreModule.forFeature('training', trainingReducer),
        GoogleChartsModule
    ],

    exports: [],
})
export class TrainingModule {}
