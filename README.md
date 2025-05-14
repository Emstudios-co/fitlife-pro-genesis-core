
# FitLife Pro: Plataforma de Fitness Personalizada

FitLife Pro es una plataforma SaaS de fitness que ofrece entrenamiento personalizado mediante IA, planes de nutrición dinámicos, integración con wearables, gamificación y una comunidad activa para apoyar a los usuarios en su viaje fitness.

## Características Principales

- **Entrenador IA Personalizado**: Rutinas adaptadas a tu progreso en tiempo real
- **Planes de Nutrición Dinámicos**: Alimentación optimizada según tu actividad y objetivos
- **Integración con Wearables**: Sincronización con Garmin, Fitbit, Apple Watch y más
- **Gamificación**: Sistema de puntos, medallas y tablas de clasificación
- **Comunidad Activa**: Chats en vivo y foros para mantenerte motivado
- **Analytics Avanzados**: Visualización detallada de tu progreso

## Tecnologías Utilizadas

- React 18
- TypeScript
- Tailwind CSS
- Shadcn UI
- Vite

## Modelo de Monetización

- **Freemium**: Plan básico gratuito con funcionalidades limitadas
- **Suscripción**: Planes mensuales, trimestrales y anuales con diferentes niveles de acceso
- **Corporativo**: Soluciones personalizadas para empresas

## Despliegue en Vercel

1. Clona este repositorio:
```
git clone https://github.com/tu-usuario/fitlife-pro.git
```

2. Instala las dependencias:
```
cd fitlife-pro
npm install
```

3. Configura las variables de entorno necesarias:
- Crea un archivo `.env` en la raíz del proyecto
- Añade las siguientes variables:
```
VITE_AI_API_KEY=tu_api_key_de_ia
VITE_GARMIN_API_KEY=tu_api_key_de_garmin
VITE_FITBIT_API_KEY=tu_api_key_de_fitbit
VITE_APPLE_HEALTHKIT_KEY=tu_api_key_de_apple
```

4. Ejecuta localmente para desarrollo:
```
npm run dev
```

5. Para desplegar en Vercel:
```
npm run build
```

6. Conecta el repositorio a tu cuenta de Vercel y configura las mismas variables de entorno en la plataforma.

## Paleta de Colores

- **Primario**: #0D3B66 (Azul profundo)
- **Secundario**: #FAA916 (Amarillo vibrante)
- **Neutros**: #F5F5F5 (Gris claro) / #333333 (Gris oscuro)
- **Accent**: #EF476F (Rosa brillante)

## Estructura del Proyecto

```
/src
  /components        # Componentes reutilizables
  /pages             # Páginas principales
  /styles            # Estilos globales
  /hooks             # Custom hooks
  /utils             # Funciones utilitarias
  /context           # Contextos de React
  /services          # Servicios (API, etc.)
  /tests             # Tests unitarios
```

## Tests Unitarios

Ejecuta los tests con:
```
npm run test
```

## Contacto

Para más información o soporte, contacta con nosotros en:
soporte@fitlifepro.com
