import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

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

  constructor(private authsService: AuthService) { }

  ngOnInit(): void {
    this.authSubscription = this.authsService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  onToggleSidenav() {
    this.open.emit();
  }

}
