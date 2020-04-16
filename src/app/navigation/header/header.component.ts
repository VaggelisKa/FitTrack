import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  // tslint:disable-next-line: no-output-native
  @Output() open = new EventEmitter<void>();
  isAuth: boolean;
  authSubscription: Subscription;

  constructor(private authsService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.authSubscription = this.authsService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  onToggleSidenav() {
    this.open.emit();
  }

  onLogout() {
    this.authsService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

}
