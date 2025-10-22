import { inject, Injectable, signal } from '@angular/core';
import { GamePost, GameRequest } from '../interfaces/game.interface';
import { ItemPost, ItemSimple } from '../interfaces/item.interface';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './Auth.service';
import { environment } from '../../environments/environment';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DandDService {
  http = inject(HttpClient);

  authServ = inject(AuthService);

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

  // MARK: Items
  getGameInventory(gameId: number) {
    return this.http.get<ItemSimple[]>(environment.apiURL + "games/" + gameId + "/inventory", this.authServ.computedHeaders())
  }

  getGameStore(gameId: number) {
    return this.http.get<ItemSimple[]>(environment.apiURL + "games/" + gameId + "/store", this.authServ.computedHeaders())
  }

  getItemDetails(gameId: number, itemId: number) {
    return this.http.get<ItemSimple>(environment.apiURL + "games/" + gameId + "/store/" + itemId, this.authServ.computedHeaders())
  }

  // MARK: Item Actions
  createGameItem(gameId: number, post: ItemPost) {
    return this.http.post(environment.apiURL + "games/" + gameId + "/create", post, this.authServ.computedHeaders())
  }

  buyGameItem(gameId: number, itemId: number) {
    return this.http.post(environment.apiURL + "games/" + gameId + "/buy/" + itemId, {}, this.authServ.computedHeaders())
  }
}
