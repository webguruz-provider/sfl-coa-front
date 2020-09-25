import { Component, OnInit } from '@angular/core';
import { SflServicesService } from '../../services/sfl-services.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password-request.component.html',
  styleUrls: ['./forget-password-request.component.scss']
})
export class ForgetPasswordRequestComponent implements OnInit {

    public loading: boolean = false;
    constructor(private sflService: SflServicesService) { 
    }
    public form = {
        email:'',
    };
    public message = null;
    public status = null;
    public data = [];
  
    onSubmit() {
        this.loading = true;
        this.data = [];
        this.sflService.forgetPasswordRequest(this.form).subscribe(
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
