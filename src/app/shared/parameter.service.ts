import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap} from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { environment } from '../../environments/environment';
import { Parameter } from '../model/parameter.model';

@Injectable()
export class ParameterService {

    constructor(private http: HttpClient) {
        // Ok, nothing here
    }

    getParameters(): Observable<Parameter[]> {

        return this.http
            .get<Parameter[]>(`${environment.apiUrl}/parameters`)
            .pipe(
                tap(clients => console.log('ParameterService: fetched parameters'),
                catchError(this.handleError('getParameters', []))
            )
        );

    }

    updateParameter(newParameter: Parameter): Observable<any> {
        return this.http
            .put(`${environment.apiUrl}/parameters/${newParameter.paramId}`, newParameter)
            .pipe(
                tap(_ => console.log(`Updated parameter id=${newParameter.paramId}`)),
                catchError(this.handleError<any>('updateParameter')
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
            console.error('ParameterService error', error); // log to console instead

            // TODO: better job of transforming error for user consumption
            //this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}