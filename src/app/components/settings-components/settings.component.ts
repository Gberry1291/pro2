import {Component,Signal,computed} from '@angular/core';
import {AuthService} from "../../auth.service";
import { transition, trigger,style,animate,state } from '@angular/animations';
import {NgClass} from '@angular/common';
import { Language } from '../../services/language.service';
import { StyleService } from '../../services/styleingservice';
import { AlertService } from '../../services/alert.service';


@Component({
    selector: 'settings',
    standalone: true,
    imports: [NgClass],
    templateUrl: './settings.component.html',
    styleUrls: ['../../styles/armies/classical.css','../../styles/component-layouts/settings-layout.css'],
    animations:[
        trigger('showop', [
          state('open',style({height:'200%'})),
          state('closed',style({height:'0%'})),
          transition('* <=> *', [animate('.4s')]),
        ]
    )]
})
export class Settings {

    public themetog="closed"
    public armytog="closed";
    public theme="simple"
    public army="classical"

    public worddic:Signal<Array<string>>=computed(()=>this.Lang.langdic()["settings"])
    public selectedstyle:Signal<string>=computed(()=>this.Style.selectedstyle())
    public selectedarmy:Signal<string>=computed(()=>this.Style.selectedarmy())

  constructor(
    private Lang: Language,
    private Style:StyleService,
    private Auth:AuthService,
    private Alert:AlertService) {
  }

  changetheme(newtheme:string){
    this.theme=newtheme
  }
  savetheme(){
    this.Alert.alert("on",this.worddic()[8],this.worddic()[9],true)
    this.Auth.savestyles(this.theme,this.army)
    this.Alert.alert("on",this.worddic()[10],this.worddic()[11],false)
    this.Alert.clickable()
  }

}