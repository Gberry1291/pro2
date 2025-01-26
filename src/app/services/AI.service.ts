// import { Location } from '@angular/common';
import { databank,Location,BoardLayout,legalmoves } from '../board-data/board.state';
import { signal } from '@angular/core';
import { Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class FindLegalAI {
    legals:legalmoves={
        legalmoves:[],
        special:false,
        peice:null,
        changelist:[["",0,"","",""]],
        special2:false,
        peice2:null,
        changelist2:[["",0,"","",""]]
    }
    opponentsLegals:Array<number>=[]
    pinnedpeices:Array<[string,Array<number>]>=[]
    incheckby:Array<Array<number>>=[]
    kingline:Array<number>=[]
    behindKing:Array<number>=[]

    foundamove=false
    bestmovepoints:number=0
    currentbest:Location={peice:{"peice":"C","player":"player1","x":1,"y":1,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},index:"11"}
    currentbestgoingto:Location={peice:{"peice":"C","player":"player1","x":1,"y":1,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},index:"11"}

    lookingat:Location={peice:{"peice":"C","player":"player1","x":1,"y":1,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},index:"11"}

    opplastx:number=0

    public boardservice = signal<databank>(
        {"id":"example","player1":"user","player2":"AI","p1uid":"4","p2uid":"6","turnplayer":"user","incheck":false,"log":[],"over":false,"winner":"none","loser":"none","board":{
            "11":{"peice":"C","player":"player1","x":1,"y":1,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "12":{"peice":"H","player":"player1","x":2,"y":1,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "13":{"peice":"B","player":"player1","x":3,"y":1,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "14":{"peice":"K","player":"player1","x":4,"y":1,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "15":{"peice":"Q","player":"player1","x":5,"y":1,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "16":{"peice":"B","player":"player1","x":6,"y":1,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "17":{"peice":"H","player":"player1","x":7,"y":1,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "18":{"peice":"C","player":"player1","x":8,"y":1,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "21":{"peice":"P","player":"player1","x":1,"y":2,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "22":{"peice":"P","player":"player1","x":2,"y":2,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "23":{"peice":"P","player":"player1","x":3,"y":2,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "24":{"peice":"P","player":"player1","x":4,"y":2,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "25":{"peice":"P","player":"player1","x":5,"y":2,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "26":{"peice":"P","player":"player1","x":6,"y":2,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "27":{"peice":"P","player":"player1","x":7,"y":2,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "28":{"peice":"P","player":"player1","x":8,"y":2,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "31":{"peice":"","player":"player0","x":1,"y":3,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "32":{"peice":"","player":"player0","x":2,"y":3,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "33":{"peice":"","player":"player0","x":3,"y":3,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "34":{"peice":"","player":"player0","x":4,"y":3,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "35":{"peice":"","player":"player0","x":5,"y":3,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "36":{"peice":"","player":"player0","x":6,"y":3,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "37":{"peice":"","player":"player0","x":7,"y":3,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "38":{"peice":"","player":"player0","x":8,"y":3,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "41":{"peice":"","player":"player0","x":1,"y":4,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "42":{"peice":"","player":"player0","x":2,"y":4,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "43":{"peice":"","player":"player0","x":3,"y":4,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "44":{"peice":"","player":"player0","x":4,"y":4,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "45":{"peice":"","player":"player0","x":5,"y":4,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "46":{"peice":"","player":"player0","x":6,"y":4,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "47":{"peice":"","player":"player0","x":7,"y":4,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "48":{"peice":"","player":"player0","x":8,"y":4,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "51":{"peice":"","player":"player0","x":1,"y":5,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "52":{"peice":"","player":"player0","x":2,"y":5,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "53":{"peice":"","player":"player0","x":3,"y":5,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "54":{"peice":"","player":"player0","x":4,"y":5,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "55":{"peice":"","player":"player0","x":5,"y":5,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "56":{"peice":"","player":"player0","x":6,"y":5,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "57":{"peice":"","player":"player0","x":7,"y":5,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "58":{"peice":"","player":"player0","x":8,"y":5,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "61":{"peice":"","player":"player0","x":1,"y":6,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "62":{"peice":"","player":"player0","x":2,"y":6,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "63":{"peice":"","player":"player0","x":3,"y":6,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "64":{"peice":"","player":"player0","x":4,"y":6,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "65":{"peice":"","player":"player0","x":5,"y":6,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "66":{"peice":"","player":"player0","x":6,"y":6,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "67":{"peice":"","player":"player0","x":7,"y":6,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "68":{"peice":"","player":"player0","x":8,"y":6,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "71":{"peice":"P","player":"player2","x":1,"y":7,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "72":{"peice":"P","player":"player2","x":2,"y":7,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "73":{"peice":"P","player":"player2","x":3,"y":7,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "74":{"peice":"P","player":"player2","x":4,"y":7,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "75":{"peice":"P","player":"player2","x":5,"y":7,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "76":{"peice":"P","player":"player2","x":6,"y":7,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "77":{"peice":"P","player":"player2","x":7,"y":7,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "78":{"peice":"P","player":"player2","x":8,"y":7,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "81":{"peice":"C","player":"player2","x":1,"y":8,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "82":{"peice":"H","player":"player2","x":2,"y":8,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "83":{"peice":"B","player":"player2","x":3,"y":8,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "84":{"peice":"K","player":"player2","x":4,"y":8,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "85":{"peice":"Q","player":"player2","x":5,"y":8,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "86":{"peice":"B","player":"player2","x":6,"y":8,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "87":{"peice":"H","player":"player2","x":7,"y":8,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "88":{"peice":"C","player":"player2","x":8,"y":8,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"}
        }}
    );
    public boardservice2 = signal<databank>(
        {"id":"example","player1":"user","player2":"AI","p1uid":"4","p2uid":"6","turnplayer":"user","incheck":false,"log":[],"over":false,"winner":"none","loser":"none","board":{
            "11":{"peice":"","player":"player0","x":1,"y":1,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "12":{"peice":"","player":"player0","x":2,"y":1,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "13":{"peice":"","player":"player0","x":3,"y":1,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "14":{"peice":"","player":"player0","x":4,"y":1,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "15":{"peice":"","player":"player0","x":5,"y":1,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "16":{"peice":"","player":"player0","x":6,"y":1,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "17":{"peice":"","player":"player0","x":7,"y":1,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "18":{"peice":"","player":"player0","x":8,"y":1,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "21":{"peice":"","player":"player0","x":1,"y":2,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "22":{"peice":"","player":"player0","x":2,"y":2,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "23":{"peice":"","player":"player0","x":3,"y":2,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "24":{"peice":"","player":"player0","x":4,"y":2,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "25":{"peice":"","player":"player0","x":5,"y":2,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "26":{"peice":"","player":"player0","x":6,"y":2,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "27":{"peice":"","player":"player0","x":7,"y":2,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "28":{"peice":"P","player":"player1","x":8,"y":2,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "31":{"peice":"","player":"player0","x":1,"y":3,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "32":{"peice":"","player":"player0","x":2,"y":3,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "33":{"peice":"","player":"player0","x":3,"y":3,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "34":{"peice":"","player":"player0","x":4,"y":3,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "35":{"peice":"","player":"player0","x":5,"y":3,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "36":{"peice":"","player":"player0","x":6,"y":3,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "37":{"peice":"","player":"player0","x":7,"y":3,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "38":{"peice":"","player":"player0","x":8,"y":3,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "41":{"peice":"","player":"player0","x":1,"y":4,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "42":{"peice":"","player":"player0","x":2,"y":4,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "43":{"peice":"","player":"player0","x":3,"y":4,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "44":{"peice":"","player":"player0","x":4,"y":4,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "45":{"peice":"","player":"player0","x":5,"y":4,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "46":{"peice":"","player":"player0","x":6,"y":4,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "47":{"peice":"","player":"player0","x":7,"y":4,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "48":{"peice":"","player":"player0","x":8,"y":4,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "51":{"peice":"","player":"player0","x":1,"y":5,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "52":{"peice":"","player":"player0","x":2,"y":5,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "53":{"peice":"","player":"player0","x":3,"y":5,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "54":{"peice":"","player":"player0","x":4,"y":5,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "55":{"peice":"","player":"player0","x":5,"y":5,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "56":{"peice":"","player":"player0","x":6,"y":5,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "57":{"peice":"","player":"player0","x":7,"y":5,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "58":{"peice":"","player":"player0","x":8,"y":5,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "61":{"peice":"","player":"player0","x":1,"y":6,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "62":{"peice":"","player":"player0","x":2,"y":6,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "63":{"peice":"","player":"player0","x":3,"y":6,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "64":{"peice":"P","player":"player1","x":4,"y":6,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "65":{"peice":"","player":"player0","x":5,"y":6,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "66":{"peice":"","player":"player0","x":6,"y":6,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "67":{"peice":"","player":"player0","x":7,"y":6,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "68":{"peice":"","player":"player0","x":8,"y":6,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "71":{"peice":"","player":"player0","x":1,"y":7,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "72":{"peice":"","player":"player0","x":2,"y":7,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "73":{"peice":"","player":"player0","x":3,"y":7,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "74":{"peice":"K","player":"player2","x":4,"y":7,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "75":{"peice":"","player":"player0","x":5,"y":7,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "76":{"peice":"","player":"player0","x":6,"y":7,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "77":{"peice":"","player":"player0","x":7,"y":7,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "78":{"peice":"","player":"player0","x":8,"y":7,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "81":{"peice":"","player":"player0","x":1,"y":8,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "82":{"peice":"","player":"player0","x":2,"y":8,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "83":{"peice":"","player":"player0","x":3,"y":8,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "84":{"peice":"C","player":"player1","x":4,"y":8,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "85":{"peice":"","player":"player0","x":5,"y":8,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "86":{"peice":"","player":"player0","x":6,"y":8,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
            "87":{"peice":"","player":"player0","x":7,"y":8,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
            "88":{"peice":"Q","player":"player1","x":8,"y":8,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"}
        }}
    );

    setboard(changes:databank){
        this.boardservice.set({...changes})
    }

    resetlegals(){
        this.legals={
            legalmoves:[],
            special:false,
            peice:null,
            changelist:[["",0,"","",""]],
            special2:false,
            peice2:null,
            changelist2:[["",0,"","",""]]     
        }
    }
    moveManager(thisguy:Location,turnplayer:string,opponent:string,showprotected:boolean=false,incheck:boolean=false){

        this.resetlegals()

        if (thisguy.peice.peice=="P") {
            this.pawn(thisguy,turnplayer,opponent,showprotected)
        }
        if (thisguy.peice.peice=="C") {
            this.castle(thisguy,turnplayer,opponent,showprotected)
        }
        if (thisguy.peice.peice=="B") {
            this.bishop(thisguy,turnplayer,opponent,showprotected)
        }
        if (thisguy.peice.peice=="H") {
            this.horse(thisguy,turnplayer,opponent,showprotected)
        }
        if (thisguy.peice.peice=="Q") {
            this.queen(thisguy,turnplayer,opponent,showprotected)
        }
        if (thisguy.peice.peice=="K") {
            this.king(thisguy,turnplayer,opponent,showprotected)
        }

        this.checkifpinned(thisguy)
        if (incheck) {
            this.incheck(thisguy) 
         }
        
        return this.legals
    }
    incheck(thisguy:Location){
        if (thisguy.peice.peice!="K") {
            if (this.incheckby.length>1) {
                this.legals.legalmoves=[]
            }else{
                this.legals.legalmoves=this.legals.legalmoves.filter((x)=>{
                    return this.incheckby[0].includes(x)
                })
                
            }
        }else{
            this.legals.legalmoves=this.legals.legalmoves.filter((x)=>{
                return !this.behindKing.includes(x)
            })
        }
    }

    zip(y:string,x:string,addy:number,addx:number,ifplayer:Array<string>){
        let newy=(Number(y)+addy).toString()
        let newx=(Number(x)+addx).toString()
        let test:boolean=false
        let playeroptions=["player1","player2","player0","selected"]
        if (this.boardservice().board[Number(newy+newx) as keyof BoardLayout]) {
            ifplayer.forEach(element => {
                if (playeroptions.includes(element)) {
                    if (this.boardservice().board[Number(newy+newx) as keyof BoardLayout]["player"]==element) {
                        test=true
                    }
                }else{
                    if (this.boardservice().board[Number(newy+newx) as keyof BoardLayout]["peice"]==element) {
                        test=true
                    }
                }   
            });
        }
        if(test){
            return Number(newy+newx)
        }
        return 0
    }
    repeat(y:string,x:string,addy:number,addx:number,ifpeice:Array<string>){
        let movelist:number[]=[]
        let progressX=Number(x)
        let progressY=Number(y)
        let keepgoing=true
        let pwithempty=ifpeice.concat(["player0","selected"])
        while (keepgoing) {
            let control=this.zip(progressY.toString(),progressX.toString(),addy,addx,pwithempty)
            if (control) {
                movelist.push(control)
                progressX+=addx;
                progressY+=addy;
                let space=this.boardservice().board[Number(control) as keyof BoardLayout]
                if (ifpeice.includes(space.player)) {
                    keepgoing=false
                    if (space.peice=="K") {
                        this.kingline=movelist
                        this.behindKing.push(this.zip(progressY.toString(),progressX.toString(),addy,addx,pwithempty))
                    }
                }
            }else{keepgoing=false}
        }
        return movelist
    }

    enpassencheck(y:string,x:string,addy:number,addx:number,direction:number,turnplayer:string,opponent:string){
        let newy=(Number(y)+addy).toString()
        let newx=(Number(x)+addx).toString()
        let test:boolean=false
        let latestlog=this.boardservice().log[0]
        if (this.boardservice().board[Number(newy+newx) as keyof BoardLayout]) {
            if (latestlog.end==Number(newy+newx)&&latestlog.startpeice=="P"&&latestlog.startplayer==opponent) {
                test=true
            }
        }
        if(test){
            this.legals.legalmoves.push(Number((Number(y)+direction).toString()+newx))
            this.legals.special=true;
            this.legals.peice=this.boardservice().board[Number((Number(y)+direction).toString()+newx) as keyof BoardLayout]
            this.legals.changelist=[["",Number(y+x),"player0","P",turnplayer],["",Number(newy+newx),"player0","P",opponent],["P",Number((Number(y)+direction).toString()+newx),turnplayer,"","player0"]]
        }
    }
    pawn(thisguy:Location,turnplayer:string,opponent:string,showprotected:boolean=false){
        let options:number[]=[]
        
        let row:string=thisguy.index[1]
        let column:string=thisguy.index[0]
        if (turnplayer=="player1") {
            if (column=="5") {
                this.enpassencheck(column,row,0,1,1,turnplayer,opponent)
                this.enpassencheck(column,row,0,-1,1,turnplayer,opponent)
            }
            let legalplayers=[opponent]
            if (showprotected) {
                legalplayers.push(turnplayer)
                legalplayers.push("player0")
            }else{
                let basic=this.zip(column,row,1,0,["player0"])
                options.push(basic)
                if (column=="2" && basic) {
                    options.push(this.zip(column,row,2,0,["player0"]))
                }  
            }
            options.push(this.zip(column,row,1,1,legalplayers))
            options.push(this.zip(column,row,1,-1,legalplayers))
        }
        if (turnplayer=="player2") {

                if (column=="4") {
                    this.enpassencheck(column,row,0,1,-1,turnplayer,opponent)
                    this.enpassencheck(column,row,0,-1,-1,turnplayer,opponent)          
                }
                let legalplayers=[opponent]
                if (showprotected) {
                    legalplayers.push(turnplayer)
                    legalplayers.push("player0")
                }else{
                    let basic=this.zip(column,row,-1,0,["player0"])
                    options.push(basic)
                    if (column=="7" && basic) {
                        options.push(this.zip(column,row,-2,0,["player0"]))
                    }
                }

            options.push(this.zip(column,row,-1,1,legalplayers))
            options.push(this.zip(column,row,-1,-1,legalplayers))  
        }

        options.forEach(element => {
            if (element!=0) {
                this.legals.legalmoves.push(element)
            }
        });
    }
    castle(thisguy:Location,turnplayer:string,opponent:string,showprotected:boolean=false){
        let row:string=thisguy.index[1]
        let column:string=thisguy.index[0]

        let legalplayers=[opponent]
        if (showprotected) {
            legalplayers.push(turnplayer)
        }
        let down:number[]=this.repeat(column,row,1,0,legalplayers)
        let up:number[]=this.repeat(column,row,-1,0,legalplayers)
        let left:number[]=this.repeat(column,row,0,-1,legalplayers)
        let right:number[]=this.repeat(column,row,0,1,legalplayers)
        this.legals.legalmoves=down.concat(up,left,right)
        return down.concat(up,left,right)
    }
    bishop(thisguy:Location,turnplayer:string,opponent:string,showprotected:boolean=false){
        let row:string=thisguy.index[1]
        let column:string=thisguy.index[0]

        let legalplayers=[opponent]
        if (showprotected) {
            legalplayers.push(turnplayer)
        }
        let downright:number[]=this.repeat(column,row,1,1,legalplayers)
        let downleft:number[]=this.repeat(column,row,1,-1,legalplayers)
        let upright:number[]=this.repeat(column,row,-1,1,legalplayers)
        let upleft:number[]=this.repeat(column,row,-1,-1,legalplayers)

        this.legals.legalmoves=downright.concat(upright,downleft,upleft)
        return downright.concat(upright,downleft,upleft)
    }
    horse(thisguy:Location,turnplayer:string,opponent:string,showprotected:boolean=false){
        let options:number[]=[]
        let row:string=thisguy.index[1]
        let column:string=thisguy.index[0]

        let legalplayers=["player0",opponent]
        if (showprotected) {
            legalplayers.push(turnplayer)
        }

        const horsespots=[[2,1],[2,-1],[-2,1],[-2,-1],[1,2],[-1,2],[1,-2],[-1,-2]]
        horsespots.forEach(element => {
            options.push(this.zip(column,row,element[0],element[1],legalplayers))
        });

        options.forEach(element => {
            if (element!=0) {
                this.legals.legalmoves.push(element)
            }
        });

    }
    queen(thisguy:Location,turnplayer:string,opponent:string,showprotected:boolean=false){
        let likecastle=this.castle(thisguy,turnplayer,opponent,showprotected)
        let likebishop=this.bishop(thisguy,turnplayer,opponent,showprotected)
        this.legals.legalmoves=likecastle.concat(likebishop)
    }
    castling(thisguy:Location,turnplayer:string,opponent:string){
        let row:string=thisguy.index[1]
        let column:string=thisguy.index[0]
        let kingside=true
        let queenside=true
        
        const kinglocations=turnplayer=="player1"?14:84
        const kingsidecastle=turnplayer=="player1"?11:81
        const queensidecastle=turnplayer=="player1"?18:88
// checks boardLOG for king or rook prior movement
        this.boardservice().log.forEach(element => {
            if (element.start==kinglocations||element.start==kingsidecastle) {
                kingside=false
            }
            if(element.start==kinglocations||element.start==queensidecastle){
                queenside=false
            }
        });
        if (this.zip(column,row,0,-3,[turnplayer])&&kingside==true) {
            let test1=this.zip(column,row,0,-1,["player0"])
            let test2=this.zip(column,row,0,-2,["player0"])
            if (!test1 || this.opponentsLegals.includes(test1)) {kingside=false}
            if (!test2 || this.opponentsLegals.includes(test2)) {kingside=false}
            if (this.boardservice().board[this.zip(column,row,0,-3,[turnplayer]) as keyof BoardLayout].peice!="C") {kingside=false}
        }else{kingside=false}
        if (this.zip(column,row,0,4,[turnplayer])&&queenside==true) {
            let test1=this.zip(column,row,0,1,["player0"])
            let test2=this.zip(column,row,0,2,["player0"])
            let test3=this.zip(column,row,0,3,["player0"])
            if (!test1 || this.opponentsLegals.includes(test1)) {queenside=false}
            if (!test2 || this.opponentsLegals.includes(test2)) {queenside=false}
            if (!test3) {queenside=false}
            if (this.boardservice().board[this.zip(column,row,0,4,[turnplayer]) as keyof BoardLayout].peice!="C") {queenside=false}
        }else{queenside=false}
        if (kingside) {
            this.legals.legalmoves.push(this.zip(column,row,0,-2,["player0"]))
            this.legals.special=true;
            this.legals.peice=this.boardservice().board[this.zip(column,row,0,-2,["player0"]) as keyof BoardLayout]
            this.legals.changelist=[
                ["",this.zip(column,row,0,-3,[turnplayer]),"player0","C",turnplayer],
                ["K",this.zip(column,row,0,-2,["player0"]),turnplayer,"","player0"],
                ["C",this.zip(column,row,0,-1,["player0"]),turnplayer,"","player0"],
                ["",Number(column+row),"player0","K",turnplayer]]
        }
        if (queenside) {
            this.legals.legalmoves.push(this.zip(column,row,0,2,["player0"]))
            this.legals.special2=true;
            this.legals.peice2=this.boardservice().board[this.zip(column,row,0,2,["player0"]) as keyof BoardLayout]
            this.legals.changelist2=[
                ["",this.zip(column,row,0,4,[turnplayer]),"player0","C",turnplayer],
                ["K",this.zip(column,row,0,2,["player0"]),turnplayer,"",turnplayer],
                ["C",this.zip(column,row,0,1,["player0"]),turnplayer,"",turnplayer],
                ["",Number(column+row),"player0","K",turnplayer]]
        }
    }
    king(thisguy:Location,turnplayer:string,opponent:string,showprotected:boolean=false){
        let options:number[]=[]
        let row:string=thisguy.index[1]
        let column:string=thisguy.index[0]

        const kingspots=[[1,1],[1,0],[1,-1],[-1,1],[-1,-1],[-1,0],[0,1],[0,-1]]
        let legalplayers=["player0",opponent]
        if (showprotected) {
            legalplayers.push(turnplayer)
        }
        kingspots.forEach(element => {
            options.push(this.zip(column,row,element[0],element[1],legalplayers))
        });

        const kinglocations=turnplayer=="player1"?"14":"84"
        if (kinglocations==thisguy.index) {
            this.castling(thisguy,turnplayer,opponent)
        }
        options.forEach(element => {
            if (element!=0 && !this.opponentsLegals.includes(element)) {
                this.legals.legalmoves.push(element)
            }
        });
    }

    lookForRevealCheck(turnplayer:string,opponent:string){

        let revealables=["C","B","Q"]
        let foundcheck=false
        for (let [key, value] of Object.entries(this.boardservice().board)) {
            if (revealables.includes(value.peice) && value.player==turnplayer) {
                this.moveManager({peice:value,index:key},turnplayer,opponent)
                let checktest=this.lookForCheck(this.legals.legalmoves,opponent)
                if (checktest) {
                    foundcheck=true
                }
            }
        }
        return foundcheck

    }
    lookForCheck(legalmoves:Array<number>,opponent:string){
        let check:boolean=false
        legalmoves.forEach(element => {
            let thisPeice=this.boardservice().board[element as keyof BoardLayout]
            if (thisPeice.peice=="K"&&thisPeice.player==opponent) {
                check=true
            }
        });
        if(check){
            return true
        }
        return false
    }
    AllOpponentMoves(turnplayer:string,opponent:string){
        this.incheckby=[]
        this.opponentsLegals=[]
        this.kingline=[]
        this.behindKing=[]
        for (let [key, value] of Object.entries(this.boardservice().board)) {
            if (value.player==opponent) {
                this.lookingat={peice:value,index:key}
                this.moveManager(
                    {peice:value,index:key},
                    opponent,
                    turnplayer,
                    true
                )
                let putsKingInCheck=this.lookForCheck(this.legals.legalmoves,turnplayer)
                if (putsKingInCheck) {
                    this.kingline.push(Number(key))
                    let newlist=this.kingline.map(function(e){return e;});
                    this.incheckby.push(newlist) 
                }
                this.opponentsLegals=this.opponentsLegals.concat(this.legals.legalmoves)
            }

        }
    }
    GameOverCheck(GameOverFor:string,opponent:string,incheck:boolean){
        for (let [key, value] of Object.entries(this.boardservice().board)) {
            if (value.player==GameOverFor) {
                value.player="selected"
                this.pinnedPeices(GameOverFor,opponent)
                value.player=GameOverFor
                this.moveManager(
                    {peice:value,index:key},
                    GameOverFor,
                    opponent,
                    false,
                    incheck
                )
                if (this.legals.legalmoves.length>0) {
                    return false
                }
            }
        }
        return true
    }
    checkifpinned(thisguy:Location){
        this.pinnedpeices.forEach(element => {
            if (element[0]==thisguy.index) {
                this.legals.legalmoves=this.legals.legalmoves.filter((x)=>{
                        return element[1].includes(x)
                })
            }
        });
    }
    pinnedPeices(turnplayer:string,opponent:string){
        this.pinnedpeices=[]
        let pinnables=["C","B","Q"]
        let peicedirections={
            "C":[[1,0],[-1,0],[0,1],[0,-1]],
            "B":[[1,1],[-1,1],[-1,-1],[1,-1]],
            "Q":[[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,1],[-1,-1],[1,-1]]
        }
        for (let [key, value] of Object.entries(this.boardservice().board)) {
            if (pinnables.includes(value.peice) && value.player==opponent) {
                peicedirections[value.peice as keyof typeof peicedirections].forEach(element => {
                    this.searchforpinned(value.y,value.x,element[0],element[1],turnplayer)
                });
            }
        }
    }
    searchforpinned(y:string,x:string,addy:number,addx:number,turnplayer:string){
        let movelist:number[]=[Number(y.toString()+x.toString())]
        let pinnedguy:number=0
        let ispinned:boolean=false
        let progressX=Number(x)
        let progressY=Number(y)
        let phaseone=true
        let phasetwo=false
        while (phaseone) {
            let emptyspace=this.zip(progressY.toString(),progressX.toString(),addy,addx,["player0"])
            let mypeice=this.zip(progressY.toString(),progressX.toString(),addy,addx,["selected"])
            if (emptyspace) {
                movelist.push(emptyspace)
                progressX+=addx;
                progressY+=addy;
            }else if(mypeice){
                pinnedguy=mypeice;
                progressX+=addx;
                progressY+=addy;
                phasetwo=true;
                phaseone=false;
            }else{
                phaseone=false
            }
        }
        while (phasetwo) {
            let emptyspace=this.zip(progressY.toString(),progressX.toString(),addy,addx,["player0"])
            let foundking=this.zip(progressY.toString(),progressX.toString(),addy,addx,["K"])
            if (emptyspace) {
                movelist.push(emptyspace)
                progressX+=addx;
                progressY+=addy;
            }else if(foundking){
                ispinned=true;
                phasetwo=false;
            }else{
                phasetwo=false;
            }
        }

        if (ispinned) {
            this.pinnedpeices.push([pinnedguy.toString(),movelist])
        }

    }

    Aiturn(){
        this.foundamove=false
        this.slop=[]
        this.bestmovepoints=0
        this.AllOpponentMoves("player2","player1")
        this.Allaimoves()
        if (this.foundamove) {
            return ([this.currentbest,this.currentbestgoingto])
        }
        return this.slop[Math.floor(Math.random() * this.slop.length)];

    }
    Allaimoves(){
        for (let [key, value] of Object.entries(this.boardservice().board)) {
            if (value.player=="player2") {
                this.lookingat={peice:value,index:key}
                this.lookingat.peice.player="selected"
                this.pinnedPeices("player2","player1")
                if (this.boardservice().incheck) {
                    this.moveManager(
                        {peice:value,index:key},
                        "player2",
                        "player1",
                        false,
                        true
                    )
                }else{
                    this.moveManager(
                        {peice:value,index:key},
                        "player2",
                        "player1",
                    )
                }
                this.testforbest()
                this.lookingat.peice.player="player2"
            }

        }
    }

    slop:Array<Array<Location>>=[]
    testforbest(){
        let valuedic={
            "":0,
            "P":3,
            "H":5,
            "B":5,
            "C":7,
            "Q":12,
        }
        this.legals.legalmoves.forEach(element => {
            let alegal=this.boardservice().board[element as keyof BoardLayout]
            let elementpoints=valuedic[alegal.peice as keyof typeof valuedic]
            let danger=false
            if (this.opponentsLegals.includes(element)) {
                danger=true
            }

            if (this.lookingat.peice.x==this.opplastx) {
                elementpoints+=1
            }
            if (this.lookingat.peice.peice=="P") {
                if (this.opponentsLegals.includes(Number(this.lookingat.index))) {
                    elementpoints+=2
                }
                if (Number(this.lookingat.index[0])-1>Number(element.toString()[0])) {
                    elementpoints+=1
                }  
                if (danger) {
                    elementpoints-=2
                }
            }
            if (this.lookingat.peice.peice=="H") {
                if (this.opponentsLegals.includes(Number(this.lookingat.index))) {
                    elementpoints+=4
                }
                if (danger) {
                    elementpoints-=4
                }   
            }
            if (this.lookingat.peice.peice=="B") {
                if (this.opponentsLegals.includes(Number(this.lookingat.index))) {
                    elementpoints+=4
                }
                if (danger) {
                    elementpoints-=4
                }   
            }
            if (this.lookingat.peice.peice=="C") {
                if (this.opponentsLegals.includes(Number(this.lookingat.index))) {
                    elementpoints+=6
                }
                if (danger) {
                    elementpoints-=6
                }   
            }
            if (this.lookingat.peice.peice=="Q") {
                if (this.opponentsLegals.includes(Number(this.lookingat.index))) {
                    elementpoints+=11
                }
                if (danger) {
                    elementpoints-=11
                }   
            }

            if (elementpoints>this.bestmovepoints) {
                this.foundamove=true
                this.bestmovepoints=elementpoints
                this.currentbest=this.lookingat
                this.currentbestgoingto={peice:alegal,index:element.toString()}
            }else{
                this.slop.push([this.lookingat,{peice:alegal,index:element.toString()}])
            }

        });
    }

}