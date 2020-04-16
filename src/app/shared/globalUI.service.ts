import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class GlobalUIService {
    isLoading = new Subject<boolean>();

    constructor(private matSnackbar: MatSnackBar) {}

    getSnackbar(message: string, action: string) {
        this.matSnackbar.open(message, action, {
            duration: 4000
        });
    }
}
