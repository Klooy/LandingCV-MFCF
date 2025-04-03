// Imput Para Email

const emailInput = document.getElementById('email');
const defaultEmail = 'm@example.com';

emailInput.addEventListener('click', function() {
  if (this.value === defaultEmail) {
    this.value = '';
  }
});

// Opcional: Puedes también rellenar el valor por defecto si el usuario hace clic fuera del campo sin escribir nada.
emailInput.addEventListener('blur', function() {
  if (this.value === '') {
    this.value = defaultEmail;
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
