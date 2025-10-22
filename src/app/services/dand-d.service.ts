import { inject, Injectable } from '@angular/core';
import { GameRequest } from '../interfaces/game.interface';
import { ItemSimple } from '../interfaces/item.interface';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './Auth.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DandDService {
  http = inject(HttpClient);

  authServ = inject(AuthService);

  getGames() {
    return this.http.get<GameRequest[]>(environment.apiURL + "games", this.authServ.computedHeaders())
  }

  getGame(id: number) {
    return this.http.get<GameRequest>(environment.apiURL + "games/" + id, this.authServ.computedHeaders())
  }

  getGameInventory(gameId: number) {
    return this.http.get<ItemSimple[]>(environment.apiURL + "games/" + gameId + "/inventory", this.authServ.computedHeaders())
  }

  getGameStore(gameId: number) {
    return this.http.get<ItemSimple[]>(environment.apiURL + "games/" + gameId + "/store", this.authServ.computedHeaders())
  }

  getItemDetails(gameId: number, itemId: number) {
    return this.http.get<ItemSimple>(environment.apiURL + "games/" + gameId + "/store/" + itemId, this.authServ.computedHeaders())
  }

  buyGameItem(gameId: number, itemId: number) {
    return this.http.post(environment.apiURL + "games/" + gameId + "/buy/" + itemId, {}, this.authServ.computedHeaders())
  }
}
