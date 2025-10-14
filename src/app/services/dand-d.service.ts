import { computed, inject, Injectable, signal } from '@angular/core';
import DandDRepository from '../repository/dand-d.repository';
import { rxResource } from '@angular/core/rxjs-interop';
import { GameRequest } from '../interfaces/game.interface';
import { of } from 'rxjs';
import { ItemDetailed } from '../interfaces/item.interface';

@Injectable({
  providedIn: 'root'
})
export class DandDService {
  private repo = inject(DandDRepository)

  myGames = rxResource({
    stream: (params) => {
      return this.repo.getGames()!
    }
  })

  currentGameID = signal<number | null>(null)

  selectedGame = computed(() => {
    if (this.currentGameID() == null) return null

    return this.myGames.value()?.find((game) => {
      return game.id == this.currentGameID()!
    }) ?? null
  })

  items = rxResource({
    stream: (params) => {
      return this.repo.getItems()!
    }
  })

  selectedItemID = signal<number | null>(null)

  selectedItem = rxResource({
    params: () => ({
      id: this.selectedItemID()
    }),
    stream: ({ params }) => {
      const id = params.id;
      if (id == null) return of(null)
      return this.repo.getItem(id)!;
    }
  })
}
