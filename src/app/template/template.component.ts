import { SflServicesService } from '../services/sfl-services.service';
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
declare var jQuery: any;
import { NestableSettings } from '../../../lib/src/nestable.models';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {

  public templates = [];
  constructor(private sflService: SflServicesService,private route: ActivatedRoute, private el: ElementRef,
    private renderer: Renderer2) { 
    this.renderer.listen(this.el.nativeElement, 'listUpdated', e => {
      this.task_list = e.detail.task_list;

    });
  }
  public form:any = {
    name: ''    
  };
  public task:any = {
    parent_task_id: 0,
    template_id: '',
    title: '',
    task:''
  }
  public error = null;
  public data = [];
  public task_list = null;
  public message = null;
  public status = null;
  public temp_name = null;
  public update = false;
  public all_tasks = [];
  public ori_all_tasks = [];
  public pop_up_title = 'Add Task';
  public delete_task_id = '';
  public delete_template_id = '';
  ngOnInit() {
    this.data = [];
    this.route.paramMap.subscribe(queryParams => {
        this.task.template_id = queryParams.get("id");
        this.temp_name = queryParams.get("id");
      })
    this.sflService.getTemplates().subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error)
        );
    if(this.task.template_id != null){
    console.log(this.task_list);
      this.sflService.getTasks({template_id: this.task.template_id}).subscribe(
          task_data => {
            console.log("task_data",task_data);
            this.task_list = task_data['data'];
            this.ori_all_tasks = this.all_tasks = task_data['plain_list'];
          },
          error => this.handleError(error)
      )
    }    

    jQuery(".addBtn").click(function(){
      jQuery("#task_toggle").slideToggle();
      });

      jQuery(document).ready(function(){
          jQuery('#myselection').on('change', function(){
          var demovalue = jQuery(this).val(); 
          jQuery("div.myDiv").hide();
          jQuery("#show"+demovalue).show();
          });
        });

      
  }

  handleResponse(response){
    console.log(response);
    this.templates = response.data;
    jQuery('#hidden-content').modal('hide');      
    this.status = response.status;
    this.message = response.message;
    window.scroll(0,0);
    console.log(this.templates);
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

  onSubmit(){
        console.log(this.form);
        this.data = [];
        this.sflService.addTemplate(this.form).subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error,'add_template')
        );
  }

  getTemplate(value){
    console.log("value",value);
    this.task.template_id = value;
    this.data = [];
    this.sflService.getTasks({template_id: value}).subscribe(
        data => {
          console.log("data1",data);
          this.task_list = data['data'];
          this.ori_all_tasks = this.all_tasks = data['plain_list'];
        },
        error => this.handleError(error)
    )
  }

  addTask(form){
    this.data = [];
    this.sflService.addTask(form).subscribe(
        data => this.handleAddTaskResponse(data),
        error => this.handleError(error)
    )
  }

  handleAddTaskResponse(response){
    this.task.title = null;
    this.task.task = null;
    console.log("task-list",this.task_list);
    this.task_list = response.data;
    this.ori_all_tasks = this.all_tasks = response.plain_list;
    jQuery("#toggleTask").modal('hide');
    jQuery('#deleteEmployeeModal').modal("hide");
    jQuery('#hidden-content').modal('hide');      
    this.status = response.status;
    this.message = response.message;
    window.scroll(0,0);
    this.update = false;
  }

  saveTaskSort(){

    this.data = [];
    this.sflService.sortTasks({task_list: this.task_list}).subscribe(
            data => this.handleAddTaskResponse(data),
            error => this.handleError(error)
        );
  }

  editTask(form){
    this.data = [];
    this.sflService.editTasks(form).subscribe(
            data => this.handleAddTaskResponse(data),
            error => this.handleError(error)
        );
  }

  openEditTask(task_details){
    jQuery("#toggleTask").modal('show');
    console.log(this.ori_all_tasks);
    this.all_tasks = this.ori_all_tasks.filter(function(t){
    console.log(t.id,task_details.id);
      return t.id != task_details.id;
    });

    this.task.parent_task_id = task_details.parent_task_id;
    console.log(this.task.parent_task_id);
    this.task.template_id = task_details.template_id;
    this.task.title = task_details.title;
    this.task.task = task_details.task;
    this.task.id = task_details.id;
    this.pop_up_title = "Edit Task";
    if(this.task.parent_task_id > 0){
      jQuery("#showOne").show();
    }
    this.update = true;

  }

  deleteTask(id,template_id){
    this.data = [];
    this.sflService.deleteTasks({id: id,template_id:template_id}).subscribe(
            data => this.handleAddTaskResponse(data),
            error => this.handleError(error)
        );
  }
 

  public options = {
    fixedDepth: false
  } as NestableSettings;

  public drag(e) {
    console.log(e);
  }

  public drop(e) {
    console.log(e);
  }

  public onDisclosure(e) {
    console.log(e);
  }

  close(){
    this.pop_up_title = "Add Task";
    this.task.title = null;
    this.task.task = null;
    this.task.parent_task_id = 0;
  }

  openDeleteModal(task_id,template_id){
    this.delete_task_id = task_id;
    this.delete_template_id = template_id;
    jQuery('#deleteEmployeeModal').modal("show");
  }




  
}
