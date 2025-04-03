# Akatsuki Theme Login Creado Por Michael Felipe Corrales Florez

![Banner del Portafolio](Recursos/mc-200x200.jpg)

Un tema de login inspirado en Akatsuki (organización de Naruto), con un diseño oscuro y rojo característico de la organización. Este proyecto implementa una pantalla de inicio de sesión estilizada con elementos visuales distintivos como nubes rojas y un diseño minimalista pero impactante.

## Preview Theme Login Experimental
![Vista previa del Login Theme](Recursos/LoginAkatsuki.jpg)

## Estructura del Proyecto

```
LoginTheme/
├── Fonts/
│   └── Bolton Serif Regular.{woff2,woff,ttf}
├── Recursos/
│   ├── cloud.png
│   ├── cloudnitgh.png
│   ├── akatsuki.jpg
│   └── mc.jpg
├── AkatsukiThemeLogin.css
├── AkatsukiThemeLogin.html
└── AkatsukiThemeLogin.js
```

## Características

- Diseño responsive adaptado para móviles y escritorio
- Tema oscuro con detalles en rojo inspirados en Akatsuki
- Formulario de login con email y contraseña
- Opción de login con GitHub
- Imagen de perfil con borde rojo característico
- Animaciones y efectos hover en botones
- Tipografía personalizada "Bolton Serif Regular"
- Nubes rojas de Akatsuki como elementos decorativos
- Validación completa de formularios
- Medidor de seguridad para contraseñas
- Sistema de prevención de múltiples envíos
- Protección contra intentos excesivos de login

## Componentes del Proyecto

### HTML (AkatsukiThemeLogin.html)

El archivo HTML define la estructura básica de la interfaz de login:

- **Estructura de Contenedores**: Utiliza un sistema de contenedores anidados (`login-frame` y `login-container`) para mejor organización visual y posicionamiento de elementos.
- **Nubes Decorativas**: Imágenes PNG de nubes rojas, características de Akatsuki, posicionadas estratégicamente alrededor del formulario.
- **Formulario de Login**: Campos para email y contraseña con sus respectivas etiquetas.
- **Toggle de Contraseña**: Botón para mostrar/ocultar la contraseña ingresada.
- **Opciones Alternativas**: Botón de login con GitHub y enlace para registro de nuevos usuarios.

### CSS (AkatsukiThemeLogin.css)

El archivo CSS proporciona todo el estilo visual del tema:

- **Fuente Personalizada**: Implementación de la fuente "Bolton Serif Regular" mediante `@font-face` para darle un estilo distintivo a títulos.
- **Diseño Responsivo**: Uso de `clamp()` para escalado fluido de elementos según el tamaño de pantalla, evitando media queries excesivas.
- **Esquema de Colores**: Predominio de negro (#000) con acentos en rojo (#e4000f), inspirado en los colores de Akatsuki.
- **Efectos Visuales**: Sombras, transiciones y efectos hover para mejorar la experiencia de usuario.
- **Imagen de Perfil**: Estilización del contenedor de imagen con borde circular rojo y efectos de doble borde.
- **Nubes Akatsuki**: Posicionamiento absoluto de imágenes decorativas con z-index negativo para que queden como fondo.
- **Botones Estilizados**: Diseño personalizado para botones de login y botón alternativo de GitHub.
- **Media Queries**: Ajustes adicionales para garantizar compatibilidad con dispositivos móviles.

### JavaScript (AkatsukiThemeLogin.js)

El archivo JavaScript proporciona toda la funcionalidad interactiva:

- **Validación de Email**: 
  - Verificación del formato de email mediante expresiones regulares.
  - Validación en tiempo real mientras el usuario escribe.
  - Mensajes de error contextuales según el tipo de error.

- **Validación de Contraseña**:
  - Verificación de longitud mínima (8 caracteres).
  - Evaluación de fortaleza basada en complejidad (números, mayúsculas, caracteres especiales).
  - Medidor visual de seguridad con código de colores (rojo a verde).

- **Toggle de Contraseña**:
  - Función para mostrar/ocultar la contraseña.
  - Cambio de ícono según el estado de visibilidad.

- **Prevención de Abusos**:
  - Sistema de bloqueo temporal después de múltiples intentos fallidos (5 intentos).
  - Temporizador de 30 segundos para reactivar el formulario.
  - Prevención de envíos múltiples simultáneos.

- **Efectos de Interfaz**:
  - Limpieza del valor por defecto del email al hacer clic.
  - Restauración del valor por defecto si se deja vacío.
  - Indicadores visuales de estado (bordes, colores) según validación.

## Personalización

Para adaptar este tema a tus necesidades:

### Colores

El esquema de colores está basado en Akatsuki, donde el color principal es `#e4000f`. Para cambiar la paleta:

```css
/* Colores principales a modificar */
.login-title, .login-button, .input-group label, .github-login-button {
    color: #e4000f; /* Cambiar a tu color primario */
}

.login-frame {
    border-color: #e4000f; /* Cambiar a tu color primario */
    box-shadow: 0 0 clamp(7px, 1.5vw, 15px) rgba(228, 0, 15, 0.3); /* Ajustar opacidad/color */
}

body {
    background-color: #000; /* Cambiar a tu color de fondo */
}
```

### Imágenes

Puedes personalizar las imágenes reemplazando los archivos en la carpeta `Recursos/`:

- `mc.jpg`: Imagen de perfil (recomendado: imagen cuadrada de 200x200px)
- `cloud.png`: Nubes decorativas (imágenes PNG con transparencia)
- `akatsuki.jpg`: Imagen de fondo (si deseas cambiar el fondo)

### Fuente

Para cambiar la tipografía:

1. Reemplaza los archivos de fuente en la carpeta `Fonts/`
2. Actualiza la regla `@font-face` en el CSS con el nombre de tu nueva fuente
3. Modifica los selectores que utilizan la fuente personalizada

## Implementación

Para implementar este tema de login:

1. Clona este repositorio:
   ```
   git clone https://github.com/tuusuario/akatsuki-login-theme.git
   ```

2. Asegúrate de mantener la estructura de carpetas intacta
   
3. Integra los archivos en tu proyecto web:
   - Para proyectos estáticos: simplemente usa los archivos tal como están
   - Para frameworks como React/Vue: adapta los componentes manteniendo los estilos y funcionalidades

4. Conecta con tu backend modificando el evento submit del formulario:
   ```javascript
   loginForm.addEventListener('submit', function(event) {
       // Reemplaza la simulación por tu lógica real de autenticación
       event.preventDefault();
       
       // Ejemplo de conexión con backend mediante fetch
       fetch('/api/login', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json',
           },
           body: JSON.stringify({
               email: emailInput.value,
               password: passwordInput.value
           })
       })
       .then(response => response.json())
       .then(data => {
           // Manejo de respuesta
       });
   });
   ```

## Compatibilidad

- **Navegadores**: Chrome, Firefox, Safari, Edge (último año)
- **Dispositivos**: Desktops, tablets y móviles
- **Resoluciones**: Diseño responsivo para pantallas desde 320px hasta 1920px

## Consideraciones de Seguridad

Este tema implementa varias validaciones del lado del cliente, pero recuerda que:

- La validación del lado del cliente es solo para mejorar la experiencia del usuario
- **Siempre implementa validación en el servidor** para garantizar la seguridad
- Considera implementar CAPTCHA para mayor protección contra ataques de fuerza bruta
- Utiliza HTTPS para proteger la transmisión de credenciales

## Contribuciones

Las contribuciones son bienvenidas. Si deseas mejorar este tema:

1. Haz un fork del repositorio
2. Crea una rama para tu funcionalidad: `git checkout -b nueva-funcionalidad`
3. Haz commit de tus cambios: `git commit -m 'Añade nueva funcionalidad'`
4. Haz push a la rama: `git push origin nueva-funcionalidad`
5. Envía un pull request

## Créditos

Diseñado y desarrollado desde cero como un proyecto personal por Michael Felipe Corrales Flórez.

Los iconos y elementos visuales están inspirados en el anime Naruto, específicamente en la organización Akatsuki.

## Licencia

[MIT License]

## Créditos

Este proyecto utiliza los siguientes recursos de terceros:

* **Fuente:** [Bolton Serif Regular]([https://www.onlinewebfonts.com/download/d1a27156e441d57c37185c3798b630e9]), creada por Emil Bertell. Esta fuente se utiliza bajo una licencia gratuita para uso personal.

⭐️ Desarrollado con pasión por Michael Felipe Corrales Flórez © 2025
