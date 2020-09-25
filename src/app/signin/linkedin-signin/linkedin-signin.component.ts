import { Component, OnInit } from '@angular/core';
import { AuthService } from "angularx-social-login";
import { SocialUser } from 'angularx-social-login';
import { LinkedInLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-linkedin-signin',
  templateUrl: './linkedin-signin.component.html',
  styleUrls: ['./linkedin-signin.component.scss']
})
export class LinkedinSigninComponent implements OnInit {
  user: SocialUser;
  constructor(private authService: AuthService) { }

  ngOnInit() {
  	this.authService.authState.subscribe((user) => {
      this.user = user;
    });
  }

  signInWithLinkedIn(): void {
    this.authService.signIn(LinkedInLoginProvider.PROVIDER_ID);
  }  

}
