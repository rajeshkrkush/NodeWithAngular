import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material';

@Injectable({
    providedIn: 'root'
})
export class SnackbarService {

    verticalPosition: MatSnackBarVerticalPosition = 'top';

    constructor(private snackBar: MatSnackBar) {
    }

    public openSnackBar(message: string, action: string) {
        let snackBarRef = this.snackBar.open(message, '', {
            verticalPosition: this.verticalPosition,
            duration: 5000
        });
    }


}
