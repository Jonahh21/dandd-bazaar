import { ChangeDetectionStrategy, Component, computed, inject, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { formGroupize } from '../../../common/utilities/utilitiesvol1';
import { ItemPost } from '../../../interfaces/item.interface';
import { DandDService } from '../../../services/dand-d.service';

@Component({
  selector: 'app-item-form',
  imports: [ReactiveFormsModule],
  templateUrl: './item-form.html',
  styleUrl: './item-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemForm {

  itemcreated = output<ItemPost>()
  
  ddServ = inject(DandDService)

  gameInfo = this.ddServ.gameInfo

  formGroup = new FormGroup({
    name: new FormControl(),
    price: new FormControl(10),
    image: new FormControl<string|null>(null),
    description: new FormControl(''),
    stats: new FormControl(''),
    curses: new FormControl(''),
    quantity: new FormControl(1),
    hidden: new FormControl(false)
  })

  imageURL = signal<string | null>('')
  hasImage = computed(() => {
    return this.imageURL() != null && this.imageURL() != ''
  })

  ngOnInit() {
    this.formGroup.get('image')?.valueChanges.subscribe((value) => {
      this.imageURL.set(value)
    })
  }

  submit() {
    let post: ItemPost = this.formGroup.value as ItemPost

    console.log(post)

    if(post.name == '' || post.description == '' || post.stats == ''){
      console.log("no vale")
      return
    }

    if (post.image == '') post.image = null
    if (post.curses == '') post.curses = null

    console.log("Sale de aqui")
    this.itemcreated.emit(post)
  }

}
