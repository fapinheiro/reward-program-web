import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { catchError, tap, filter, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { environment } from '../../environments/environment';

import { PostalCode } from '../model/postal-code.model';
import { Pageable } from '../model/Pageable';

@Injectable()
export class ListService {

    constructor(private http: HttpClient) {
        // Ok, nothing here
    }

    getIdentificationType(): Observable<string[]> {
        return this.http
            .get<string[]>(`${environment.apiUrl}/identifications`)
            .pipe(
                tap( _ => console.log('IdentificationType fetched!')),
                catchError(this.handleError('getIdentificationType', [])) 
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
            console.error('PostalCodeService error', error); // log to console instead

            // TODO: better job of transforming error for user consumption
            //this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}