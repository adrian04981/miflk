# Miflk - Sistema de Gestión Empresarial

## Descripción

Miflk es una aplicación web desarrollada en Angular con Firebase para la gestión de usuarios, roles y configuraciones de una empresa. La aplicación incluye un sistema de autenticación completo con diferentes niveles de acceso.

## Características

### Sistema de Autenticación
- Login con Firebase Authentication
- Registro de usuarios con información personal detallada
- Manejo de sesiones seguras
- Protección de rutas con guards

### Sistema de Roles
- **Administrador**: Acceso completo al sistema
  - Gestión de usuarios (crear, editar, eliminar, activar/desactivar)
  - Gestión de roles y permisos
  - Configuración del sistema
  - Dashboard completo con estadísticas

- **Empleado**: Acceso limitado
  - Dashboard básico
  - Información personal
  - Funciones operativas (próximamente)

### Funcionalidades Principales

#### Dashboard
- Saludo personalizado según la hora del día
- Estadísticas del sistema (solo admin)
- Información del usuario autenticado

#### Gestión de Usuarios
- Lista completa de usuarios
- Formulario para crear/editar usuarios
- Campos requeridos:
  - Email y contraseña
  - Nombres y apellidos
  - Nacionalidad
  - Tipo de documento (Cédula, Pasaporte, DNI, etc.)
  - Número de documento
  - País de residencia
  - Teléfono (opcional)
  - Rol (Admin/Empleado)
  - Estado (Activo/Inactivo)

#### Gestión de Roles
- Información sobre roles del sistema
- Descripción de permisos por rol
- Preparado para expansión futura

#### Configuración
- Configuración de servidor SMTP para envío de correos
- Configuración de información de la empresa
- Gestión de credenciales de correo electrónico

## Configuración Inicial

### Usuario Administrador por Defecto
Al iniciar la aplicación por primera vez, se crea automáticamente un usuario administrador:

- **Email**: admin@miflk.com
- **Contraseña**: Admin123!

### Configuración de Firebase
Las credenciales de Firebase ya están configuradas en el archivo `environment.ts`:

```typescript
firebaseConfig: {
  apiKey: "AIzaSyALIt_5rYWa3bQZ8GSZfh6i7WGdKP8EFSo",
  authDomain: "miflk-a410c.firebaseapp.com",
  projectId: "miflk-a410c",
  storageBucket: "miflk-a410c.firebasestorage.app",
  messagingSenderId: "47263231445",
  appId: "1:47263231445:web:01d893a1127b8cea80a15c"
}
```

#### Configuración de Firestore Database

Para que la aplicación funcione correctamente, necesitas configurar Firestore Database en la consola de Firebase:

1. **Ir a la Consola de Firebase**
   - Visita: https://console.firebase.google.com/
   - Selecciona el proyecto `miflk-a410c`

2. **Configurar Firestore Database**
   - En el menú lateral, selecciona "Firestore Database"
   - Haz clic en "Crear base de datos"
   - Selecciona "Empezar en modo de prueba" (para desarrollo)
   - Elige una ubicación para la base de datos (preferiblemente la más cercana)

3. **Configurar Reglas de Seguridad**
   - En la pestaña "Reglas", reemplaza las reglas por defecto con:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Permitir lectura y escritura para usuarios autenticados
       match /{document=**} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```

4. **Configurar Authentication**
   - En el menú lateral, selecciona "Authentication"
   - Ve a la pestaña "Método de acceso"
   - Habilita "Correo electrónico/contraseña"
   - Guarda los cambios

5. **Verificar la Configuración**
   - Asegúrate de que tanto Authentication como Firestore Database estén habilitados
   - Las reglas de Firestore deben permitir acceso a usuarios autenticados

### Configuración de Correo
Configuración predeterminada para Gmail:

```typescript
emailConfig: {
  host: "smtp.gmail.com",
  port: 587,
  security: "STARTTLS",
  username: "adrian.armando20@gmail.com",
  password: "fpba obxm duzr jooz"
}
```

## Instalación y Ejecución

### Prerrequisitos
- Node.js (versión 18 o superior)
- Angular CLI
- Git

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd miflk
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Iniciar la aplicación**
   ```bash
   npm start
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:4200
   ```

## Tecnologías Utilizadas

### Frontend
- **Angular 18**: Framework principal
- **Angular Material**: Biblioteca de componentes UI
- **Angular CDK**: Herramientas de desarrollo
- **SCSS**: Preprocesador de CSS

### Backend
- **Firebase Authentication**: Autenticación de usuarios
- **Firestore**: Base de datos NoSQL
- **Firebase SDK**: Integración con servicios de Firebase

### Herramientas de Desarrollo
- **TypeScript**: Lenguaje principal
- **Angular CLI**: Herramientas de línea de comandos
- **RxJS**: Programación reactiva

## Estructura del Proyecto

```
src/
├── app/
│   ├── components/           # Componentes de la aplicación
│   │   ├── login/           # Componente de login
│   │   ├── dashboard/       # Layout principal
│   │   ├── dashboard-home/  # Página principal
│   │   ├── user-management/ # Gestión de usuarios
│   │   ├── role-management/ # Gestión de roles
│   │   ├── settings/        # Configuración
│   │   └── unauthorized/    # Página de acceso denegado
│   ├── guards/              # Guards de rutas
│   ├── models/              # Modelos de datos
│   ├── services/            # Servicios
│   └── environments/        # Configuraciones de entorno
└── styles.scss              # Estilos globales
```

## Funcionalidades Futuras

### Sistema de Roles Avanzado
- Creación de roles personalizados
- Asignación granular de permisos
- Roles por departamento
- Jerarquías de roles

### Módulos Adicionales
- Gestión de inventario
- Control de asistencia
- Reportes y análisis
- Sistema de notificaciones
- Integración con API de terceros

### Mejoras de UI/UX
- Tema personalizable
- Modo oscuro
- Responsive design mejorado
- Animaciones avanzadas

## Seguridad

### Características de Seguridad Implementadas
- Autenticación basada en tokens
- Validación de formularios
- Guards de rutas
- Manejo seguro de errores
- Cifrado de contraseñas

### Recomendaciones de Seguridad
- Cambiar las credenciales por defecto
- Usar contraseñas seguras
- Configurar reglas de seguridad en Firebase
- Implementar auditoría de accesos

## Solución de Problemas

### Errores de Conexión con Firebase

Si ves errores como "Failed to load resource: the server responded with a status of 400" en la consola del navegador, sigue estos pasos:

1. **Verificar configuración de Firestore:**
   - Asegúrate de que Firestore Database esté habilitado en la consola de Firebase
   - Verifica que las reglas de seguridad estén configuradas correctamente

2. **Errores de autenticación:**
   - Confirma que el método "Email/Password" esté habilitado en Authentication
   - Verifica que el usuario administrador se haya creado correctamente

3. **Problemas de red:**
   - Verifica tu conexión a internet
   - Comprueba que no haya firewall o proxy bloqueando las conexiones a Firebase

### Errores Comunes

#### Error: "Object is possibly 'undefined'"
- Este error ya está resuelto en la versión actual
- Se utilizan operadores de navegación segura (`?.`) para evitar errores de propiedades undefined

#### Error: "Port 4200 is already in use"
- Usa un puerto diferente: `ng serve --port 4201`
- O detén otros procesos que estén usando el puerto

#### Error de compilación LMDB
- Este es un error conocido en algunas versiones de Angular
- Usa `ng serve` en lugar de `ng build` para desarrollo

## Soporte y Mantenimiento

Para soporte técnico o consultas sobre la aplicación, contactar al equipo de desarrollo.

## Licencia

Este proyecto es propiedad de la empresa y está protegido por las leyes de derechos de autor correspondientes.

---

*Desarrollado con ❤️ para Miflk*
