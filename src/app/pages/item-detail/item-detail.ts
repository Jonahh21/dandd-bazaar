import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DandDService } from '../../services/dand-d.service';
import { ActivatedRoute } from '@angular/router';
import { Location as Angloc } from '@angular/common';
import { GameCurrencyPipe } from '../../common/pipes/GameCurrency.pipe';
import { PurchaseHistoryComponent } from "./purchase-history/purchase-history";

@Component({
  selector: 'app-item-detail',
  imports: [GameCurrencyPipe, PurchaseHistoryComponent],
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
