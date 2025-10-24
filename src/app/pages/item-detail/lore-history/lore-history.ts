import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { LoreRequest } from '../../../interfaces/lore.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-lore-history',
  imports: [DatePipe],
  templateUrl: './lore-history.html',
  styleUrl: './lore-history.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoreHistory {

  lore = input.required<LoreRequest[]>()

  loresorted = computed(() => {
    return this.lore().sort((a, b) => {
      return b.id - a.id
    })
  })
}
