/*
* CWM
* Admin Header
* Includes drop down menu for admin page options and a variable
* to display whichever title is most appropriate to the page being 
* displayed. Include the admin header by its selector and title variable
* e.g. <app-admin-header title="Admin Page"></app-admin-header>
*/
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {
  @Input() title:string="";
  constructor() { }
}
