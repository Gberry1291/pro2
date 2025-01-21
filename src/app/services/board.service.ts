import { HttpClient } from '@angular/common/http';
import { Injectable, signal,inject } from '@angular/core';
import { databank,movementLog } from '../board-data/board.state';
import { cloneBoard } from '../board-data/helpers';
import { AuthService } from "../auth.service";

@Injectable({providedIn: 'root'})
export class BuildBoard {
    public movementLog = signal<movementLog[]>([]);
    public player="player1"
    public opponent="player2"
    private authService: AuthService = inject(AuthService);

    constructor(private http: HttpClient) {

    }

    public board = signal<databank>(
        {"id":"example","player1":"","player2":"","turnplayer":"","p1uid":"4","p2uid":"6","incheck":false,"log":[],"over":false,"winner":"none","loser":"none",
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

    public async load(one:any,two:any,oneid:any,twoid:any){
        let foundboard:databank
        let found=await this.authService.getboard(one,two)

        if (found!.id!="example") {
            let cloaned=cloneBoard(found!)
            this.board.set(cloaned);
            foundboard=cloaned      
        }else{
            let cloned=cloneBoard(found!)
            cloned.player1=one;
            cloned.player2=two;   
            cloned.turnplayer=one;
            cloned.id=one+"v"+two;
            cloned.p1uid=oneid;
            cloned.p2uid=twoid;
            cloned.over=false;
            this.board.set(cloned);
            foundboard=cloned
        }

        return foundboard
    }

    public async PullOpenGames(username:string){

        let gamelist=await this.authService.pullopengames(username)

        return gamelist
    }

    public save(){
        // testboarddata.forEach(element => {
        //     if ((element.player1==this.board().player1||element.player2==this.board().player1) && (element.player1==this.board().player2||element.player2==this.board().player2)) {
        //         element.turnplayer=this.board().turnplayer
        //         element.log=this.board().log
        //         element.board=this.board().board
        //         element.incheck=this.board().incheck
        //     }
        // });

        this.authService.saveboard(this.board())
    }


}