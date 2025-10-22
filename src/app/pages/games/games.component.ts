import { AnimationCallbackEvent, ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DandDService } from '../../services/dand-d.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { GameFormComponent } from './game-form.component/game-form.component';
import { GamePost } from '../../interfaces/game.interface';
import { GameListComponent } from "./game-list.component/game-list.component";
import { animate } from "animejs";

@Component({
  selector: 'app-games',
  imports: [GameFormComponent, GameListComponent],
  templateUrl: './games.component.html',
  styleUrl: './games.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamesComponent {

  showForm = signal(false)

  toggleForm() {
    this.showForm.update(v => !v)
  }

  ddServ = inject(DandDService)

  games = rxResource({
    stream: () => this.ddServ.getGames()
  })

  gamecreated(post: GamePost) {
    this.ddServ.createGame(post).subscribe((value) => {
      console.log("Juego creado: ", value)
      this.games.reload()
    })
  }

  formappear(event: AnimationCallbackEvent) {

    animate(event.target, {
      opacity: {
        from: 0
      },
      x: {
        from: '-100%'
      },
      duration: 500,
      onComplete: () => {
        event.animationComplete()
      }
    })
  }

  formdisappear(event: AnimationCallbackEvent) {
    console.log("fuera")

    animate(event.target, {
      opacity: 0,
      x: '100%',
      duration: 500,
      onComplete: () => {
        event.animationComplete()
      }
    })
  }
  
}
