import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import moment from 'moment';
import { AuthService } from '../auth.service';
import { Subscription, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  maxDate;
  doPasswordsMatch = false;
  isLoading$: Observable<boolean>;

  constructor(private authService: AuthService,
              private store: Store<fromRoot.State>) {}
   date = new FormControl(moment());

  ngOnInit() {
    this.isLoading$ = this.store.pipe(select(fromRoot.getIsLoading));

    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  checkPasswordsMatch(form: NgForm) {
    if (form.value.password === form.value.confirmPassword) {
      this.doPasswordsMatch = true;
    }
  }

  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }

}
