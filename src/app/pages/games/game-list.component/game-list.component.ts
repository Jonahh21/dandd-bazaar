import { ChangeDetectionStrategy, Component, computed, effect, input, model, output } from '@angular/core';
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

  origin = model.required<number | null>()
  destinationSelected = output<number>()

  isDeleting = computed(() => {
    return this.origin() != null
  })

  candidates = computed(() => {
    if (this.origin() == null) return []

    return this.games().filter((g) => {
      return g.id != this.origin()
    })
  })

  setOrigin(id: number) {
    this.origin.set(id)
  }

  setDestination(id: number) {
    this.destinationSelected.emit(id)
  }

}
