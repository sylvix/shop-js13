import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ActionType } from '@ngrx/store';
import { catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {
  constructor(private snackbar: MatSnackBar) { }

  /**
   * This method opens snackbar with provided message. You can also pass action button text or custom config.
   *
   * @param message Message to display
   * @param action Text for action button (OK by default)
   * @param config Custom snackbar config. Default: {duration: 3000}
   */
  openSnackbar(message: string, action?: string, config?: MatSnackBarConfig) {
    if (!config || !config.duration) {
      config = {...config, duration: 3000};
    }

    if (!action) {
      action = 'OK';
    }

    return this.snackbar.open(message, action, config);
  }

  catchServerError(action: ActionType<any>) {
    return catchError(reqErr => {
      let validationError = null;

      if (reqErr instanceof HttpErrorResponse && reqErr.status === 400) {
        validationError = reqErr.error;
      } else {
        this.snackbar.open('Server error', 'OK', {duration: 3000})
      }

      return of(action({error: validationError}));
    })
  }
}
