import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, user, User as FirebaseUser, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, doc, getDoc, setDoc, collection, query, where, getDocs, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable, BehaviorSubject, from, of } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';
import { User, UserRole, LoginCredentials, RegisterData, PersonalInfo } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private auth: Auth,
    private firestore: Firestore
  ) {
    this.initializeAuthState();
  }

  private initializeAuthState(): void {
    try {
      onAuthStateChanged(this.auth, async (firebaseUser) => {
        if (firebaseUser) {
          const userData = await this.getUserData(firebaseUser.uid);
          this.currentUserSubject.next(userData);
        } else {
          this.currentUserSubject.next(null);
        }
      });
    } catch (error) {
      console.error('Error initializing auth state:', error);
      this.currentUserSubject.next(null);
    }
  }

  async login(credentials: LoginCredentials): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        credentials.email,
        credentials.password
      );
      
      const userData = await this.getUserData(userCredential.user.uid);
      if (!userData) {
        throw new Error('Usuario no encontrado en la base de datos');
      }
      
      if (!userData.isActive) {
        throw new Error('Usuario inactivo. Contacte al administrador.');
      }

      this.currentUserSubject.next(userData);
      return userData;
    } catch (error: any) {
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  async register(registerData: RegisterData): Promise<User> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        registerData.email,
        registerData.password
      );

      const userData: User = {
        uid: userCredential.user.uid,
        email: registerData.email,
        displayName: `${registerData.personalInfo.firstName} ${registerData.personalInfo.lastName}`,
        role: registerData.role || UserRole.EMPLOYEE,
        personalInfo: registerData.personalInfo,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      await this.saveUserData(userData);
      this.currentUserSubject.next(userData);
      return userData;
    } catch (error: any) {
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      this.currentUserSubject.next(null);
    } catch (error: any) {
      throw new Error('Error al cerrar sesión');
    }
  }

  private async getUserData(uid: string): Promise<User | null> {
    try {
      const userDoc = await getDoc(doc(this.firestore, 'users', uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        return {
          ...data,
          uid: userDoc.id,
          createdAt: data['createdAt']?.toDate() || new Date(),
          updatedAt: data['updatedAt']?.toDate() || new Date()
        } as User;
      }
      return null;
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
      return null;
    }
  }

  private async saveUserData(userData: User): Promise<void> {
    try {
      await setDoc(doc(this.firestore, 'users', userData.uid), userData);
    } catch (error) {
      console.error('Error al guardar datos del usuario:', error);
      throw error;
    }
  }

  async updateUserData(uid: string, updates: Partial<User>): Promise<void> {
    try {
      const userRef = doc(this.firestore, 'users', uid);
      await updateDoc(userRef, {
        ...updates,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      throw error;
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      const usersQuery = query(collection(this.firestore, 'users'));
      const querySnapshot = await getDocs(usersQuery);
      return querySnapshot.docs.map(doc => ({
        ...doc.data(),
        uid: doc.id,
        createdAt: doc.data()['createdAt']?.toDate() || new Date(),
        updatedAt: doc.data()['updatedAt']?.toDate() || new Date()
      } as User));
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      throw error;
    }
  }

  async deleteUser(uid: string): Promise<void> {
    try {
      await deleteDoc(doc(this.firestore, 'users', uid));
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      throw error;
    }
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  isAdmin(): boolean {
    const user = this.currentUserSubject.value;
    return user?.role === UserRole.ADMIN;
  }

  isEmployee(): boolean {
    const user = this.currentUserSubject.value;
    return user?.role === UserRole.EMPLOYEE;
  }

  private getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'Usuario no encontrado';
      case 'auth/wrong-password':
        return 'Contraseña incorrecta';
      case 'auth/email-already-in-use':
        return 'El email ya está en uso';
      case 'auth/weak-password':
        return 'La contraseña es muy débil';
      case 'auth/invalid-email':
        return 'Email inválido';
      case 'auth/too-many-requests':
        return 'Demasiados intentos fallidos. Intente más tarde';
      default:
        return 'Error de autenticación';
    }
  }
}
