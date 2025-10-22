import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-game-inventory',
  imports: [],
  templateUrl: './game-inventory.html',
  styleUrl: './game-inventory.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameInventory { }
