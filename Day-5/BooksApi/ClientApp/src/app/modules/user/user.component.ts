import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user',
  template: `
    <div class="user-container">
      <h1>User Dashboard</h1>
      <p>Welcome to the user area. This page is accessible to all authenticated users.</p>
      <button (click)="logout()" class="btn btn-danger">Logout</button>
    </div>
  `,
  styles: [`
    .user-container {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }

    .btn-danger {
      background-color: #dc3545;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
    }

    .btn-danger:hover {
      background-color: #c82333;
    }
  `]
})
export class UserComponent {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
} 