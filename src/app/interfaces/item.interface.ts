

export interface ItemSimple {
    id: number
    name: string
    image: string | null
    price: number
}

export interface ItemDetailed {
    id: number
    name: string
    price: number
    image: string
    description: string
    stats: string
    curses: string | null

    quantity: number
}

export interface ItemPost {
    id: number | null
    name: string
    price: number
    image: string | null
    description: string
    stats: string
    curses: string | null
}