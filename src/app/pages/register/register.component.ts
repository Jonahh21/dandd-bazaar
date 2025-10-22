import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService, RegisterPost } from '../../services/Auth.service';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {

  route = inject(Router);

  authServ = inject(AuthService);

  username = new FormControl('');
  password = new FormControl('');
  email = new FormControl('');

  register() {
    const post: RegisterPost = {
      username: this.username.value || '',
      password: this.password.value || '',
      email: this.email.value || ''
    }

    this.authServ.doRegister(post).subscribe(
      (token) => {
        if(token) {
          console.log("Registration successful", token);
          this.route.navigateByUrl('/');
        }
      }
    );
    
  }



}
