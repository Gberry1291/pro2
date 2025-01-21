import { Component,Input,Output,Signal,signal,computed,WritableSignal,ChangeDetectionStrategy,ViewEncapsulation,inject } from '@angular/core';
import { BoardSpace } from './board-space';
import { Promotion } from './promotion';
import { Buttons } from './buttons';
import { Log } from './log'
import { NgFor,KeyValuePipe,NgClass } from '@angular/common';
import { Peice,BoardLayout,Location,databank,movementLog,legalmoves } from '../../board-data/board.state';
import { FindLegalAI } from '../../services/AI.service';
import { StyleService } from '../../services/styleingservice';
import { AlertService } from '../../services/alert.service';
import { Language } from '../../services/language.service';

@Component({
  selector: 'board',
  standalone: true,
  imports: [
    NgFor,NgClass,BoardSpace,KeyValuePipe,Promotion],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './AI.html',
  styleUrls: ['../../styles/component-layouts/board-layout.css','../../styles/armies/classical.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AI {
  @Output()
  public selected = signal<Boolean>(false);
  public holder=signal<Peice>({"peice":"C","player":"player1","x":1,"y":1,"legal":false,"space":"blackspace","top":"0%","left":"0%","animate":"start"})
  public endgameholder:Location={peice:{"peice":"C","player":"player1","x":1,"y":1,"legal":false,"space":"blackspace","top":"0%","left":"0%","animate":"start"},index:"00"}
  public tempmovelist=signal<movementLog[]>([])
  public legals:legalmoves={
    legalmoves:[],
    special:false,
    peice:null,
    changelist:[["",0,"","",""]],
    special2:false,
    peice2:null,
    changelist2:[["",0,"","",""]]
  }
  public promotion="notvisible"   
  public opponent:string|undefined

  public boardservice:Signal<databank>=computed(()=>this.moveservice.boardservice())
  public selectedplayer:Signal<string>=computed(() =>this.boardservice().player1==this.boardservice().turnplayer?"player1":"player2")
  public notplayer:Signal<string>=computed(() =>this.boardservice().player2==this.boardservice().turnplayer?"player1":"player2")
  public yourturn:boolean=true
  public incheck:Signal<boolean>=computed(() =>this.boardservice().incheck)
  public selectedstyle:Signal<string>=computed(()=>this.Style.selectedstyle())
  public worddic:Signal<Array<string>>=computed(()=>this.Lang.langdic()["board"])

  constructor(
    private moveservice:FindLegalAI,
    private Style:StyleService,
    private Lang:Language,
    private Alert:AlertService
    ) {
      }

  public async ngOnInit() {
  }

  public changeturn(){
    if (this.boardservice().turnplayer=="user") {
        this.yourturn=false
        this.boardservice().turnplayer="AI"
      }else{
        this.boardservice().turnplayer="user"
        this.yourturn=true
      }
    this.moveservice.setboard(this.boardservice())
    if (this.boardservice().turnplayer=="AI") {
        this.AIgo()
    }
  }

  selectpeice(local:Location){

    if (this.selected()) {
      if (this.holder()!=local.peice && local.peice.legal) {
        this.makemove(local)
      }else{
        this.holder().player=this.selectedplayer()
        this.selected.set(false)
      }
      this.resetlegal()
    }else{
      this.showlegalMoves(local)
    }
  }

  async makemove(local:Location){
    this.moveservice.opplastx=local.peice.x
    if ((this.legals.peice==local.peice && this.legals.special==true)) {
      this.addToLog(this.holder(),local.peice,this.legals.special,this.legals.changelist)
      this.legals.changelist.forEach(element => {
        this.boardservice().board[element[1] as keyof BoardLayout].peice=element[0]
        this.boardservice().board[element[1] as keyof BoardLayout].player=element[2]
      });
    }else if(this.legals.peice2==local.peice && this.legals.special2==true){
      this.addToLog(this.holder(),local.peice,this.legals.special2,this.legals.changelist2)
      this.legals.changelist2.forEach(element => {
        this.boardservice().board[element[1] as keyof BoardLayout].peice=element[0]
        this.boardservice().board[element[1] as keyof BoardLayout].player=element[2]
      });
    }else{
      this.addToLog(this.holder(),local.peice,false,[])
      this.doanimation(local)
      this.holder().player=this.selectedplayer()
      await new Promise(res => setTimeout(res, 1000))
      this.holder().top="0%"
      this.holder().left="0%"
      this.holder().animate="start"
      local.peice.peice=this.holder().peice
      local.peice.player=this.selectedplayer()
      this.holder().peice=""
      this.holder().player="player0"
    }
    this.boardservice().incheck=false

    // promotion check
    if (local.peice.peice=="P"&&(local.peice.y==1||local.peice.y==8)) {
      this.promotion="visible";
      this.holder.set(local.peice)
      this.endgameholder=local
    }else{
        this.endgamecheck(local)
    }
  }
  promotionFunc(promote:string){
    this.promotion="notvisible"
    this.holder().peice=promote
    // this.moveservice.setboard(this.boardservice())
    this.endgamecheck(this.endgameholder)
  }
  endgamecheck(local:Location){
    let spaces:Array<number>=this.moveservice.moveManager(local,this.selectedplayer(),this.notplayer()).legalmoves
    let revealcheck=this.moveservice.lookForRevealCheck(this.selectedplayer(),this.notplayer())
    let incheck=this.moveservice.lookForCheck(spaces,this.notplayer())
    if (revealcheck||incheck) {
      this.boardservice().incheck=true
      this.moveservice.AllOpponentMoves(this.notplayer(),this.selectedplayer())
      let nomoves=this.moveservice.GameOverCheck(this.notplayer(),this.selectedplayer(),true)
      if (nomoves) {
        this.endcleanup(this.worddic()[9],this.worddic()[10])
      }else{
        this.selected.set(false);
        this.changeturn()
      }
    }else{
        this.moveservice.AllOpponentMoves(this.notplayer(),this.selectedplayer())
        let nomoves=this.moveservice.GameOverCheck(this.notplayer(),this.selectedplayer(),false)
        if (nomoves) {
          this.endcleanup(this.worddic()[11],this.worddic()[12])
        }else{
            this.selected.set(false);
            this.changeturn()
        }
    }

  }
  endcleanup(text1:string,text2:string){
    this.Alert.alert("on",text1,text2,true)
    this.Alert.clickable()
  }

  async doanimation(local:Location){
    let movex=(this.holder().x-local.peice.x)*100
    let movey=(this.holder().y-local.peice.y)*100
    if (this.holder().x>local.peice.x) {
      movex=Math.abs(movex)*-1
    }else{
      movex=Math.abs(movex)
    }
    if (this.holder().y>local.peice.y) {
      movey=Math.abs(movey)*-1
    }else{
      movey=Math.abs(movey)
    }
    this.holder().top=movey.toString()+"%"
    this.holder().left=movex.toString()+"%"
    this.holder().animate="up"
  }
  

  showlegalMoves(local:Location){
    if (local.peice.peice!=""&&local.peice.player==this.selectedplayer()) {
      local.peice.player="selected"
      this.holder.set(local.peice)
      this.selected.set(true);
      this.moveservice.AllOpponentMoves(this.selectedplayer(),this.notplayer())
      this.moveservice.pinnedPeices(this.selectedplayer(),this.notplayer())
      if (this.incheck()) {
        this.legals=this.moveservice.moveManager(local,this.selectedplayer(),this.notplayer(),false,true)
      }else{
        this.legals=this.moveservice.moveManager(local,this.selectedplayer(),this.notplayer())
      }
      
      this.legals.legalmoves.forEach(element => {
        this.boardservice().board[element as keyof BoardLayout].legal=true
        this.boardservice().board[element as keyof BoardLayout].space="legalspace"
      });
    }
  }
  async AIgo(){
        this.moveservice.pinnedPeices("player2","player1")
        let thebest=this.moveservice.Aiturn()
        this.holder.set(thebest[0].peice)
        let local:Location=thebest[1]
        if ((this.legals.peice==local.peice && this.legals.special==true)) {
            this.addToLog(this.holder(),local.peice,this.legals.special,this.legals.changelist)
            this.legals.changelist.forEach(element => {
              this.boardservice().board[element[1] as keyof BoardLayout].peice=element[0]
              this.boardservice().board[element[1] as keyof BoardLayout].player=element[2]
            });
          }else if(this.legals.peice2==local.peice && this.legals.special2==true){
            this.addToLog(this.holder(),local.peice,this.legals.special2,this.legals.changelist2)
            this.legals.changelist2.forEach(element => {
              this.boardservice().board[element[1] as keyof BoardLayout].peice=element[0]
              this.boardservice().board[element[1] as keyof BoardLayout].player=element[2]
            });
          }else{
            this.addToLog(this.holder(),local.peice,false,[])
            this.doanimation(local)
            await new Promise(res => setTimeout(res, 1000))
            this.holder().top="0%"
            this.holder().left="0%"
            this.holder().animate="start"
            local.peice.peice=this.holder().peice
            local.peice.player=this.selectedplayer()
            this.holder().peice=""
            this.holder().player="player0"
          }
          this.boardservice().incheck=false
          // looks to see if the peice you moved puts opponent in check
          let thispeice:Array<number>=this.moveservice.moveManager(local,this.selectedplayer(),this.notplayer()).legalmoves
          let lookforcheck=this.moveservice.lookForCheck(thispeice,this.notplayer())
          if (lookforcheck) {
            this.boardservice().incheck=true
            this.moveservice.AllOpponentMoves(this.notplayer(),this.selectedplayer())
          }else{
          }
          // promotion check
          if (local.peice.peice=="P"&&(local.peice.y==1||local.peice.y==8)) {
            this.promotion="visible";
            this.holder.set(local.peice)
          }
          // looks at your peices for a revealed check
          let revealcheck=this.moveservice.lookForRevealCheck(this.selectedplayer(),this.notplayer())
          if (revealcheck) {
            this.boardservice().incheck=true
          }
      
          this.selected.set(false);
          this.changeturn()
    }

  resetlegal(){
      this.legals.legalmoves.forEach(element => {
          this.boardservice().board[element as keyof BoardLayout].space="blackspace"
          this.boardservice().board[element as keyof BoardLayout].legal=false
          if (this.boardservice().board[element as keyof BoardLayout].y%2) {
          if (this.boardservice().board[element as keyof BoardLayout].x%2!=1) {
              this.boardservice().board[element as keyof BoardLayout].space="whitespace"
          }
          }else{
          if (this.boardservice().board[element as keyof BoardLayout].x%2) {
              this.boardservice().board[element as keyof BoardLayout].space="whitespace"
          }
          }
      });
      }
  addToLog(start:Peice,end:Peice,special:boolean,speciallog:Array<[string,number,string,string,string]>){
  let newstart=Number(start.y.toString()+start.x.toString())
  let newend=Number(end.y.toString()+end.x.toString())
  let newlog:movementLog={
      start:newstart,
      end:newend,
      startpeice:start.peice,
      endpeice:end.peice,
      startplayer:this.selectedplayer(),
      endplayer:end.player,
      incheck:this.incheck(),
      special:special,
      changelist:speciallog,
  }
  this.boardservice().log.splice(0,0,newlog)
  this.tempmovelist().splice(0,0,newlog)
  this.showbuttons()
  }
  showbuttons(){
  this.tempmovelist.set([...this.tempmovelist()])
  }

}