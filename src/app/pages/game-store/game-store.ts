import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-game-store',
  imports: [],
  templateUrl: './game-store.html',
  styleUrl: './game-store.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameStore { }
