

export interface GameRequest {
    id:                   number;
    name:                 string;
    currencysymbol:       string;
    currencynamesingle:   string;
    currencynamemultiple: string;
    image:                null | string;
    partycurrency:        number;
}


export interface GamePost {
    name: string
    currencysymbol: string
    currencynamesingle: string
    currencynamemultiple: string
    swordpriceincurrency: number
    image: string | null
    partycurrency: number
}