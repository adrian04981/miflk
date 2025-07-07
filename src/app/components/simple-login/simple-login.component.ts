import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-simple-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <div class="login-background"></div>
      <div class="login-card">
        <div class="login-header">
          <div class="logo-section">
            <div class="logo-icon">
              <i class="fas fa-shield-alt"></i>
            </div>
            <h1>Miflk</h1>
            <p class="subtitle">Acceso al Sistema</p>
          </div>
        </div>
        
        <div class="login-content">
          <form (ngSubmit)="onLogin()" class="login-form">
            <div class="form-group">
              <label for="email">
                <i class="fas fa-envelope"></i>
                Correo Electrónico
              </label>
              <div class="input-wrapper">
                <input 
                  type="email" 
                  id="email" 
                  [(ngModel)]="email" 
                  name="email"
                  placeholder="admin&#64;miflk.com"
                  required>
                <i class="fas fa-user input-icon"></i>
              </div>
            </div>

            <div class="form-group">
              <label for="password">
                <i class="fas fa-lock"></i>
                Contraseña
              </label>
              <div class="input-wrapper">
                <input 
                  type="password" 
                  id="password" 
                  [(ngModel)]="password" 
                  name="password"
                  placeholder="Admin123!"
                  required>
                <i class="fas fa-key input-icon"></i>
              </div>
            </div>

            <button type="submit" class="login-btn" [disabled]="!email || !password">
              <i class="fas fa-sign-in-alt"></i>
              <span>Iniciar Sesión</span>
            </button>
          </form>

          <div class="login-info">
            <div class="info-header">
              <i class="fas fa-info-circle"></i>
              <span>Credenciales de Prueba</span>
            </div>
            <div class="credentials">
              <div class="credential-item">
                <i class="fas fa-envelope"></i>
                <span>admin&#64;miflk.com</span>
              </div>
              <div class="credential-item">
                <i class="fas fa-key"></i>
                <span>Admin123!</span>
              </div>
            </div>
          </div>

          <div class="login-actions">
            <button (click)="goToSetup()" class="setup-btn">
              <i class="fas fa-cog"></i>
              <span>Volver a Configuración</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      position: relative;
      overflow: hidden;
    }

    .login-background {
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

    .login-card {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      box-shadow: 
        0 20px 40px rgba(0,0,0,0.1),
        0 0 0 1px rgba(255,255,255,0.2);
      max-width: 450px;
      width: 100%;
      position: relative;
      z-index: 1;
      overflow: hidden;
    }

    .login-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 40px 30px;
      text-align: center;
    }

    .logo-section {
      position: relative;
    }

    .logo-icon {
      width: 70px;
      height: 70px;
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
      font-size: 28px;
      color: white;
    }

    .login-header h1 {
      font-size: 2.2rem;
      font-weight: 700;
      margin: 0 0 8px 0;
      text-shadow: 0 2px 10px rgba(0,0,0,0.2);
    }

    .subtitle {
      font-size: 1rem;
      opacity: 0.9;
      margin: 0;
      font-weight: 300;
    }

    .login-content {
      padding: 40px 30px;
    }

    .login-form {
      margin-bottom: 30px;
    }

    .form-group {
      margin-bottom: 25px;
    }

    label {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
      color: #333;
      font-weight: 600;
      font-size: 0.9rem;
    }

    label i {
      color: #667eea;
      width: 16px;
    }

    .input-wrapper {
      position: relative;
    }

    input {
      width: 100%;
      padding: 15px 20px 15px 50px;
      border: 2px solid #e1e5e9;
      border-radius: 12px;
      font-size: 1rem;
      box-sizing: border-box;
      transition: all 0.3s ease;
      background: white;
    }

    input:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
      transform: translateY(-2px);
    }

    .input-icon {
      position: absolute;
      left: 18px;
      top: 50%;
      transform: translateY(-50%);
      color: #999;
      transition: color 0.3s ease;
    }

    input:focus + .input-icon {
      color: #667eea;
    }

    .login-btn {
      width: 100%;
      padding: 16px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 12px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      position: relative;
      overflow: hidden;
    }

    .login-btn:before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      transition: left 0.5s;
    }

    .login-btn:hover:before {
      left: 100%;
    }

    .login-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
    }

    .login-btn:disabled {
      background: #ccc;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }

    .login-info {
      background: rgba(102, 126, 234, 0.05);
      padding: 20px;
      border-radius: 12px;
      margin-bottom: 20px;
      border: 1px solid rgba(102, 126, 234, 0.1);
    }

    .info-header {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 600;
      color: #333;
      margin-bottom: 15px;
      font-size: 0.9rem;
    }

    .info-header i {
      color: #667eea;
    }

    .credentials {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .credential-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px;
      background: white;
      border-radius: 8px;
      font-family: 'Courier New', monospace;
      font-size: 0.9rem;
    }

    .credential-item i {
      color: #667eea;
      width: 16px;
    }

    .setup-btn {
      width: 100%;
      padding: 12px;
      background: transparent;
      color: #666;
      border: 2px solid #e1e5e9;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-weight: 500;
    }

    .setup-btn:hover {
      background: #f8f9fa;
      border-color: #667eea;
      color: #667eea;
      transform: translateY(-1px);
    }

    @media (max-width: 768px) {
      .login-container {
        padding: 15px;
      }

      .login-content {
        padding: 30px 20px;
      }

      .login-header {
        padding: 30px 20px;
      }

      .login-header h1 {
        font-size: 1.8rem;
      }
    }
  `]
})
export class SimpleLoginComponent {
  email = '';
  password = '';

  constructor(private router: Router) {}

  onLogin() {
    if (this.email === 'admin@miflk.com' && this.password === 'Admin123!') {
      alert('¡Login exitoso! Redirigiendo al dashboard...');
      this.router.navigate(['/dashboard']);
    } else {
      alert('Credenciales incorrectas. Usa: admin&#64;miflk.com / Admin123!');
    }
  }

  goToSetup() {
    this.router.navigate(['/setup']);
  }
}
