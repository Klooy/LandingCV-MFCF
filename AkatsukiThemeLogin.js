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