import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
 
import { AppComponent } from './app.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostDisplayComponent } from './posts/post-display/post-display.component';
import { HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { LoginComponent } from './auth/login/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { ErrorComponent } from './error/error.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorInterceptor } from './error/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
  PostDisplayComponent,
  LoginComponent,
  ErrorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi: true},
              {provide: HTTP_INTERCEPTORS, useClass : ErrorInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
