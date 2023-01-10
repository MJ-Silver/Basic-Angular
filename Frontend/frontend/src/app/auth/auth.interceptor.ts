import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor( private authservice: AuthServiceService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>>  {
    const authtoken = this.authservice.getToken();
    const authRequest = request.clone({headers:request.headers.set("Authorization", "Bearer "+authtoken)});
    return next.handle(authRequest);
  }
}
