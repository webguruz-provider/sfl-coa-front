import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SflServicesService } from '../services/sfl-services.service';
//import * as $ from 'jquery'; 
declare var $: any; 
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  constructor(public sflService: SflServicesService, public token:TokenService, private cdr: ChangeDetectorRef) { }
  public logo_file: string = "/assets/img/hero.png";
  public fileToUpload = null; 
  public formData = null;
  public form = {
    name: '',
    website: '',
    desc: '',
    logo:this.fileToUpload,
    id:'' 
  };

  public project_form = {
    company_id: '',
    name: '',
    template_id: '',
    region: '',
    id: ''
  };
  public project = [];
  public loading = false;
  public status = null;
  public message = null;
  public data = [];
  public clients = [];
  public pop_up_title = "Add Company";
  public index_val:number = null;
  public delete_id = null;
  public templates = [];
  public add_p_company_id = null;
  public project_pop_up_title = "Add Project";
  public delete_project = false;
  public all_clients = [];
  public search = {
    company_name: null,
    status: -1,
    website: null
  };
  public templateDisabled = false;
  public permissions: any;
  ngOnInit() { 

    this.permissions = JSON.parse(atob(localStorage.getItem('mission')));
    this.sflService.getCompanies().subscribe(
          data => this.handleCompanies(data),
          error => this.handleError(error)
      );

    this.sflService.getTemplates().subscribe(
            data => this.handleTemplates(data),
            error => this.handleError(error)
        ); 
      $(document).ready(function() {  
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
      });

    /*$(document).ready(function() {
      var table = $('#example').DataTable();
      // Add event listener for opening and closing details
      $('#example tbody').on('click', 'td.details-control', function () {
          var tr = $(this).closest('tr');
          var row = table.row( tr );

          if ( tr.hasClass('shown') ) {
              setTimeout(function(){
                  console.log($('.project_table').attr('id'));
                  $("#"+$('.project_table').attr('id')).DataTable({
                    'destroy':true,
                    "order": [[ 0, "desc" ]]
                  });
              },1000);
          }
      });
    });*/
   
  }

  handleTemplates(data){
    console.log("template_data",data);
    this.templates = data.data.filter(function($temp){
      return $temp['task_count'] > 0;
    });
  }

 /* ngAfterViewInit(){
    $(document).ready(function(){
    $('#example').DataTable({'destroy': true});

    });
  }*/

  handleCompanies(data){
    this.all_clients = this.clients = data.data;
    /*setTimeout(function(){
    $('#example').DataTable();
    },3000  );*/
  }  

  addClient(form){
    this.loading = true;
    this.data = [];
   // this.formData = new FormData();
   // formData.append("logo",)
    if(this.form.id == ''){
      this.sflService.addClient(form,this.fileToUpload).subscribe(
          data => this.handleResponse(data),
          error => this.handleError(error)
      );
    }else{
      this.sflService.editClient(form,this.fileToUpload).subscribe(
          data => this.handleResponse(data),
          error => this.handleError(error)
      );
    }
  }

  callProjects(client_id,index){
    if( this.index_val != index){
      this.index_val = index;
      this.sflService.getCompaniesWithProjects(client_id).subscribe(
          data => this.handleCallProjectResponse(data),
          error => this.handleError(error)
      );
    }else if(this.index_val == index){
      this.index_val = null;
      this.sflService.getCompanies().subscribe(
          data => this.handleCallProjectResponse(data),
          error => this.handleError(error)
      );
      /*$(document).ready(function(){
      setTimeout(function(){
      console.log('#datatable'+index);
      $('.project_table').DataTable({'destroy': true});
      },1000);
      });*/
    }else{
     alert("dont know");
    }
  }

  handleCallProjectResponse(response){
    this.loading = false;
    this.all_clients = this.clients = response.data;  
    this.status = response.status;
    this.message = response.message;
   
  }

  openAddClientModal(){
    this.pop_up_title = "Add Company";
    this.fileToUpload = null;
      this.form = {
      name: '',
      website: '',
      desc: '',
      logo:this.fileToUpload,
      id:'' 
    };
    this.logo_file = "/assets/img/hero.png";
    $('#addEmployeeModal').modal('show');
  }

  handleResponse(response){
    console.log(response.data);
    this.loading = false;
    this.all_clients = this.clients = response.data;  
    $('#addEmployeeModal').modal('hide');
    $('#deleteEmployeeModal').modal('hide');
    $('#addProject').modal('hide');
    this.status = response.status;
    this.message = response.message;
    window.scroll(0,0);
  }

   handleError(response,type = null){
    this.loading = false;
    this.status = 'danger';
    this.message = response.error.message;
    window.scroll(0,0);
    console.log("handle error");
    if(response.error.data){
      this.data = response.error.data;
    }else{
      this.data = [];
    }
  }

  handleFileInput(file){
    this.fileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.logo_file = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  openEditModel(id){
  console.log("edit client");
    this.data = [];
    this.sflService.getCompanyById(id).subscribe(
              data => this.handleDataToBeEdit(data),
              error => this.handleError(error)
          );
    $('#addEmployeeModal').modal('show');
    this.pop_up_title = "Edit Company Details";

  }

  handleDataToBeEdit(data){
    this.form = data.data;
    console.log(this.form);
    this.logo_file = this.form.logo;
  }

  openDeleteModal(company_id){
    this.delete_id = company_id;
    $('#deleteEmployeeModal').modal('show');
    this.delete_project = false;
  }

  deleteCompany(company_id){
    this.data = [];
    this.sflService.deleteCompany(company_id).subscribe(
              data => this.handleResponse(data),
              error => this.handleError(error)
          );
  }

  openProjectDeleteModel(project_id){
    this.delete_id = project_id;
    $('#deleteEmployeeModal').modal('show');
    this.delete_project = true;
  }

  openAddProjectModel(company_id){
    this.project_pop_up_title = "Add Project";
    this.project_form = {
      company_id: '',
      name: '',
      template_id: '',
      region: '',
      id: ''
    };
    this.templateDisabled = false;
    //this.add_p_company_id = company_id;
    this.project_form.company_id = company_id;
    $('#addProject').modal('show');
  }

  addProject(){    
    if(this.project_form.id == ''){
      this.sflService.addProject(this.project_form).subscribe(
          data => this.handleAddProjectResponse(data),
          error => this.handleError(error)
      );
    }else{
      this.sflService.editProject(this.project_form).subscribe(
          data => this.handleAddProjectResponse(data),
          error => this.handleError(error)
      );
    }
  }

  handleAddProjectResponse(response){
    this.loading = false;
    this.all_clients = this.clients = response.data;  
    $('#addProject').modal('hide');
    this.status = response.status;
    this.message = response.message;
    window.scroll(0,0);
  }

  openEditProjectModel(project_id){
    this.project_form.id = project_id;
    this.templateDisabled = true;
    $('#addProject').modal('show');
    this.sflService.getProjectById(project_id).subscribe(
        data => {
          this.project = data['data'];
          console.log(data['data']);
          this.project_form.id = this.project['id'];
          this.project_form.company_id = this.project['company_id'];
          this.project_form.template_id = this.project['template_id'];
          this.project_form.region = this.project['region'];
          this.project_form.name = this.project['name'];
        },
        error => this.handleError(error)
    );
    this.project_pop_up_title = "Edit Project";
  }

  deleteProject(project_id){
    this.data = [];
    this.sflService.deleteProject(project_id).subscribe(
              data => this.handleResponse(data),
              error => this.handleError(error)
          );
  }

  filterClient(){
  console.log(this.search.company_name);
    let s = this.search;
    this.clients = this.all_clients.filter(function(data) { console.log(s);
      if((s.company_name == null || data.name.startsWith(s.company_name))  && ( s.status == -1 || (s.status == 1 && data.projects_count > 0) || (s.status == 0 && data.projects_count == 0)) && (s.website == null || data.website.startsWith(s.website))){
        console.log("true");
        return true;
      }
      console.log("false");
      return false;
    });
    $('#example').dataTable().fnDestroy();
    $('#example tbody').empty();
    $('#example').DataTable({
      "columnDefs": [
        { "orderable": false, "targets": [0,1,5] }
      ],
      'destroy': true,
    });
    
  }

  clearClientSearch(){
    this.search = {
      company_name: null,
      status: -1,
      website: null
    };
    this.filterClient();
  }

  close(){
    this.pop_up_title = "Add Team Member";
  }
}
