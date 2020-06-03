import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { environment } from '../../environments/environment';

import { Client } from '../model/client.model';

@Injectable()
export class ClientService {

    constructor(private http: HttpClient) {
        // Ok, nothing here
    }

    getClients(offset: number, limit: number): Observable<Client[]> {

        return this.http
            .get<Client[]>(`${environment.apiUrl}/clients?offset=${offset}&limit=${limit}`)
            .pipe(
                tap(clients => console.log('ClientService: fetched clients'),
                catchError(this.handleError('getClients', []))
            )
        );
    }

    getClientById(id: number): Observable<Client> {
        return this.http
            .get<Client>(`${environment.apiUrl}/clients/${id}`)
            .pipe(
                tap( _ => console.log(`fetched client id=${id}`)),
                catchError(this.handleError<Client>(`getClientById id=${id}`)
            )
        );
    }

    updateClient(client: Client): Observable<any> {
        // const httpOptions = {
        //     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        // };
        return this.http
            // .put(`${environment.apiUrl}/clients/${client.codCliente}`, client, httpOptions)
            .put(`${environment.apiUrl}/clients/${client.clientId}`, client)
            .pipe(
                tap(_ => console.log(`Updated client id=${client.clientId}`)),
                catchError(this.handleError<any>('updateClient')
            )
        );
    }

    addClient(client: Client): Observable<Client> {
        // const httpOptions = {
        //     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        // };
        return this.http
            // .post<Client>(this.heroesUrl, hero, httpOptions)
            .post<Client>(`${environment.apiUrl}/clients`, client)
            .pipe(
                tap((client: Client) => console.log(`Added client of id=${client.clientId}`)),
                catchError(this.handleError<Client>('addClient')
            )
        );
    }

    deleteClient(client: Client | number): Observable<Client> {
        const id = typeof client === 'number' ? client : client.clientId;
        // const httpOptions = {
        //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        // };
        return this.http
            //   .delete<Hero>(url, httpOptions)
            .delete<Client>(`${environment.apiUrl}/clients/${id}`)
            .pipe(
                tap(_ => console.log(`Deleted client id=${id}`)),
                catchError(this.handleError<Client>('deleteClient')
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
            console.error('ClientService error', error); // log to console instead

            // TODO: better job of transforming error for user consumption
            //this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}