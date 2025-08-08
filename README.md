# Validador de Tickets NFT

Aplicación web mobile-first para validar tickets NFT en eventos.

## Características

- **Login seguro**: Sistema de autenticación con credenciales
- **Selección de eventos**: Lista de eventos disponibles para validar
- **Validación en tiempo real**: Escáner QR integrado con cámara
- **Historial completo**: Registro de todas las validaciones realizadas
- **Estadísticas**: Métricas de tickets válidos, inválidos y ya usados
- **Diseño mobile-first**: Optimizado para dispositivos móviles

## Tecnologías

- **React 18** con TypeScript
- **Chakra UI** para componentes y tema dark
- **React Router DOM** para navegación
- **Vite** como bundler
- **Lucide React** para iconos

## Estructura del Proyecto

```
src/
├── components/          # Componentes de UI
│   ├── Header.tsx
│   ├── Layout.tsx
│   ├── ProtectedRoute.tsx
│   └── ValidationResultModal.tsx
├── contexts/           # Contextos de React
│   └── AuthContext.tsx
├── hooks/             # Hooks personalizados
│   ├── useEvents.ts
│   ├── useQRScanner.ts
│   └── useValidatedTickets.ts
├── pages/             # Páginas de la aplicación
│   ├── EventSelection.tsx
│   ├── EventValidation.tsx
│   ├── Login.tsx
│   └── TicketValidator.tsx
├── types/             # Tipos TypeScript
│   └── index.ts
├── App.tsx
├── main.tsx
└── theme.ts
```

## Flujo de la Aplicación

1. **Login**: Autenticación con usuario y contraseña
2. **Selección de Evento**: Lista de eventos disponibles
3. **Panel de Validación**: Estadísticas e historial del evento
4. **Validador**: Escáner QR en pantalla completa
5. **Resultado**: Modal con información del ticket validado

## Instalación y Uso

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build
```

## Credenciales de Prueba

- **Usuario**: validator
- **Contraseña**: admin123

## Características Técnicas

- **Mobile-first**: Diseño optimizado para dispositivos móviles
- **PWA Ready**: Preparado para ser una Progressive Web App
- **Offline Storage**: Datos guardados en localStorage
- **Responsive**: Adaptable a diferentes tamaños de pantalla
- **Accesibilidad**: Componentes accesibles con Chakra UI

## Simulación de QR

La aplicación incluye un simulador de escaneo QR que genera diferentes tipos de resultados:

- Tickets válidos
- Tickets ya usados
- Tickets inválidos
- Errores de lectura

En producción, esto se reemplazaría con una librería real de escaneo QR como `qr-scanner`.
