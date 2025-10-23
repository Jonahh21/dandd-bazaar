import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { DandDService } from '../../services/dand-d.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { ItemForm } from './item-form/item-form';
import { ItemPost } from '../../interfaces/item.interface';
import { GameCurrencyPipe } from '../../common/pipes/GameCurrency.pipe';
import { RouterLink } from "@angular/router";
import { SimpleItemList } from "../../common/simple-item-list/simple-item-list";

@Component({
  selector: 'app-game-inventory',
  imports: [ItemForm, GameCurrencyPipe, RouterLink, SimpleItemList],
  templateUrl: './game-inventory.html',
  styleUrl: './game-inventory.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameInventory {

  ddServ = inject(DandDService)

  showForm = signal(false)

  toggleShowForm() {
    this.showForm.update(v => !v)
  }

  gid = computed(() => {
    if (this.ddServ.gameId() == null) return 0;
    return this.ddServ.gameId()!
  })

  items = rxResource({
    params: () => ({
      gameId: this.gid()
    }),
    stream: ({params}) => {
      return this.ddServ.getGameInventory(params.gameId)
    }
  })

  itemCreated(post: ItemPost) {
    this.ddServ.createGameItem(this.gid(), post).subscribe((value) => {
      console.log(value)
      this.items.reload()
      this.showForm.set(false)
    })
  }

}
