import { Component, OnInit } from '@angular/core';
import { SflServicesService } from '../services/sfl-services.service';
@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {
  public users = [];
  public message = '';
  public status = '';
  public data = [];
  public loading = false;
  constructor(public sflService: SflServicesService) { }

  ngOnInit() {
  	this.sflService.getAccessRights().subscribe(
        data => {
          this.users = data['data'];
          console.log(this.users);
        },
        error => this.handleError(error)
    );
  }

  handleError(response,type = null){
    this.status = 'danger';
    this.message = response.error.message;
    window.scroll(0,0);
    if(response.error.data){
      this.data = response.error.data;
    }else{
      this.data = [];
    }
  }

  updateStatus(id,action,event){
    this.loading = true;
    this.sflService.updateAccessRights({user_id: id,action: action, action_val:event.currentTarget.checked }).subscribe(
                data => this.handleUpdateStatusResponse(data),
                error => this.handleError(error)
            );  
  }

  handleUpdateStatusResponse(response){
  	this.loading = false;
  	window.scroll(0,0);
    this.message = response.message;
    this.status = response.status;
  }

}
