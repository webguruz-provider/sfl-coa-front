import { Component, OnInit } from '@angular/core';
import { SflServicesService } from '../../services/sfl-services.service';
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  public loading = false;
  public status = null;
  public message = null;
  public projects = [];
  public data = [];
  public type = null;
  constructor(public sflService: SflServicesService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(queryParams => {
        this.type = queryParams.get("type");
    });
    if(this.type == 'active'){
    	this.sflService.getProjectsList(1).subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error)
        );
    }else{
      this.sflService.getProjectsList(0).subscribe(
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
    this.projects = response.data;  
    console.log('projects',this.projects);
    this.status = response.status;
    this.message = response.message;
  }

}
