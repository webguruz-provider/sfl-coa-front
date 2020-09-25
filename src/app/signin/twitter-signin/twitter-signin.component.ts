import { Component, OnInit } from '@angular/core';
import { SflServicesService } from '../../services/sfl-services.service';
import { TokenService } from '../../services/token.service';
import { AuthService } from '../../services/auth.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-twitter-signin',
  templateUrl: './twitter-signin.component.html',
  styleUrls: ['./twitter-signin.component.scss']
})
export class TwitterSigninComponent implements OnInit {
  public loading = false;
  public error = null;
  public data = [];
  public oauth_token = null;
  public oauth_verifier = null;
  constructor(private sflService: SflServicesService, private token:TokenService, private Auth: AuthService, private route: ActivatedRoute,private router: Router) { 
  	route.queryParams.subscribe(params => { 
  		this.oauth_token = params['oauth_token'],
  		this.oauth_verifier = params['oauth_verifier']
  	});
  }

  ngOnInit() {
  	this.loading = true;
  	/*this.sflService.twitterSignIn(this.oauth_token,this.oauth_verifier).subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error)
        );*/
  }

  handleResponse(response){
            this.loading = false;
            console.log(response);
            this.token.handle(response.data.token);
            this.error = null;
            this.data = [];
            this.Auth.changeAuthStatus(true);   
            this.router.navigate(['dashboard']);
    }

    handleError(response){
    	console.log(response);
        this.loading = false;
        this.error = response.error.message;
        this.data = response.error.data;
    } 

}
