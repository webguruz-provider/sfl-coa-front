import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
declare var jQuery: any;

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    private toggleButton: any;
    private sidebarVisible: boolean;
    public permissions: any;
    public user: any;

    constructor(public location: Location, private element : ElementRef, private token: TokenService, private Auth: AuthService, private router:Router) {
        this.sidebarVisible = false;
    }

    ngOnInit() {
		
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        this.user = JSON.parse(localStorage.getItem('user'));
        this.permissions = JSON.parse(atob(localStorage.getItem('mission')));
        if((this.router.url == '/templates' && this.user.type == 2) ||
		(this.router.url == '/team' && (this.user.type == 2 || (this.permissions.view_sfl_team !== undefined && !this.permissions.view_sfl_team))) ||
        (this.router.url == '/clients' && (this.user.type == 2 || (this.permissions.view_client !== undefined && !this.permissions.view_client))) ||
        (this.router.url == '/permissions' && (this.user.type == 2 || (this.permissions.manage_permissions !== undefined && !this.permissions.manage_permissions))) ||
        (this.router.url == '/projects' && (this.permissions != null && !this.permissions.view_project)) ){
            this.router.navigate(['permission-denied']);
        }
        console.log(this.user,"usersers");
    }
    sidebarOpen() {
        //const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        // console.log(toggleButton, 'toggle');

        setTimeout(function(){
            //toggleButton.classList.add('toggled');
        }, 500);
       // html.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    /*sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    };*/
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
          //  this.sidebarClose();
        }
    };
    isHome() {
        var titlee = this.location.prepareExternalUrl(this.location.path());

        if( titlee === '/home' ) {
            return true;
        }
        else {
            return false;
        }
    }
    isDocumentation() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if( titlee === '/documentation' ) {
            return true;
        }
        else {
            return false;
        }
    }

    logout(){
      //  event.preventDefault();
        this.token.remove();
        this.token.removeUser();
        this.Auth.changeAuthStatus(false);
        this.router.navigate(['/']);

    }
}
