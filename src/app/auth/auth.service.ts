import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

import { AuthData } from './auth-data.model';
import { TrainingService } from '../training/training.service';
import { GlobalUIService } from '../shared/globalUI.service';
import { Store } from '@ngrx/store';

import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as fromAuth from './store/auth.actions';



@Injectable()
export class AuthService {

    constructor(private router: Router,
                private afAuth: AngularFireAuth,
                private trainingService: TrainingService,
                private globalUIService: GlobalUIService,
                private store: Store<fromRoot.State>) {}

    authStateListener() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.store.dispatch(new fromAuth.LoggedIn());
                this.router.navigate(['/training']);
            }
            else {
                this.trainingService.cancelSubscriptions();
                this.store.dispatch(new fromAuth.LoggedOut());
                this.router.navigate(['/login']);
            }
        });
    }

    registerUser(authData: AuthData) {
        this.store.dispatch(new UI.StartLoading());
        this.afAuth.auth.createUserWithEmailAndPassword(
            authData.email,
            authData.password
            ).then(result => {
                console.log(result);
                this.store.dispatch(new UI.StopLoading());
            }).catch(error => {
                this.globalUIService.getSnackbar(error, 'Close');
                this.store.dispatch(new UI.StopLoading());
            });
    }

    login(authData: AuthData) {
        this.store.dispatch(new UI.StartLoading());
        this.afAuth.auth.signInWithEmailAndPassword(
            authData.email,
            authData.password
        ).then(result => {
            console.log(result);
            this.store.dispatch(new UI.StopLoading());
        }).catch(error => {
            this.globalUIService.getSnackbar(error, 'Close');
            this.store.dispatch(new UI.StopLoading());
        });
    }

    logout() {
        this.afAuth.auth.signOut();
    }
}
