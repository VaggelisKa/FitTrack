import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { Route } from '@angular/compiler/src/core';
import { Store, select } from '@ngrx/store';

import * as fromRoot from '.././app.reducer';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router,
                private store: Store<fromRoot.State>) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        return this.store.pipe(take(1), select(fromRoot.getIsAuthenticated));

    }

    canLoad(route: Route) {
        return this.store.pipe(take(1), select(fromRoot.getIsAuthenticated));
    }
}
