import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { catchError, tap, map} from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { environment } from '../../environments/environment';
import { Indication } from '../model/indication.model';
import { Constant } from './constant';

@Injectable()
export class IndicationService {

    constructor(private http: HttpClient) {
        // Ok, nothing here
    }

    getIndications(codClient?: number, startCreationAt?: string, endCreationAt?: string, 
        offset: number = 0, limit: number = Constant.MAX_RECORDS): Observable<Indication[]> {

        let httpParams = new HttpParams();

        if (codClient) {
            httpParams.append("codClient", codClient.toString());
        }

        if (startCreationAt) {
            httpParams.append("startCreationAt", startCreationAt.toString());
        }

        if (endCreationAt) {
            httpParams.append("endCreationAt", endCreationAt.toString());
        }

        if (offset) {
            httpParams.append("offset", offset.toString());
        }

        if (limit) {
            httpParams.append("limit", limit.toString());
        }

        return this.http
            .get(
                `${environment.apiUrl}/indications`, 
                {
                    observe: 'response',
                    params: httpParams
                })
            .pipe(
                map( (res: any) => {
                    return res.body.content as Indication[];
                }),
                catchError(this.handleError('getIndications', []))
            );

    }

    // getIndications(codClient?: number, startCreationAt?: string, endCreationAt?: string, 
    //     offset: number = 0, limit: number = Constant.MAX_RECORDS): Observable<Indication[]> {

    //     let httpParams = new HttpParams();

    //     if (codClient) {
    //         httpParams.append("codClient", codClient.toString());
    //     }

    //     if (startCreationAt) {
    //         httpParams.append("startCreationAt", startCreationAt.toString());
    //     }

    //     if (endCreationAt) {
    //         httpParams.append("endCreationAt", endCreationAt.toString());
    //     }

    //     if (offset) {
    //         httpParams.append("offset", offset.toString());
    //     }

    //     if (limit) {
    //         httpParams.append("limit", limit.toString());
    //     }

    //     return this.http
    //         .get<Indication[]>(
    //             `${environment.apiUrl}/indications`, 
    //             {
    //                 params: httpParams
    //             })
    //         .pipe(
    //             tap( _ => console.log('IndicationService: fetched Indications'),
    //             catchError(this.handleError('getIndications', []))
    //         )
    //     );

    // }

    getIndicationById(id: number): Observable<Indication> {
        return this.http
            .get<Indication>(`${environment.apiUrl}/indications/${id}`)
            .pipe(
                tap( _ => console.log(`fetched Indication id=${id}`)),
                catchError(this.handleError<Indication>(`getIndicationById id=${id}`)
            )
        );
    }

    updateIndication(indication: Indication): Observable<any> {
        // const httpOptions = {
        //     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        // };
        return this.http
            // .put(`${environment.apiUrl}/Indications/${Indication.codIndicatione}`, Indication, httpOptions)
            .put(`${environment.apiUrl}/indications/${indication.codIndication}`, indication)
            .pipe(
                tap(_ => console.log(`Updated Indication id=${indication.codIndication}`)),
                catchError(this.handleError<any>('updateIndication')
            )
        );
    }

    addIndication(indication: Indication): Observable<Indication> {
        // const httpOptions = {
        //     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        // };
        return this.http
            // .post<Indication>(this.heroesUrl, hero, httpOptions)
            .post<Indication>(`${environment.apiUrl}/indications`, indication)
            .pipe(
                tap((indication: Indication) => console.log(`Added Indication of id=${indication.codIndication}`)),
                catchError(this.handleError<Indication>('addIndication')
            )
        );
    }

    deleteIndication(indication: Indication | number): Observable<Indication> {
        const id = typeof indication === 'number' ? indication : indication.codIndication;
        // const httpOptions = {
        //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        // };
        return this.http
            //   .delete<Hero>(url, httpOptions)
            .delete<Indication>(`${environment.apiUrl}/Indications/${id}`)
            .pipe(
                tap(_ => console.log(`Deleted Indication id=${id}`)),
                catchError(this.handleError<Indication>('deleteIndication')
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

            console.log('meu erro');

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            //this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}