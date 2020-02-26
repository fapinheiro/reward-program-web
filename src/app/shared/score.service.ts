import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { catchError, tap, map} from 'rxjs/operators';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment';
import { Score } from '../model/score.model';
import { Constant } from './constant';

@Injectable()
export class ScoreService {

    private scoreSelectedEvent = new BehaviorSubject<Score>(new Score());

    notifySelectedScore(score: Score): void {
        this.scoreSelectedEvent.next(score);
    }

    getScoreSelectedEvent(): Observable<Score> {
        return this.scoreSelectedEvent;
    }

    constructor(private http: HttpClient) {
        // Ok, nothing here
    }

    // getScores(codClient?: number, searchTerm?: string, startCreationAt?: string, endCreationAt?: string, 
    //     offset: number = 0, limit: number = Constant.MAX_RECORDS): Observable<Score[]> {

    //     let httpParams = new HttpParams();

    //     if (codClient) {
    //         httpParams = httpParams.set("codClient", codClient.toString());
    //     }

    //     if (searchTerm) {
    //         httpParams = httpParams.set("searchTerm", searchTerm);
    //     }

    //     if (startCreationAt) {
    //         httpParams = httpParams.set("startCreationAt", startCreationAt);
    //     }

    //     if (endCreationAt) {
    //         httpParams = httpParams.set("endCreationAt", endCreationAt);
    //     }

    //     httpParams = httpParams.set("offset", offset.toString());
    //     httpParams = httpParams.set("limit", limit.toString());

    //     return this.http.get(
    //             `${environment.apiUrl}/scores`, 
    //             {
    //                 observe: 'response',
    //                 params: httpParams
    //             }
    //         ).pipe(
    //             map( (res: any) => {
    //                 if (res.body && res.body.content) {
    //                     return res.body.content as Score[];
    //                 }
    //                 const indArray: Score[] = [];
    //                 return indArray;
    //             }),
    //             catchError(this.handleError('getScores', []))
    //         );

    // }

    // getScoreById(id: number): Observable<Score> {
    //     return this.http
    //         .get<Score>(`${environment.apiUrl}/scores/${id}`)
    //         .pipe(
    //             tap( _ => console.log(`fetched Score id=${id}`)),
    //             catchError(this.handleError<Score>(`getScoreById id=${id}`)
    //         )
    //     );
    // }

    // updateScore(score: Score): Observable<any> {
    //     // const httpOptions = {
    //     //     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    //     // };
    //     return this.http
    //         // .put(`${environment.apiUrl}/Scores/${Score.codScoree}`, Score, httpOptions)
    //         .put(`${environment.apiUrl}/scores/${score.codScore}`, score)
    //         .pipe(
    //             tap(_ => console.log(`Updated score id=${indication.codIndication}`)),
    //             catchError(this.handleError<any>('updateIndication')
    //         )
    //     );
    // }

    // addIndication(indication: Indication): Observable<Indication> {
    //     // const httpOptions = {
    //     //     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    //     // };
    //     return this.http
    //         // .post<Indication>(this.heroesUrl, hero, httpOptions)
    //         .post<Indication>(`${environment.apiUrl}/indications`, indication)
    //         .pipe(
    //             tap((indication: Indication) => console.log(`Added Indication of id=${indication.codIndication}`)),
    //             catchError(this.handleError<Indication>('addIndication')
    //         )
    //     );
    // }

    // deleteIndication(indication: Indication | number): Observable<Indication> {
    //     const id = typeof indication === 'number' ? indication : indication.codIndication;
    //     // const httpOptions = {
    //     //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    //     // };
    //     return this.http
    //         //   .delete<Hero>(url, httpOptions)
    //         .delete<Indication>(`${environment.apiUrl}/Indications/${id}`)
    //         .pipe(
    //             tap(_ => console.log(`Deleted Indication id=${id}`)),
    //             catchError(this.handleError<Indication>('deleteIndication')
    //         )
    //     );
    // }

    /**
    * Handle Http operation that failed.
    * Let the app continue.
    * @param operation - name of the operation that failed
    * @param result - optional value to return as the observable result
    */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error('ScoreService error', error); // log to console instead

            // TODO: better job of transforming error for user consumption
            //this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}