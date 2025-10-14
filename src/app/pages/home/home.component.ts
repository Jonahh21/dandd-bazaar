import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DandDService } from '../../services/dand-d.service';
import { RouterLink } from '@angular/router';
import { GameCurrencyPipe } from "../../common/pipes/GameCurrency.pipe";

@Component({
  selector: 'app-home',
  imports: [RouterLink, GameCurrencyPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent { 

  ddserv = inject(DandDService)

}
