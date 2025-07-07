import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserRole, DocumentType } from '../../models/user.model';

@Component({
  selector: 'app-setup',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="setup-container">
      <div class="setup-background"></div>
      <div class="setup-card">
        <div class="setup-header">
          <div class="logo-section">
            <div class="logo-icon">
              <i class="fas fa-cogs"></i>
            </div>
            <h1>Miflk</h1>
            <p class="subtitle">Sistema de Gestión Empresarial</p>
          </div>
        </div>

        <div class="setup-content">
          <div class="status-section">
            <h2><i class="fas fa-chart-line"></i> Estado del Sistema</h2>
            <div class="status-grid">
              <div class="status-card success">
                <div class="status-icon">
                  <i class="fab fa-angular"></i>
                </div>
                <div class="status-info">
                  <h3>Angular</h3>
                  <span class="status-badge success">Funcionando</span>
                </div>
              </div>
              
              <div class="status-card success">
                <div class="status-icon">
                  <i class="fab fa-google"></i>
                </div>
                <div class="status-info">
                  <h3>Firebase</h3>
                  <span class="status-badge success">Configurado</span>
                </div>
              </div>
              
              <div class="status-card warning">
                <div class="status-icon">
                  <i class="fas fa-database"></i>
                </div>
                <div class="status-info">
                  <h3>Firestore</h3>
                  <span class="status-badge warning">Pendiente</span>
                </div>
              </div>
              
              <div class="status-card warning">
                <div class="status-icon">
                  <i class="fas fa-shield-alt"></i>
                </div>
                <div class="status-info">
                  <h3>Authentication</h3>
                  <span class="status-badge warning">Pendiente</span>
                </div>
              </div>
            </div>
          </div>

          <div class="actions-section">
            <h2><i class="fas fa-rocket"></i> Acciones Disponibles</h2>
            <div class="action-grid">
              <button (click)="createAdminUser()" class="action-btn primary" [disabled]="isCreatingUser">
                <div class="btn-content">
                  <i class="fas fa-user-shield" *ngIf="!isCreatingUser"></i>
                  <i class="fas fa-spinner fa-spin" *ngIf="isCreatingUser"></i>
                  <span *ngIf="!isCreatingUser">Crear Usuario Admin</span>
                  <span *ngIf="isCreatingUser">Creando Usuario...</span>
                </div>
              </button>
              
              <button (click)="goToLogin()" class="action-btn secondary">
                <div class="btn-content">
                  <i class="fas fa-sign-in-alt"></i>
                  <span>Ir al Login</span>
                </div>
              </button>
              
              <button (click)="goToDashboard()" class="action-btn info">
                <div class="btn-content">
                  <i class="fas fa-tachometer-alt"></i>
                  <span>Ir al Dashboard</span>
                </div>
              </button>
              
              <button (click)="goToTest()" class="action-btn dark">
                <div class="btn-content">
                  <i class="fas fa-flask"></i>
                  <span>Página de Prueba</span>
                </div>
              </button>
            </div>
          </div>

          <div class="info-section">
            <h2><i class="fas fa-info-circle"></i> Información de Configuración</h2>
            <div class="info-grid">
              <div class="info-card">
                <div class="info-icon">
                  <i class="fas fa-globe"></i>
                </div>
                <div class="info-content">
                  <h4>URL Actual</h4>
                  <p>{{ currentUrl }}</p>
                </div>
              </div>
              
              <div class="info-card">
                <div class="info-icon">
                  <i class="fas fa-user-cog"></i>
                </div>
                <div class="info-content">
                  <h4>Usuario Administrador</h4>
                  <p>admin&#64;miflk.com</p>
                </div>
              </div>
              
              <div class="info-card">
                <div class="info-icon">
                  <i class="fas fa-key"></i>
                </div>
                <div class="info-content">
                  <h4>Contraseña</h4>
                  <p>Admin123!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .setup-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      position: relative;
      overflow: hidden;
    }

    .setup-background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: 
        radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.2) 0%, transparent 50%);
      z-index: 0;
    }

    .setup-card {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      padding: 0;
      border-radius: 20px;
      box-shadow: 
        0 20px 40px rgba(0,0,0,0.1),
        0 0 0 1px rgba(255,255,255,0.2);
      max-width: 900px;
      width: 100%;
      position: relative;
      z-index: 1;
      overflow: hidden;
    }

    .setup-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 40px;
      text-align: center;
      position: relative;
    }

    .logo-section {
      position: relative;
    }

    .logo-icon {
      width: 80px;
      height: 80px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 20px;
      backdrop-filter: blur(10px);
      border: 2px solid rgba(255, 255, 255, 0.3);
    }

    .logo-icon i {
      font-size: 32px;
      color: white;
    }

    .setup-header h1 {
      font-size: 2.5rem;
      font-weight: 700;
      margin: 0 0 10px 0;
      text-shadow: 0 2px 10px rgba(0,0,0,0.2);
    }

    .subtitle {
      font-size: 1.1rem;
      opacity: 0.9;
      margin: 0;
      font-weight: 300;
    }

    .setup-content {
      padding: 40px;
    }

    .status-section, .actions-section, .info-section {
      margin-bottom: 40px;
    }

    .status-section h2, .actions-section h2, .info-section h2 {
      color: #333;
      font-size: 1.4rem;
      font-weight: 600;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .status-section h2 i {
      color: #667eea;
    }

    .actions-section h2 i {
      color: #28a745;
    }

    .info-section h2 i {
      color: #17a2b8;
    }

    .status-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
    }

    .status-card {
      background: white;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.08);
      display: flex;
      align-items: center;
      gap: 15px;
      border-left: 4px solid;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .status-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.12);
    }

    .status-card.success {
      border-left-color: #28a745;
    }

    .status-card.warning {
      border-left-color: #ffc107;
    }

    .status-icon {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
    }

    .status-card.success .status-icon {
      background: rgba(40, 167, 69, 0.1);
      color: #28a745;
    }

    .status-card.warning .status-icon {
      background: rgba(255, 193, 7, 0.1);
      color: #ffc107;
    }

    .status-info h3 {
      margin: 0 0 5px 0;
      font-size: 1rem;
      font-weight: 600;
      color: #333;
    }

    .status-badge {
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .status-badge.success {
      background: rgba(40, 167, 69, 0.1);
      color: #28a745;
    }

    .status-badge.warning {
      background: rgba(255, 193, 7, 0.1);
      color: #ffc107;
    }

    .action-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
    }

    .action-btn {
      background: white;
      border: 2px solid;
      border-radius: 12px;
      padding: 20px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .action-btn:before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
      transition: left 0.5s;
    }

    .action-btn:hover:before {
      left: 100%;
    }

    .action-btn.primary {
      border-color: #007bff;
      color: #007bff;
    }

    .action-btn.primary:hover {
      background: #007bff;
      color: white;
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(0, 123, 255, 0.3);
    }

    .action-btn.secondary {
      border-color: #6c757d;
      color: #6c757d;
    }

    .action-btn.secondary:hover {
      background: #6c757d;
      color: white;
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(108, 117, 125, 0.3);
    }

    .action-btn.info {
      border-color: #17a2b8;
      color: #17a2b8;
    }

    .action-btn.info:hover {
      background: #17a2b8;
      color: white;
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(23, 162, 184, 0.3);
    }

    .action-btn.dark {
      border-color: #343a40;
      color: #343a40;
    }

    .action-btn.dark:hover {
      background: #343a40;
      color: white;
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(52, 58, 64, 0.3);
    }

    .action-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none !important;
      box-shadow: none !important;
    }

    .btn-content {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }

    .btn-content i {
      font-size: 1.2rem;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 15px;
    }

    .info-card {
      background: white;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.08);
      display: flex;
      align-items: flex-start;
      gap: 15px;
      transition: transform 0.3s ease;
    }

    .info-card:hover {
      transform: translateY(-2px);
    }

    .info-icon {
      width: 50px;
      height: 50px;
      background: rgba(23, 162, 184, 0.1);
      color: #17a2b8;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      flex-shrink: 0;
    }

    .info-content h4 {
      margin: 0 0 8px 0;
      font-size: 1rem;
      font-weight: 600;
      color: #333;
    }

    .info-content p {
      margin: 0;
      color: #666;
      font-size: 0.9rem;
      word-break: break-all;
    }

    @media (max-width: 768px) {
      .setup-container {
        padding: 10px;
      }

      .setup-card {
        margin: 10px;
      }

      .setup-header {
        padding: 30px 20px;
      }

      .setup-content {
        padding: 30px 20px;
      }

      .setup-header h1 {
        font-size: 2rem;
      }

      .status-grid, .action-grid, .info-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class SetupComponent {
  currentUrl = window.location.href;
  isCreatingUser = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  goToTest() {
    this.router.navigate(['/test']);
  }

  async createAdminUser() {
    this.isCreatingUser = true;
    
    try {
      // Crear el usuario admin en Firebase
      const adminData = {
        email: 'admin@miflk.com',
        password: 'Admin123!',
        role: UserRole.ADMIN,
        personalInfo: {
          firstName: 'Administrador',
          lastName: 'Sistema',
          nationality: 'Dominicana',
          documentType: DocumentType.CEDULA,
          documentNumber: '000-0000000-0',
          countryOfResidence: 'República Dominicana'
        }
      };

      await this.authService.register(adminData);
      
      alert('✅ Usuario administrador creado exitosamente!\n\nEmail: admin@miflk.com\nContraseña: Admin123!\n\nAhora puedes hacer login.');
      
    } catch (error: any) {
      console.error('Error creando usuario admin:', error);
      
      if (error.code === 'auth/email-already-in-use') {
        alert('ℹ️ El usuario admin ya existe.\n\nPuedes hacer login con:\nEmail: admin@miflk.com\nContraseña: Admin123!');
      } else {
        alert('❌ Error creando usuario admin:\n' + (error.message || 'Error desconocido'));
      }
    } finally {
      this.isCreatingUser = false;
    }
  }
}
