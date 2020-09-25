import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule,CanActivate } from '@angular/router';


import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ForgetPasswordRequestComponent } from './forget-password/forget-password-request/forget-password-request.component';
import { ForgetPasswordResponseComponent } from './forget-password/forget-password-response/forget-password-response.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BeforeLoginService } from './services/before-login.service';
import { AfterLoginService } from './services/after-login.service';
import { TwitterSigninComponent } from './signin/twitter-signin/twitter-signin.component';
import { LinkedinSigninComponent } from './signin/linkedin-signin/linkedin-signin.component';
import { TemplateComponent } from './template/template.component';
import { TemplateTableComponent } from './template/template-table/template-table.component';
import { SflteamComponent } from './sflteam/sflteam.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { PermissionDeniedComponent } from './permissions/permission-denied/permission-denied.component';
import { ClientsComponent } from './clients/clients.component';
import { ProjectComponent } from './project/project.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { ImportantTasksComponent } from './tasks/important-tasks/important-tasks.component';

const routes: Routes =[
    { path: '', 
      component: SigninComponent, 
      canActivate: [BeforeLoginService], 
      children: [
        {path:'twitter', component: TwitterSigninComponent},
        {path:'twitter', component: LinkedinSigninComponent}

      ]
    },
    { path: 'signup', component: SignupComponent, canActivate: [BeforeLoginService] },
    { path: 'password/request-password', component: ForgetPasswordRequestComponent, canActivate: [BeforeLoginService]  },
    { path: 'password/reset-password', component: ForgetPasswordResponseComponent },
    { path: 'templates', component: TemplateTableComponent, canActivate: [AfterLoginService] },
    { path: 'templates-add/:id', component: TemplateComponent, canActivate: [AfterLoginService] },
    { path: 'template-form', component: TemplateComponent, canActivate: [AfterLoginService] },
    { path: '', redirectTo: 'signin', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AfterLoginService] },
    { path: 'callback/twitter', component: SigninComponent, canActivate: [BeforeLoginService]},
    { path: 'callback/linkedin', component: SigninComponent, canActivate: [BeforeLoginService]},
    { path: 'team', component: SflteamComponent, canActivate: [AfterLoginService] },
    { path: 'clients', component: ClientsComponent, canActivate: [AfterLoginService] },
    { path: 'projects', component: ProjectComponent, canActivate: [AfterLoginService] },
    { path: 'permissions', component: PermissionsComponent, canActivate: [AfterLoginService] },
    { path: 'permission-denied', component: PermissionDeniedComponent },
    { path: 'profile', component: MyprofileComponent, canActivate: [AfterLoginService] },
    { path: 'projects/:type', component: ProjectListComponent, canActivate: [AfterLoginService] },
    { path: 'today-tasks/:type', component: ImportantTasksComponent, canActivate: [AfterLoginService]},
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule {}