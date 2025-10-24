import { ChangeDetectionStrategy, Component, effect, inject, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DandDService } from '../../../services/dand-d.service';
import { LorePost } from '../../../interfaces/lore.interface';

@Component({
  selector: 'app-lore-form',
  imports: [ReactiveFormsModule],
  templateUrl: './lore-form.html',
  styleUrl: './lore-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoreForm {

  lorecreated = output<LorePost>()

  ddServ = inject(DandDService)

  item = this.ddServ.itemDetail

  formGroup = new FormGroup({
    text: new FormControl(''),
    name: new FormControl(''),
    description: new FormControl(''),
    pricechange: new FormControl(0),
    image: new FormControl(''),
    stats: new FormControl(''),
    curses: new FormControl('')
  })

  itemInfoChanged = effect(() => {
    if (!this.item.hasValue()) return
    let i = this.item.value()!

    this.formGroup.patchValue({
      name: i.name,
      curses: i.curses,
      image: i.image,
      stats: i.stats,
      description: i.description
    })
  })

  submit() {
    let post: LorePost = this.formGroup.value as LorePost

    console.log(post)

    if (post.text == '' || post.text == null) return
    if (post.name == '' || post.name == null) return
    if (post.description == '') return
    if (post.stats == '') return
    if (post.curses == '') post.curses = null

    console.log("Válido")

    this.lorecreated.emit(post)
  }


}
