export interface Peice{
    peice:string;
    player:string;
    x:number;
    y:number;
    legal:boolean;
    space:string;
    top:string;
    left:string;
    animate:string;
}

export interface BoardLayout{
    11:Peice;
    21:Peice;
    31:Peice;
    41:Peice;
    51:Peice;
    61:Peice;
    71:Peice;
    81:Peice;
    12:Peice;
    22:Peice;
    32:Peice;
    42:Peice;
    52:Peice;
    62:Peice;
    72:Peice;
    82:Peice;
    13:Peice;
    23:Peice;
    33:Peice;
    43:Peice;
    53:Peice;
    63:Peice;
    73:Peice;
    83:Peice;
    14:Peice;
    24:Peice;
    34:Peice;
    44:Peice;
    54:Peice;
    64:Peice;
    74:Peice;
    84:Peice;
    15:Peice;
    25:Peice;
    35:Peice;
    45:Peice;
    55:Peice;
    65:Peice;
    75:Peice;
    85:Peice;
    16:Peice;
    26:Peice;
    36:Peice;
    46:Peice;
    56:Peice;
    66:Peice;
    76:Peice;
    86:Peice;
    17:Peice;
    27:Peice;
    37:Peice;
    47:Peice;
    57:Peice;
    67:Peice;
    77:Peice;
    87:Peice;
    18:Peice;
    28:Peice;
    38:Peice;
    48:Peice;
    58:Peice;
    68:Peice;
    78:Peice;
    88:Peice;
}

export interface Location{
    peice:Peice;
    index:string;
}

export interface databank{
    id:string;
    player1:string;
    player2:string;
    turnplayer:string;
    incheck:boolean;
    board:BoardLayout;
    log:Array<movementLog>
}

export interface movementLog{
    start:number;
    end:number;
    startpeice:string;
    endpeice:string;
    startplayer:string;
    endplayer:string;
    incheck:boolean;
    special:boolean;
    changelist:Array<[string,number,string,string,string]>;
}

export interface legalmoves{
    legalmoves:Array<number>
    special:boolean;
    peice:Peice|null;
    changelist:Array<[string,number,string,string,string]>;
    special2:boolean;
    peice2:Peice|null;
    changelist2:Array<[string,number,string,string,string]>;
}

export interface testuser{
    username:string;
    theme:string;
    army:string;
}
