import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  appVersion: string = `v${environment.appVersion}`

  constructor(
    private authService: AuthService,
    private router: Router
  ) { 
    // Ok, nothing here
  }

  ngOnInit() {
    // Ok, nothing here
  }

  isAuthenticated() {
    // console.log(this.authService.isAuthenticated());
    return this.authService.isAuthenticated();
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
