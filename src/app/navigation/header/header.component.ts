import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';

import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // tslint:disable-next-line: no-output-native
  @Output() open = new EventEmitter<void>();
  isAuth$: Observable<boolean>;

  constructor(private authsService: AuthService,
              private router: Router,
              private store: Store<fromRoot.State>) { }

  ngOnInit(): void {
    this.isAuth$ = this.store.pipe(select(fromRoot.getIsAuthenticated));
  }

  onToggleSidenav() {
    this.open.emit();
  }

  onLogout() {
    this.authsService.logout();
    this.router.navigate(['/login']);
  }
}
