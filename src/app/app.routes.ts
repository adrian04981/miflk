import { Routes } from '@angular/router';
import { AuthGuard, AdminGuard, GuestGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { SimpleLoginComponent } from './components/simple-login/simple-login.component';
import { SimpleDashboardComponent } from './components/simple-dashboard/simple-dashboard.component';
import { TestLoginComponent } from './components/test-login/test-login.component';
import { SetupComponent } from './components/setup/setup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { RoleManagementComponent } from './components/role-management/role-management.component';
import { SettingsComponent } from './components/settings/settings.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { UserRole } from './models/user.model';

export const routes: Routes = [
  { path: '', redirectTo: '/setup', pathMatch: 'full' },
  { path: 'setup', component: SetupComponent },
  { path: 'test', component: TestLoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login-simple', component: SimpleLoginComponent },
  { path: 'dashboard', component: DashboardComponent,
    children: [
      { path: '', component: DashboardHomeComponent },
      { 
        path: 'users', 
        component: UserManagementComponent
      },
      { 
        path: 'roles', 
        component: RoleManagementComponent
      },
      { 
        path: 'settings', 
        component: SettingsComponent
      }
    ]
  },
  { path: 'dashboard-simple', component: SimpleDashboardComponent },
  { 
    path: 'unauthorized', 
    component: UnauthorizedComponent 
  },
  { path: '**', redirectTo: '/setup' }
];
