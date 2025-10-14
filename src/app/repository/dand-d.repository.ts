import { Injectable } from "@angular/core";
import { GameRequest } from "../interfaces/game.interface";
import { environment } from "../../environments/environment";
import { of } from "rxjs";
import { array_random } from "../common/utilities/utilitiesvol1";
import { ItemDetailed, ItemSimple } from "../interfaces/item.interface";

@Injectable({
    providedIn: 'root',
})
export default class DandDRepository {

    private sampleGames: GameRequest[] = [
        {
            id: 0,
            name: "WestFalia",
            currencysymbol: "W",
            currencynamesingle: "Wenario",
            currencynamemultiple: "Wenarios",
            partycurrency: 10,
            image: "https://cdna.artstation.com/p/assets/images/images/017/649/184/large/luka-mivsek-luka-mivsek-island-01.jpg?1556815574"
        },
        {
            id: 1,
            name: "SouthFalia",
            currencysymbol: "S",
            currencynamesingle: "Senario",
            currencynamemultiple: "Senarienses",
            partycurrency: 10,
            image: null
        }
    ]

    private sampleitems: ItemSimple[] = [
        {
            id: 0,
            name: "Espada mental",
            image: "https://i.pinimg.com/736x/94/2d/30/942d30b3efbacbe75c8d9095a17a9c93.jpg",
            price: 300
        },
        {
            id: 2,
            name: "Cuchillo de plata",
            image: null,
            price: 27.9
        },
        {
            id: 3,
            name: "Armadura de cuero negro",
            image: null,
            price: 1
        }
    ]

    private sampleitem: ItemDetailed = {
        id: 0,
        name: "Espada mental",
        price: 300,
        image: "https://i.pinimg.com/736x/94/2d/30/942d30b3efbacbe75c8d9095a17a9c93.jpg",
        description: "Una espada que se mueve con la mente del usuario, requiere una estabilidad mental, ya que en periodo de crisis puede moverse de forma errática",
        stats: "Es sacada del inventario/vaina al campo de batalla, usa como estadística la mayor entre fuerza/inteligencia",
        curses: null,

        quantity: 1
    }

    getGames() {
        if (environment.mocking) return of(this.sampleGames)
        return of([])
    }

    getGame(id: number) {
        if (environment.mocking) return of(array_random(this.sampleGames))
        return of(null)
    }

    getItems() {
        if (environment.mocking) return of(this.sampleitems)
        return of([])
    }

    getItem(id: number) {
        if (environment.mocking) return of(this.sampleitem)
        return of(null)
    }

}