import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../services/auth.service';
import { User, UserRole, DocumentType, RegisterData } from '../../models/user.model';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  displayedColumns: string[] = ['displayName', 'email', 'role', 'nationality', 'documentType', 'documentNumber', 'isActive', 'actions'];
  loading = false;
  userForm: FormGroup;
  showUserForm = false;
  editingUser: User | null = null;
  
  UserRole = UserRole;
  DocumentType = DocumentType;

  roleOptions = [
    { value: UserRole.ADMIN, label: 'Administrador' },
    { value: UserRole.EMPLOYEE, label: 'Empleado' }
  ];

  documentTypeOptions = [
    { value: DocumentType.CEDULA, label: 'Cédula' },
    { value: DocumentType.PASAPORTE, label: 'Pasaporte' },
    { value: DocumentType.LICENCIA, label: 'Licencia' },
    { value: DocumentType.DNI, label: 'DNI' },
    { value: DocumentType.OTROS, label: 'Otros' }
  ];

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.userForm = this.createUserForm();
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  private createUserForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      nationality: ['', Validators.required],
      documentType: ['', Validators.required],
      documentNumber: ['', Validators.required],
      countryOfResidence: ['', Validators.required],
      phoneNumber: [''],
      role: [UserRole.EMPLOYEE, Validators.required],
      isActive: [true]
    });
  }

  async loadUsers(): Promise<void> {
    this.loading = true;
    try {
      this.users = await this.authService.getAllUsers();
    } catch (error) {
      this.snackBar.open('Error al cargar usuarios', 'Cerrar', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    } finally {
      this.loading = false;
    }
  }

  showCreateUserForm(): void {
    this.editingUser = null;
    this.userForm.reset();
    this.userForm.patchValue({
      role: UserRole.EMPLOYEE,
      isActive: true
    });
    this.showUserForm = true;
  }

  editUser(user: User): void {
    this.editingUser = user;
    this.userForm.patchValue({
      email: user.email,
      password: '', // No mostrar contraseña actual
      firstName: user.personalInfo.firstName,
      lastName: user.personalInfo.lastName,
      nationality: user.personalInfo.nationality,
      documentType: user.personalInfo.documentType,
      documentNumber: user.personalInfo.documentNumber,
      countryOfResidence: user.personalInfo.countryOfResidence,
      phoneNumber: user.personalInfo.phoneNumber || '',
      role: user.role,
      isActive: user.isActive
    });
    
    // Hacer opcional la contraseña al editar
    this.userForm.get('password')?.clearValidators();
    this.userForm.get('password')?.updateValueAndValidity();
    
    this.showUserForm = true;
  }

  async onSubmit(): Promise<void> {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      
      try {
        if (this.editingUser) {
          // Actualizar usuario existente
          const updates: Partial<User> = {
            email: formData.email,
            displayName: `${formData.firstName} ${formData.lastName}`,
            role: formData.role,
            personalInfo: {
              firstName: formData.firstName,
              lastName: formData.lastName,
              nationality: formData.nationality,
              documentType: formData.documentType,
              documentNumber: formData.documentNumber,
              countryOfResidence: formData.countryOfResidence,
              phoneNumber: formData.phoneNumber || undefined
            },
            isActive: formData.isActive
          };
          
          await this.authService.updateUserData(this.editingUser.uid, updates);
          this.snackBar.open('Usuario actualizado exitosamente', 'Cerrar', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
        } else {
          // Crear nuevo usuario
          const registerData: RegisterData = {
            email: formData.email,
            password: formData.password,
            personalInfo: {
              firstName: formData.firstName,
              lastName: formData.lastName,
              nationality: formData.nationality,
              documentType: formData.documentType,
              documentNumber: formData.documentNumber,
              countryOfResidence: formData.countryOfResidence,
              phoneNumber: formData.phoneNumber || undefined
            },
            role: formData.role
          };
          
          await this.authService.register(registerData);
          this.snackBar.open('Usuario creado exitosamente', 'Cerrar', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
        }
        
        this.cancelForm();
        await this.loadUsers();
      } catch (error: any) {
        this.snackBar.open(error.message || 'Error al procesar usuario', 'Cerrar', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    }
  }

  async toggleUserStatus(user: User): Promise<void> {
    try {
      await this.authService.updateUserData(user.uid, {
        isActive: !user.isActive
      });
      
      this.snackBar.open(
        `Usuario ${!user.isActive ? 'activado' : 'desactivado'} exitosamente`,
        'Cerrar',
        {
          duration: 3000,
          panelClass: ['success-snackbar']
        }
      );
      
      await this.loadUsers();
    } catch (error) {
      this.snackBar.open('Error al cambiar estado del usuario', 'Cerrar', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
  }

  async deleteUser(user: User): Promise<void> {
    if (confirm(`¿Está seguro de que desea eliminar al usuario ${user.displayName}?`)) {
      try {
        await this.authService.deleteUser(user.uid);
        this.snackBar.open('Usuario eliminado exitosamente', 'Cerrar', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        await this.loadUsers();
      } catch (error) {
        this.snackBar.open('Error al eliminar usuario', 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    }
  }

  cancelForm(): void {
    this.showUserForm = false;
    this.editingUser = null;
    this.userForm.reset();
    
    // Restaurar validaciones de contraseña
    this.userForm.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
    this.userForm.get('password')?.updateValueAndValidity();
  }

  getRoleLabel(role: UserRole): string {
    return role === UserRole.ADMIN ? 'Administrador' : 'Empleado';
  }

  getDocumentTypeLabel(type: DocumentType): string {
    const option = this.documentTypeOptions.find(opt => opt.value === type);
    return option ? option.label : type;
  }

  getActiveUsersCount(): number {
    return this.users.filter(user => user.isActive).length;
  }

  getUserInitials(user: User): string {
    const firstName = user.personalInfo?.firstName || '';
    const lastName = user.personalInfo?.lastName || '';
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
  }
}
