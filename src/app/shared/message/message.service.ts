import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
      
        dialogRef.afterClosed()
            .subscribe( result => {
                this.authService.logout();
                this.router.navigate(['/login']);
            });
    }

    showSuccessMessage(): void {
        this.dialog.open(
            MessageDialogComponent, 
            {
                // width: '250px'
                data: {
                    title: 'Success Message', 
                    message: 'Operation has been completed successfully',
                    dialogType: 'success'
                } 
            }
        );
    }

    showSuccessMessageToURL(url: string): void {
        const dialogRef = this.dialog.open(
            MessageDialogComponent, 
            {
                // width: '250px'
                data: {
                    title: 'Success Message', 
                    message: 'Operation has been completed successfully',
                    dialogType: 'success'
                } 
            }
        );

        if (url != null) {
            dialogRef.afterClosed()
                .subscribe( result => {
                    this.router.navigate([url]);
                });
        }
    }

    showWarningMessage(): void {
        this.dialog.open(
            MessageDialogComponent, 
            {
                // width: '250px'
                data: {
                    title: 'Warning Message', 
                    message: 'Operation could not be completed, check required fields and try again later.',
                    dialogType: 'warning'
                } 
            }
        );
    }

    showErrorMessage(): void {
        this.dialog.open(
            MessageDialogComponent, 
            {
                // width: '250px'
                data: {
                    title: 'Error Message', 
                    message: 'Operation could not be completed. Contact the administrator.',
                    dialogType: 'danger'
                } 
            }
        );
    }
}