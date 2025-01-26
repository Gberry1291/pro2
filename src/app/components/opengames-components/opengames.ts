import { Component,inject,Signal,computed,signal } from '@angular/core';
import {NgIf,NgFor,NgClass} from '@angular/common';
import {AuthService} from "../../auth.service";
import { RouterLink } from '@angular/router';
import { Language } from '../../services/language.service';
import { StyleService } from '../../services/styleingservice';
import { opengame } from '../../board-data/board.state';

@Component({
  selector: 'opengames',
  standalone: true,
  imports: [NgIf,NgFor,RouterLink,NgClass],
  templateUrl: './opengames.html',
  styleUrl: '../../styles/component-layouts/opengames-layout.css',
})
export class Opengames{

    private authService: AuthService = inject(AuthService);
    public user = this.authService.user;

    public games:Signal<Array<opengame>>=computed(()=>this.yourturnlist().concat(this.notyourturnlist(),this.finishedlist()))

    public yourturnlist:Signal<Array<opengame>>=computed(()=>this.authService.opengames().filter((x)=>x.yourturn&&this.yourturn()&&!x.over))
    public notyourturnlist:Signal<Array<opengame>>=computed(()=>this.authService.opengames().filter((x)=>!x.yourturn&&this.notyourturn()))
    public finishedlist:Signal<Array<opengame>>=computed(()=>this.authService.opengames().filter((x)=>x.over&&this.finishedgames()))

    public worddic:Signal<Array<string>>=computed(()=>this.Lang.langdic()["opengames"])
    public selectedstyle:Signal<string>=computed(()=>this.Style.selectedstyle())

    yourturn=signal<Boolean>(true)
    yourturnstyle:Signal<String>=computed(()=>this.yourturn() ? "secondbackgroundcolor"+this.selectedstyle() : "mainbackgroundcolor"+this.selectedstyle())
    notyourturn=signal<Boolean>(false)
    notyourturnstyle:Signal<String>=computed(()=>this.notyourturn() ? "secondbackgroundcolor"+this.selectedstyle() : "mainbackgroundcolor"+this.selectedstyle())
    finishedgames=signal<Boolean>(false)
    finishedgamesstyle:Signal<String>=computed(()=>this.finishedgames() ? "secondbackgroundcolor"+this.selectedstyle() : "mainbackgroundcolor"+this.selectedstyle())
  constructor(
    private Lang: Language,
    private Style:StyleService) {
  }

  narrowsearch(buttontype:string){
    if (buttontype=="yourturn") {
      this.yourturn.set(!this.yourturn())
    }
    if (buttontype=="notyourturn") {
      this.notyourturn.set(!this.notyourturn())
    }
    if (buttontype=="finishedgames") {
      this.finishedgames.set(!this.finishedgames())
    }
  }

}