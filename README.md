# Pekata - Panel de Recursos Humanos

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://v0-pekata.vercel.app)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black?style=for-the-badge&logo=next.js)](https://nextjs.org)

## Descripción

Panel de administración de recursos humanos para Pekata, diseñado para gestionar empleados, seguimiento de envíos, incidencias y métricas del negocio durante la campaña de Navidad.

## Características Principales

### 📊 Dashboard Ejecutivo
- **Métricas en tiempo real**: Total de líneas, empleados activos, envíos pendientes
- **Estados de carrito**: Seguimiento del estado de selección de productos
- **Estados logísticos**: Control de envíos y entregas
- **Gestión de incidencias**: Monitoreo y resolución de problemas

### 👥 Gestión de Empleados
- **Lista completa de empleados** con paginación y búsqueda
- **Filtros avanzados** por estado de carrito, logístico e incidencias
- **Ordenamiento dinámico** por múltiples criterios
- **Perfiles detallados** con información de contacto y estado

### 📦 Seguimiento de Envíos
- **Estado de carritos**: Activo, Pendiente, Enviado
- **Timeline de envíos** con fechas y estados
- **Gestión de incidencias** y peticiones de empleados
- **Productos seleccionados** con alertas y lotes

### 🎯 Campaña Navideña
- **Gestión de lotes especiales** para la temporada
- **Seguimiento de tokens** y límites de compra
- **Fechas de cierre** y plazos de entrega
- **Métricas de participación** de empleados

## Tecnologías Utilizadas

- **Next.js 15** - Framework de React con App Router
- **TypeScript** - Tipado estático para mayor robustez
- **Tailwind CSS** - Estilos utilitarios y diseño responsivo
- **Lucide React** - Iconografía moderna y consistente
- **Vercel** - Despliegue y hosting en la nube

## Next.js 15 - Características Avanzadas

### 🚀 App Router
- **Server Components** para renderizado del lado del servidor
- **Client Components** para interactividad del lado del cliente
- **Streaming** para carga progresiva de contenido
- **Suspense boundaries** para manejo de estados de carga

### 📁 Estructura de Archivos
- **Routing basado en archivos** con `app/` directory
- **API Routes** integradas con `route.ts`
- **Layouts anidados** para reutilización de componentes
- **Loading y Error boundaries** para mejor UX

### ⚡ Optimizaciones de Rendimiento
- **Image Optimization** automática con `next/image`
- **Font Optimization** con Google Fonts
- **Bundle splitting** inteligente
- **Static Generation** donde sea posible

## Vercel - Plataforma de Despliegue

### 🌐 Hosting y CDN
- **Edge Network** global para latencia mínima
- **Automatic HTTPS** con certificados SSL
- **Custom domains** con configuración DNS
- **Preview deployments** para cada pull request

### 🔄 CI/CD Integrado
- **Git integration** con GitHub/GitLab
- **Automatic deployments** en cada push
- **Branch previews** para testing
- **Rollback capabilities** para versiones anteriores

### 📊 Analytics y Monitoreo
- **Web Vitals** tracking automático
- **Real User Monitoring** (RUM)
- **Performance insights** detallados
- **Error tracking** con stack traces

### 🔧 Configuración Avanzada
- **Environment variables** seguras
- **Edge functions** para lógica del servidor
- **Caching strategies** optimizadas
- **Database connections** persistentes

## Estructura del Proyecto

```
├── app/
│   ├── api/                 # API Routes
│   │   ├── dashboard/       # Endpoint consolidado de métricas
│   │   └── employees/       # Gestión de empleados
│   ├── employees/           # Páginas de empleados
│   └── page.tsx            # Dashboard principal
├── components/
│   ├── ui/                 # Componentes base (Button, Input, etc.)
│   └── layouts/            # Layouts de la aplicación
└── contexts/               # Contextos de React (Auth, Campaign)
```

## Funcionalidades Técnicas

### 🔍 Búsqueda y Filtrado
- **Debounce en búsqueda** para optimizar rendimiento
- **Filtros múltiples** con estado persistente
- **Paginación inteligente** con navegación por páginas
- **Ordenamiento dinámico** por cualquier campo

### 📱 Diseño Responsivo
- **Mobile-first** con breakpoints optimizados
- **Navegación adaptativa** para diferentes dispositivos
- **Tablas responsivas** con scroll horizontal en móviles
- **Modales y dropdowns** optimizados para touch

### ⚡ Rendimiento
- **Server-side rendering** para carga inicial rápida
- **Client-side hydration** para interactividad
- **API consolidada** para reducir requests
- **Caching inteligente** con Next.js

## Despliegue

La aplicación está desplegada en Vercel y disponible en:

**[https://v0-pekata.vercel.app](https://v0-pekata.vercel.app)**

## Desarrollo Local

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build
```

## Contribución

Este proyecto está sincronizado automáticamente con [v0.app](https://v0.app) para el desarrollo visual y la gestión de componentes.
