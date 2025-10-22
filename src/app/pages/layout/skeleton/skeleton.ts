import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";

@Component({
  selector: 'app-skeleton',
  imports: [RouterOutlet, RouterLink, HeaderComponent],
  templateUrl: './skeleton.html',
  styleUrl: './skeleton.css'
})
export class Skeleton {
  wiwi = signal("wiiw")
}
