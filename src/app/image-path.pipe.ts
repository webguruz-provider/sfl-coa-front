import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagePath'
})
export class ImagePathPipe implements PipeTransform {
	public url = 'http://202.164.49.133:5022/sfl-coa/';
  transform(value: any, args?: any): any {
  	console.log("args",args);
  	if( args != undefined && args == 'logo'){
  		return this.url + 'blog/public/images/logo/' + value;
  	}else{
    	return this.url + 'blog/public/' + value;
    }
  }

}
