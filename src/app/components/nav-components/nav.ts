import { Component,computed,inject,ViewEncapsulation,Signal} from '@angular/core';
import {NgClass} from '@angular/common';
import {AuthService} from "../../auth.service";
import { Language } from '../../services/language.service';
import { StyleService } from '../../services/styleingservice';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { transition, trigger,style,animate,state } from '@angular/animations';
import { testuser } from '../../board-data/board.state';

@Component({
  selector: 'nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,NgClass],
  templateUrl: './nav.html',
  styleUrls: ['../../styles/themes/simple.css','../../styles/component-layouts/nav-layout.css'],
  encapsulation: ViewEncapsulation.None,
  animations:[
    trigger('showlanguage', [
      state('false',style({height:'0vh'})),
      state('true',style({height:'30vh'})),
      transition('* <=> *', [animate('.5s')]),
    ]
  )]
})
export class Nav {

  private authService: AuthService = inject(AuthService);
  public user = this.authService.user
  public worddic:Signal<Array<string>>=computed(()=>this.Lang.langdic()["nav"])
  showlanguage=false
  public selectedstyle:Signal<string>=computed(()=>this.Style.selectedstyle())

  constructor(private Lang: Language,private Style:StyleService) {
  }

  public logOut() {
    this.authService.logout()
  }

//   public async ngOnInit() {
// }

  slidelanguage(){
    this.showlanguage=!this.showlanguage
  }
  async languagechange(language:string){
    this.authService.savelanguage(language)
    this.showlanguage=false
  }


}