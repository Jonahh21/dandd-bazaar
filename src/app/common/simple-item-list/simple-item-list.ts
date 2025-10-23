import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ItemSimple } from '../../interfaces/item.interface';
import { DandDService } from '../../services/dand-d.service';
import { GameCurrencyPipe } from "../pipes/GameCurrency.pipe";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-simple-item-list',
  imports: [GameCurrencyPipe, RouterLink],
  templateUrl: './simple-item-list.html',
  styleUrl: './simple-item-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleItemList {

  ddServ = inject(DandDService)

  gid = input.required<number>()

  items = input.required<ItemSimple[]>();

}
