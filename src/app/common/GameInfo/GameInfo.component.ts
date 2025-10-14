import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { DandDService } from '../../services/dand-d.service';
import { GameCurrencyPipe } from '../pipes/GameCurrency.pipe';

@Component({
  selector: 'app-game-info',
  imports: [GameCurrencyPipe],
  templateUrl: './GameInfo.component.html',
  styleUrl: './GameInfo.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameInfoComponent {

  ddserv = inject(DandDService)

  gameinfo = computed(() => {
    return this.ddserv.selectedGame()
  })

}
