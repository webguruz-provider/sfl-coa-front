import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class BeforeLoginService implements CanActivate{

  constructor(private token: TokenService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable <boolean> | Promise <boolean> {
	  if(!this.token.loggedIn()){
	  	  return true;
	  }else{	  	
	  	let user = JSON.parse(this.token.getUser());
	  	if(user.type == 1){
	  		this.router.navigate(['dashboard']);
	  	}else{
	  		this.router.navigate(['projects']);
	  	}
	  	  
	  	  return false;
	  }
  }


}
