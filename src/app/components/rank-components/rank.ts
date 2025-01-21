import { Component,computed,inject,Signal,signal} from '@angular/core';
import {NgClass,NgFor,NgIf} from '@angular/common';
import {AuthService} from "../../auth.service";
import { Language } from '../../services/language.service';
import { StyleService } from '../../services/styleingservice';


@Component({
  selector: 'nav',
  standalone: true,
  imports: [NgFor,NgIf,NgClass],
  templateUrl: './rank.html',
  styleUrl: '../../styles/component-layouts/rank-layout.css',
})
export class Ranking {
    page=signal<number>(0)
    sortedlist:any=[]
    newlist=computed(()=>this.unsortedlist().slice((this.page()*10),(this.page()*10+10)))
    next:Signal<string>=computed(() =>((this.page()+1)*10)<this.unsortedlist().length?"show":"nodisplay")
    prev:Signal<string>=computed(() =>this.page()>0?"show":"nodisplay")
    unsortedlist=computed(()=>this.authService.userlist().map((i)=>[i.name,i.points]).sort(function(a:any,b:any){return b[1]-a[1]}))
    

    private authService: AuthService = inject(AuthService);
    public worddic:Signal<Array<string>>=computed(()=>this.Lang.langdic()["rank"])
    public selectedstyle:Signal<string>=computed(()=>this.Style.selectedstyle())

    constructor(private Lang: Language,private Style:StyleService) {
    }


    nextpage(){
        this.page.set(this.page()+1);
    }
    prevpage(){
        this.page.set(this.page()-1);
    }
}