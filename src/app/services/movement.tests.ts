import { Location,BoardLayout,legalmoves,databank } from '../board-data/board.state';

export class TestLegal {
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

    boardservice:databank
    constructor(testboard: databank) {
        this.boardservice=testboard
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
            this.king(thisguy,turnplayer,opponent)
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
        if (this.boardservice.board[Number(newy+newx) as keyof BoardLayout]) {
            ifplayer.forEach(element => {
                if (playeroptions.includes(element)) {
                    if (this.boardservice.board[Number(newy+newx) as keyof BoardLayout]["player"]==element) {
                        test=true
                    }
                }else{
                    if (this.boardservice.board[Number(newy+newx) as keyof BoardLayout]["peice"]==element) {
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
                let space=this.boardservice.board[Number(control) as keyof BoardLayout]
                if (ifpeice.includes(space.player)) {
                    keepgoing=false
                    if (space.peice=="K") {
                        
                        this.kingline=movelist
                        this.behindKing.push(this.zip(progressY.toString(),progressX.toString(),addy,addx,["player0"]))
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
        let latestlog=this.boardservice.log[0]
        if (this.boardservice.board[Number(newy+newx) as keyof BoardLayout]) {
            if (latestlog.end==Number(newy+newx)&&latestlog.startpeice=="P"&&latestlog.startplayer==opponent) {
                test=true
            }
        }
        if(test){
            this.legals.legalmoves.push(Number((Number(y)+direction).toString()+newx))
            this.legals.special=true;
            this.legals.peice=this.boardservice.board[Number((Number(y)+direction).toString()+newx) as keyof BoardLayout]
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
        this.boardservice.log.forEach(element => {
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
            if (this.boardservice.board[this.zip(column,row,0,-3,[turnplayer]) as keyof BoardLayout].peice!="C") {kingside=false}
        }else{kingside=false}
        if (this.zip(column,row,0,4,[turnplayer])&&queenside==true) {
            let test1=this.zip(column,row,0,1,["player0"])
            let test2=this.zip(column,row,0,2,["player0"])
            let test3=this.zip(column,row,0,3,["player0"])
            if (!test1 || this.opponentsLegals.includes(test1)) {queenside=false}
            if (!test2 || this.opponentsLegals.includes(test2)) {queenside=false}
            if (!test3) {queenside=false}
            if (this.boardservice.board[this.zip(column,row,0,4,[turnplayer]) as keyof BoardLayout].peice!="C") {queenside=false}
        }else{queenside=false}
        if (kingside) {
            this.legals.legalmoves.push(this.zip(column,row,0,-2,["player0"]))
            this.legals.special=true;
            this.legals.peice=this.boardservice.board[this.zip(column,row,0,-2,["player0"]) as keyof BoardLayout]
            this.legals.changelist=[
                ["",this.zip(column,row,0,-3,[turnplayer]),"player0","C",turnplayer],
                ["K",this.zip(column,row,0,-2,["player0"]),turnplayer,"","player0"],
                ["C",this.zip(column,row,0,-1,["player0"]),turnplayer,"","player0"],
                ["",Number(column+row),"player0","K",turnplayer]]
        }
        if (queenside) {
            this.legals.legalmoves.push(this.zip(column,row,0,2,["player0"]))
            this.legals.special2=true;
            this.legals.peice2=this.boardservice.board[this.zip(column,row,0,2,["player0"]) as keyof BoardLayout]
            this.legals.changelist2=[
                ["",this.zip(column,row,0,4,[turnplayer]),"player0","C",turnplayer],
                ["K",this.zip(column,row,0,2,["player0"]),turnplayer,"",turnplayer],
                ["C",this.zip(column,row,0,1,["player0"]),turnplayer,"",turnplayer],
                ["",Number(column+row),"player0","K",turnplayer]]
        }
    }
    king(thisguy:Location,turnplayer:string,opponent:string){
        let options:number[]=[]
        let row:string=thisguy.index[1]
        let column:string=thisguy.index[0]

        const kingspots=[[1,1],[1,0],[1,-1],[-1,1],[-1,-1],[-1,0],[0,1],[0,-1]]
        kingspots.forEach(element => {
            options.push(this.zip(column,row,element[0],element[1],["player0",opponent]))
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
        for (let [key, value] of Object.entries(this.boardservice.board)) {
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
            let thisPeice=this.boardservice.board[element as keyof BoardLayout]
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
        for (let [key, value] of Object.entries(this.boardservice.board)) {
            if (value.player==opponent) {
                this.moveManager(
                    {peice:value,index:key},
                    opponent,
                    turnplayer,
                    true
                )
                let putsKingInCheck=this.lookForCheck(this.legals.legalmoves,turnplayer)
                if (putsKingInCheck) {
                    this.kingline.push(Number(key))
                    this.incheckby.push(this.kingline) 
                }
                this.opponentsLegals=this.opponentsLegals.concat(this.legals.legalmoves)
            }

        }
    }
    GameOverCheck(GameOverFor:string,opponent:string,incheck:boolean){
        for (let [key, value] of Object.entries(this.boardservice.board)) {
            if (value.player==GameOverFor) {
                // value.player="selected"
                this.pinnedPeices(GameOverFor,opponent)
                // value.player=GameOverFor
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
        let pinnables=["C","B","Q"]
        let peicedirections={
            "C":[[1,0],[-1,0],[0,1],[0,-1]],
            "B":[[1,1],[-1,1],[-1,-1],[1,-1]],
            "Q":[[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,1],[-1,-1],[1,-1]]
        }
        for (let [key, value] of Object.entries(this.boardservice.board)) {
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

}