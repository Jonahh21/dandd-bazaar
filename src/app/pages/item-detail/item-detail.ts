import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { DandDService } from '../../services/dand-d.service';
import { ActivatedRoute } from '@angular/router';
import { Location as Angloc } from '@angular/common';
import { GameCurrencyPipe } from '../../common/pipes/GameCurrency.pipe';
import { PurchaseHistoryComponent } from "./purchase-history/purchase-history";
import { LoreHistory } from "./lore-history/lore-history";
import { LoreForm } from './lore-form/lore-form';
import { LorePost } from '../../interfaces/lore.interface';

@Component({
  selector: 'app-item-detail',
  imports: [GameCurrencyPipe, PurchaseHistoryComponent, LoreHistory, LoreForm],
  templateUrl: './item-detail.html',
  styleUrl: './item-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemDetail {

  ddServ = inject(DandDService)

  gid = this.ddServ.gameId

  item = this.ddServ.itemDetail

  route = inject(ActivatedRoute)

  location = inject(Angloc)

  showLoreForm = signal(false)

  toggleLoreForm() {
    this.showLoreForm.update(v => !v)
  }

  createlore(post: LorePost){
    if (!this.item.hasValue()) return
    const itemId = this.item.value().id

    this.ddServ.createLore(itemId, post).subscribe((val) => {
      console.log("Lore creado: ", val)
      this.showLoreForm.set(false)
      this.item.reload()
    })
  }

  sameGame = computed(() => {
    return this.ddServ.gameInfo.hasValue() != null && this.item.hasValue() && this.item.value().fromGame == this.ddServ.gameInfo.value()?.name
  })

  canBuy = computed(() => {
    if(!this.ddServ.gameInfo.hasValue()) return false
    if(!this.item.hasValue()) return false

    const money = this.ddServ.gameInfo.value().partycurrency
    const price = this.item.value().price

    return money >= price
  })

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.ddServ.itemId.set(params['itemId'] as number)
    })
  }

  buy() {
    if(this.gid() == null || this.ddServ.itemId == null) return
    this.ddServ.buyGameItem(this.gid()!, this.ddServ.itemId()! ).subscribe((value) => {
      console.log(value)
      this.ddServ.itemDetail.reload()
      this.ddServ.gameInfo.reload()
    })
  }

  goback() {
    this.location.back()
  }

}
