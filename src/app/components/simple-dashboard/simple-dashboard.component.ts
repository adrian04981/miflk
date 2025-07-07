import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-simple-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <!-- Header -->
      <header class="dashboard-header">
        <div class="header-content">
          <div class="logo-section">
            <div class="logo">
              <i class="fas fa-chart-line"></i>
              <span>Miflk</span>
            </div>
            <div class="user-info">
              <i class="fas fa-user-circle"></i>
              <span>Administrador</span>
            </div>
          </div>
          <button (click)="logout()" class="logout-btn">
            <i class="fas fa-sign-out-alt"></i>
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </header>

      <!-- Main Content -->
      <main class="dashboard-main">
        <!-- Welcome Section -->
        <section class="welcome-section">
          <div class="welcome-card">
            <div class="welcome-content">
              <div class="welcome-text">
                <h1><i class="fas fa-hand-wave"></i> ¡Bienvenido, Administrador!</h1>
                <p>Sistema de gestión empresarial funcionando correctamente</p>
              </div>
              <div class="welcome-icon">
                <i class="fas fa-rocket"></i>
              </div>
            </div>
          </div>
        </section>

        <!-- Stats Section -->
        <section class="stats-section">
          <h2><i class="fas fa-chart-bar"></i> Estado del Sistema</h2>
          <div class="stats-grid">
            <div class="stat-card users">
              <div class="stat-icon">
                <i class="fas fa-users"></i>
              </div>
              <div class="stat-content">
                <h3>Usuarios</h3>
                <div class="stat-number">1</div>
                <p class="stat-label">Usuario admin creado</p>
              </div>
            </div>

            <div class="stat-card roles">
              <div class="stat-icon">
                <i class="fas fa-shield-alt"></i>
              </div>
              <div class="stat-content">
                <h3>Roles</h3>
                <div class="stat-number">2</div>
                <p class="stat-label">Admin y Empleado</p>
              </div>
            </div>

            <div class="stat-card firebase">
              <div class="stat-icon">
                <i class="fab fa-google"></i>
              </div>
              <div class="stat-content">
                <h3>Firebase</h3>
                <div class="stat-number">✓</div>
                <p class="stat-label">Configurado</p>
              </div>
            </div>

            <div class="stat-card status">
              <div class="stat-icon">
                <i class="fas fa-check-circle"></i>
              </div>
              <div class="stat-content">
                <h3>Sistema</h3>
                <div class="stat-number">✓</div>
                <p class="stat-label">Funcionando</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Actions Section -->
        <section class="actions-section">
          <h2><i class="fas fa-tasks"></i> Acciones Disponibles</h2>
          <div class="actions-grid">
            <div class="action-card" (click)="goToUsers()">
              <div class="action-icon users">
                <i class="fas fa-users-cog"></i>
              </div>
              <div class="action-content">
                <h3>Gestión de Usuarios</h3>
                <p>Administrar usuarios del sistema</p>
              </div>
              <div class="action-arrow">
                <i class="fas fa-chevron-right"></i>
              </div>
            </div>

            <div class="action-card" (click)="goToRoles()">
              <div class="action-icon roles">
                <i class="fas fa-user-shield"></i>
              </div>
              <div class="action-content">
                <h3>Gestión de Roles</h3>
                <p>Configurar roles y permisos</p>
              </div>
              <div class="action-arrow">
                <i class="fas fa-chevron-right"></i>
              </div>
            </div>

            <div class="action-card" (click)="goToSettings()">
              <div class="action-icon settings">
                <i class="fas fa-cogs"></i>
              </div>
              <div class="action-content">
                <h3>Configuración</h3>
                <p>Ajustes del sistema</p>
              </div>
              <div class="action-arrow">
                <i class="fas fa-chevron-right"></i>
              </div>
            </div>

            <div class="action-card" (click)="goToSetup()">
              <div class="action-icon setup">
                <i class="fas fa-tools"></i>
              </div>
              <div class="action-content">
                <h3>Configuración Inicial</h3>
                <p>Volver al setup del sistema</p>
              </div>
              <div class="action-arrow">
                <i class="fas fa-chevron-right"></i>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  `,
  styles: [`
    .dashboard-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      font-family: Arial, sans-serif;
    }

    .dashboard-header {
      background: white;
      padding: 20px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .dashboard-header h1 {
      color: #333;
      margin: 0;
    }

    .logout-btn {
      padding: 10px 20px;
      background: #dc3545;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    .logout-btn:hover {
      background: #c82333;
    }

    .dashboard-content {
      padding: 40px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .welcome-section {
      background: white;
      padding: 30px;
      border-radius: 10px;
      margin-bottom: 30px;
      text-align: center;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }

    .welcome-section h2 {
      color: #333;
      margin-bottom: 10px;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }

    .stat-card {
      background: white;
      padding: 25px;
      border-radius: 10px;
      text-align: center;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      transition: transform 0.3s;
    }

    .stat-card:hover {
      transform: translateY(-5px);
    }

    .stat-card h3 {
      color: #333;
      margin-bottom: 15px;
    }

    .stat-number {
      font-size: 2.5em;
      font-weight: bold;
      color: #007bff;
      margin: 10px 0;
    }

    .stat-label {
      color: #666;
      font-size: 0.9em;
    }

    .actions-section {
      background: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }

    .actions-section h2 {
      color: #333;
      margin-bottom: 20px;
      text-align: center;
    }

    .action-buttons {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 15px;
    }

    .action-btn {
      padding: 15px 20px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      font-size: 16px;
      cursor: pointer;
      transition: background 0.3s;
    }

    .action-btn:hover {
      background: #0056b3;
    }

    .setup-btn {
      background: #6c757d;
    }

    .setup-btn:hover {
      background: #5a6268;
    }
  `]
})
export class SimpleDashboardComponent {
  constructor(private router: Router) {}

  logout() {
    alert('Cerrando sesión...');
    this.router.navigate(['/login']);
  }

  goToUsers() {
    alert('Funcionalidad de gestión de usuarios - Próximamente');
  }

  goToRoles() {
    alert('Funcionalidad de gestión de roles - Próximamente');
  }

  goToSettings() {
    alert('Funcionalidad de configuración - Próximamente');
  }

  goToSetup() {
    this.router.navigate(['/setup']);
  }
}
