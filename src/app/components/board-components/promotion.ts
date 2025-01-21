import { Component,output,Input,Signal,computed} from '@angular/core';
import { NgClass } from '@angular/common';
import { StyleService } from '../../services/styleingservice';
import { Language } from '../../services/language.service';


@Component({
  selector: 'promotion-select',
  standalone: true,
  imports: [NgClass],
  templateUrl: './promotion.html',
})
export class Promotion {
  @Input()
  public visible:string|undefined
  public sendpeice = output<string>()
  @Input()
  turnplayer:string|undefined
  public worddic:Signal<Array<string>>=computed(()=>this.Lang.langdic()["board"])
  
  public selectedstyle:Signal<string>=computed(()=>this.Style.selectedstyle())
  public selectedarmy:Signal<string>=computed(()=>this.Style.selectedarmy())

  constructor(private Style:StyleService,private Lang: Language,) {}

  clickpeice(peice:string){
    this.sendpeice.emit(peice);
  }

}