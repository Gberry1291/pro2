import { Injectable,computed} from '@angular/core';
import {AuthService} from "../auth.service";

@Injectable({providedIn: 'root'})
export class StyleService {

  constructor(private Auth: AuthService) {
  }

    public selectedstyle=computed(()=>this.Auth.userinfo().theme)
    public selectedarmy=computed(()=>this.Auth.userinfo().army)

    public setStyle(lang:string){
        // this.selectedstyle.set(lang)
    }

    public changetheme(newtheme:string,newarmy:string){
        // this.selectedstyle.set(newtheme)
        // this.selectedarmy.set(newarmy)
    }

}