import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  signinForm:FormGroup
  constructor(private fb:FormBuilder,private authservice:AuthService,) { }
  maxDate;

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })


    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  submit() {
    if (this.signinForm.valid) {
      this.signinForm.markAllAsTouched();

      this.authservice.loginUser({
        email: this.signinForm.value.email,
        password: this.signinForm.value.password
      });

    }
  }
}
