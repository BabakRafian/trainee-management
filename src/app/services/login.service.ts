import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Credentials } from '../models/credentials';
import {Router} from '@angular/router';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  private loginUrl = 'http://localhost:3000/login';  // URL to web api

  constructor(private http: HttpClient, private router: Router, private messageService: MessageService) { }
  

  validateUser(credentials: Credentials, cb:(status: any)=>any){
    this.messageService.clear();
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
        this.router.navigate(['viewBatch']);

      }else{
        console.log('User is NOT authenticated');
        this.messageService.add('Either Username or password is not correct! Try again');
      }
    });
  }

}
