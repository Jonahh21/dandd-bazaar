import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService, LoginPost } from '../../services/Auth.service';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {

  username = new FormControl('');
  password = new FormControl('');

  authServ = inject(AuthService);

  route = inject(Router)

  login() {
    const login: LoginPost = {
      username: this.username.value || '',
      password: this.password.value || ''
    }

    this.authServ.doLogin(login).subscribe(
      (token) => {
        if(token) {
          console.log("Login successful", token);
          this.route.navigateByUrl('/');
        }
      }
    );


  }


}
