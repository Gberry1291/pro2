import { Component,Input,input,output} from '@angular/core';
import { Board } from './board';
import {KeyValuePipe,NgClass,NgFor,NgIf} from '@angular/common';
import { Peice,Location,movementLog} from '../../board-data/board.state';
import { transition, trigger, useAnimation,style,animate,state } from '@angular/animations';

@Component({
  selector: 'log',
  standalone: true,
  imports: [Board,NgClass,NgFor,NgIf],
  templateUrl: './log.html',
  animations:[
    trigger('showlog', [
      state(        
        'true',style({width: '50%'}),      
      ),
      state(        
        'false',style({width:'0%'})   
      ),
      transition('true <=> false', [animate('.5s')]),
    ]
  )]
})

export class Log {
  public log = input.required<movementLog[]>();
  public animateslide = input.required<boolean>();
  public convertLocationDic=["SPACEHOLDER","A","B","C","D","E","F","G","H"]


  constructor() {}

  public onClick() {}

  public outPutColor(num:number){
    let colour="whitespace"
    let digitOne=Number(num.toString()[0])
    let digitTwo=Number(num.toString()[1])
    if (digitOne%2) {
        if (digitTwo%2) {
            colour="blackspace"
        }
    }else{
        if (!(digitTwo%2)) {
            colour="blackspace" 
        }
    }

    return colour
  }
  public convertLocation(num:number){
    let digitOne=9-Number(num.toString()[0])
    let digitTwo=this.convertLocationDic[Number(num.toString()[1])]
    return (digitTwo+digitOne)
  }

}