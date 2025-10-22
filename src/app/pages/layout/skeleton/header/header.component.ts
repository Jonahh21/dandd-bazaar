import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../services/Auth.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent { 

  authService = inject(AuthService);

  appName = signal(environment.appname)
  
  logout() {
    this.authService.doLogout()
  }
}
