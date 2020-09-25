import { Component, OnInit } from '@angular/core';
import { SflServicesService } from '../services/sfl-services.service';
import { TokenService } from '../services/token.service';
@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss']
})
export class MyprofileComponent implements OnInit {

  public loading = false;
  public profile_pic: string = "/assets/img/hero.png";
  public fileToUpload = null;
  public status = '';
  public message = '';
  public data = [];
  public form = {
  	name: null,
  	email: null,
  	job_title: null,
  	phone: null,
  	need_reminder: null,
  	description: null,
  	img: this.fileToUpload,
  	type: null,
  	id:null
  };
  public edit = false;
  public edit_btn_text = "Edit";
  
  constructor(private sflService: SflServicesService, private token:TokenService) { }

  ngOnInit() {
  	this.loading = true;
  	let user = JSON.parse(localStorage.getItem('user'));
  	this.form.id = user.user_id;
  	this.sflService.getTeamMemberById(user.user_id,user.type).subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error)
        ); 
  }

  handleResponse(response){
  	this.loading = false;
    let user = JSON.parse(this.token.getUser());
  	console.log("response",response);
    this.status = response.status;
    this.message = response.message;
  	this.form.id= response.data.id;
  	user.name = this.form.name = response.data.name;
  	user.email = this.form.email = response.data.email;
  	user.title = this.form.job_title = response.data.job_title;
  	this.form.phone = response.data.phone;
  	this.form.need_reminder = response.data.need_reminder;
  	this.form.description = response.data.description;
  	this.form.type = response.data.type;
  	if(response.data.img != null){
  		user.img = response.data.img;
      this.profile_pic = response.data.img;
  	}else{    
  		this.profile_pic = "images/profile/1/hero.png";
  	}
    this.token.updateResultList(user);
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

  handleFileInput(file){
    this.fileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.profile_pic = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  saveMyProfile(){
  	this.loading = true;
  	let user = JSON.parse(localStorage.getItem('user'));
  	console.log('user',user);
  	this.form.id = user.user_id;
  	this.form.email = user.email;
  	this.form.type = user.type;
  	this.sflService.updateProfile(this.form,this.fileToUpload).subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error)
        ); 
  }

  makeEdit(){
  	this.edit = !this.edit;
  	if(this.edit == true){
  		this.edit_btn_text = "Unedit";
  	}else{
  		this.edit_btn_text = "Edit";
  	}
  }

}
