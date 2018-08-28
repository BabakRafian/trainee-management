import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Credentials } from '../models/credentials';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  private loginUrl = 'http://localhost:8080/login';  // URL to web api
  constructor(private http: HttpClient) { }

  validateUser(credentials: Credentials, cb:(status: any)=>any){
    //this.messageService.clear();
    let message = {username: credentials.username, password: credentials.password}
    console.log('connecting to server...');
    //this.messageService.add('connecting to server... ');
    this.http.post<Response>(this.loginUrl, message)
    .subscribe(res=>{
      console.log(res.status);
      let response = res.status;
      cb(response > 0); // =========> check this part out (BABAK)
      if(response){
        console.log('User is authenticated');
        //this.messageService.add('The respose from server is: ' + response);
        //this.messageService.add('User is authenticated');
      }else{
        console.log('User is NOT authenticated');
        //this.messageService.add('User is NOT authenticated');
        //this.messageService.add('The response from server is: ' + response);
        //this.userAccess = "User is not permitted";
      }
    });
  }

}
