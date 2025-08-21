# CV Web Personal - David Eduardo Espinosa Rojas

Una página web profesional y moderna para mostrar tu CV, construida con HTML, CSS y JavaScript vanilla. Diseñada para ser fácil de mantener y actualizar usando arrays de datos.

## 🚀 Características

- **Diseño Responsivo**: Se adapta perfectamente a dispositivos móviles, tablets y escritorio
- **Datos en Arrays**: Toda la información está organizada en arrays JavaScript para fácil mantenimiento
- **Iconos Modernos**: Utiliza Lucide Icons para un aspecto profesional
- **Impresión Optimizada**: Estilos especiales para impresión
- **GitHub Pages Ready**: Listo para hospedar en GitHub Pages
- **Carga Rápida**: Solo HTML, CSS y JavaScript vanilla - sin dependencias pesadas

## 📁 Estructura de Archivos

```
cv-web/
├── index.html          # Estructura HTML principal
├── styles.css          # Estilos y diseño responsivo
├── data.js            # Datos del CV organizados en arrays
├── script.js          # Lógica JavaScript para renderizar datos
└── README.md          # Este archivo
```

## 🛠️ Configuración para GitHub Pages

1. **Crear el repositorio**:
   ```bash
   # Crea un nuevo repositorio en GitHub con el nombre: tu-usuario.github.io
   # O cualquier nombre si quieres usar GitHub Pages en una branch
   ```

2. **Subir archivos**:
   ```bash
   git clone https://github.com/TU-USUARIO/TU-REPOSITORIO.git
   cd TU-REPOSITORIO
   
   # Copia todos los archivos aquí
   
   git add .
   git commit -m "Agregar CV web personal"
   git push origin main
   ```

3. **Activar GitHub Pages**:
   - Ve a Settings > Pages en tu repositorio
   - Selecciona "Deploy from a branch"
   - Elige "main" branch y "/ (root)" folder
   - Tu CV estará disponible en: `https://TU-USUARIO.github.io/TU-REPOSITORIO`

## ✏️ Personalización

### Cambiar Información Personal

Edita el archivo `data.js` para actualizar tu información:

```javascript
// Información personal básica
const personalInfo = {
    name: "Tu Nombre Completo",
    title: "Tu Título Profesional", 
    summary: "Tu resumen profesional aquí..."
};

// Información de contacto
const contactInfo = [
    {
        icon: "phone",
        text: "+52 123 456 7890",
        link: "tel:+521234567890"
    },
    // Agregar más elementos...
];
```

### Agregar Nueva Experiencia

```javascript
// Al inicio del array para que aparezca primero (más reciente)
experience.unshift({
    title: "Nuevo Puesto",
    company: "Nueva Empresa",
    period: "01/2026 - Actualidad",
    description: "Descripción de responsabilidades y logros..."
});
```

### Agregar Certificaciones

```javascript
certificates.unshift({
    title: "Nueva Certificación",
    issuer: "Proveedor de la Certificación",
    year: "2026",
    description: "Descripción opcional de la certificación"
});
```

### Agregar Nuevas Habilidades

```javascript
skills.push({
    category: "Nueva Tecnología",
    icon: "code", // Icono de Lucide
    description: "Descripción de tus competencias en esta área"
});
```

### Iconos Disponibles

Los iconos utilizan [Lucide Icons](https://lucide.dev/icons/). Algunos útiles:
- `briefcase` - Trabajo
- `graduation-cap` - Educación  
- `award` - Certificaciones
- `code` - Programación
- `server` - Backend
- `monitor` - Frontend
- `database` - Bases de datos
- `git-branch` - Control de versiones
- `shield` - Seguridad
- `settings` - DevOps

## 🎨 Personalización de Estilos

### Cambiar Colores

Edita las variables CSS en `styles.css`:

```css
:root {
    --primary-color: #2563eb;      /* Color principal */
    --secondary-color: #64748b;    /* Color secundario */
    --accent-color: #0ea5e9;       /* Color de acento */
    /* Cambiar estos valores por tus colores preferidos */
}
```

### Fuentes

La página usa **Inter** de Google Fonts. Para cambiar:

```html
<!-- En index.html, cambiar esta línea: -->
<link href="https://fonts.googleapis.com/css2?family=TU-FUENTE:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

```css
/* En styles.css: */
body {
    font-family: 'TU-FUENTE', sans-serif;
}
```

## 🔧 Funciones JavaScript Disponibles

Desde la consola del navegador puedes usar:

```javascript
// Ver todos los datos
CVFunctions.getAllData();

// Agregar nueva experiencia dinámicamente
CVFunctions.addNewExperience({
    title: "Nuevo Trabajo",
    company: "Empresa",
    period: "2026",
    description: "Descripción..."
});

// Exportar CV como texto
console.log(CVFunctions.exportAsText());

// Imprimir CV
CVFunctions.printCV();
```

## 📱 Responsive Design

La página se adapta a diferentes tamaños:

- **Móvil** (< 480px): Layout apilado, texto optimizado
- **Tablet** (480px - 768px): Layout híbrido
- **Escritorio** (> 768px): Layout completo con sidebar

## 🖨️ Impresión

- **Ctrl + P** o usar `CVFunctions.printCV()`
- Estilos optimizados para impresión
- Colores ajustados para impresoras
- Saltos de página inteligentes

## 🚀 Optimizaciones de Rendimiento

- Sin dependencias externas pesadas
- Carga de fuentes optimizada
- CSS y JavaScript minimalistas
- Imágenes (si las agregas) optimizadas

## 🔒 SEO y Meta Tags

Considera agregar en `index.html`:

```html
<meta name="description" content="CV de Tu Nombre - Desarrollador Full Stack">
<meta name="keywords" content="desarrollador, full stack, javascript, tu-ubicación">
<meta name="author" content="Tu Nombre">

<!-- Open Graph para redes sociales -->
<meta property="og:title" content="Tu Nombre - Software Developer">
<meta property="og:description" content="Desarrollador Full Stack especializado en...">
<meta property="og:type" content="website">
```

## 🐛 Troubleshooting

### Los iconos no aparecen
- Verifica que Lucide esté cargando correctamente
- Revisa la consola del navegador por errores
- Verifica que los nombres de iconos sean correctos

### La página no se ve en GitHub Pages
- Asegúrate de que `index.html` esté en la raíz del repositorio
- Verifica que GitHub Pages esté habilitado
- Los cambios pueden tardar algunos minutos en aplicarse

### Problemas de responsive
- Usa las herramientas de desarrollo del navegador
- Revisa los media queries en `styles.css`
- Prueba en diferentes dispositivos/tamaños

## 📈 Próximas Mejoras Sugeridas

- [ ] Modo oscuro/claro
- [ ] Animaciones CSS
- [ ] Sección de proyectos con enlaces a GitHub
- [ ] Blog integrado
- [ ] Formulario de contacto
- [ ] Analytics (Google Analytics)
- [ ] PWA (Progressive Web App)

## 📄 Licencia

Este proyecto es de uso libre. Puedes modificarlo y usarlo como desees para tu CV personal.

---

**¡Hecho con ❤️ para impulsar tu carrera profesional!**

Para soporte o sugerencias, abre un issue en el repositorio.