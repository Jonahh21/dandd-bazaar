import { computed, inject, Pipe, type PipeTransform } from '@angular/core';
import { DandDService } from '../../services/dand-d.service';
import { DecimalPipe } from '@angular/common';

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

  dp = new DecimalPipe("en-UK")

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

    let valueDecimal = this.dp.transform(value.toFixed(2))

    if (valueDecimal == null) return ''
    console.log( valueDecimal )
    switch (dt) {
      case DisplayType.SINGLE:
        return `${valueDecimal} ${this.gameinfo()?.currencynamesingle}`
      case DisplayType.MULTIPLE:
        return `${valueDecimal} ${this.gameinfo()?.currencynamemultiple}`
      case DisplayType.SYMBOL:
        return `${valueDecimal}${this.gameinfo()?.currencysymbol}`

    }
  }

}
