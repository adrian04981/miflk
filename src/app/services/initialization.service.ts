import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { UserRole, DocumentType } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class InitializationService {
  constructor(private authService: AuthService) {}

  async initializeAdminUser(): Promise<void> {
    try {
      // Verificar si ya existe un usuario administrador
      const users = await this.authService.getAllUsers();
      const adminExists = users.some(user => user.role === UserRole.ADMIN);
      
      if (!adminExists) {
        // Crear usuario administrador por defecto
        await this.authService.register({
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
        });
        
        console.log('Usuario administrador creado exitosamente');
        console.log('Email: admin@miflk.com');
        console.log('Contraseña: Admin123!');
      }
    } catch (error) {
      console.error('Error al inicializar usuario administrador:', error);
    }
  }
}
