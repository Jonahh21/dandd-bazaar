import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DandDService } from '../../services/dand-d.service';
import { ActivatedRoute } from '@angular/router';
import { GameInfoComponent } from "../../common/GameInfo/GameInfo.component";
import { GameCurrencyPipe } from '../../common/pipes/GameCurrency.pipe';

@Component({
  selector: 'app-item-list',
  imports: [GameInfoComponent, GameCurrencyPipe],
  templateUrl: './ItemList.component.html',
  styleUrl: './ItemList.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemListComponent {

  router = inject(ActivatedRoute)

  ddserv = inject(DandDService)

  ngOnInit() {
    this.router.params.subscribe((params) => {
      console.log(params)
      const gameId = Number(params['gameId'])
    })
  }

 }
