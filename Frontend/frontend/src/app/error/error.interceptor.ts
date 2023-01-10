import { Injectable } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ErrorComponent } from './error.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private dialog: MatDialog) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler){
    return next.handle(request).pipe(catchError((error : HttpErrorResponse)=>{
      let errorMessage = "An error has occurred";
      if (error.error.message){
        errorMessage = "Check your login status";
      }
      this.dialog.open(ErrorComponent,{data:{message: errorMessage}});
      console.log(errorMessage);
      return throwError(error);
    }));
  }
}
