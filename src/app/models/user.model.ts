export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  role: UserRole;
  personalInfo: PersonalInfo;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PersonalInfo {
  nationality: string;
  documentNumber: string;
  documentType: DocumentType;
  countryOfResidence: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
}

export enum UserRole {
  ADMIN = 'admin',
  EMPLOYEE = 'employee'
}

export enum DocumentType {
  CEDULA = 'cedula',
  PASAPORTE = 'pasaporte',
  LICENCIA = 'licencia',
  DNI = 'dni',
  OTROS = 'otros'
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  resource: string;
  action: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  personalInfo: PersonalInfo;
  role?: UserRole;
}
