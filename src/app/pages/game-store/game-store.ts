import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { DandDService } from '../../services/dand-d.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { ItemSimple } from '../../interfaces/item.interface';
import { SimpleItemList } from "../../common/simple-item-list/simple-item-list";
import { PageSelector } from "../../common/page-selector/page-selector";

@Component({
  selector: 'app-game-store',
  imports: [SimpleItemList, PageSelector],
  templateUrl: './game-store.html',
  styleUrl: './game-store.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameStore {

  ddServ = inject(DandDService)

  selectedPage = signal(1)

  gid = this.ddServ.gameId

  pageData = rxResource({
    params: () => ({
      page: this.selectedPage(),
      gameId: this.gid() || 0
    }),
    stream: (({params}) => {
      return this.ddServ.getGameStore(params.gameId, params.page)
    })
  })

  items = computed<ItemSimple[]>(() => {
    if(!this.pageData.hasValue()) return []
    return this.pageData.value().data
  })

  
}
