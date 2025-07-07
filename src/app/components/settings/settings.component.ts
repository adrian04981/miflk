import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatSelectModule
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  emailForm: FormGroup;
  systemForm: FormGroup;
  hidePassword = true;

  securityOptions = [
    { value: 'STARTTLS', label: 'STARTTLS' },
    { value: 'SSL', label: 'SSL' },
    { value: 'NONE', label: 'Ninguna' }
  ];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.emailForm = this.createEmailForm();
    this.systemForm = this.createSystemForm();
  }

  ngOnInit(): void {
    this.loadCurrentSettings();
  }

  private createEmailForm(): FormGroup {
    return this.fb.group({
      host: ['', Validators.required],
      port: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      security: ['', Validators.required],
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  private createSystemForm(): FormGroup {
    return this.fb.group({
      companyName: ['Miflk', Validators.required],
      companyEmail: ['', [Validators.required, Validators.email]],
      companyPhone: [''],
      companyAddress: ['']
    });
  }

  private loadCurrentSettings(): void {
    // Cargar configuraciones actuales del correo
    this.emailForm.patchValue({
      host: environment.emailConfig.host,
      port: environment.emailConfig.port,
      security: environment.emailConfig.security,
      username: environment.emailConfig.username,
      password: environment.emailConfig.password
    });

    // Cargar configuraciones del sistema
    this.systemForm.patchValue({
      companyName: 'Miflk',
      companyEmail: 'info@miflk.com',
      companyPhone: '+1 (555) 123-4567',
      companyAddress: 'Dirección de la empresa'
    });
  }

  async saveEmailSettings(): Promise<void> {
    if (this.emailForm.valid) {
      try {
        // Aquí normalmente guardarías en una base de datos
        // Por ahora solo mostramos un mensaje de éxito
        this.snackBar.open('Configuración de correo guardada exitosamente', 'Cerrar', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
      } catch (error) {
        this.snackBar.open('Error al guardar configuración de correo', 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    }
  }

  async saveSystemSettings(): Promise<void> {
    if (this.systemForm.valid) {
      try {
        // Aquí normalmente guardarías en una base de datos
        // Por ahora solo mostramos un mensaje de éxito
        this.snackBar.open('Configuración del sistema guardada exitosamente', 'Cerrar', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
      } catch (error) {
        this.snackBar.open('Error al guardar configuración del sistema', 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    }
  }

  testEmailConnection(): void {
    if (this.emailForm.valid) {
      this.snackBar.open('Función de prueba de conexión próximamente', 'Cerrar', {
        duration: 3000,
        panelClass: ['info-snackbar']
      });
    } else {
      this.snackBar.open('Complete todos los campos requeridos', 'Cerrar', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
  }
}
