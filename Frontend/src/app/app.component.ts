import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, MatToolbarModule, MatButtonModule, CommonModule],
  template: `
    <mat-toolbar class="glass-header">
      <div class="header-container">
        <div class="logo" routerLink="/">
          <span class="logo-mark" aria-hidden="true">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="10" fill="url(#logoGrad)"/>
              <path d="M8 22V10l4-2v14l-4 2zm6-16l4-2v18l-4 2V6zm6 4l4-2v14l-4 2V10z" fill="white" fill-opacity="0.95"/>
              <defs>
                <linearGradient id="logoGrad" x1="4" y1="2" x2="28" y2="30" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#6366f1"/>
                  <stop offset="1" stop-color="#7c3aed"/>
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span class="brand-text">Client Management Platform</span>
        </div>
        <span class="spacer"></span>
        <ng-container *ngIf="authService.isLoggedIn()">
          <span class="welcome-text">Hi, {{ authService.getAgentName() }}</span>
          <button mat-button class="nav-link" routerLink="/dashboard">Dashboard</button>
          <button mat-button class="nav-link nav-highlight" routerLink="/add">+ New Client</button>
          <button mat-button class="nav-link" (click)="authService.logout()">Logout</button>
        </ng-container>
        <ng-container *ngIf="!authService.isLoggedIn()">
          <button mat-button class="nav-link" routerLink="/login">Sign In</button>
          <button mat-raised-button color="primary" class="header-cta" routerLink="/signup">Sign Up</button>
        </ng-container>
      </div>
    </mat-toolbar>
    <div class="container main-shell animate-fade-in">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend-portal';
  constructor(public authService: AuthService) {}
}
