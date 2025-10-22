import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http = inject(HttpClient);

  jwtToken = signal<string | null>(null);
  authHeader = computed(() => {
    return {'Authorization': `Bearer ${this.jwtToken()}`}
  })
  computedHeaders = computed(() => {
    return {
      headers: this.authHeader()
    }
  })

  headersChanged = effect(() => {
    console.log("JWT Token: ", this.jwtToken())
    console.log("Auth Header: ", this.authHeader())
    console.log("Computed Headers: ", this.computedHeaders())
  })

  constructor() {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      this.jwtToken.set(token);
    }
  }

  doLogin(post: LoginPost) {
    return this.http.post(environment.authURL + "login", post, {
      responseType: 'text'
    }).pipe(
      catchError((err) => {
        console.error("Login failed", err.message);
        throw err; // Rethrow the error to be handled by the component
      }),
      tap((token) => {
        if (token) {
          this.jwtToken.set(token);
          localStorage.setItem('jwtToken', token);
        }
      })
    )
  }

  doRegister(post: RegisterPost) {
    return this.http.post(environment.authURL + "register", post, {
      responseType: 'text'
    }).pipe(
      catchError((err) => {
        console.error("Registration failed", err.message);
        throw err;
      }),
      tap((token) => {
        if (token) {
          this.jwtToken.set(token);
          localStorage.setItem('jwtToken', token);
        }
      })
    )
  }

  doLogout() {
    this.jwtToken.set(null);
    localStorage.removeItem('jwtToken');
  }

}

export interface LoginPost {
  username: string;
  password: string;
}

export interface RegisterPost {
  username: string;
  password: string;
  email: string;
}
