import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-test-login',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="test-login-container">
      <div class="test-login-content">
        <div class="brand-section">
          <div class="logo">
            <i class="fas fa-building"></i>
          </div>
          <h1>
            <i class="fas fa-chart-line"></i>
            Miflk - Sistema de Gestión
          </h1>
          <p class="subtitle">Plataforma empresarial avanzada</p>
        </div>
        
        <div class="status-section">
          <div class="status-card">
            <div class="status-icon">
              <i class="fas fa-check-circle"></i>
            </div>
            <h2>Sistema Operativo</h2>
            <p>Página de Login - Funcionando correctamente</p>
          </div>
        </div>

        <div class="features-section">
          <div class="feature-grid">
            <div class="feature-item">
              <i class="fas fa-users"></i>
              <span>Gestión de Usuarios</span>
            </div>
            <div class="feature-item">
              <i class="fas fa-user-shield"></i>
              <span>Control de Roles</span>
            </div>
            <div class="feature-item">
              <i class="fas fa-chart-bar"></i>
              <span>Dashboard Avanzado</span>
            </div>
            <div class="feature-item">
              <i class="fas fa-cog"></i>
              <span>Configuración</span>
            </div>
          </div>
        </div>

        <div class="actions-section">
          <button class="primary-btn" routerLink="/login">
            <i class="fas fa-sign-in-alt"></i>
            Iniciar Sesión
          </button>
          <button class="secondary-btn" routerLink="/dashboard">
            <i class="fas fa-tachometer-alt"></i>
            Ver Dashboard
          </button>
        </div>

        <div class="footer-section">
          <p>
            <i class="fas fa-info-circle"></i>
            Entorno de desarrollo - Versión 1.0
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .test-login-container {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 20px;
      position: relative;
      overflow: hidden;
    }

    .test-login-container::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="2" fill="rgba(255,255,255,0.1)"/></svg>') repeat;
      opacity: 0.1;
    }

    .test-login-content {
      background: rgba(255, 255, 255, 0.98);
      border-radius: 20px;
      padding: 40px;
      max-width: 600px;
      width: 100%;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      position: relative;
      z-index: 1;
      text-align: center;
      animation: fadeInUp 0.8s ease-out;
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .brand-section {
      margin-bottom: 30px;
    }

    .logo {
      margin-bottom: 20px;
    }

    .logo i {
      font-size: 48px;
      color: #667eea;
      background: linear-gradient(45deg, #667eea, #764ba2);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }

    h1 {
      font-size: 32px;
      font-weight: 700;
      color: #333;
      margin: 0 0 10px 0;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
    }

    h1 i {
      color: #667eea;
      font-size: 28px;
    }

    .subtitle {
      font-size: 16px;
      color: #666;
      margin: 0;
      font-weight: 400;
    }

    .status-section {
      margin-bottom: 30px;
    }

    .status-card {
      background: rgba(76, 175, 80, 0.1);
      border: 1px solid rgba(76, 175, 80, 0.2);
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 20px;
    }

    .status-icon i {
      font-size: 32px;
      color: #4caf50;
      margin-bottom: 10px;
    }

    .status-card h2 {
      font-size: 20px;
      font-weight: 600;
      color: #333;
      margin: 0 0 8px 0;
    }

    .status-card p {
      font-size: 14px;
      color: #666;
      margin: 0;
    }

    .features-section {
      margin-bottom: 30px;
    }

    .feature-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 15px;
    }

    .feature-item {
      background: rgba(103, 126, 234, 0.05);
      border: 1px solid rgba(103, 126, 234, 0.1);
      border-radius: 12px;
      padding: 20px;
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .feature-item:hover {
      background: rgba(103, 126, 234, 0.1);
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(103, 126, 234, 0.2);
    }

    .feature-item i {
      font-size: 24px;
      color: #667eea;
      margin-bottom: 8px;
      display: block;
    }

    .feature-item span {
      font-size: 12px;
      color: #555;
      font-weight: 500;
    }

    .actions-section {
      display: flex;
      flex-direction: column;
      gap: 15px;
      margin-bottom: 30px;
    }

    @media (min-width: 480px) {
      .actions-section {
        flex-direction: row;
        justify-content: center;
      }
    }

    .primary-btn {
      background: linear-gradient(45deg, #667eea, #764ba2);
      color: white;
      border: none;
      border-radius: 25px;
      padding: 15px 30px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(103, 126, 234, 0.4);
      min-width: 200px;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .primary-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(103, 126, 234, 0.6);
    }

    .secondary-btn {
      background: transparent;
      color: #667eea;
      border: 2px solid #667eea;
      border-radius: 25px;
      padding: 15px 30px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      min-width: 200px;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .secondary-btn:hover {
      background: #667eea;
      color: white;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(103, 126, 234, 0.4);
    }

    .footer-section {
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      padding-top: 20px;
    }

    .footer-section p {
      font-size: 14px;
      color: #666;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .footer-section i {
      color: #667eea;
    }

    // Responsive design
    @media (max-width: 480px) {
      .test-login-container {
        padding: 10px;
      }

      .test-login-content {
        padding: 20px;
      }

      h1 {
        font-size: 24px;
        flex-direction: column;
        gap: 8px;
      }

      .feature-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .feature-item {
        padding: 15px;
      }

      .primary-btn,
      .secondary-btn {
        min-width: 100%;
      }
    }
  `]
})
export class TestLoginComponent {
}
