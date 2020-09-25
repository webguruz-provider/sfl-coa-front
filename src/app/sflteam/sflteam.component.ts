import { Component, OnInit } from '@angular/core';
import { SflServicesService } from '../services/sfl-services.service';
//declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-sflteam',
  templateUrl: './sflteam.component.html',
  styleUrls: ['./sflteam.component.scss']
})
export class SflteamComponent implements OnInit {

  constructor(private sflService: SflServicesService) { }
  public team = [];
  public loading = false;
  public status = null;
  public message = null;
  public data = [];
  public resetdata = [];
  public member_id = null;
  public pop_up_title = "Add Team Member";
  public send_ajax = false;
  public reset = {
  	email: null,
  	password: null,
  	password_confirmation : null

  };
  public form = {
  	name: null,
  	job_title: null,
  	email: null,
  	phone: null,
  	id:null,
  	type: 1,
  	access_rights:{
	  	view_sfl_team:false,
	  	manage_sfl_team:false,
	  	view_client:false,
	  	manage_client:false,
	  	view_project:false,
  		manage_project:false	
  	}
  };
  public permissions: any;
  public show_bulk_action_select = false;
  public pending_tasks = [];
  public checkarray = [];
  public user;
  public assigned_to = null;
  public team_member;
  public show_bulk_assign_form = false;
  ngOnInit() {
  	this.sflService.getTeamMembers().subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error)
        ); 
    this.permissions = JSON.parse(atob(localStorage.getItem('mission')));     
    this.user = JSON.parse(localStorage.getItem('user'));  
  }

  openAddTeamMemeberModal(){
    $('#addEmployeeModal').modal("show");
    this.form = {
    name: null,
    job_title: null,
    email: null,
    phone: null,
    id:null,
    type: 1,
    access_rights:{
      view_sfl_team:false,
      manage_sfl_team:false,
      view_client:false,
      manage_client:false,
      view_project:false,
      manage_project:false  
    }
  };
  }

  handleResponse(response){
  	this.loading = false;
    this.send_ajax = false;
    console.log(response);
    this.team = response.data;  
    $('#addEmployeeModal').modal('hide');
    this.pop_up_title = "Add Team Member";
    $('#deleteEmployeeModal').modal('hide');
    this.status = response.status;
    this.message = response.message;
    window.scroll(0,0);
    $(document).ready(function() {
      var table = $('#sflteam').DataTable({"aoColumnDefs": [ { "bSortable": false, "aTargets": [ 4 ] } ], retrieve: true});   
    });
  }

  handleError(response,type = null){
  	this.loading = false;
    this.send_ajax = false;
    this.status = 'danger';
    this.message = response.error.message;
    window.scroll(0,0);
    if(response.error.data){
      this.data = response.error.data;
    }else{
      this.data = [];
    }
    $(document).ready(function() {
      var table = $('#sflteam').DataTable({"aoColumnDefs": [ { "bSortable": false, "aTargets": [ 4 ] } ], "destroy": true,retrieve: true});   
    });
  }

  addUpdateTeamMember(form){
    this.send_ajax = true;
    this.data = [];
  	if(this.form.id == null){
	  	this.sflService.addTeamMembers(form).subscribe(
	            data => this.handleResponse(data),
	            error => this.handleError(error)
	        );
    }else{
    console.log(this.form);
    	this.sflService.updateTeamMembers(this.form).subscribe(
	            data => this.handleResponse(data),
	            error => this.handleError(error)
	        );
    }
  }

  editModal(id){
    this.data = [];
  	this.sflService.getTeamMemberById(id,1).subscribe(
	            data => {
                this.form = {
                  name: data['data'].name,
                  job_title: data['data'].job_title,
                  email: data['data'].email,
                  phone: data['data'].phone,
                  id:data['data'].id,
                  type: 1,
                  access_rights:{
                    view_sfl_team:data['data'].access_rights.view_sfl_team,
                    manage_sfl_team:data['data'].access_rights.manage_sfl_team,
                    view_client:data['data'].access_rights.view_client,
                    manage_client:data['data'].access_rights.manage_client,
                    view_project:data['data'].access_rights.view_project,
                    manage_project:data['data'].access_rights.manage_project 
                  }
                  };
               // this.form = data['data'];
              },
	            error => this.handleError(error)
	        );
  	$('#addEmployeeModal').modal('show');
    this.pop_up_title = "Edit Team Member";
  	
  }


  deleteModal(id){
    $(document).on('click',".checkedAll",function () {
        if ($(this).is(":checked")){
          $(this).closest("tr").parent("thead").next('tbody').addClass("tbodydiclass").find('tr').each(function(){
            $(this).addClass("huaa").find(".checkchild").addClass("kjds").prop("checked", true).trigger('change'); 
          }); 
        }else {;
          $(this).closest("tr").parent("thead").addClass("theaddiclass").next('tbody').removeClass("tbodydiclass").find('tr').each(function(){ 
            $(this).find(".checkchild").prop("checked", false).trigger('change');
          });          
        }
        console.log(this.checkarray);
      });
  	this.member_id = id;
    this.sflService.getPendingTask(id).subscribe(
              data => this.handlePendingTaskResponse(data),
              error => this.handleError(error)
          );  	
  }

  handlePendingTaskResponse(data){
  console.log(data.data.length);
    if(data.data.length > 0){
      this.pending_tasks = data.data;
      $('#pendingTaskModal').modal('show');
    }else{
      $('#deleteEmployeeModal').modal('show');
    }
  }

  deleteTeamMember(id){
    this.data = [];
  	this.sflService.deleteTeamMembers({id: id}).subscribe(
	            data => this.handleResponse(data),
	            error => this.handleError(error)
	        );
  }

  showResetModal(email){
  	this.reset.email = email;
  	$('#resetpassword').modal('show');

  }

  submitResetForm(reset){
  	this.loading = true;
    this.data =[];
    this.sflService.changePassword(reset).subscribe(
        data => this.handleResetResponse(data),
        error => this.handleError(error)
    );
  }

  handleResetResponse(response){
  	this.loading = false;
    this.resetdata = [];
    $('#resetpassword').modal('hide');
    this.status = response.status;
    this.message = response.message;
    window.scroll(0,0);
  }

  close(){
    this.pop_up_title = "Add Team Member";
  }

  bulkAssign(){
    this.show_bulk_assign_form = !this.show_bulk_assign_form;
  }

  checkbox(item, event) {

    if (this.checkarray.find(x => x == item)) {
        this.checkarray.splice(this.checkarray.indexOf(item), 1);
    }
    else {
        this.checkarray.push(item);
    }

    if(this.checkarray.length > 0){
      this.show_bulk_action_select = true;
    }else{
      this.show_bulk_action_select = false;
    }
       
  }

  bulkAssignToTask(){
    this.loading = true;
    this.sflService.bulkAssignOnDeletion({old_assigned_to: this.member_id, ids: this.checkarray, assigned_to: this.assigned_to}).subscribe(
        data => this.handleBulkAssignResponse(data),
        error => this.handleError(error)  
      );    
  }

  handleBulkAssignResponse(data){
  this.loading = false;
    this.pending_tasks = data.data;
    this.status = data.status;
    this.message = data.message;
    this.show_bulk_assign_form = false;
    this.show_bulk_action_select = false;
    this.checkarray = [];
  }

  addChild(checkedevent){
    let checked = checkedevent.currentTarget.checked;
    if(this.pending_tasks.length > 0){
      this.pending_tasks.forEach(task => {
       if(!this.checkarray.find(x => x == task.id)  && checked){
          this.checkarray.push(task.id);
        }else if (!checked && this.checkarray.find(x => x == task.id)) {
          this.checkarray.splice(this.checkarray.indexOf(task.id), 1);
        }else{
         console.log("entering",this.checkarray.find(x => x == task.id),checked);
        }
        if(this.checkarray.length > 0){
          this.show_bulk_action_select = true;
        }else{
          this.show_bulk_action_select = false;
        }

      });
    }
    console.log("checkarray",this.checkarray);
  }
  
}
