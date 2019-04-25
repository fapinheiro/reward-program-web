import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';
import { MessageService } from './message/message.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private messageService: MessageService,
        private authService: AuthService,
    ) {
        // Ok, nothing here
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: string = this.authService.getToken();
        
        // If token is present set in the request
        if (token) {
            request = request.clone(
                { 
                    headers: request.headers.set('Authorization', token) 
                }
            );
        }
        
        // Make sure requests is always of type json
        if (!request.headers.has('Content-Type')) {
            request = request.clone(
                { 
                    headers: request.headers.set('Content-Type', 'application/json') 
                }
            );
        }
        
        request = request.clone(
            { 
                headers: request.headers.set('Accept', 'application/json') 
            }
        );

        console.log('Intercepted!', request);
        
        return next.handle(request).pipe(
            catchError(this.handleError<any>('intercept'))
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

        if (error instanceof HttpErrorResponse && error.status === 403) {
            this.messageService.showTokenExpirationMessage();
            // this.authService.logout();
            // this.router.navigate(['/login']);
        }

        // TODO: better job of transforming error for user consumption
        //this.log(`${operation} failed: ${error.message}`);

        // Let the app keep running by returning an empty result.
        return of(result as T);
    };
}
}