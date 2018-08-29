import { Component, OnInit } from '@angular/core';
import { Credentials } from '../models/credentials';
import {LoginService} from '../services/login.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authenticated: boolean = false;

  credentials: Credentials = {
    username: '',
    password: ''
  };

  constructor(private loginService: LoginService, private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.clear();
  }

  onSelect(passedCredentials: Credentials): void {
    this.credentials = passedCredentials;
    console.log(passedCredentials);
    //this.messageService.clear();
    //this.messageService.add(this.test);
    //this.messageService.add('username: '+ selectedUser.username);
    //this.messageService.add('pass: '+ selectedUser.pass);
    this.loginService.validateUser(passedCredentials, (res:boolean)=>{
        this.authenticated = res;
    });   
  }

}
