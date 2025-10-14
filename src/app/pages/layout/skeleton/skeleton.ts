import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-skeleton',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './skeleton.html',
  styleUrl: './skeleton.css'
})
export class Skeleton {
  wiwi = signal("wiiw")
}
