import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  // tslint:disable-next-line: no-output-native
  @Output() close = new EventEmitter<void>();
  isAuth$: Observable<boolean>;

  constructor(private authService: AuthService,
              private router: Router,
              private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.isAuth$ = this.store.pipe(select(fromRoot.getIsAuthenticated));
  }

  onClose() {
    this.close.emit();
  }

  onLogout() {
    this.onClose();
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
