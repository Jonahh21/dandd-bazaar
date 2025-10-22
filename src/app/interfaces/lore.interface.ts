import { GameRequest } from "./game.interface";
import { ItemSimple } from "./item.interface";


export interface LoreRequest {
    id: number;
    game: GameRequest;
    text: string;
    item: ItemSimple;
    createdAt: Date;
    thenName: string;
    thenDescription: string;
    priceChange: number;
    thenPriceChange: string;
    thenPrice: string;
    thenStats: string;
    thenCurses: string;
}


export interface LorePost {
    text:        string;
    name:        string;
    description: string;
    pricechange: number;
    image:       string;
    stats:       string;
    curses:      string;
}
