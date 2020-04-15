import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import moment from 'moment';
import { AuthService } from '../auth.service';
import { GlobalUIService } from 'src/app/shared/globalUI.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit, OnDestroy {
  maxDate;
  isLoading = false;
  authStateSub: Subscription;

  constructor(private authService: AuthService,
              private globalUIService: GlobalUIService) {}
   date = new FormControl(moment());

  ngOnInit() {
    this.authStateSub = this.globalUIService.isLoading.subscribe(result => {
      this.isLoading = result;
    });

    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }

  ngOnDestroy() {
    this.authStateSub.unsubscribe();
  }

}
