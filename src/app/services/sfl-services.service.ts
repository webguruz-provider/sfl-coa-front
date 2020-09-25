import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class SflServicesService {

  //private baseUrl = 'http://localhost:8000/api/'; 
  public baseUrl = 'http://202.164.49.133:5022/sfl-coa/blog/public/index.php/api/'; 


  constructor(private http:HttpClient, private token:TokenService) {
 
         
    
  }  
                       
   
  signin(data){
  	return this.http.post(`${this.baseUrl}login`,data);
  }

 /* twitterSignIn(){
    return this.http.get(`${this.baseUrl}redirect/twitter`);
  }

  linkedInSignIn(){
    return this.http.get(`${this.baseUrl}redirect/linkedin`);
  }
*/
  signup(data){
  	return this.http.post(`${this.baseUrl}register`,data);
  }

  forgetPasswordRequest(data){
  	return this.http.post(`${this.baseUrl}password/create`,data);
  }

  forgetPasswordResponse(data){
  	return this.http.post(`${this.baseUrl}password/reset`,data);
  }

  passHeaders(){
    let headers_object = new HttpHeaders(); // create header object
    headers_object = headers_object.append('Content-Type', 'application/json');
    headers_object = headers_object.append("Authorization", 'Bearer '+this.token.get());
    return headers_object;
  }

  passFileHeaders(){
    let headers_object = new HttpHeaders(); // create header object
   // headers_object = headers_object.append('Content-Type', 'multipart/form-data');
    headers_object = headers_object.append("Authorization", 'Bearer '+this.token.get());
    return headers_object;
  }

  getTemplates(){
    return this.http.get(`${this.baseUrl}templates`,{headers:this.passHeaders()});
  }

  addTemplate(data){
    return this.http.post(`${this.baseUrl}templates/add`,data,{headers:this.passHeaders()});
  }

  addTask(data){
    return this.http.post(`${this.baseUrl}templates/add-task`,data,{headers:this.passHeaders()});
  }

  getTasks(data){
    return this.http.post(`${this.baseUrl}templates/get-tasks`,data,{headers:this.passHeaders()});
  }

  editTasks(data){
    return this.http.post(`${this.baseUrl}templates/edit-tasks`,data,{headers:this.passHeaders()});
  }

  deleteTasks(data){
    return this.http.post(`${this.baseUrl}templates/delete-tasks`,data,{headers:this.passHeaders()});
  }

  deleteTemplate(data){
    return this.http.post(`${this.baseUrl}templates/delete`,data,{headers:this.passHeaders()});
  }

  sortTasks(data){
    return this.http.post(`${this.baseUrl}templates/sort-tasks`,data,{headers:this.passHeaders()});
  }

  getTeamMembers(){
    return this.http.get(`${this.baseUrl}team`,{headers:this.passHeaders()});
  }

  getTeamMemberById(id,type){
    return this.http.get(`${this.baseUrl}get-member/${id}/${type}`,{headers:this.passHeaders()});
  }

  addTeamMembers(data){
    return this.http.post(`${this.baseUrl}add-team`,data,{headers:this.passHeaders()});
  }
  
  updateTeamMembers(data){
    return this.http.post(`${this.baseUrl}update-team`,data,{headers:this.passHeaders()});
  }

  deleteTeamMembers(data){
    return this.http.post(`${this.baseUrl}delete-team`,data,{headers:this.passHeaders()});
  }

  changePassword(data){
    return this.http.post(`${this.baseUrl}change-password`,data,{headers:this.passHeaders()});
  }

  getCompaniesWithProjects(client_id){
    return this.http.get(`${this.baseUrl}companies/${client_id}`,{headers:this.passHeaders()}); 
  }

  getCompanies(){
    return this.http.get(`${this.baseUrl}companies`,{headers:this.passHeaders()}); 
  }

  deleteCompany(company_id){
    return this.http.post(`${this.baseUrl}companies/delete`,{company_id:company_id},{headers:this.passHeaders()});
  }

  addClient(data,file){
    data['logo'] = file;
    
    let formData = new FormData();
    formData.append('name',data.name);
    formData.append('website',data.website);
    formData.append('logo',file);
    formData.append('desc',data.desc);   
    return this.http.post(`${this.baseUrl}companies/add`,formData,{headers:this.passFileHeaders()}); 
  }

  editClient(data,file){
    data['logo'] = file;
    
    let formData = new FormData();
    formData.append('id',data.id);
    formData.append('name',data.name);
    formData.append('website',data.website);
    if(file != null){
      formData.append('logo',file);
    }
    formData.append('desc',data.desc);   
    return this.http.post(`${this.baseUrl}companies/edit`,formData,{headers:this.passFileHeaders()}); 
  }

  getProjects(form){
    return this.http.post(`${this.baseUrl}projects`,form,{headers:this.passHeaders()}); 
  }

  getCompanyById(id){
    return this.http.get(`${this.baseUrl}get-company/${id}`,{headers:this.passHeaders()}); 
  }

  addProject(form){
    return this.http.post(`${this.baseUrl}projects/add`,form,{headers:this.passHeaders()});
  }

  addProjectGetId(form){
    return this.http.post(`${this.baseUrl}projects/add-get-id`,form,{headers:this.passHeaders()});
  }

  callProjectsWithCompany(client_id){
    return this.http.post(`${this.baseUrl}companies/with-projects`,{company_id:client_id},{headers:this.passHeaders()}); 
  }

  editProject(form){
    return this.http.post(`${this.baseUrl}projects/edit`,form,{headers:this.passHeaders()});
  }

  getProjectById(id){
    return this.http.get(`${this.baseUrl}get-project/${id}`,{headers:this.passHeaders()}); 
  }

  deleteProject(project_id){
    return this.http.post(`${this.baseUrl}projects/delete`,{project_id:project_id},{headers:this.passHeaders()});
  }

  searchProject(form){
    return this.http.post(`${this.baseUrl}search-projects`,form,{headers:this.passHeaders()});
  }

  searchParticipantEmail(form){
    return this.http.post(`${this.baseUrl}get-searched-participant`,form,{headers:this.passHeaders()});
  }

  getMeetings(form){
    return this.http.post(`${this.baseUrl}meetings`,form,{headers:this.passHeaders()});
  }

  addMeeting(form){
    let frmData = new FormData();
    frmData.append("name", form.name);
    frmData.append("country", form.country);
    frmData.append("zone", form.zone);
    frmData.append("timezone", form.timezone);
    frmData.append("dst", form.dst);
    frmData.append("date", form.date);
    frmData.append("notes", form.notes);
    frmData.append("project_id", form.project_id);
    for (var i = 0; i < form.task.length; i++) { 
      frmData.append("task[]", form.task[i]);
    }

    for (var i = 0; i < form.docs.length; i++) { 
      frmData.append("docs[]", form.docs[i]);
    }
    return this.http.post(`${this.baseUrl}meeting/add`,frmData,{headers:this.passFileHeaders()});
  }

  editMeeting(form,delete_files){
    let frmData = new FormData();
    frmData.append("name", form.name);
    frmData.append("date", form.date);
    frmData.append("country", form.country);
    frmData.append("zone", form.zone);
    frmData.append("timezone", form.timezone);
    frmData.append("dst", form.dst);
    frmData.append("notes", form.notes);
    frmData.append("project_id", form.project_id);
    frmData.append("id", form.id);
    for (var i = 0; i < delete_files.length; i++) { 
      frmData.append("delete_files[]", delete_files[i]);
    }
    for (var i = 0; i < form.task.length; i++) { 
      frmData.append("task[]", form.task[i]);
    }
    for (var i = 0; i < form.docs.length; i++) { 
      frmData.append("docs[]", form.docs[i]);
    }
    
    return this.http.post(`${this.baseUrl}meeting/edit`,frmData,{headers:this.passFileHeaders()});
  }

  getMeetingDetails(form){
    return this.http.post(`${this.baseUrl}meeting/get`,form,{headers:this.passHeaders()});
  }

  changeMeetingStatus(form){
    return this.http.post(`${this.baseUrl}meeting/change-status`,form,{headers:this.passHeaders()});
  }

  deleteMeeting(form){
    return this.http.post(`${this.baseUrl}meeting/delete`,form,{headers:this.passHeaders()});
  }

  addLogisticTask(form){
    return this.http.post(`${this.baseUrl}logistic/add`,form,{headers:this.passHeaders()});
  }

  getLogisticTask(form){
    return this.http.post(`${this.baseUrl}logistic/get`,form,{headers:this.passHeaders()});
  }

  updateLogisticTask(form){
    return this.http.post(`${this.baseUrl}logistic/edit`,form,{headers:this.passHeaders()});
  }

  deleteLogisticTask(form){
    return this.http.post(`${this.baseUrl}logistic/delete`,form,{headers:this.passHeaders()});
  }
  bulkAction(form){
    return this.http.post(`${this.baseUrl}logistic/bulk-action`,form,{headers:this.passHeaders()});
  }
  updateStatus(form){
    return this.http.post(`${this.baseUrl}logistic/update-status`,form,{headers:this.passHeaders()});
  }

  bulkAssignAction(form){
    return this.http.post(`${this.baseUrl}bulk-assign-action`,form,{headers:this.passHeaders()});
  }

  addFileTemplate(form,type,project_id){  
    let frmData = new FormData();
    frmData.append("project_id", project_id);
    frmData.append("type", type);
    for (var i = 0; i < form.length; i++) { 
      frmData.append("project_files[]", form[i]);
    }    
    return this.http.post(`${this.baseUrl}add-files`,frmData,{headers:this.passFileHeaders()});
  }

  deleteProjectFile(form){
    return this.http.post(`${this.baseUrl}delete-files`,form,{headers:this.passHeaders()});
  }

  getAccessRights(){
    return this.http.get(`${this.baseUrl}get-access-rights`,{headers:this.passHeaders()}); 
  }

  updateAccessRights(form){
    return this.http.post(`${this.baseUrl}update-access-rights`,form,{headers:this.passHeaders()});
  }

  getAccessRightsById(form){
    return this.http.post(`${this.baseUrl}get-access-rights-by-id`,form,{headers:this.passHeaders()});
  }       

  updateProfile(data,file){
    
    let formData = new FormData();
    formData.append('id',data.id);
    formData.append('name',data.name);
    formData.append('email',data.email);
    formData.append('job_title',data.job_title);
    formData.append('phone',data.phone);
    formData.append('description',data.description);
    formData.append('need_reminder',data.need_reminder);
    formData.append('type',data.type);
    if(file != null){
      formData.append('img',file);
    } 
    return this.http.post(`${this.baseUrl}update-team`,formData,{headers:this.passFileHeaders()}); 
  }

  getDashboard(form){
    return this.http.post(`${this.baseUrl}dashboard`,form,{headers:this.passHeaders()});
  }

  getCountries(){
    return this.http.get(`${this.baseUrl}countries`,{headers:this.passHeaders()})
  }

  getTimezones(form){
    return this.http.post(`${this.baseUrl}get-timezones`,form,{headers:this.passHeaders()});
  }

  getProjectsList(status){
    return this.http.get(`${this.baseUrl}get-project-list/${status}`,{headers:this.passHeaders()})
  }

  getImpTasks(form){ 
    return this.http.post(`${this.baseUrl}get-todays-task`,form,{headers:this.passHeaders()});
  }

  getPendingTask(id){
    return this.http.post(`${this.baseUrl}get-pending-tasks`,{user_id: id},{headers:this.passHeaders()});
  }

  bulkAssignOnDeletion(form){
    return this.http.post(`${this.baseUrl}bulk-assign-on-deletion`,form,{headers:this.passHeaders()});
  }
}
