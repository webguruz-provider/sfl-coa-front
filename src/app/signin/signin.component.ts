import { Component, OnInit } from '@angular/core';
import { SflServicesService } from '../services/sfl-services.service';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

import { AuthService as SocialAuth} from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider, LinkedInLoginProvider } from "angularx-social-login";

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})


export class SigninComponent implements OnInit {
    test : Date = new Date();
    focus;
    focus1;
    public loading = false;
    constructor(private sflService: SflServicesService, private token:TokenService, private router: Router, private Auth: AuthService, private authService: SocialAuth) { 
    	
    }

    public form = {
        email:(localStorage.getItem('#0U867') === null)?'':atob(localStorage.getItem('#0U867')),
        password:(localStorage.getItem('#0k951') === null)?'':atob(localStorage.getItem('#0k951')),
        remember_me:null
    };
    public error = null;
    public data = [];
    //private router = Router;

    onSubmit() {
        this.loading = true;
        this.error = null;
        this.data = [];
        this.sflService.signin(this.form).subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error)
        );
    }


    handleResponse(response){
            this.loading = false;
            if(this.form.remember_me == true){
                localStorage.setItem('#0U867',btoa(this.form.email)); //set email in localstorage
                localStorage.setItem('#0k951',btoa(this.form.password)); //set password in localstorage
            }
            this.token.handle(response.data);
            this.error = null;
            this.data = [];
            this.Auth.changeAuthStatus(true);   
            let user = JSON.parse(this.token.getUser());
            if(user.type == 1){
                this.router.navigate(['dashboard']);
            }else{
                this.router.navigate(['projects']);
            }
    }

    handleError(response){
        this.loading = false;
        this.error = response.error.message;
        this.data = response.error.data;
        window.scroll(0,0);
    } 

    /*twitterLogin(){
        this.sflService.twitterSignIn().subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error)
        );
    } 

    linkedInLogin(){
        this.sflService.linkedInSignIn().subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error)
        );
    }*/

    signInWithLinkedIn(): void {
        this.authService.signIn(LinkedInLoginProvider.PROVIDER_ID).then(data => {console.log(data)});
      }   

    ngOnInit() {}
}
