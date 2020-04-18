import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import * as jwt_decode from 'jwt-decode';

import { environment } from '../../environments/environment';

import { User } from '../model/user.model';
import { MessageService } from './message/message.service';

export enum RoleEnum {
    ADMIN = "ROLE_ADMIN",
    USER = "ROLE_USER",
    CLIENT = "ROLE_CLIENT",
    PARTNER = "ROLE_PARTNER"
}

@Injectable()
export class AuthService implements OnDestroy {

    private refreshTokenWorker: any;

    constructor(
        private router: Router,
        private http: HttpClient
    ) { 
        // Ok, nothing here
    }

    ngOnDestroy() {
        if (this.refreshTokenWorker) {
            clearTimeout(this.refreshTokenWorker);
        }
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

                if (resp.body.token) {
                    localStorage.setItem('token', resp.body.token);

                    // Create refresh token when token is near to expire (10 seconds before)
                    let expiresAt (this.getTokenExpiration() * 1000) - new Date().getTime() - (10 * 1000);
                    console.log(expiresAt);
                    let refreshTokenWorker = setTimeout( () => {
                        console.log('Token is near to expire, sending refresh token request.')
                    }, expiresAt);

                } else {
                    console.log('Not found field `token` in the response body');
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

    getToken(): string {
        return localStorage.getItem('token');
    }

    getTokenId(): number {
        if (this.isAuthenticated()) {
            let authInfo = jwt_decode(this.getToken());
            if (authInfo.id) return authInfo.id as number;
        }
        return null;
    }

    getTokenLogin(): string {
        if (this.isAuthenticated()) {
            let authInfo = jwt_decode(this.getToken());
            if (authInfo.sub) return authInfo.sub as string;
        }
        return null;
    }

    getTokenExpiration(): number {
        if (this.isAuthenticated()) {
            let authInfo = jwt_decode(this.getToken());
            if (authInfo.exp) return authInfo.exp as number;
        }
        return null;
    }

    hasRole(role: RoleEnum): boolean {
        if (this.isAuthenticated()) {
            let authInfo = jwt_decode(this.getToken());
            if (authInfo.roles) {
                let roles: string[] = authInfo.roles as string[];
                return roles.includes(role);
            }
        }
        return false;
    }

    isAdmin() {
        return this.hasRole(RoleEnum.ADMIN);
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
            console.error('AuthorizationService error', error); // log to console instead

            // TODO: better job of transforming error for user consumption
            //this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}