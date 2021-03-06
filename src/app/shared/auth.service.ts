import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { catchError, tap, filter, switchMap, takeUntil } from 'rxjs/operators';
import { Observable, of, interval, Subject, Subscription } from 'rxjs';

import * as jwt_decode from 'jwt-decode';

import { environment } from '../../environments/environment';

import { User } from '../model/user.model';

export enum RoleEnum {
    ADMIN = "ROLE_ADMIN",
    USER = "ROLE_USER",
    CLIENT = "ROLE_CLIENT",
    PARTNER = "ROLE_PARTNER"
}

@Injectable()
export class AuthService implements OnDestroy {

    // private unsubscribe$ = new Subject;
    private subscription: Subscription;

    constructor(
        private router: Router,
        private http: HttpClient
    ) { 
        // Ok, nothing here
    }

    ngOnDestroy() {
        this.destroySubscriptions();
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
            filter( (resp: HttpResponse<any>) => resp.body != null && resp.body.token != null),
            tap((resp: HttpResponse<any>) => {
                this.setToken(resp.body.token);
                this.createRefreshTokenWorker();
            }),
            catchError(this.handleError<any>('loginUser'))
        );
    }

    // Create refresh token when token is near to expire
    // Refresh token only once
    createRefreshTokenWorker() {

        // Current time
        let currentTimeMillis = new Date().getTime();
        
        // Get expire time from the token
        let expirationTimeMillis = new Date(this.getTokenExpiration() * 1000).getTime();

        // Extracts ~10 seconds before token expiration
        let expiresAtMillis = expirationTimeMillis - currentTimeMillis - environment.refreshTokenMillis;

        // Creates an interval
        this.subscription = interval(expiresAtMillis)
        .pipe(
            // takeUntil(this.unsubscribe$),
            switchMap( () =>  this.refreshToken()),
            catchError(this.handleError<any>('createRefreshTokenWorker'))
        )
        .subscribe(
            (resp: HttpResponse<any>) => {
                this.logout();
                this.setToken(resp.body.token);
                console.log("Refresh token granted.");
            }
        );


    }

    // Send refresh token request. 
    // Not necessary to send token in header because auth.interceptor.ts already does this for every request 
    refreshToken(): Observable<any> {
        const apiUrl = `${environment.apiUrl}/auth/refresh_token`;
        
        // Dont mind about the user and passwd
        // User is need to get response with the HttpResponse object format, otherwise
        // Response comes in other format
        let user = new User("grant_type", "xxxxxxxx"); 
        return this.http.post(
            apiUrl,
            user,
            {
                observe: 'response',
                headers: new HttpHeaders({ 'Content-Type': 'application/json' })
            },
        ).pipe(
            filter( (resp: HttpResponse<any>) => resp.body != null && resp.body.token != null),
            catchError(this.handleError<any>('refreshToken'))
        );
    }

    destroySubscriptions() {
        // this.unsubscribe$.next();
        // this.unsubscribe$.complete();
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    isAuthenticated() {
        return this.getToken() != null;
    }

    logout() {
        localStorage.removeItem('token');
        this.destroySubscriptions();
    }

    setToken(token: string) {
        localStorage.setItem('token', token);
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