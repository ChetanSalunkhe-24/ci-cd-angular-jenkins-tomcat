import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

interface AuthCredentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}

  login(credentials: AuthCredentials): void {
    // Implement your login logic here
    console.log('Login attempt:', credentials);
    // After successful login, navigate to home
    // this.router.navigate(['/']);
  }

  signup(credentials: AuthCredentials): void {
    // Implement your signup logic here
    console.log('Signup attempt:', credentials);
    // After successful signup, navigate to login
    // this.router.navigate(['/auth/login']);
  }

  logout(): void {
    // Implement your logout logic here
    // this.router.navigate(['/auth/login']);
  }
}