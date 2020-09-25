import { Component, OnInit } from '@angular/core';
import { SflServicesService } from '../../services/sfl-services.service';
declare var jQuery: any;
import { IconPickerModule } from 'ngx-icon-picker';

@Component({
  selector: 'app-template-table',
  templateUrl: './template-table.component.html',
  styleUrls: ['./template-table.component.scss']
})
export class TemplateTableComponent implements OnInit {
	
  public templates = [];
  public error = null;
  public status = null;
  public message = null;
  public data = [];
  public delete_template_id = null;
  public form:any = {
    name: ''    
  };
  constructor(private sflService: SflServicesService) { }

  ngOnInit() {
  	this.sflService.getTemplates().subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error)
        );

    
  }

  onSubmit(){
        console.log(this.form);
        this.data =[];
        this.sflService.addTemplate(this.form).subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error)
        );
  }

  handleResponse(response){
    this.templates = response.data;
    jQuery('#hidden-content').modal('hide');      
    this.status = response.status;
    this.message = response.message;
    window.scroll(0,0);
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

  deleteTemplateModal(id){
      jQuery('#deleteEmployeeModal').modal('show');
      this.delete_template_id = id;
      console.log(this.delete_template_id);
  }

  deleteAction(id){
    this.data = [];
    this.sflService.deleteTemplate({id: id}).subscribe(
            data => this.handleDeleteResponse(data),
            error => this.handleError(error)
        );
  }

  handleDeleteResponse(response){
    jQuery('#deleteEmployeeModal').modal('hide');
    this.templates = response.data;
    this.status = response.status;
    this.message = response.message;
    window.scroll(0,0);
  }


  addTemplate(){
    jQuery('#hidden-content').modal("show");
  }

}
