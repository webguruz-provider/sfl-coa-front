import { Component, OnInit } from '@angular/core';
import { SflServicesService } from '../../services/sfl-services.service';
import { ActivatedRoute,Router } from '@angular/router';
@Component({
  selector: 'app-forget-password-response',
  templateUrl: './forget-password-response.component.html',
  styleUrls: ['./forget-password-response.component.scss']
})
export class ForgetPasswordResponseComponent implements OnInit {

  constructor(private sflService: SflServicesService,private route: ActivatedRoute, private router: Router) {
  	route.queryParams.subscribe(params => { 
  		this.form.token = params['token'],
  		this.form.email = atob(params['01e01'])
  	});


  }

  public form = {
        email:'',
        password: '',
        password_confirmation: '',
        token: ''	
    };
    public message = null;
    public status = null;
    public data = [];
  	public loading: boolean = false;
    onSubmit() {
    	this.loading = true;
      this.data = [];
        this.sflService.forgetPasswordResponse(this.form).subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error)
        );
    }


    handleResponse(response){
    		console.log(response);
    		this.loading = false;
    		this.status = response.status;
    		this.message = response.message;
        this.data = [];
        window.scroll(0,0);
        this.form.password = null;
        this.form.password_confirmation = null;
        
    }

    handleError(response){
    	this.loading = false;
    	this.status = "danger";
    	this.message = response.error.message;
        this.data = response.error.data;
        window.scroll(0,0);
    }


  ngOnInit() {
  }

}
