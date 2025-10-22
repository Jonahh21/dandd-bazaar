import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { GameRequest } from '../../../interfaces/game.interface';

@Component({
  selector: 'app-game-list.component',
  imports: [],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameListComponent {

  games = input.required<GameRequest[]>()

}
