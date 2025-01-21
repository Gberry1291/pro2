import { Component,computed,Signal} from '@angular/core';
import { NgClass } from '@angular/common';
import {ReactiveFormsModule } from '@angular/forms';
import { transition, trigger,style,animate,state } from '@angular/animations';
import { AlertService } from '../../services/alert.service';



@Component({
  selector: 'alert',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './alert.html',
  styleUrl: '../../styles/component-layouts/alert.css',
  animations:[
    trigger('spinning', [
      state("true",style({rotate:'{{pac}}'}),{params:{ pac: '0deg'}}),
      state("false",style({rotate:'{{pac}}'}),{params:{ pac: '0deg'}}),
      transition('true <=> false', [animate('1s')]),
    ]),
    trigger('bottommouth',[
        state("true",style({rotate:"0deg"})),
        state("false",style({rotate:"-15deg"})),
        transition('true <=> false', [animate('.5s')])
      ]),
    trigger('topmouth',[
      state("true",style({rotate:"0deg"})),
      state("false",style({rotate:"55deg"})),
      transition('true <=> false', [animate('.5s')])
    ]),
    trigger('dots',[
        state("0",style({opacity:"0"})),
        state("1",style({opacity:"1"})),
        transition('0 => 1', [animate('2s')]),
        transition('1 => 0', [animate('0s')])
      ]),
  ]
})
export class Alert{

 constructor(private alert: AlertService) {

  }


  public display:Signal<string>=computed(()=>this.alert.display())
  public maintext:Signal<string>=computed(()=>this.alert.maintext())
  public subtext:Signal<string>=computed(()=>this.alert.subtext())
  public spin:Signal<boolean>=computed(()=>{
    if (this.alert.spin()) {
      this.animanager()
      return true
    }else{return false}
  })

  public onORoff:Signal<string>=computed(()=>this.alert.display())

  pacman=true
  spinval=0

  mouthmovetop=false
  mouthmovebottom=false

  showdots=["blank",1,1,1,0,0,0,0,1]
  dran=7


  public async animanager(){
    this.eat()
    await new Promise(res => setTimeout(res, 5))
    this.spinit()
    await new Promise(res => setTimeout(res, 500))
    this.eat()
    await new Promise(res => setTimeout(res, 500))
    this.blinkdots()
    if (this.spin()) {
        this.animanager()
    }
  }
  public blinkdots(){
    this.dran+=1
    this.showdots[this.dran]=0
    if (this.dran+4<9) {
        this.showdots[this.dran+4]=1
    }else{
        this.showdots[this.dran-4]=1
    }
    if (this.dran>7) {
        this.dran=0
    }
  }
  public eat(){
    this.mouthmovebottom=!this.mouthmovebottom
    this.mouthmovetop=!this.mouthmovetop
  }
  public spinit(){
    this.spinval+=45
    this.pacman=!this.pacman
  }

  public end(){
    this.alert.end()
  }

}