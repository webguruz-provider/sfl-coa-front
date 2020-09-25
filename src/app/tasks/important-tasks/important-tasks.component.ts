import { Component, OnInit } from '@angular/core';
import { SflServicesService } from '../../services/sfl-services.service';
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-important-tasks',
  templateUrl: './important-tasks.component.html',
  styleUrls: ['./important-tasks.component.scss']
})
export class ImportantTasksComponent implements OnInit {

  public loading = false;
  public status = null;
  public message = null;
  public tasks = [];
  public data = [];
  public type = '';
  public user;
  constructor(public sflService: SflServicesService,private route: ActivatedRoute) { }

  ngOnInit() {
  this.route.paramMap.subscribe(queryParams => {
        this.type = queryParams.get("type");
      })
  	this.user = JSON.parse(localStorage.getItem('user'));
  	if(this.type == 'urgent'){
	  	this.sflService.getImpTasks({user_id: this.user.user_id, urgent:1 }).subscribe(
	          data => this.handleResponse(data),
	          error => this.handleError(error)
	      );
	}else{
		this.sflService.getImpTasks({user_id: this.user.user_id, status:0 }).subscribe(
	          data => this.handleResponse(data),
	          error => this.handleError(error)
	      );
	}	
  }

  handleError(response,type = null){
    this.loading = false;
    this.status = 'danger';
    this.message = response.error.message;
    window.scroll(0,0);
    if(response.error.data){
      this.data = response.error.data;
    }else{
      this.data = [];
    }
  }

  handleResponse(response){
    this.loading = false;
    this.tasks = response.data;  
    console.log('tasks',this.tasks);
    this.status = response.status;
    this.message = response.message;
  }

}
