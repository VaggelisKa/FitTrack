import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import {MatSnackBar} from '@angular/material';

import { AuthData } from './auth-data.model';
import { TrainingService } from '../training/training.service';
import { GlobalUIService } from '../shared/globalUI.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../app.reducer';


@Injectable()
export class AuthService {
    private isAuth = false;
    authChange = new Subject<boolean>();

    constructor(private router: Router,
                private afAuth: AngularFireAuth,
                private trainingService: TrainingService,
                private globalUIService: GlobalUIService,
                private store: Store<{ui: fromApp.State}>) {}

    authStateListener() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.isAuth = true;
                this.authChange.next(true);
                this.router.navigate(['/training']);
            }
            else {
                this.trainingService.cancelSubscriptions();
                this.authChange.next(false);
                this.router.navigate(['/login']);
                this.isAuth = false;
            }
        });
    }

    registerUser(authData: AuthData) {
        this.store.dispatch({type: 'START_LOADING'});
        this.afAuth.auth.createUserWithEmailAndPassword(
            authData.email,
            authData.password
            ).then(result => {
                console.log(result);
                this.store.dispatch({type: 'STOP_LOADING'});
            }).catch(error => {
                this.globalUIService.getSnackbar(error, 'Close');
                this.store.dispatch({type: 'STOP_LOADING'});
            });
    }

    login(authData: AuthData) {
        this.store.dispatch({type: 'START_LOADING'});
        this.afAuth.auth.signInWithEmailAndPassword(
            authData.email,
            authData.password
        ).then(result => {
            console.log(result);
            this.store.dispatch({type: 'STOP_LOADING'});
        }).catch(error => {
            this.globalUIService.getSnackbar(error, 'Close');
            this.store.dispatch({type: 'STOP_LOADING'});
        });
    }

    logout() {
        this.afAuth.auth.signOut();
    }

    isAuthenticated() {
        return this.isAuth;
    }
}
