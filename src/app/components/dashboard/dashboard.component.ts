import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { User, UserRole } from '../../models/user.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatBadgeModule,
    MatSnackBarModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;
  UserRole = UserRole;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  adminMenuItems = [
    { icon: 'home', label: 'Dashboard', route: '/dashboard' },
    { icon: 'users', label: 'Usuarios', route: '/dashboard/users' },
    { icon: 'shield-alt', label: 'Roles', route: '/dashboard/roles' },
    { icon: 'cog', label: 'Configuración', route: '/dashboard/settings' }
  ];

  employeeMenuItems = [
    { icon: 'home', label: 'Dashboard', route: '/dashboard' }
  ];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user: User | null) => {
      this.currentUser = user;
    });
  }

  get menuItems() {
    return this.currentUser?.role === UserRole.ADMIN ? this.adminMenuItems : this.employeeMenuItems;
  }

  async logout(): Promise<void> {
    try {
      await this.authService.logout();
      this.snackBar.open('Sesión cerrada exitosamente', 'Cerrar', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });
      this.router.navigate(['/login']);
    } catch (error) {
      this.snackBar.open('Error al cerrar sesión', 'Cerrar', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
  }

  getUserInitials(): string {
    if (!this.currentUser) return '';
    const names = this.currentUser.displayName?.split(' ') || ['U'];
    return names.length > 1 
      ? `${names[0][0]}${names[1][0]}`.toUpperCase()
      : names[0][0].toUpperCase();
  }

  getRoleLabel(): string {
    return this.currentUser?.role === UserRole.ADMIN ? 'Administrador' : 'Empleado';
  }
}
