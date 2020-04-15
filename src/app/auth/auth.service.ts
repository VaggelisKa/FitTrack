import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import {MatSnackBar} from '@angular/material';

import { AuthData } from './auth-data.model';
import { TrainingService } from '../training/training.service';
import { GlobalUIService } from '../shared/globalUI.service';


@Injectable()
export class AuthService {
    private isAuth = false;
    authChange = new Subject<boolean>();

    constructor(private router: Router,
                private afAuth: AngularFireAuth,
                private trainingService: TrainingService,
                private snackBar: MatSnackBar,
                private globalUIService: GlobalUIService) {}

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
        this.globalUIService.isLoading.next(true);
        this.afAuth.auth.createUserWithEmailAndPassword(
            authData.email,
            authData.password
            ).then(result => {
                console.log(result);
                this.globalUIService.isLoading.next(false);
            }).catch(error => {
                this.snackBar.open(error.message, 'Close', {
                    duration: 4000
                });
                this.globalUIService.isLoading.next(false);
            });
    }

    login(authData: AuthData) {
        this.globalUIService.isLoading.next(true);
        this.afAuth.auth.signInWithEmailAndPassword(
            authData.email,
            authData.password
        ).then(result => {
            console.log(result);
            this.globalUIService.isLoading.next(false);
        }).catch(error => {
            this.snackBar.open(error.message, 'Close', {
                duration: 4000
            });
            this.globalUIService.isLoading.next(false);
        });
    }

    logout() {
        this.afAuth.auth.signOut();
    }

    isAuthenticated() {
        return this.isAuth;
    }
}
