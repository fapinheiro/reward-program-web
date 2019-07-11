import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { environment } from '../../environments/environment';

import { PostalCode } from '../model/postal-code.model';

@Injectable()
export class PostalCodeService {

    constructor(private http: HttpClient) {
        // Ok, nothing here
    }

    getPostalCodesByCodeNumber(code: string): Observable<PostalCode[]> {
        return this.http
            .get<PostalCode[]>(`${environment.apiUrl}/postal-codes?code=${code}&offset=0&limit=10`)
            .pipe(
                tap(_ => console.log('PostalCodeService: returned postal codes'),
                    catchError(this.handleError('getPostalCodesByCodeNumber', [])) 
                )
            );
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