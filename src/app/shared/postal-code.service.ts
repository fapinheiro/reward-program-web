import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { catchError, tap, filter, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { environment } from '../../environments/environment';

import { PostalCode } from '../model/postal-code.model';
import { Pageable } from '../model/Pageable';

@Injectable()
export class PostalCodeService {

    constructor(private http: HttpClient) {
        // Ok, nothing here
    }

    getPostalCodesByCodeNumber(code: string): Observable<PostalCode[]> {
        console.log(`Searching PostalCode: ${code}`);
        if (!code.trim()) {
            // if not search term, return empty hero array.
            return of([]);
        }
        return this.http
            .get<PostalCode[]>(
                `${environment.apiUrl}/postal-codes?code=${code}&offset=0&limit=10`, 
                {
                    observe: 'response'
                })
            .pipe(
                filter( (resp: HttpResponse<any>) => resp.body != null && resp.body.content != null),
                tap( _ => console.log('PostalCode fetched!'),
                    catchError(this.handleError('getPostalCodesByCodeNumber', [])) 
                ),
                switchMap( (resp: HttpResponse<any>) => {
                    let postalCode: PostalCode[] = resp.body.content as PostalCode[];
                    console.log(postalCode);
                    return of(postalCode);
                })
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