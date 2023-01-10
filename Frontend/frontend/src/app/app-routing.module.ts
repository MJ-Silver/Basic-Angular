import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostDisplayComponent } from './posts/post-display/post-display.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { LoginComponent } from './auth/login/login/login.component';
import { RouterModule,Routes } from '@angular/router';

const routes: Routes =[
  {path:'post', component:PostDisplayComponent},
  {path:'add', component:PostCreateComponent},
  {path:'login', component:LoginComponent},
  {path:'signup', component:LoginComponent},
  
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
