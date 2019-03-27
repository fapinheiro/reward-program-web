import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../model/user.model';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: User[] = [];

  text: string = 'teste';

  constructor( 
    private authService: AuthService,
    private http: HttpClient) { }

  ngOnInit() {}

  onShowUsers() {
    const apiUrl = 'http://localhost:8080/api/users';

    this.http.get<User[]>(
            apiUrl,
            {
                // observe: 'response',
                // params: new HttpParams(),
                headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization' :  localStorage.getItem('token') })
            },
        ).subscribe(
           (users: User[]) => {
             this.users = users;
           }
        );
  }

  onClearUsers() {
    this.users = [];
  }

  isAuthenticated() {
    // console.log(this.authService.isAuthenticated());
    return this.authService.isAuthenticated();
  }

}
