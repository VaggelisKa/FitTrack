import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { GlobalUIService } from 'src/app/shared/globalUI.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../../app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading$: Observable<boolean>;

  constructor(private authService: AuthService,
              private globalUIService: GlobalUIService,
              private store: Store<{ui: fromApp.State}>) {}

  ngOnInit() {
    this.isLoading$ = this.store.pipe(map(state => state.ui.isLoading));
  }

  onSubmit(form: NgForm) {
    this.authService.login({
      email: form.value.email,
      password: form.value.password
    });
  }

}
