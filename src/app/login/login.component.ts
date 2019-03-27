import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../model/user.model';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hidePassword = true;

  @ViewChild('loginForm') loginForm: NgForm;

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() { 
  }

  onSubmit() {
    const user = new User(
      this.loginForm.value.login,
      this.loginForm.value.password);

    this.authService.loginUser(user).subscribe(
      (data) => {
        if (this.authService.isAuthenticated()) {
          this.router.navigate(['/']);
        } else {
          console.log('Invalid user or password');
        }
      }
    );
  }

  isFormValid(): boolean {
    // console.log(this.loginForm.valid);
    return this.loginForm.valid;
  }
}
