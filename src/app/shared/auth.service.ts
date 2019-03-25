import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { catchError, tap, flatMap, map } from 'rxjs/operators'; // Error handling

import { Observable, Subject } from 'rxjs';

import { User } from '../model/user.model';

@Injectable()
export class AuthService {
    
    constructor(
        private router: Router,
        private http: HttpClient) { }

    loginUser(user: User): Observable<any> {
        const apiUrl = 'http://localhost:8080/api/login';

        return this.http.post(
            apiUrl,
            user,
            {
                observe: 'response',
                headers: new HttpHeaders({ 'Content-Type': 'application/json' })
            },
        ).pipe(
            tap( (resp: HttpResponse<any>) => {

                // console.log(resp);
                
                if (resp.body.token) {
                    localStorage.setItem('token', resp.body.token);
                    // this.userAuthenticatedEvent.next(user);
                } else {
                    console.log('Not found token field in the response body');
                }
                
            })
        );
    }

    isAuthenticated() {
        return localStorage.getItem('token') != null;
    }

    logout() {
        localStorage.removeItem('token');
    }
}