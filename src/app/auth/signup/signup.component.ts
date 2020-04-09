import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import moment from 'moment';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {

  constructor() {}
   date = new FormControl(moment());

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    console.log(form);
  }

}
