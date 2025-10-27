import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { DandDService } from '../../services/dand-d.service';
import { GameCurrencyPipe } from '../pipes/GameCurrency.pipe';
import { GameRequest } from '../../interfaces/game.interface';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-game-info',
  imports: [GameCurrencyPipe, RouterLink, RouterLinkActive],
  templateUrl: './GameInfo.component.html',
  styleUrl: './GameInfo.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameInfoComponent {

  ddserv = inject(DandDService)

  gameinfo = this.ddserv.gameInfo

}
