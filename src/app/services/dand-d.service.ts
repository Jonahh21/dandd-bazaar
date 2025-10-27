import { effect, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { GamePost, GameRequest } from '../interfaces/game.interface';
import { ItemDetailed, ItemPost, ItemSimple } from '../interfaces/item.interface';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './Auth.service';
import { environment } from '../../environments/environment';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { Pagination } from '../interfaces/pagination.interface';
import { LorePost, LoreRequest } from '../interfaces/lore.interface';

@Injectable({
  providedIn: 'root'
})
export class DandDService {
  
  http = inject(HttpClient);

  authServ = inject(AuthService);

  origingameId = signal<number | null>(null)

  gameId = signal<number | null>(null)

  gameInfo = rxResource({
    params: () => ({
      gameId: this.gameId()
    }),
    stream: ({params}) => {
      const placeholder: GameRequest = {
        id: 0,
        name: 'N/A',
        currencysymbol: '???',
        currencynamesingle: '???',
        currencynamemultiple: '???',
        image: null,
        partycurrency: 0
      } 

      if(params.gameId == null) return of(placeholder)
      return this.getGame(params.gameId)
    }
  })

  itemId = signal<number | null>(null)

  itemDetail = rxResource({
    params: () => ({
      gameId: this.gameId(),
      itemId: this.itemId()
    }),
    stream: ({params}) => {
      const placeholder: ItemDetailed = {
        id: 0,
        name: '',
        price: 0,
        image: '',
        description: '',
        stats: '',
        curses: '',
        fromGame: '',
        hidden: false,
        purchasehistory: [],
        lore: [],
        quantity: 0
      }

      if (params.gameId == null || params.itemId == null) return of(placeholder)
      return this.getItemDetails(params.gameId, params.itemId)
    }
  })

  // MARK: Games
  getGames() {
    return this.http.get<GameRequest[]>(environment.apiURL + "games", this.authServ.computedHeaders())
  }

  getGame(id: number) {
    return this.http.get<GameRequest>(environment.apiURL + "games/" + id, this.authServ.computedHeaders())
  }

  createGame(post: GamePost) {
    return this.http.post<GameRequest>(environment.apiURL + "games", post, this.authServ.computedHeaders())
  }

  deleteGameAndTransfer(origin: number, destination: number) {
    return this.http.delete<GameRequest>(environment.apiURL + "games/delete/" + origin + "/" + destination, this.authServ.computedHeaders())
  }

  // MARK: Items
  getGameInventory(gameId: number) {
    return this.http.get<ItemSimple[]>(environment.apiURL + "games/" + gameId + "/inventory", this.authServ.computedHeaders())
  }

  getGameStore(gameId: number, page: number = 1) {
    return this.http.get<Pagination<ItemSimple>>(environment.apiURL + "games/" + gameId + "/store", {
      headers: this.authServ.authHeader(),
      params: {
        page: page
      }
    })
  }

  getItemDetails(gameId: number, itemId: number) {
    return this.http.get<ItemDetailed>(environment.apiURL + "games/" + gameId + "/store/" + itemId, this.authServ.computedHeaders())
  }

  // MARK: Item Actions
  createGameItem(gameId: number, post: ItemPost) {
    return this.http.post<ItemDetailed>(environment.apiURL + "games/" + gameId + "/create", post, this.authServ.computedHeaders())
  }

  buyGameItem(gameId: number, itemId: number) {
    return this.http.post<ItemDetailed>(environment.apiURL + "games/" + gameId + "/buy/" + itemId, {}, this.authServ.computedHeaders())
  }

  deleteGameItem(gameId: number, itemId: number) {
    return this.http.delete<ItemSimple[]>(environment.apiURL + "games/" + gameId + "/inventory/" + itemId, this.authServ.computedHeaders())
  }

  // MARK: Lore
  createLore(itemId: number, post: LorePost) {
    return this.http.post<LoreRequest>(environment.apiURL + "lore/" + itemId, post, this.authServ.computedHeaders())
  }
}
