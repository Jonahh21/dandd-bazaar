import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { GameRequest } from '../../../interfaces/game.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-game-list',
  imports: [RouterLink],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameListComponent {

  games = input.required<GameRequest[]>()

}
