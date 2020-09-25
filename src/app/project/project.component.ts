import { Component, OnInit } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections'
import { SflServicesService } from '../services/sfl-services.service';
import {MatTableDataSource} from '@angular/material';
import * as jQuery from 'jquery';
import * as bootstrap from 'bootstrap';
import { DatePipe } from '@angular/common';
import { DataSource } from '@angular/cdk/table';
declare var angular: any;




@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})



export class ProjectComponent implements OnInit {

 /* displayedColumns: string[] = ['task', 'date', 'urgent', 'need_reminder', 'status', 'symbol', 'assigned to'];
  dataSource = new MatTableDataSource(this.prelatedtasks);
  selection = new SelectionModel(true, []);

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

 
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
*/

  public countries = [];
  public zones = [];
  public timezones = [];
  public clients = [];
  public templates = [];
  public projects = [];
  public data = [];
  public status = null;
  public message = null;
  public logo_file: string = "./assets/img/logo.png";
  public loading = false;
  public fileToUpload = null;
  public selectedCompanyValue = '';
  public selected_project = '';
  public form = {
    name: '',
    website: '',
    desc: '',
    logo:this.fileToUpload,
    id:null 
  };

  public project_found = false;

  public project ={
  	company_id : '',
  	template_id: null,
  	name: null,
  	region:null
  };

  public project_form = {
    company_id: null,
    name: null,
    template_id: null,
    region: null,
    id: null
  };

  public search = {
    company_id: '',
    status: -1,
    project_id: ''
  };

  public current_project_id = '';
  public permissions:any;

  /* ProjectContacts */

  public project_contact = {
    name: null,
    job_title: null,
    email: null,
    phone: null,
    id:null,
    need_reminder: true,
    type: 2,
    action: null,
    project_id: null
  };
  public member_id = '';
  public project_contact_message = '';
  public project_contact_title = 'Add Project Participant';
  public participants = [];
  public delete_contact = false;
  public showParticipantForm = false;
  public prelatedtasks = [];
  public disable_email = false;
  public search_email = [];

  /* Project Meeting */
  public index_val:number = null;
  public meeting = [];
  public show_meeting_form = false;
  public project_meeting_title = 'Add Meeting';
  public project_meeting_message = '';
  public meeting_id = '';
  public show_task_error = false;
  public project_meeting = {
    name: '',
    date: null,
    notes: '',
    task: [],
    docs: [],
    id: null,
    project_id: null,
    country: null,
    zone: null,
    timezone: null,
    dst: null
  }
  public urls = [];
  public delete_files = [];

  /* Impotant tasks */
  public show_add_task = false;
  public logistics_title = "Add Task";
  public logistic = {
    title: null,
    task: null,
    due_date: null,
    parent_task_id: null,
    type: null,
    assigned_to: null,
    need_reminder: null,
    note: null,
    task_id: null,
    urgent: null,
    assigned_to_id: null,
    p_task_id: null,
    project_id: null
  };
  public user: any;
  public sfl_team = [];
  public all_tasks = [];
  public team_member = [];
  public imp_tasks = [];
  public log_tasks = [];
  public show = false;
  public project_logistic_message = '';
  public delete_task = '';
  public checkarray = [];
  public selectBulk = null;
  public assign_to = {
    type: null,
    assigned_to: null,
    project_id: null,
    ids: []
  }
  public show_bulk_assign_form = false;
  public show_bulk_action_select = false;
  /* Project files */
  public temp_files = [];
  public files = [];
  public meeting_files = [];
  public f_urls =[];
  public project_files = [];
  public show_add_file_form = false;
  public project_file_message = '';
  public delete_file_id = '';
  
  constructor(public sflService: SflServicesService,private datePipe: DatePipe) { }

  ngOnInit() { 
    this.permissions = JSON.parse(atob(localStorage.getItem('mission')));
  	this.project_form.company_id = '';
    this.user = JSON.parse(localStorage.getItem('user'));
    if(this.user.type == 1){
    	this.sflService.getCompanies().subscribe(
          data => this.handleResponse(data),
          error => this.handleError(error)
      );
    }else{
      this.sflService.getProjects({based_on: 'user_id',id: this.user.user_id }).subscribe(
          data => this.handleProjectResponse(data),
          error => this.handleError(error)
      );
    }

    this.sflService.getTemplates().subscribe(
        data => {
          this.templates = data['data'].filter(function(item){
            return item.task_count > 0;
          });
        },
        error => this.handleError(error)
    );

    this.sflService.getTeamMembers().subscribe(
        data => {
          this.sfl_team = data['data'];
        },
        error => this.handleError(error)
    );

    this.sflService.getCountries().subscribe(
        data => {
          this.countries = data['data'];
        },
        error => this.handleError(error)
    );

    $(document).ready(function(){
      $(document).unbind().on('click','.has_children a',function(){        
        $(this).parent().find('ul').first().slideToggle();
        $(this).parent().siblings().find('ul').hide(200);
      });     
    });

    /*$(document).ready(function() {  
      setTimeout(function(){
      console.log("execute");
      $('#example').DataTable({
        "columnDefs": [
          { "orderable": false, "targets": [0,1,5] }
        ],
        'destroy': true,
      });
        $(document).on('click','.details-control',function(){
        console.log("here");
          if(!$(this).parent('tr').hasClass('shown')){
          setTimeout(function(){
          console.log("jh");
            $('.project_table').DataTable({
              'destroy': true,
              "columnDefs": [
                { "orderable": false, "targets": [2] }
              ]
              });
            },1000);
          }
        });
        },1000);
      });*/
  }

  handleResponse(response){
    this.loading = false;
    this.clients = response.data;  
    //$('#addEmployeeModal1').modal('hide');
    this.status = response.status;
    this.message = response.message;
    //this.selectedCompanyValue = this.clients[0].id;
    window.scroll(0,0);


   /* $("#deliveryProgress .nav-item").click(function() {
      $(this).next("ul").slideToggle();
    });*/
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


  getProjects(company_id){
  	this.project_form.company_id = company_id;
  	this.sflService.getProjects({based_on: 'company_id',id: company_id}).subscribe(
        data => this.handleProjectResponse(data),
        error => this.handleError(error)
    );
  }

  handleProjectResponse(data){
  	this.projects = data.data;
    this.project_form.company_id = data.data[0].company_id;
  }

  handleFileInput(file){
    this.fileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.logo_file = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }	

  addClient(form){
    this.loading = true;
    this.data = [];
   // this.formData = new FormData();
   // formData.append("logo",)
    this.sflService.addClient(form,this.fileToUpload).subscribe(
        data => this.handleAddClientResponse(data),
        error => this.handleError(error)
    );
  }

  handleAddClientResponse(response){
    this.loading = false;
    this.clients = response.data;  
    this.projects = [];
    $('#addEmployeeModal1').modal('hide');
    this.status = response.status;
    this.message = response.message;
    this.search.company_id = this.project_form.company_id = this.clients[0].id;

  }
 
  openAddProjectModal(){
    this.project_form = {
      company_id: this.clients[0].id,
      name: null,
      template_id: null,
      region: null,
      id: null
    }
    $('#addProject').modal('show');
  }

  addProject(form){
  	this.loading = true;
  	this.data = [];
  	this.project = {
  		company_id : this.project_form.company_id,
	  	template_id: null,
	  	name: null,
	  	region:null
  	};
  	this.sflService.addProjectGetId(form).subscribe(
  		data => this.handleaddProjectResponse(data),
        error => this.handleError(error)	
  	);
  }

  handleaddProjectResponse(response){
      this.loading = false;
      this.projects = response.data;
      this.search.project_id = this.projects[0].id;
      $('#addProject').modal('hide');
      this.status = response.status;
      this.message = response.message;
  }

  close(){
   // this.pop_up_title = "Add Team Member";
  }

  searchProject(){
    this.loading = true;
    this.sflService.searchProject(this.search).subscribe(
      data => this.handleSearchProjectResponse(data),
        error => this.handleError(error)  
    );
  }

  handleSearchProjectResponse(response){
    this.loading = false;
    this.data = [];
    this.status = '';
    this.message = '';
    this.logistic.project_id = this.project_contact.project_id = this.current_project_id = response.data.id;
    this.handleTaskResponse(response);
    console.log("prelatedtasks",response.data);
    this.temp_files = response.data.project_files.filter(function(file){
      return file.type == 1;
    });
    this.files = response.data.project_files.filter(function(file){
      return file.type == 3;
    });
    this.meeting_files = response.data.project_files.filter(function(file){
      return file.type == 2;
    });
    console.log("search meeting_files",this.meeting_files);
    this.log_tasks = response.data.project_template_task;
    let participants_values = response.data.participant_project.filter(function(parti){
      if(parti.participant != null || parti.participant != undefined){
        return parti.participant;
      }
    });
    if(participants_values.length > 0){
      participants_values = participants_values.reverse();
    }
    this.participants = participants_values.map(function(parti){
      return parti.participant;
    });
    console.log(this.participants);
    this.meeting = response.data.meeting;
    console.log("meeting", this.meeting);
    if(this.current_project_id){
      this.project_found = true;
    }
    this.checkarray = [];
    this.show_bulk_action_select = false;


    $(document).on('click',".checkedAll",function () {
        if ($(this).is(":checked")){
          $(this).closest("tr").parent("thead").next('tbody').addClass("tbodydiclass").find('tr').each(function(){
            $(this).addClass("huaa").find(".checkchild").addClass("kjds").prop("checked", true).trigger('change'); 
            $(this).addClass("huaa").find(".checkedAll").addClass("kjds").prop("checked", true)
          });
          $(this).closest("tr").parent("thead").find('tr').find('.checkedAll').addClass("dfhg").prop("checked", true).trigger('change'); 
        }else {;
          $(this).closest("tr").parent("thead").addClass("theaddiclass").next('tbody').removeClass("tbodydiclass").find('tr').each(function(){ 
            $(this).find(".checkchild").prop("checked", false).trigger('change');
            $(this).find(".checkedAll").prop("checked", false).trigger('change');
          });
          $(this).closest("tr").parent("thead").find('tr').find('.checkedAll').addClass("tttt").prop("checked", false).trigger('change'); 
        }
        console.log(this.checkarray);
      });
  }

  handleTaskResponse(response){
    this.prelatedtasks = response.p_related_task;
    console.log("this.prelatedtasks",this.prelatedtasks);
    let taskk = [];
    if(response.data.project_template_task != undefined){
      taskk = response.data.project_template_task;
    }else{
      taskk = response.data;
    }

    this.all_tasks = taskk.map(function(task){
      return task.task;
    });
   
    let user = JSON.parse(localStorage.getItem('user'));
    
    this.imp_tasks = taskk.filter(function(task){
      //if(task.assigned_to != null && task.assigned_to.task_owner_id == user.user_id){
      if(task.urgent == 1 && task.assigned_to_id != null && task.assigned_to_id == user.user_id){
        return true;
      }
    });
    console.log(this.imp_tasks);
  }

  /* ProjectContacts */

  openProjectContactsModel(){
    this.loading= false;
    $('#projectContacts').modal('show');
    this.project_contact = {
      name: null,
      job_title: null,
      email: null,
      phone: null,
      id:null,
      need_reminder: true,
      type: 2,
      action: null,
      project_id: this.current_project_id
    };
    this.disable_email = false;
    this.project_contact_title = 'Add Project Participant';
  }

  getEmailIds(){
    this.sflService.searchParticipantEmail({email: this.project_contact.email,project_id: this.current_project_id}).subscribe(
      data => this.handleGetEmailIds(data),
        error => this.handleError(error)  
    );
    
  }

  handleGetEmailIds(data){
    this.search_email = data.data;
  }

  selectEmail(id){
    this.project_contact.id = id;
    let data = this.search_email.filter(function(val){    
      return val.id == id;
    });
    console.log(data);
    this.search_email = [];
    this.project_contact.name = data[0].name;
    this.project_contact.email = data[0].email;
    this.project_contact.job_title = data[0].roles.name;
    this.project_contact.phone = data[0].phone;
    this.project_contact.need_reminder = data[0].need_reminder;
    this.project_contact.action = 'add';

  }

  emptySearch(){
    this.search_email = [];
  }

  addParticipant(){
    this.loading = true;
    if(this.project_contact.id == null){
      this.sflService.addTeamMembers(this.project_contact).subscribe(
        data => this.handleAddParticipantResponse(data),
          error => this.handleParticipantError(error)  
      );
    }else{ 
    console.log(this.project_contact);
      this.sflService.updateTeamMembers(this.project_contact).subscribe(
        data => this.handleAddParticipantResponse(data),
          error => this.handleParticipantError(error)  
      );
    }
  }

  handleAddParticipantResponse(response){
    this.loading = false;
    this.status = response.status;
    if(this.status == "success"){
      this.showParticipantForm = false;
    }
    this.project_contact_message = response.message;
    let participants_values = response.data.filter(function(data){
      if(data.participant != null){
        return true;
      }     
    });
    this.participants = participants_values.map(function(data){
      return data.participant;
    });
    this.project_contact = {
      name: null,
      job_title: null,
      email: null,
      phone: null,
      id:null,
      need_reminder: true,
      action: null,
      type: 2,
      project_id: this.current_project_id
    };
  }
  handleParticipantError(response){
    this.loading = false;
    this.status = 'danger';
    this.project_contact_message = response.error.message;
    if(response.error.data){
      this.data = response.error.data;
    }else{
      this.data = [];
    }
  }

  editModal(id){
    this.loading = true;
    this.data = [];
    this.sflService.getTeamMemberById(id,2).subscribe(
              data => this.handleEditMemberResponse(data),
              error => this.handleError(error)
          );
    this.showParticipantForm = true;
    this.disable_email = true;
    this.project_contact_title = "Edit Project Participant";

  }

  handleEditMemberResponse(data){
    console.log(data['data']);
    this.loading = false; 
    let contact = data['data'];
    delete contact.access_rights;
    this.project_contact = contact;
    this.project_contact.project_id = this.current_project_id;
  }

  deleteModal(id){
    this.member_id = id;
    this.delete_contact = true;
    $('#deleteEmployeeModal').modal('show');
  }

  deleteContact(id){
    this.loading = true;
    this.data = [];
    this.sflService.deleteTeamMembers({id: id,type: 2,project_id: this.current_project_id}).subscribe(
              data => this.handleDeleteContactResponse(data),
              error => this.handleError(error)
          );
  }

  handleDeleteContactResponse(data){
    this.loading = false;
    $('#deleteMeetingModal').modal('hide');
    $('#deleteEmployeeModal').modal('hide');
    this.project_contact_message = data.message;
    let participants_values = data.data.filter(function(data){
      if(data.participant != null){
        return true;
      }     
    });
    this.participants = participants_values.map(function(data){
      return data.participant;
    });
    this.status = data.status;
  }

  openAddParticipant(){
    this.project_contact = {
      name: null,
      job_title: null,
      email: null,
      phone: null,
      id:null,
      need_reminder: true,
      action: null,
      type: 2,
      project_id: this.current_project_id
    };
    this.disable_email = false;
    this.showParticipantForm = !this.showParticipantForm;
    this.project_contact_title = "Add Project Participant";
  }

  /* Project Meeting */
  
  openAddMeetingForm(){
    this.show_meeting_form = !this.show_meeting_form;
    this.project_meeting = {
      name: '',
      date: null,
      notes: '',
      task: [],
      docs: [],
      id: null,
      project_id: this.current_project_id,
      country: null,
      zone: null,
      timezone: null,
      dst: null
    }
    this.data = [];
    this.urls = [];
    this.delete_files = [];
    this.project_meeting_message = null;
    this.status = null;
    this.show_meeting_form = false;
  }
  
  addTodo(){
    this.project_meeting.task.push('');
    console.log(this.project_meeting.task);
  }

  deleteTodo(i){
    this.project_meeting.task.splice(i, 1);
  }

  deleteFile(i,id=null){  
    this.urls.splice(i, 1);
    console.log(this.urls);
    this.project_meeting.docs.splice(i, 1);
    console.log(this.project_meeting.docs);
    if(id != null){
      this.delete_files.push(id);
    }
  }

  getFileDetails (event,append = null) {
    if (event.target.files && event.target.files[0]) {
      console.log("file.length",event.target.files.length);
      for (var i = 0; i < event.target.files.length; i++) { 
        this.project_meeting.docs.push(event.target.files[i]);
        let filename = event.target.files[i].name;
        var reader = new FileReader();
        reader.onload = (event:any) => {  
          this.urls.push({
          doc:event.target.result,
          doctype: event.target.result.split(",")[0].split(":")[1].split(";")[0],
          docname: filename
          }); 
        }
        reader.readAsDataURL(event.target.files[i]);
      }
      console.log(this.urls,this.project_meeting.docs);
    }
  }

  getZones(id,type){
     this.sflService.getTimezones({id: id,type: type}).subscribe(
        data => this.handleZoneResponse(data,type),
        error => this.handleOpenMeetingError(error)  
      );
  }

  handleZoneResponse(data,type){
  console.log(data,type);
    if(type == 'country'){
      this.zones = data['data'];
    }else{
      this.timezones = data['data'];
    }
  }


  addMeeting(){
    this.loading = true;
    this.project_meeting_title = "Add Meeting";
    this.data = [];
      this.project_meeting.date = this.datePipe.transform(this.project_meeting.date, 'short');
    if(this.project_meeting.date == null){
      this.project_meeting.date = '';
    
    }
    if(this.project_meeting.id == null){      
      this.sflService.addMeeting(this.project_meeting).subscribe(
        data => this.handleAddMeetingResponse(data),
          error => this.handleOpenMeetingError(error)  
      );
    }else{ 
      this.sflService.editMeeting(this.project_meeting,this.delete_files).subscribe(
        data => this.handleAddMeetingResponse(data),
          error => this.handleOpenMeetingError(error)  
      );
    }
  }

  handleAddMeetingResponse(response){
    this.loading = false;
    this.urls = [];
    this.delete_files = [];
    this.meeting = response.data;
    console.log("meeting2", this.meeting);
    this.project_meeting_message = response.message;
    this.status = response.status;
    this.show_meeting_form = false;
    this.project_meeting = {
      name: '',
      date: null,
      notes: '',
      task: [],
      docs: [],
      id: null,
      project_id: this.current_project_id,
      country: null,
      zone: null,
      timezone: null,
      dst: null
    }
  }

  trackMeetingArray(index,item){
    return index;
  }

  editMeetingModal(id){
  this.loading = true;
  this.project_meeting = {
      name: '',
      date: null,
      notes: '',
      task: [],
      docs: [],
      id: null,
      project_id: this.current_project_id,
      country: null,
      zone: null,
      timezone: null,
      dst: null
    }
    this.urls = [];
    this.data = [];
    this.sflService.getMeetingDetails({meeting_id: id}).subscribe(
              data => this.handleMeetingEdit(data),
              error => this.handleError(error)
          );
    this.show_meeting_form = true;
    this.project_meeting_title = "Edit Meeting";
  }

  handleMeetingEdit(data){
    this.loading = false;
    this.zones = data.zones;
    this.timezones = data.timezones;
    let project_meeting_data = data.data;
    this.project_meeting.id = project_meeting_data.id;
    this.project_meeting.country = project_meeting_data.country;
    this.project_meeting.zone = project_meeting_data.zone;
    this.project_meeting.timezone = project_meeting_data.timezone;
    this.project_meeting.dst = project_meeting_data.dst;
    this.project_meeting.project_id = project_meeting_data.project_id;
    this.project_meeting.date = new Date(project_meeting_data.date);
    this.project_meeting.name = project_meeting_data.name;
    this.project_meeting.notes = project_meeting_data.notes;
    for(let item of project_meeting_data.meeting__agendas){
      this.project_meeting.task.push(item.task);
    }
    for(let item of project_meeting_data.meeting__files){
      this.urls.push({
          doc: item.project__files.path,
          doctype: item.project__files.file_type,
          docname: item.project__files.name,
          docid: item.id
        });
    }
   
    console.log("project_meeting_data",this.project_meeting,this.urls);
  }

  deleteMeetingModal(id){
    this.meeting_id = id;
   // this.delete_contact = true;
    $('#deleteMeetingModal').modal('show');
  }

  deleteMeeting(id){
    this.loading = true;
    this.data = [];
    this.sflService.deleteMeeting({meeting_id: id}).subscribe(
              data => this.handleDeleteContactResponse(data),
              error => this.handleError(error)
          );
  }

  openMeetingDetails(id,index){
    this.loading = true;
    console.log(this.index_val,index);
    if( this.index_val != index){
      this.index_val = index;
      this.sflService.getMeetings({project_id: this.current_project_id,meeting_id: id}).subscribe(
                data => this.handleOpenMeetingResponse(data),
                error => this.handleOpenMeetingError(error)
            );
    }else if(this.index_val == index){
      this.index_val = null;
      this.sflService.getMeetings({project_id: this.current_project_id}).subscribe(
                data => this.handleOpenMeetingResponse(data),
                error => this.handleOpenMeetingError(error)
            );
    }
  }

  handleOpenMeetingResponse(response){
    this.loading = false;
    this.meeting = response.data;
    console.log("meeting3", this.meeting);
  }

  handleOpenMeetingError(response){
    this.loading = false;
    this.status = 'danger';
    this.project_meeting_message = response.error.message;
    this.data = response.error.data;
  }

  changeMeetingStatus(id,status){
    this.loading = true;
    this.sflService.changeMeetingStatus({meeting_id: id,status: status}).subscribe(
              data => this.handleChangeStatusResponse(data),
              error => this.handleError(error)
          );
  }

  handleChangeStatusResponse(response){
    this.loading = false;
    this.project_meeting_message = response.message;
    this.status = response.status;
  }

  /** Important Tasks **/

  openImportantTaskForm(){
    this.show_add_task = !this.show_add_task;
    this.logistics_title = "Add Task";
    this.data = [];
    this.logistic = {
      title: null,
      task: null,
      due_date: null,
      parent_task_id: null,
      type: null,
      assigned_to: null,
      need_reminder: null,
      note: null,
      task_id: null,
      urgent: null,
      assigned_to_id: null,
      p_task_id: null,
      project_id: null
    };
    this.project_logistic_message = null;
    this.status = null;
    this.show_add_task = false;
  }

  addLogisticTask(){
    this.loading = true;
    if(this.logistic.p_task_id == null){
      this.sflService.addLogisticTask(this.logistic).subscribe(
                data => this.handleAddLogisticsTask(data),
                error => this.handleError(error)
            );
    }else{
      this.sflService.updateLogisticTask(this.logistic).subscribe(
                data => this.handleAddLogisticsTask(data),
                error => this.handleError(error)
            );
    }
  }

  handleAddLogisticsTask(data){
    this.loading = false;    
    //this.prelatedtasks = data.data;
    this.handleTaskResponse(data);
    this.project_logistic_message = data.message;
    this.status = data.status;
    this.show_add_task = false;
  }

  selectType(type_id){
    if(type_id == 1){
      this.team_member = this.sfl_team;
    }else{
      this.team_member = this.participants;
    }
  }

  editImpTaskModal(p_temp_task_id,task_id,assigned_to = ''){
    this.loading = true;
    let form_data_ = {
      p_temp_task_id: p_temp_task_id,
      task_id: task_id,
      assigned_to: assigned_to 
    }
    this.sflService.getLogisticTask(form_data_).subscribe(
              data => this.handleGetLogisticsTask(data),
              error => this.handleError(error)
          );
  }

  deleteImpTaskModal(p_temp_task_id){
    $('#deleteTaskModal').modal("show");
    this.delete_task = p_temp_task_id;
  }

  deleteTaskAction(p_temp_task_id){
    this.loading = true;
    this.sflService.deleteLogisticTask({p_task_id: p_temp_task_id,project_id: this.current_project_id}).subscribe(
              data => this.handleDeleteLogisticsTask(data),
              error => this.handleError(error)
          );
  }

  handleDeleteLogisticsTask(data){
    console.log(data);
    this.loading = false;
    $('#deleteTaskModal').modal("hide");
    this.handleTaskResponse(data);
    this.project_logistic_message = data.message;
    this.status = data.status;
    this.checkarray = [];
    this.show_bulk_action_select = false;
  }

  handleGetLogisticsTask(response){
    console.log("Response",response);
    this.data = [];
    this.loading = false;
    this.show_add_task = true;
    this.logistics_title = 'Edit Task';
    this.logistic = {
      title: response.data.task.title,
      task: response.data.task.task,
      due_date: new Date(response.data.due_date),
      parent_task_id: response.data.task.parent_task_id,
      type: null,
      assigned_to: null,
      urgent: response.data.urgent,
      need_reminder: response.data.need_reminder,
      note: response.data.note,
      task_id: response.data.task.id,
      assigned_to_id : null, 
      p_task_id: response.data.id,
      project_id: this.current_project_id
    };

    if(response.data.assigned_to != null){
       if(response.data.assigned_to.users.type == 1){
          this.team_member = this.sfl_team;
        }else if(response.data.assigned_to.users.type == 2){
          this.team_member = this.participants;
        }else{
          this.team_member = [];
          this.logistic.assigned_to = null;
        }
      this.logistic.type = response.data.assigned_to.users.type;
      this.logistic.assigned_to = response.data.assigned_to.task_owner_id;
      this.logistic.assigned_to_id = response.data.assigned_to.id;
    }
    console.log("logistics",this.logistic);

  }

  openSubTasks(event: Event){
    let id=event.srcElement.id;
    if($('#'+id).parent().next('tr').hasClass('child')){
      if($('#'+id).parent().next('tr.child').hasClass('hide')){
        $('#'+id).parent().addClass('shown');
        $('#'+id).parent().next('tr.child').removeClass('hide');
      }else{
        $('#'+id).parent().removeClass('shown');
        $('#'+id).parent().next('tr.child').addClass('hide');
      }
    }
    
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
    this.selectBulk = null;
       
  }

  bulkAction(){
      
      console.log(this.selectBulk);
      if(this.selectBulk == 'assign'){
        this.show_bulk_assign_form = true;
      }else{
        this.loading = true;
        this.sflService.bulkAction({action: this.selectBulk,checkarray: this.checkarray,project_id: this.current_project_id}).subscribe(
                  data => this.handleDeleteLogisticsTask(data),
                  error => this.handleError(error)
              );
      }
    } 

  updateStatus(id,action,event){
    this.loading = true;
    this.sflService.updateStatus({id: id,action: action, action_val:event.currentTarget.checked }).subscribe(
                data => this.handleUpdateStatusResponse(data),
                error => this.handleError(error)
            );  
  }  

  handleUpdateStatusResponse(response){
    this.loading = false;
    this.project_logistic_message = response.message;
    this.status = response.status;
    if(response.data.length > 0){
      this.handleTaskResponse(response);
    }
  }

  bulkAssignToTask(){
    this.loading = true;
    this.assign_to.project_id = this.current_project_id;
    this.assign_to.ids = this.checkarray;
    this.sflService.bulkAssignAction(this.assign_to).subscribe(
        data => this.handleDeleteLogisticsTask(data),
        error => this.handleError(error)  
      );    
  }

  addChild(tasks,parent_id,checkedevent){
    let checked = checkedevent.currentTarget.checked;
    tasks.forEach(task => {
      console.log("task_id",task.p_temp_id);
      if(task.parent_task_id == parent_id && !this.checkarray.find(x => x == task.p_temp_id) && checked){
        this.checkarray.push(task.p_temp_id);
      }else if (!checked && this.checkarray.find(x => x == task.p_temp_id)) {
        this.checkarray.splice(this.checkarray.indexOf(task.p_temp_id), 1);
      }else{
       console.log("entering",task.parent_task_id,parent_id,this.checkarray.find(x => x == task.p_temp_id),checked);
      }
      if(task.children.length > 0){
        this.addChild(task.children,task.id,checkedevent);
      }
      if(this.checkarray.length > 0){
        this.show_bulk_action_select = true;
      }else{
        this.show_bulk_action_select = false;
      }

    });
  }


  /*** Project Files ***/

  openUploadFileForm(){
    console.log("data",this.data);
    this.show_add_file_form = !this.show_add_file_form;
    this.f_urls = [];
    this.status = null;
    this.project_file_message = null;
  }

  getProjectFileDetails (event) {
    if (event.target.files && event.target.files[0]) {
      for (var i = 0; i < event.target.files.length; i++) { 
        this.project_files[i] = event.target.files[i];
        let filename = event.target.files[i].name;
        var reader = new FileReader();
        reader.onload = (event:any) => {  
          this.f_urls.push({
          doc:event.target.result,
          doctype: event.target.result.split(",")[0].split(":")[1].split(";")[0],
          docname: filename
          }); 
        }
        reader.readAsDataURL(event.target.files[i]);
      }
      console.log(this.f_urls);
    }
  }

  addFileTemplate(type = 1){
    this.sflService.addFileTemplate(this.project_files,type,this.current_project_id).subscribe(
        data => this.handleAddFileTemplateResponse(data),
          error => this.handleFileError(error)  
      );      
  }

  handleFileError(error){
  console.log("error response",error);
    this.loading = false;
    this.status = 'danger';
    if(error.error.message == undefined){
      this.project_file_message = error.message;
    }else{
      this.project_file_message = error.error.message;
    }
    console.log(this.project_file_message);
    window.scroll(0,0);
  }

  handleAddFileTemplateResponse(response){
    this.show_add_file_form = false;
    this.f_urls = [];
    $("#deleteFileModal").modal("hide");
    this.status = response.status;
    this.project_file_message = response.message;
    this.temp_files = response.data.filter(function(file){
      return file.type == 1;
    });
    this.files = response.data.filter(function(file){
      return file.type == 3;
    });
    this.meeting_files = response.data.filter(function(file){
      return file.type == 2;
    });
    console.log("meeting_files",this.meeting_files);
  }

  deleteUploadFile(i){
    this.f_urls.splice(i, 1);
    this.project_files.splice(i, 1);
    console.log(this.project_files);    
  }

  deleteFileModal(id){
    $("#deleteFileModal").modal("show");
    this.delete_file_id = id;
  }

  deleteFileAction(id){
    this.loading = true;
    this.sflService.deleteProjectFile({id: id, project_id: this.current_project_id}).subscribe(
        data => this.handleAddFileTemplateResponse(data),
          error => this.handleError(error)  
      );    

  }

  clearProjectSearch(){
    this.search = {
      company_id: '',
      status: -1,
      project_id: ''
    };
    this.project_found = false;
    this.data = [];
    this.current_project_id = null;
  }

  
}

