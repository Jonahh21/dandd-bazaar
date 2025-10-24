import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { PurchaseHistory } from '../../../interfaces/item.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-purchase-history',
  imports: [DatePipe],
  templateUrl: './purchase-history.html',
  styleUrl: './purchase-history.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PurchaseHistoryComponent {

  history = input.required<PurchaseHistory[]>()

  sortedhistory = computed(() => {
    return this.history().sort((a, b) => {
      return b.id - a.id
    })
  })

}
