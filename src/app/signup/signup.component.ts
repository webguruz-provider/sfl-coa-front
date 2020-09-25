import { Component, OnInit } from '@angular/core';
import { SflServicesService } from '../services/sfl-services.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  
	public form:any = {
  		name:'',
        email:'',
        password:'',
        password_confirmation: '',
        job_title:'',
        phone:'',
        company_id: '',
        type: 2
	};
	public error = null;
	public data = [];
    public status = null;
    public message = null;
    public loading = false;
  	constructor(private sflService: SflServicesService, private router: Router) {
	}

	ngOnInit() {}

    onSubmit() {
        this.loading = true;
        this.data = [];
        this.sflService.signup(this.form).subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error)
        );
    }


    handleResponse(response){
            this.loading = false;
            this.status = response.status;
            this.message = response.message;
            this.data = [];
            window.scroll(0,0);
            this.router.navigate(['signin']);
            this.form = {
                name:'',
                email:'',
                password:'',
                password_confirmation: '',
                job_title:'',
                phone:'',
                company_id: '',
                type: 2
            };
    }

    handleError(response){
        this.loading = false;
        this.status = "danger";
        this.message = response.error.message;
        this.data = response.error.data;
        window.scroll(0,0);
    }  

   


}
