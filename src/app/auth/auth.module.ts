import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ConfirmEqualValidatorDirective } from './signup/confirm-password.directive';

@NgModule({
    declarations: [
        SignupComponent,
        LoginComponent,
        ConfirmEqualValidatorDirective
    ],

    imports: [
        AngularFireAuthModule,
        SharedModule,
        AuthRoutingModule,
    ],
})
export class AuthModule {}
