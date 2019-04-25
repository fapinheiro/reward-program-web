import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

// import { User } from '../model/user.model';
import { MatDialog } from '@angular/material';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';
import { AuthService } from '../auth.service';

@Injectable()
export class MessageService {

    // private token: string;

    constructor(
        private authService: AuthService,
        private router: Router,
        private dialog: MatDialog
    ) { 
        // Ok, nothing here
    }

    showTokenExpirationMessage(): void {
        const dialogRef = this.dialog.open(
            MessageDialogComponent, 
            {
                // width: '250px'
                data: {
                    title: 'Token Expired', 
                    message: 'Sorry, your token has been expired. Please log in again.',
                    dialogType: 'warning'
                } 
            }
        );
      
        dialogRef.afterClosed().subscribe(
            result => {
                this.authService.logout();
                this.router.navigate(['/login']);
            }
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