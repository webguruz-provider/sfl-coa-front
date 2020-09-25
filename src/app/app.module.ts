import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LightboxModule } from 'ngx-lightbox';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {DataTableModule} from "angular-6-datatable";
import {TabModule} from 'angular-tabs-component';
import * as bootstrap from "bootstrap";
import { DatePipe } from '@angular/common';

import { MatMenuModule} from '@angular/material/menu';

import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';

import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { ForgetPasswordRequestComponent } from './forget-password/forget-password-request/forget-password-request.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgetPasswordResponseComponent } from './forget-password/forget-password-response/forget-password-response.component';
import { TwitterSigninComponent } from './signin/twitter-signin/twitter-signin.component';
import { LinkedinSigninComponent } from './signin/linkedin-signin/linkedin-signin.component';
import { TemplateComponent } from './template/template.component';
import { HeaderComponent } from './shared/header/header.component';
import { TemplateTableComponent } from './template/template-table/template-table.component';
import { NestableModule } from 'ngx-nestable';
import { MatButtonModule, MatToolbarModule, MatSlideToggleModule, MatIconModule } from '@angular/material';
import { SflteamComponent } from './sflteam/sflteam.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider} from "angularx-social-login";
import { ClientsComponent } from './clients/clients.component';
import { ProjectComponent } from './project/project.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { PermissionDeniedComponent } from './permissions/permission-denied/permission-denied.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { ImportantTasksComponent } from './tasks/important-tasks/important-tasks.component';
import { ImagePathPipe } from './image-path.pipe';


let config = new AuthServiceConfig([
 /* {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("Google-OAuth-Client-Id")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("Facebook-App-Id")
  },*/
  {
    id: LinkedInLoginProvider.PROVIDER_ID,
    provider: new LinkedInLoginProvider("81wrsbbjvvuw4k", false, 'en_US')
  }
]);
 
export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    NavbarComponent,
    FooterComponent,
    SignupComponent,
    ForgetPasswordRequestComponent,
    DashboardComponent,
    ForgetPasswordResponseComponent,
    TwitterSigninComponent,
    LinkedinSigninComponent,
    TemplateComponent,
    HeaderComponent,
    TemplateTableComponent,
    SflteamComponent,
    ClientsComponent,
    ProjectComponent,
    MyprofileComponent,
    PermissionsComponent,
    PermissionDeniedComponent,
    ProjectListComponent,
    ImportantTasksComponent,
    ImagePathPipe

  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    SocialLoginModule,
    LightboxModule,
    Ng2SmartTableModule,
    BrowserAnimationsModule,
    NestableModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatIconModule,
    FlexLayoutModule,
    DataTableModule,
    TabModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    MatMenuModule
  ],
  providers: [
    DatePipe,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig,

    }
  
  ],  
  bootstrap: [AppComponent]
})
export class AppModule { }
export class PizzaPartyAppModule { }
