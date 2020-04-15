import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

import { AuthData } from './auth-data.model';
import { TrainingService } from '../training/training.service';


@Injectable()
export class AuthService {
    private isAuth = false;
    authChange = new Subject<boolean>();

    constructor(private router: Router,
                private afAuth: AngularFireAuth,
                private trainingService: TrainingService) {}

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
        this.afAuth.auth.createUserWithEmailAndPassword(
            authData.email,
            authData.password
            ).then(result => {
                console.log(result);
            }).catch(error => {
                console.log(error);
            });
    }

    login(authData: AuthData) {
        this.afAuth.auth.signInWithEmailAndPassword(
            authData.email,
            authData.password
        ).then(result => {
            console.log(result);
        }).catch(error => {
            console.log(error);
        });

        this.authChange.next(true);
        this.router.navigate(['/training']);
    }

    logout() {
        this.afAuth.auth.signOut();
    }

    isAuthenticated() {
        return this.isAuth;
    }
}
