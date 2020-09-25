import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private token: TokenService) { }
  public user;
  ngOnInit() {
   this.token.current_user$
      .subscribe(current_user => { 
        this.user = current_user; 
        console.log(this.user);
        console.log("uuuuu",current_user);
        if(this.user.img == null){
          this.user.img = "images/profile/1/hero.png";
        }else{
        console.log("running");
          this.user.img = this.user.img;
        }
    });
      console.log("userrr",this.user);
      if(this.user == null){
        this.user = JSON.parse(this.token.getUser());
      }
    /*if(this.user.img == null){
      this.user.img = "images/profile/1/hero.png";
    }else{
      this.user.img = this.user.img;
    }*/
  	//console.log(this.user,"common_user",this.token.common_user);
  }

  updateUrl(){
  	this.user.img = "/demo/vuesax-vuejs-admin-dashboard-template/demo-1/img/avatar-s-11.51a23c07.png";
  }
  callCompleteLink(url){
    return "http://202.164.49.133:5022/sfl-coa/blog/public/"+url;
  }

}
