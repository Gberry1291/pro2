import { Component,input,Signal,computed} from '@angular/core';
import {NgClass,NgFor,NgIf} from '@angular/common';
import { movementLog} from '../../board-data/board.state';
import { transition, trigger,style,animate,state } from '@angular/animations';
import { StyleService } from '../../services/styleingservice';


@Component({
  selector: 'log',
  standalone: true,
  imports: [NgClass,NgFor,NgIf],
  templateUrl: './log.html',
  animations:[
    trigger('showlog', [
      state(        
        'true',style({width: '50%',left:'0%'}),      
      ),
      state(        
        'false',style({width:'0%',left:'-1%'})   
      ),
      transition('true <=> false', [animate('.5s')]),
    ]
  )]
})

export class Log {
  public log = input.required<movementLog[]>();
  public animateslide = input.required<boolean>();
  public convertLocationDic=["SPACEHOLDER","A","B","C","D","E","F","G","H"]
  public selectedstyle:Signal<string>=computed(()=>this.Style.selectedstyle())
  public selectedarmy:Signal<string>=computed(()=>this.Style.selectedarmy())


  constructor(private Style:StyleService) {}

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