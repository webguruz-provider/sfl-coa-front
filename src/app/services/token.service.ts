import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private iss = {
  	'login' : 'http://localhost:8000/api/login',
  	'signup' : 'http://localhost:8000/api/register',
  };
  private current_user: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public current_user$: Observable<any> = this.current_user.asObservable();
  constructor(private router: Router) { }
  updateResultList(updatedList) {
    this.current_user.next(updatedList);
  }
  handle(data){
  	this.set(data.token);
    this.setUser(data);
    this.setPermissions(data.mission);
    //this.common_user = this.getUser();
  }
  set(token){
  	localStorage.setItem('token', token);
  }

  setPermissions(permission){
    localStorage.setItem('mission',permission);
  }

  setUser(user){
    this.updateResultList(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  get(){
  	return localStorage.getItem('token');
  }

  getUser(){
    return localStorage.getItem('user');
  }

  remove(){
  	localStorage.removeItem('token');
  }

  removeUser(){
    localStorage.removeItem('user');
    localStorage.removeItem('mission');
  }

  isValid(){
  	var token = this.get();
  	if(token){
  		const payload = this.payload(token);	
  		if(payload){
  			return (payload.jti)? true : false;
  		}
  	}
  }

  payload(token){
  	const payload =  token.split('.')[1];
  	return this.decode(payload);
  }

  decode(payload){
  	return JSON.parse(atob(payload));
  }

  loggedIn(){
   
  	return this.isValid();
  }
}
