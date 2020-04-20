import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../model/user.model';
import { AuthService } from '../shared/auth.service';
import { MessageService } from '../shared/message/message.service';
import { environment } from '../../environments/environment'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private users: User[] = [];

  // text: string = 'teste';

  constructor( 
    private authService: AuthService,
    private http: HttpClient,
    private messageService: MessageService
  ) { 
    // Ok, nothing here
  }

  ngOnInit() {
    // Ok, nothing here
  }

  onShowUsers() {
    const apiUrl = `${environment.apiUrl}/users`;

    this.http.get<User[]>(apiUrl)
      .subscribe( users => {
        this.setUsers(users);
      });

    // this.http.get<User[]>(
    //         apiUrl,
    //         {
    //             // observe: 'response',
    //             // params: new HttpParams(),
    //             headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization' :  localStorage.getItem('token') }),
    //         },
    //     ).subscribe(
    //        (users: User[]) => {
    //           this.setUsers(users);
    //        }
    //     );
  }

  onClearUsers() {
    this.users = [];
  }

  isAuthenticated() {
    // console.log(this.authService.isAuthenticated());
    return this.authService.isAuthenticated();
  }

  getUsers() {
    return this.users.slice();
  }

  setUsers(users: User[]) {
    this.users = users;
  }

  openDialog(): void {
    this.messageService.showTokenExpirationMessage();
  }
}
