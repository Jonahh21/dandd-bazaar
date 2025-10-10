

export interface GameRequest {
    id: number
    name: string
    currencysymbol: string
    currencynamesingle: string
    currencynamemultiple: string

    partycurrency: number
}

export interface GamePost {
    id: number | null
    name: string
    currencysymbol: string
    currencynamesingle: string
    currencynamemultiple: string
    swordpriceincurrency: number
    fromgame: string

    partycurrency: number
}