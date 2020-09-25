import { Component, OnInit } from '@angular/core';
import { SflServicesService } from '../services/sfl-services.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public user:any;	
  public status = '';
  public message = '';
  public data = {
    team_count: null,
    important_pending_tasks: null,
    client_count: null,
    active_projects_count: null,
    inactive_projects_count: null,
    pending_task_count: null
  };
  constructor(public sflService: SflServicesService) { }

  ngOnInit() {
  	this.user = JSON.parse(localStorage.getItem('user'));
  	this.sflService.getDashboard({user_id:this.user.user_id}).subscribe(
        data => this.handleResponse(data),
        error => this.handleError(error)
    );
  }

  handleResponse(response){
    this.data = response.data;
  }

  handleError(error){
    console.log(error);
  }
}
