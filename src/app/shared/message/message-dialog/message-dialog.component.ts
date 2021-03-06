import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from './dialog-data';

@Component({
  selector: 'message-dialog',
  templateUrl: './message-dialog.component.html'
})
export class MessageDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<MessageDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {
        // Ok, nothing here
    }
    
    onBtnOkClick(): void {
        this.dialogRef.close();
    }
}
