import { Component,Input,input,output} from '@angular/core';
import { Board } from './board';
import {NgClass,NgFor,NgIf} from '@angular/common';
import { transition, trigger,style,animate,state } from '@angular/animations';

@Component({
  selector: 'buttons',
  standalone: true,
  imports: [Board,NgClass,NgFor,NgIf],
  templateUrl: './buttons.html',
  animations:[
    trigger('showlog', [
      state(        
        'true',style({left: '50vw',rotate:'180deg'}),      
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

  constructor() {}

  public onClick(which:string) {
    console.log(which)
    this.emitclick.emit(which);
}


}