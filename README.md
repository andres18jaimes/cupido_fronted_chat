<!-- @format -->

# 💘 cUPido 

<p align="center">
  <img src="src/assets/logomasclight.webp" alt="cUPido Logo" width="170"/>
</p>

<h3 align="center">Landing page moderna, completamente animada y de alto rendimiento para una aplicación social juvenil de citas.</h3>

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react"/>
  <img alt="Vite" src="https://img.shields.io/badge/Vite-5-purple?style=for-the-badge&logo=vite"/>
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript"/>
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-3-cyan?style=for-the-badge&logo=tailwind-css"/>
</p>

---

## 🚀 Live Demo

[Link to live demo](https://cupido-sandy.vercel.app)

---

## ✨ Features

- **Framework Principal**: React 18 + Vite + TypeScript para un desarrollo rápido, moderno y seguro.
- **Estilos**:
  - **Tailwind CSS**: Framework Utility-First para un diseño rápido y consistente.
  - **Theming Avanzado**: Sistema de temas dual (femenino/masculino) implementado con variables CSS para una personalización visual completa.
  - **Glassmorphism**: Tarjetas con efecto de vidrio esmerilado (`backdrop-blur`) y bordes de gradiente luminoso para un look premium.
- **UI**:
  - **shadcn/ui**: Componentes de alta calidad, accesibles y personalizables.
  - **lucide-react**: Pack de iconos limpio y consistente.
- **Manejo de Estado**:
  - **Zustand**: Estado global centralizado, reactivo y simple.
- **Formularios**:
  - **React Hook Form + Zod**: Implementación robusta para la gestión de formularios y validación de esquemas en tiempo real.
- **Animaciones y Micro-interacciones**:
  - **Reveal-on-Scroll**: Animaciones de entrada dramáticas y escalonadas.
  - **Hover 3D**: Efecto de rotación 3D en las tarjetas de características.
  - **Conteo Animado**: Las estadísticas clave animan su conteo.
- **Mejoras de UX**:
  - **Scroll to Top**: Botón de acción flotante (FAB) para volver al inicio.
  - **Testimoniales Mejorados**: Tarjetas de testimonios enriquecidas.
- **Optimización**:
  - **Activos Optimizados**: Todas las imágenes y GIFs en formato **WebP**.
- **Calidad de Código y Pruebas**:
  - **ESLint**: Para mantener un código limpio y consistente.
  - **Vitest + React Testing Library**: Entorno de pruebas moderno y rápido.

---

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or higher)
- [npm](https://www.npmjs.com/)

### Installation

1.  Clone the repository:
    ```sh
    git clone https://github.com/cupidoUP-App/cupido-frontend.git
    ```
2.  Navigate to the project directory:
    ```sh
    cd cupido-frontend
    ```
3.  Install the dependencies:
    ```sh
    npm install
    ```

---

## 📜 Available Scripts

In the project directory, you can run:

-   `npm run dev`: Inicia el servidor de desarrollo.
-   `npm run build`: Compila la aplicación para producción.
-   `npm run lint`: Ejecuta el linter para analizar el código.
-   `npm run preview`: Sirve la build de producción localmente.
-   `npm test`: Ejecuta la suite de pruebas con Vitest.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---
---

## 💬 Módulo de Chat - Características Avanzadas

### 🎯 Funcionalidades Implementadas
- **Chat en Tiempo Real**: WebSockets integrados para mensajería instantánea
- **Validación de Matches**: Solo usuarios con match activo pueden chatear
- **Interfaz Dual Panel**: Lista de chats + vista de conversación
- **Estados de Mensajes**: Enviado, entregado, leído (con iconos de corazones)
- **Seguridad Avanzada**: 
  - Filtro de toxicidad en mensajes
  - Bloqueo de números telefónicos (primeros 3 días)
  - Sistema de reportes y bloqueos
  - Validación de usuarios activos/no suspendidos

### 🏗️ Arquitectura del Chat
src/features/chat/
├── ChatGeneral.tsx      # Componente contenedor principal
├── ChatListPanel.tsx    # Lista de conversaciones
├── ChatView.tsx         # Vista de mensajes
├── ChatRoom.tsx         # Sala de chat específica
└── mock-chat-data.ts    # Datos de prueba
## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

