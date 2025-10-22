import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DandDService } from '../../services/dand-d.service';
import { GameInfoComponent } from '../../common/GameInfo/GameInfo.component';

@Component({
  selector: 'app-game',
  imports: [GameInfoComponent],
  templateUrl: './game.html',
  styleUrl: './game.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent {

  activatedRoute = inject(ActivatedRoute)

  ddServ = inject(DandDService)

  ngOnInit(){
    this.activatedRoute.params.subscribe((params) => {
      let gid: number = params['gameId']

      this.ddServ.gameId.set(gid)
    })
  }

}
