import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { TestLegal } from './movement.tests';

import { databank,legalmoves,Peice,Location } from '../board-data/board.state';


    let teststart:databank=
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
    let checkmate:databank=
    {"id":"example","player1":"user","player2":"AI","p1uid":"4","p2uid":"6","turnplayer":"user","incheck":false,"log":[],"over":false,"winner":"none","loser":"none","board":{
        "11":{"peice":"C","player":"player1","x":1,"y":1,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
        "12":{"peice":"C","player":"player1","x":2,"y":1,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
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
        "28":{"peice":"","player":"player0","x":8,"y":2,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
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
        "71":{"peice":"","player":"player0","x":1,"y":7,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
        "72":{"peice":"","player":"player0","x":2,"y":7,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
        "73":{"peice":"","player":"player0","x":3,"y":7,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
        "74":{"peice":"","player":"player0","x":4,"y":7,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
        "75":{"peice":"","player":"player0","x":5,"y":7,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
        "76":{"peice":"","player":"player0","x":6,"y":7,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
        "77":{"peice":"","player":"player0","x":7,"y":7,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
        "78":{"peice":"","player":"player0","x":8,"y":7,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
        "81":{"peice":"K","player":"player2","x":1,"y":8,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
        "82":{"peice":"","player":"player0","x":2,"y":8,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
        "83":{"peice":"","player":"player0","x":3,"y":8,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
        "84":{"peice":"","player":"player0","x":4,"y":8,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
        "85":{"peice":"","player":"player0","x":5,"y":8,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
        "86":{"peice":"","player":"player0","x":6,"y":8,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
        "87":{"peice":"","player":"player0","x":7,"y":8,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
        "88":{"peice":"","player":"player0","x":8,"y":8,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"}
    }}
    let pinned:databank=
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
        "28":{"peice":"","player":"player0","x":8,"y":2,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
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
        "71":{"peice":"","player":"player0","x":1,"y":7,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
        "72":{"peice":"","player":"player0","x":2,"y":7,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
        "73":{"peice":"","player":"player0","x":3,"y":7,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
        "74":{"peice":"","player":"player0","x":4,"y":7,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
        "75":{"peice":"","player":"player0","x":5,"y":7,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
        "76":{"peice":"","player":"player0","x":6,"y":7,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
        "77":{"peice":"","player":"player0","x":7,"y":7,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
        "78":{"peice":"","player":"player0","x":8,"y":7,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
        "81":{"peice":"C","player":"player1","x":1,"y":8,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
        "82":{"peice":"","player":"player0","x":2,"y":8,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
        "83":{"peice":"","player":"player0","x":3,"y":8,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
        "84":{"peice":"P","player":"selected","x":4,"y":8,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
        "85":{"peice":"","player":"player0","x":5,"y":8,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
        "86":{"peice":"","player":"player0","x":6,"y":8,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
        "87":{"peice":"","player":"player0","x":7,"y":8,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
        "88":{"peice":"K","player":"player2","x":8,"y":8,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"}
    }}

describe("all peices in starting position. check all have expected moveset",()=>{

    let startboard:TestLegal
    it('#legalmoves should return array of numbers', () => {
        startboard = new TestLegal(teststart)

        for (let [key, value] of Object.entries(startboard.boardservice.board)) {
            let checkpeice:Location={peice:value,index:key};
            let player=value.player
            let opponent=value.player=="player1"?"player2":"player1";
            if (value.peice=="C") {
                let expected=0;
                let legalmoves=startboard.moveManager(checkpeice,player,opponent)
                expect(legalmoves.legalmoves.length).toEqual(expected);
            }
            if (value.peice=="P") {
                let expected=2;
                let legalmoves=startboard.moveManager(checkpeice,player,opponent)
                expect(legalmoves.legalmoves.length).toEqual(expected);
            }
            if (value.peice=="K") {
                let expected=0;
                let legalmoves=startboard.moveManager(checkpeice,player,opponent)
                expect(legalmoves.legalmoves.length).toEqual(expected);
            }
            if (value.peice=="Q") {
                let expected=0;
                let legalmoves=startboard.moveManager(checkpeice,player,opponent)
                expect(legalmoves.legalmoves.length).toEqual(expected);
            }
            if (value.peice=="B") {
                let expected=0;
                let legalmoves=startboard.moveManager(checkpeice,player,opponent)
                expect(legalmoves.legalmoves.length).toEqual(expected);
            }
            if (value.peice=="H") {
                let expected=2;
                let legalmoves=startboard.moveManager(checkpeice,player,opponent)
                expect(legalmoves.legalmoves.length).toEqual(expected);
            }

        }

      });

})
describe("test for checkmate, function gameovercheck should return true",()=>{

    let startboard:TestLegal
    it('#legalmoves should return array of numbers', () => {
        startboard = new TestLegal(checkmate)
        startboard.AllOpponentMoves("player1","player2")

        //third param === KING IN CHECK...if func returns true while in check:win...else:stalemate
        let gameover:Boolean=startboard.GameOverCheck("player2","player1",true)
        let draw:Boolean=startboard.GameOverCheck("player2","player1",false)

        expect(gameover).toEqual(true);
        expect(draw).toEqual(true);


      });

})
describe("test if pinned",()=>{

    let startboard:TestLegal
    it('legalmoves for pawn should be 0, pinnedpeices array should include pawn & castles line', () => {
        startboard = new TestLegal(pinned);
        startboard.pinnedPeices("player2","player1");

        let pinnedguy="84"
        let checkpeice:Location={peice:pinned.board[84],index:pinnedguy};
        let pawnsmoves=startboard.moveManager(checkpeice,"player2","player1")

        expect(startboard.pinnedpeices[0][0]).toEqual(pinnedguy)
        expect(pawnsmoves.legalmoves.length).toEqual(0);


    });

})


let anytest:databank=
{"id":"example","player1":"user","player2":"AI","p1uid":"4","p2uid":"6","turnplayer":"user","incheck":false,"log":[],"over":false,"winner":"none","loser":"none","board":{
    "11":{"peice":"K","player":"selected","x":1,"y":1,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
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
    "28":{"peice":"","player":"player0","x":8,"y":2,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
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
    "71":{"peice":"","player":"player0","x":1,"y":7,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
    "72":{"peice":"","player":"player0","x":2,"y":7,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
    "73":{"peice":"","player":"player0","x":3,"y":7,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
    "74":{"peice":"","player":"player0","x":4,"y":7,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
    "75":{"peice":"","player":"player0","x":5,"y":7,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
    "76":{"peice":"","player":"player0","x":6,"y":7,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
    "77":{"peice":"","player":"player0","x":7,"y":7,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
    "78":{"peice":"","player":"player0","x":8,"y":7,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
    "81":{"peice":"","player":"player0","x":1,"y":8,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
    "82":{"peice":"","player":"player0","x":2,"y":8,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
    "83":{"peice":"","player":"player0","x":3,"y":8,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
    "84":{"peice":"","player":"player0","x":4,"y":8,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
    "85":{"peice":"","player":"player0","x":5,"y":8,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
    "86":{"peice":"","player":"player0","x":6,"y":8,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"},
    "87":{"peice":"","player":"player0","x":7,"y":8,"legal":false,"space":"whitespace","top":"0","left":"0","animate":"start"},
    "88":{"peice":"","player":"player0","x":8,"y":8,"legal":false,"space":"blackspace","top":"0","left":"0","animate":"start"}
}}
describe("general test peice testing",()=>{

    let startboard:TestLegal
    it('', () => {
        startboard = new TestLegal(anytest);

        let testindex="11"
        let peicetotest:Peice=anytest.board[11]
        let checkpeice:Location={peice:peicetotest,index:testindex};
        startboard.moveManager(checkpeice,"player2","player1")

        let expectedlegalslength=3
        let expectedlegals=[12,21,22].sort()

        expect(startboard.legals.legalmoves.length).toEqual(expectedlegalslength);
        expect(startboard.legals.legalmoves.sort()).toEqual(expectedlegals);


    });

})