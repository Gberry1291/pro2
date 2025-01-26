import { Component,Input,Output,Signal,signal,computed,WritableSignal,ChangeDetectionStrategy,ViewEncapsulation,inject } from '@angular/core';
import { BoardSpace } from './board-space';
import { Promotion } from './promotion';
import { Buttons } from './buttons';
import { Log } from './log'
import { NgFor,KeyValuePipe,NgClass } from '@angular/common';
import { Peice,BoardLayout,Location,databank,movementLog,legalmoves,endgame } from '../../board-data/board.state';
import { BuildBoard } from '../../services/board.service';
import { FindLegal } from '../../services/movement.service';
import {AuthService} from "../../auth.service";
import { StyleService } from '../../services/styleingservice';
import { AlertService } from '../../services/alert.service';
import { Language } from '../../services/language.service';

@Component({
  selector: 'board',
  standalone: true,
  imports: [
    NgFor,NgClass,Log,BoardSpace,KeyValuePipe,Promotion,Buttons],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './board.html',
  styleUrls: ['../../styles/component-layouts/board-layout.css','../../styles/armies/classical.css'],
  encapsulation: ViewEncapsulation.None,
})
export class Board {
  @Output()
  public selected = signal<Boolean>(false);
  public holder=signal<Peice>({"peice":"C","player":"player1","x":1,"y":1,"legal":false,"space":"blackspace","top":"0%","left":"0%","animate":"start"})
  public endgameholder:Location={peice:{"peice":"C","player":"player1","x":1,"y":1,"legal":false,"space":"blackspace","top":"0%","left":"0%","animate":"start"},index:"00"}
  public tempmovelist=signal<movementLog[]>([])
  public save:Signal<boolean>=computed(() =>this.tempmovelist().length==1&& this.yourturn()?true:false)
  public undo:Signal<boolean>=computed(() =>this.tempmovelist().length>=1?true:false)
  public returntostart:Signal<boolean>=computed(() =>this.tempmovelist().length>=2?true:false)
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
  public oppuid:string|undefined
  public showlog:boolean=false
 @Input()
 set email(email: string) { 
   this.opponent = email;
  }
  @Input()
  set uid(uid: string) { 
    this.oppuid = uid;
   }

  private authService: AuthService = inject(AuthService);
  public user = this.authService.user

  public boardservice = signal<databank>(
    {"id":"example","player1":"","player2":"","turnplayer":"","p1uid":"4","p2uid":"6","incheck":false,"log":[],over:false,winner:"none",loser:"none",
      "board":{
        "11":{"peice":"C","player":"player1","x":1,"y":1,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
        "21":{"peice":"H","player":"player1","x":2,"y":1,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
        "31":{"peice":"B","player":"player1","x":3,"y":1,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
        "41":{"peice":"K","player":"player1","x":4,"y":1,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
        "51":{"peice":"Q","player":"player1","x":5,"y":1,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
        "61":{"peice":"B","player":"player1","x":6,"y":1,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
        "71":{"peice":"H","player":"player1","x":7,"y":1,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
        "81":{"peice":"C","player":"player1","x":8,"y":1,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
        "12":{"peice":"P","player":"player1","x":1,"y":2,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
        "22":{"peice":"P","player":"player1","x":2,"y":2,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
        "32":{"peice":"P","player":"player1","x":3,"y":2,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
        "42":{"peice":"P","player":"player1","x":4,"y":2,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
        "52":{"peice":"P","player":"player1","x":5,"y":2,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
        "62":{"peice":"P","player":"player1","x":6,"y":2,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
        "72":{"peice":"P","player":"player1","x":7,"y":2,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
        "82":{"peice":"P","player":"player1","x":8,"y":2,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
        "13":{"peice":"","player":"player0","x":1,"y":3,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
        "23":{"peice":"","player":"player0","x":2,"y":3,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
        "33":{"peice":"","player":"player0","x":3,"y":3,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
        "43":{"peice":"","player":"player0","x":4,"y":3,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
        "53":{"peice":"","player":"player0","x":5,"y":3,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
        "63":{"peice":"","player":"player0","x":6,"y":3,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
        "73":{"peice":"","player":"player0","x":7,"y":3,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
        "83":{"peice":"","player":"player0","x":8,"y":3,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
        "14":{"peice":"","player":"player0","x":1,"y":4,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
        "24":{"peice":"","player":"player0","x":2,"y":4,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
        "34":{"peice":"","player":"player0","x":3,"y":4,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
        "44":{"peice":"","player":"player0","x":4,"y":4,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
        "54":{"peice":"","player":"player0","x":5,"y":4,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
        "64":{"peice":"","player":"player0","x":6,"y":4,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
        "74":{"peice":"","player":"player0","x":7,"y":4,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
        "84":{"peice":"","player":"player0","x":8,"y":4,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
        "15":{"peice":"","player":"player0","x":1,"y":5,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
        "25":{"peice":"","player":"player0","x":2,"y":5,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
        "35":{"peice":"","player":"player0","x":3,"y":5,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
        "45":{"peice":"","player":"player0","x":4,"y":5,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
        "55":{"peice":"","player":"player0","x":5,"y":5,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
        "65":{"peice":"","player":"player0","x":6,"y":5,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
        "75":{"peice":"","player":"player0","x":7,"y":5,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
        "85":{"peice":"","player":"player0","x":8,"y":5,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
        "16":{"peice":"","player":"player0","x":1,"y":6,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
        "26":{"peice":"","player":"player0","x":2,"y":6,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
        "36":{"peice":"","player":"player0","x":3,"y":6,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
        "46":{"peice":"","player":"player0","x":4,"y":6,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
        "56":{"peice":"","player":"player0","x":5,"y":6,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
        "66":{"peice":"","player":"player0","x":6,"y":6,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
        "76":{"peice":"","player":"player0","x":7,"y":6,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
        "86":{"peice":"","player":"player0","x":8,"y":6,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
        "17":{"peice":"C","player":"player2","x":1,"y":7,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
        "27":{"peice":"H","player":"player2","x":2,"y":7,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
        "37":{"peice":"B","player":"player2","x":3,"y":7,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
        "47":{"peice":"K","player":"player2","x":4,"y":7,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
        "57":{"peice":"Q","player":"player2","x":5,"y":7,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
        "67":{"peice":"B","player":"player2","x":6,"y":7,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
        "77":{"peice":"H","player":"player2","x":7,"y":7,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
        "87":{"peice":"C","player":"player2","x":8,"y":7,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
        "18":{"peice":"P","player":"player2","x":1,"y":8,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
        "28":{"peice":"P","player":"player2","x":2,"y":8,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
        "38":{"peice":"P","player":"player2","x":3,"y":8,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
        "48":{"peice":"P","player":"player2","x":4,"y":8,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
        "58":{"peice":"P","player":"player2","x":5,"y":8,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
        "68":{"peice":"P","player":"player2","x":6,"y":8,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
        "78":{"peice":"P","player":"player2","x":7,"y":8,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
        "88":{"peice":"P","player":"player2","x":8,"y":8,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"}
    }}
);
  public selectedplayer:Signal<string>=computed(() =>this.boardservice().player1==this.boardservice().turnplayer?"player1":"player2")
  public notplayer:Signal<string>=computed(() =>this.boardservice().player2==this.boardservice().turnplayer?"player1":"player2")
  public yourturn=signal<Boolean>(false)
  public incheck:Signal<boolean>=computed(() =>this.boardservice().incheck)
  public selectedstyle:Signal<string>=computed(()=>this.Style.selectedstyle())
  public worddic:Signal<Array<string>>=computed(()=>this.Lang.langdic()["board"])

  constructor(
    private boardserviceo: BuildBoard,
    private moveservice:FindLegal,
    private Style:StyleService,
    private Lang:Language,
    private Alert:AlertService
    ) {
      }
  public get spaces2(): WritableSignal<databank>{
    return this.boardservice
  }

  public async ngOnInit() {
      let grabit:databank= await this.boardserviceo.load(this.user()?.email,this.opponent,this.user()?.uid,this.oppuid)
      this.boardservice.set(grabit)
      if (this.boardservice().turnplayer==this.user()?.email) {
        this.yourturn.set(true)
      }
  }

  public changeturn(){
    if (this.boardservice().turnplayer==this.user()?.email) {
      this.boardservice().turnplayer=this.opponent!
    }else{
      this.boardservice().turnplayer=this.user()!.email!
    }
    this.boardservice.set({...this.boardservice()})
    // this.moveservice.AllOpponentMoves(this.selectedplayer,this.notplayer)
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
  endgamecheck(local:Location){
    let spaces:Array<number>=this.moveservice.moveManager(local,this.selectedplayer(),this.notplayer()).legalmoves
    let revealcheck=this.moveservice.lookForRevealCheck(this.selectedplayer(),this.notplayer())
    let incheck=this.moveservice.lookForCheck(spaces,this.notplayer())
    if (revealcheck||incheck) {
      this.boardservice().incheck=true
      this.moveservice.AllOpponentMoves(this.notplayer(),this.selectedplayer())
      let nomoves=this.moveservice.GameOverCheck(this.notplayer(),this.selectedplayer(),true)
      if (nomoves) {
        this.endcleanup(this.worddic()[9],this.worddic()[10],true)
      }else{
        this.selected.set(false);
        this.changeturn()
      }
    }else{
        this.moveservice.AllOpponentMoves(this.notplayer(),this.selectedplayer())
        let nomoves=this.moveservice.GameOverCheck(this.notplayer(),this.selectedplayer(),false)
        if (nomoves) {
          this.endcleanup(this.worddic()[11],this.worddic()[12],false)
        }else{
            this.selected.set(false);
            this.changeturn()
        }
    }

  }
  endcleanup(text1:string,text2:string,windraw:boolean){
    if (this.save()) {
      this.Alert.alert("on",text1,text2,true)
      this.Alert.clickable()
      this.yourturn.set(false)
      this.boardservice().over=true
      let oppuid=""
      if (this.boardservice().player1==this.notplayer()) {
        oppuid=this.boardservice().p1uid
      }else{
        oppuid=this.boardservice().p2uid
      }
      if (windraw) {
        this.boardservice().winner= this.boardservice().turnplayer
        this.boardservice().loser= this.boardservice().turnplayer==this.boardservice().player1?this.boardservice().player2:this.boardservice().player1
        this.boardserviceo.save()
        let info:endgame={winner:this.selectedplayer(),loser:oppuid,points1:100,points2:-50}
        this.authService.saveendgame(info) 
      }else{
        this.boardservice().winner="draw"
        this.boardservice().loser="draw"
        this.boardserviceo.save()
        let info:endgame={winner:this.selectedplayer(),loser:oppuid,points1:-10,points2:-10}
        this.authService.saveendgame(info) 
      }
    }else{
      this.Alert.alert("on","checkmate","click to close",true)
      this.Alert.clickable()
    }
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
  undolast(){
      let newestmove=this.boardservice().log.shift()
      this.tempmovelist().shift()
      if (newestmove?.special) {
        newestmove?.changelist.forEach(element => {
          this.boardservice().board[element[1] as keyof BoardLayout].peice=element[3]
          this.boardservice().board[element[1] as keyof BoardLayout].player=element[4]
        });
      }else{
        let editpeice1=this.boardservice().board[newestmove?.start as keyof BoardLayout]
        editpeice1.peice=newestmove?.startpeice!
        editpeice1.player=newestmove?.startplayer!
        let editpeice2=this.boardservice().board[newestmove?.end as keyof BoardLayout]
        editpeice2.peice=newestmove?.endpeice!
        editpeice2.player=newestmove?.endplayer!
      }
      this.boardservice().incheck=newestmove!.incheck
      this.changeturn()
      this.showbuttons()
  }
  showbuttons(){
    this.tempmovelist.set([...this.tempmovelist()])
  }
  undoTofirst(){
    while (this.tempmovelist().length>1) {
      this.undolast()
    }
  }

  promotionFunc(promote:string){
    this.promotion="notvisible"
    this.holder().peice=promote
    this.endgamecheck(this.endgameholder)
  }
  toglog(){
    this.showlog=!this.showlog
  }
  buttonclick(event:string){
    if (event=="toglog") {
      this.toglog()
    }
    if (event=="undolast") {
      this.undolast()
    }
    if (event=="undoTofirst") {
      this.undoTofirst()
    }
    if (event=="save") {
      this.Alert.alert("on",this.worddic()[5],this.worddic()[6],true)
      this.boardserviceo.save()
      this.authService.pullopengames(this.user()?.email||"error")
      this.yourturn.set(false)
      this.Alert.alert("on",this.worddic()[7],this.worddic()[8],false)
      this.Alert.clickable()
    }
  }



}