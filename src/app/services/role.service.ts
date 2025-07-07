import { Injectable } from '@angular/core';
import { Firestore, collection, doc, addDoc, updateDoc, deleteDoc, getDocs, getDoc, query, where, orderBy } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { Role, Permission } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private rolesCollection = collection(this.firestore, 'roles');
  private permissionsCollection = collection(this.firestore, 'permissions');

  constructor(private firestore: Firestore) {
    this.initializeDefaultPermissions();
  }

  async createRole(roleData: Omit<Role, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const role: Omit<Role, 'id'> = {
        ...roleData,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const docRef = await addDoc(this.rolesCollection, role);
      return docRef.id;
    } catch (error) {
      console.error('Error al crear rol:', error);
      throw error;
    }
  }

  async getAllRoles(): Promise<Role[]> {
    try {
      const rolesQuery = query(this.rolesCollection, orderBy('name'));
      const querySnapshot = await getDocs(rolesQuery);
      return querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
        createdAt: doc.data()['createdAt']?.toDate() || new Date(),
        updatedAt: doc.data()['updatedAt']?.toDate() || new Date()
      } as Role));
    } catch (error) {
      console.error('Error al obtener roles:', error);
      throw error;
    }
  }

  async getRoleById(id: string): Promise<Role | null> {
    try {
      const roleDoc = await getDoc(doc(this.firestore, 'roles', id));
      if (roleDoc.exists()) {
        return {
          ...roleDoc.data(),
          id: roleDoc.id,
          createdAt: roleDoc.data()['createdAt']?.toDate() || new Date(),
          updatedAt: roleDoc.data()['updatedAt']?.toDate() || new Date()
        } as Role;
      }
      return null;
    } catch (error) {
      console.error('Error al obtener rol:', error);
      throw error;
    }
  }

  async updateRole(id: string, updates: Partial<Role>): Promise<void> {
    try {
      const roleRef = doc(this.firestore, 'roles', id);
      await updateDoc(roleRef, {
        ...updates,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error al actualizar rol:', error);
      throw error;
    }
  }

  async deleteRole(id: string): Promise<void> {
    try {
      await deleteDoc(doc(this.firestore, 'roles', id));
    } catch (error) {
      console.error('Error al eliminar rol:', error);
      throw error;
    }
  }

  async getAllPermissions(): Promise<Permission[]> {
    try {
      const permissionsQuery = query(this.permissionsCollection, orderBy('resource'), orderBy('action'));
      const querySnapshot = await getDocs(permissionsQuery);
      return querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      } as Permission));
    } catch (error) {
      console.error('Error al obtener permisos:', error);
      throw error;
    }
  }

  async createPermission(permissionData: Omit<Permission, 'id'>): Promise<string> {
    try {
      const docRef = await addDoc(this.permissionsCollection, permissionData);
      return docRef.id;
    } catch (error) {
      console.error('Error al crear permiso:', error);
      throw error;
    }
  }

  private async initializeDefaultPermissions(): Promise<void> {
    try {
      const existingPermissions = await this.getAllPermissions();
      if (existingPermissions.length === 0) {
        const defaultPermissions: Omit<Permission, 'id'>[] = [
          {
            name: 'Leer Usuarios',
            description: 'Permite ver la lista de usuarios',
            resource: 'users',
            action: 'read'
          },
          {
            name: 'Crear Usuarios',
            description: 'Permite crear nuevos usuarios',
            resource: 'users',
            action: 'create'
          },
          {
            name: 'Actualizar Usuarios',
            description: 'Permite modificar usuarios existentes',
            resource: 'users',
            action: 'update'
          },
          {
            name: 'Eliminar Usuarios',
            description: 'Permite eliminar usuarios',
            resource: 'users',
            action: 'delete'
          },
          {
            name: 'Leer Roles',
            description: 'Permite ver la lista de roles',
            resource: 'roles',
            action: 'read'
          },
          {
            name: 'Crear Roles',
            description: 'Permite crear nuevos roles',
            resource: 'roles',
            action: 'create'
          },
          {
            name: 'Actualizar Roles',
            description: 'Permite modificar roles existentes',
            resource: 'roles',
            action: 'update'
          },
          {
            name: 'Eliminar Roles',
            description: 'Permite eliminar roles',
            resource: 'roles',
            action: 'delete'
          },
          {
            name: 'Configuración',
            description: 'Permite acceder a la configuración del sistema',
            resource: 'settings',
            action: 'manage'
          }
        ];

        for (const permission of defaultPermissions) {
          await this.createPermission(permission);
        }
      }
    } catch (error) {
      console.error('Error al inicializar permisos por defecto:', error);
    }
  }
}
