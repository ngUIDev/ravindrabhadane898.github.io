export interface IQuote{
    c:number;
    d:number;
    dp:number;
    h:number;
    l:number;
    o:number;
    pc:number;
    t:number;
}

export interface ISymbolLookup{
    count:number;
    result:IResult[]
}

export interface IResult{
    description:string;
    displaySymbol:string;
    symbol: string;
    type:string;
}

export interface IStockList{
    description:string;
    symbol: string;
    currentPrice: number;
    percentChangeToday:number;
    openingPrice:number;
    highPrice:number;
}

export interface ISentimentLookup{
    data:IData[];
    symbol:string
}

export interface ISentimentData{      
    month:number;
    change:number;
    mspr:number;    
}

export interface IData extends ISentimentData{  
    year:number;
    symbol:string;    
}

export interface IState{
    name:string;
    navigationId:number;
}
