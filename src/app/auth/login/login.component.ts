import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { GlobalUIService } from 'src/app/shared/globalUI.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loadingStateSub: Subscription;
  isLoading = false;

  constructor(private authService: AuthService,
              private globalUIService: GlobalUIService) {}

  ngOnInit() {
    this.loadingStateSub = this.globalUIService.isLoading.subscribe(result => {
      this.isLoading = result;
    });
  }

  onSubmit(form: NgForm) {
    this.authService.login({
      email: form.value.email,
      password: form.value.password
    });
  }

  ngOnDestroy() {
    this.loadingStateSub.unsubscribe();
  }

}
