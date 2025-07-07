export const environment = {
  production: true,
  version: '1.0.0',
  appName: 'Miflk - Sistema de Gestión',
  
  // Firebase Configuration
  firebaseConfig: {
    apiKey: "AIzaSyALIt_5rYWa3bQZ8GSZfh6i7WGdKP8EFSo",
    authDomain: "miflk-a410c.firebaseapp.com",
    projectId: "miflk-a410c",
    storageBucket: "miflk-a410c.firebasestorage.app",
    messagingSenderId: "47263231445",
    appId: "1:47263231445:web:3c5edceebbd5461480a15c"
  },
  
  // Email Configuration
  emailConfig: {
    host: "smtp.gmail.com",
    port: 587,
    security: "STARTTLS",
    username: "adrian.armando20@gmail.com",
    password: "fpba obxm duzr jooz"
  },
  
  // API Configuration
  apiConfig: {
    baseUrl: 'https://api.miflk.com',
    timeout: 10000,
    retryAttempts: 3
  },
  
  // Feature Flags
  features: {
    darkMode: true,
    notifications: true,
    analytics: true,
    debugMode: false,
    mockData: false
  },
  
  // UI Configuration
  ui: {
    theme: 'default',
    language: 'es',
    dateFormat: 'DD/MM/YYYY',
    currency: 'EUR',
    pageSize: 10
  },
  
  // Security Configuration
  security: {
    sessionTimeout: 30 * 60 * 1000, // 30 minutes
    maxLoginAttempts: 5,
    lockoutDuration: 15 * 60 * 1000, // 15 minutes
    passwordMinLength: 8
  },
  
  // Logging Configuration
  logging: {
    level: 'error',
    enableConsole: false,
    enableRemote: true
  }
};
