import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DandDService } from '../../services/dand-d.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-games',
  imports: [],
  templateUrl: './games.component.html',
  styleUrl: './games.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamesComponent {

  ddServ = inject(DandDService)

  games = rxResource({
    stream: () => this.ddServ.getGames()
  })

}
