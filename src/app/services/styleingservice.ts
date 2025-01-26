import { Injectable,computed,signal} from '@angular/core';

@Injectable({providedIn: 'root'})
export class StyleService {

  constructor() {
  }

    public selectedstyle=signal("simple")
    public selectedarmy=signal("classical")

    public changetheme(newtheme:string,newarmy:string){
        this.selectedstyle.set(newtheme)
        this.selectedarmy.set(newarmy)
    }

}