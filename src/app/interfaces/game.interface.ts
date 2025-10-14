

export interface GameRequest {
    id: number
    name: string
    currencysymbol: string
    currencynamesingle: string
    currencynamemultiple: string
    image: string | null

    partycurrency: number
}

export interface GamePost {
    id: number | null
    name: string
    currencysymbol: string
    currencynamesingle: string
    currencynamemultiple: string
    swordpriceincurrency: number
    image: string | null
    fromgame: string

    partycurrency: number
}