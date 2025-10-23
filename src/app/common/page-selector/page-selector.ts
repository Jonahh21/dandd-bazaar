import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';
import { Pagination } from '../../interfaces/pagination.interface';

@Component({
  selector: 'app-page-selector',
  imports: [],
  templateUrl: './page-selector.html',
  styleUrl: './page-selector.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageSelector {

  pageInfo = input.required<Pagination<any>>()

  currentpage = model.required<number>()

  pagearray = computed(() => {
    let array = new Array<number>()
    for(let i = 1; i <= this.pageInfo().allPages; i++){
      array.push(i)
    }
    return array
  })

  canPrev = computed(() => {
    return this.pageInfo().prevUrl != null
  })

  canNext = computed(() => {
    return this.pageInfo().nextUrl != null
  })

  setPage(num: number) {
    this.currentpage.set(num)
  }

}
