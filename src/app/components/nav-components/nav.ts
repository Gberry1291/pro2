import { Component,input,Input,computed,inject,ViewEncapsulation,Inject} from '@angular/core';
import {KeyValuePipe,NgClass} from '@angular/common';
import {AuthService} from "../../auth.service";
import {RouterOutlet, RouterLink, RouterLinkActive,Router} from '@angular/router';
import {getStyle} from "../../services/styleingservice"


@Component({
  selector: 'nav',
  standalone: true,
  imports: [KeyValuePipe,NgClass,RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrls: getStyle(),
  // styleUrls: AuthService.getStyle(),
  encapsulation: ViewEncapsulation.None,
})
export class Nav {

  private authService: AuthService = inject(AuthService);
  // public user = this.authService.user
  public user= this.authService.testuser

  constructor() {
  }

  public logOut() {
    this.authService.logout()
  }

  public ngOnInit() {
    // this.boardservice.load2(this.user()?.email,this.opponent)
}


}