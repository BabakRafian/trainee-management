import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TraineeService } from '../services/TraineeService';
import { Trainee } from '../models/trainee';
import { City } from '../models/city';

@Component({
  selector: 'view-trainee',
  templateUrl: './view-trainee-component.component.html',
  styleUrls: ['./view-trainee-component.component.css'],
  providers: [ TraineeService ]
})
export class ViewTraineeComponent implements OnInit {
  trainee: Trainee;
  trainee_id: string;
  private sub: any;

  constructor(private route: ActivatedRoute, private _traineeService: TraineeService) { }

  /*
  * CWM
  * On init, take the trainee_id from the route params and retrieve all
  * of that trainee's information from the trainee collection
  */
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.trainee_id = params['trainee_id'];
       this._traineeService.getTrainee(this.trainee_id)
                        .subscribe(trainee => {
                          this.trainee = trainee as Trainee;
                        });
    }); 
  }

  /*
  * CWM 
  * Delete a city from trainee.city_prefernces. 
  */
  deleteCity(city: City) {
    this._traineeService.deleteCity(this.trainee.trainee_id, city.city, city.state)
                        .subscribe(cities => {
                          this.trainee.city_preferences = cities as City[];//Can access this.trainee's city preferences and return modified list as City[]
                        });
  }

  /*
  * CWM
  * Delete a domain from trainee.domain_preferences
  */
  deleteDomain(domain: string) {
    this._traineeService.deleteDomain(this.trainee.trainee_id, domain)
                      .subscribe(domains => {
                        this.trainee.domain_preferences = domains as string[];
                      });
  }

}
