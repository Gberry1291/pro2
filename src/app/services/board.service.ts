import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Peice,BoardLayout,databank,movementLog } from '../board-data/board.state';
import { merge,cloneArray } from '../board-data/helpers';

@Injectable({providedIn: 'root'})
export class BuildBoard {
    public movementLog = signal<movementLog[]>([]);
    public player="player1"
    public opponent="player2"

    constructor(private http: HttpClient) {

    }

    public board = signal<databank>(
        {"id":"example","player1":"","player2":"","turnplayer":"","incheck":false,"log":[],"board":{
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

    public load2(one:any,two:any): Observable<Array<databank>> {
        let obs= this.http.get<Array<databank>>('mock-data/opengames.json');
        obs.subscribe((result) => {
            let found=false
            result.forEach(element => {
                if ((element.player1==one||element.player2==one) && (element.player1==two||element.player2==two)) {
                    this.board.set(element);
                    found=true
                }
            });
            if (!found) {
                this.board.set(result[0]);
                this.board().player1=one;
                this.board().player2=two;   
                this.board().turnplayer=one;
                this.board.set({...this.board()})  
            }
        });

        return obs
    }


}