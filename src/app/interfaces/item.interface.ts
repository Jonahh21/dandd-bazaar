import { GameRequest } from "./game.interface";
import { LoreRequest } from "./lore.interface";


export interface ItemSimple {
    id: number
    name: string
    image: string | null
    price: number
}

export interface ItemDetailed {
    id:              number;
    name:            string;
    price:           number;
    image:           string;
    description:     string;
    stats:           string;
    curses:          string;
    fromGame:        string;
    hidden:          boolean;
    purchasehistory: Purchasehistory[];
    lore:            LoreRequest[];
    quantity:        number;
}

export interface Purchasehistory {
    id:          number;
    origin:      GameRequest;
    destination: GameRequest;
    purchasedat: Date;
}


export interface ItemPost {
    name: string
    price: number
    image: string | null
    description: string
    stats: string
    curses: string | null,
    quantity: number,
    hidden: boolean
}