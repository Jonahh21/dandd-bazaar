import { computed, inject, Pipe, type PipeTransform } from '@angular/core';
import { DandDService } from '../../services/dand-d.service';

enum DisplayType {
  SINGLE,
  MULTIPLE,
  SYMBOL
}

@Pipe({
  name: 'gamecurrency',
})
export class GameCurrencyPipe implements PipeTransform {

  ddserv = inject(DandDService)

  gameinfo = computed(() => {
    return this.ddserv.gameInfo.value()
  })

  transform(value: number, ...args: string[]): string {
    let dt: DisplayType = DisplayType.SINGLE;

    if (value > 1) {
      dt = DisplayType.MULTIPLE
    }

    if (args.length > 0 && args[0] == "symbol") {
      dt = DisplayType.SYMBOL
    }

    switch (dt) {
      case DisplayType.SINGLE:
        return `${value.toFixed(2)} ${this.gameinfo()?.currencynamesingle}`
        break;
      case DisplayType.MULTIPLE:
        return `${value.toFixed(2)} ${this.gameinfo()?.currencynamemultiple}`
        break;
      case DisplayType.SYMBOL:
        return `${value.toFixed(2)} ${this.gameinfo()?.currencysymbol}`
        break;

    }
  }

}
