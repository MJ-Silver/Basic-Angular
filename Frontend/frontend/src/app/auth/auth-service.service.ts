import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private token! : string;


  constructor(private http: HttpClient) { }

  signup(userusername:string , userpassword: string){
    this.http.post('https://localhost:3000/api/users/register',{id:userusername,password:userpassword}).subscribe(
      response =>{

      }  );
    
  }

  login(userusername: string , userpassword:string): any {
    this.http.post<{token: string}>('https://localhost:3000/api/users/login',{id: userusername,password: userpassword}).subscribe(response =>{ 
      const token = response.token;
      this.token = token;
    });
  }


  getToken(){
    return this.token;
  }

}
