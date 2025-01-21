import { Component,input,output,Signal,computed} from '@angular/core';
import {NgClass,NgIf} from '@angular/common';
import { transition, trigger,style,animate,state } from '@angular/animations';
import { StyleService } from '../../services/styleingservice';
import { Language } from '../../services/language.service';

@Component({
  selector: 'buttons',
  standalone: true,
  imports: [NgClass,NgIf],
  templateUrl: './buttons.html',
  animations:[
    trigger('showlog', [
      state(        
        'true',style({left: '55vw',rotate:'180deg'}),      
      ),
      state(        
        'false',style({left:'0%',rotate:'0deg'})   
      ),
      transition('true <=> false', [animate('.5s')]),
    ]
  )]
})

export class Buttons {
  public animateslide = input.required<boolean>();
  public emitclick = output<string>()
  public undobutton=input.required<boolean>();
  public savebutton=input.required<boolean>();
  public returntostartbutton=input.required<boolean>();
  public selectedstyle:Signal<string>=computed(()=>this.Style.selectedstyle())
  public worddic:Signal<Array<string>>=computed(()=>this.Lang.langdic()["board"])


  constructor(private Style:StyleService,private Lang: Language) {}


  public onClick(which:string) {
    this.emitclick.emit(which);
}


}