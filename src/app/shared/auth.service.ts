import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { environment } from '../../environments/environment';

import { User } from '../model/user.model';

@Injectable()
export class AuthService {

    // private token: string;

    constructor(
        private router: Router,
        private http: HttpClient
    ) { 
        // Ok, nothing here
    }

    loginUser(user: User): Observable<any> {
        const apiUrl = `${environment.apiUrl}/login`;

        return this.http.post(
            apiUrl,
            user,
            {
                observe: 'response',
                headers: new HttpHeaders({ 'Content-Type': 'application/json' })
            },
        ).pipe(
            tap((resp: HttpResponse<any>) => {

                // console.log(resp);

                if (resp.body.token) {
                    localStorage.setItem('token', resp.body.token);
                    // this.token = resp.body.token;
                    // this.userAuthenticatedEvent.next(user);
                } else {
                    console.log('Not found token field in the response body');
                }
            }),
            catchError(this.handleError<any>('loginUser'))
        );
    }

    isAuthenticated() {
        return this.getToken() != null;
    }

    logout() {
        localStorage.removeItem('token');
    }

    getToken() {
        return localStorage.getItem('token');
    }

    /**
    * Handle Http operation that failed.
    * Let the app continue.
    * @param operation - name of the operation that failed
    * @param result - optional value to return as the observable result
    */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            //this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}