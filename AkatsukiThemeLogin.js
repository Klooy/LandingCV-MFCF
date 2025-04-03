// Validación de Email
const emailInput = document.getElementById('email');
const defaultEmail = 'm@example.com';

// Función para validar el formato del email
function validateEmail(email) {
    return email.includes('@');
}

// Crear un elemento para mostrar el mensaje de error
const errorMessage = document.createElement('div');
errorMessage.style.color = '#ccc';
errorMessage.style.fontSize = 'clamp(0.7em, 0.8vw, 0.8em)';
errorMessage.style.marginTop = '5px';
errorMessage.style.textAlign = 'left';
errorMessage.style.display = 'none';
errorMessage.textContent = 'El correo debe contener el símbolo "@"';

// Insertar el mensaje de error después del input de email
emailInput.parentNode.appendChild(errorMessage);

// Evento click para limpiar el valor por defecto
emailInput.addEventListener('click', function() {
  if (this.value === defaultEmail) {
    this.value = '';
  }
});

// Validación cuando el usuario termina de escribir
emailInput.addEventListener('blur', function() {
  if (this.value === '') {
    this.value = defaultEmail;
    errorMessage.style.display = 'none';
  } else if (!validateEmail(this.value)) {
    // Mostrar mensaje de error si el email no contiene @
    errorMessage.style.display = 'block';
    // Opcional: Cambiar el borde del input para indicar error
    this.style.borderColor = '#e4000f';
    this.style.borderWidth = '2px';
  } else {
    // Ocultar mensaje si el email es válido
    errorMessage.style.display = 'none';
    // Restaurar el estilo del borde
    this.style.borderColor = '#e4000f';
    this.style.borderWidth = '1px';
  }
});

// Validación en tiempo real mientras el usuario escribe
emailInput.addEventListener('input', function() {
  if (this.value === '' || validateEmail(this.value)) {
    // Ocultar mensaje si el campo está vacío o el email es válido
    errorMessage.style.display = 'none';
    // Restaurar el estilo del borde
    this.style.borderColor = '#e4000f';
    this.style.borderWidth = '1px';
  } else {
    // Mostrar mensaje de error
    errorMessage.style.display = 'block';
    // Cambiar el borde del input para indicar error
    this.style.borderColor = '#e4000f';
    this.style.borderWidth = '2px';
  }
});

// Validación al enviar el formulario
const loginForm = document.querySelector('form');
loginForm.addEventListener('submit', function(event) {
  if (!validateEmail(emailInput.value)) {
    event.preventDefault(); // Detener el envío del formulario
    errorMessage.style.display = 'block';
    emailInput.style.borderColor = '#e4000f';
    emailInput.style.borderWidth = '2px';
    emailInput.focus(); // Dar foco al campo de email
  }
});

// Botón de acción para visualizar contraseña
document.addEventListener('DOMContentLoaded', function() {
    // Función para alternar la visibilidad de la contraseña
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            // Cambiar el tipo de input entre "password" y "text"
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Alternar la clase para cambiar el ícono
            this.classList.toggle('visible');
        });
    }
});
