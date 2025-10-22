import { ChangeDetectionStrategy, Component, computed, effect, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GamePost } from '../../../interfaces/game.interface';

@Component({
  selector: 'app-game-form',
  imports: [ReactiveFormsModule],
  templateUrl: './game-form.component.html',
  styleUrl: './game-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameFormComponent {

  gamecreated = output<GamePost>()

  formGroup = new FormGroup({
    name: new FormControl(''),
    currencysymbol: new FormControl(''),
    currencynamesingle: new FormControl(''),
    currencynamemultiple: new FormControl(''),
    swordpriceincurrency: new FormControl(20),
    image: new FormControl<string | null>(null),
    partycurrency: new FormControl(0.1)
  })

  currencysignal = signal(20)
  symbolsignal = signal('')

  ratio = computed(() => {
    const swprice = 20

    return (this.currencysignal() == 0 ? 0.0001 : this.currencysignal()) / swprice
  })

  comparisonstring = computed(() => {

    const formattedRatio = this.ratio().toFixed(2)
    return `1€ = ${formattedRatio}${this.symbolsignal()}`
  })


  ratioChanged = effect(() => {
    console.log(this.comparisonstring())
  })

  imageurl = signal('')
  hasImage = computed(() => {
    return this.imageurl() != null && this.imageurl() != ''
  })

  ngOnInit() {
    console.log("FormGroup initialized", this.formGroup);
    this.formGroup.get('image')?.valueChanges.subscribe((value) => {

      this.imageurl.set(value as string)
    })

    this.formGroup.get('swordpriceincurrency')?.valueChanges.subscribe((value) => {
      if(value == 0) return
      if(value == null) return

      this.currencysignal.set(value)
    })

    this.formGroup.get('currencysymbol')?.valueChanges.subscribe((value) => {
      this.symbolsignal.set(value ?? '')
    })
  }

  submit() {
    let post: GamePost = this.formGroup.value as GamePost

    if (post.name == '' || post.partycurrency == 0.1) {
      return
    }

    this.gamecreated.emit(post)
    console.log(post)
  }

}
