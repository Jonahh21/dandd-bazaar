import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ItemSimple } from '../../interfaces/item.interface';

@Component({
  selector: 'app-simple-item-list',
  imports: [],
  templateUrl: './simple-item-list.html',
  styleUrl: './simple-item-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleItemList {

  items = input.required<ItemSimple[]>();

}
