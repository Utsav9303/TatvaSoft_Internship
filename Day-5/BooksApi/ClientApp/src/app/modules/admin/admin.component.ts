import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin',
  template: `
    <div class="admin-container">
      <h1>Admin Dashboard</h1>
      <p>Welcome to the admin area. This page is only accessible to users with the Admin role.</p>
      <button (click)="logout()" class="btn btn-danger">Logout</button>
    </div>
  `,
  styles: [`
    .admin-container {
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
export class AdminComponent {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
} 