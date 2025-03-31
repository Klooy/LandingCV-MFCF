document.addEventListener('DOMContentLoaded', function() {
    // Referencia al formulario y al mensaje de estado
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    // Event listener para el envío del formulario
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
            
            // Obtener los valores del formulario
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validación básica del formulario
            if (!name || !email || !subject || !message) {
                showStatus('Por favor, completa todos los campos.', 'error');
                return;
            }
            
            // Validar el formato del correo electrónico
            if (!isValidEmail(email)) {
                showStatus('Por favor, introduce un correo electrónico válido.', 'error');
                return;
            }
            
            // Aquí puedes integrar con tu servicio de correo preferido
            // Por ahora, simularemos un envío exitoso
            
            // Simulación de envío (tiempo de espera para simular la comunicación con el servidor)
            showStatus('Enviando mensaje...', 'sending');
            
            setTimeout(() => {
                // En un caso real, aquí enviarías los datos al servidor mediante fetch o XMLHttpRequest
                
                // Mostrar mensaje de éxito y resetear el formulario
                showStatus('¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.', 'success');
                contactForm.reset();
                
                // Después de 5 segundos, ocultar el mensaje de estado
                setTimeout(() => {
                    formStatus.style.display = 'none';
                    formStatus.className = 'form-status';
                }, 5000);
            }, 1500);
        });
    }
    
    // Función para mostrar mensajes de estado
    function showStatus(message, type) {
        formStatus.textContent = message;
        formStatus.className = 'form-status ' + type;
        formStatus.style.display = 'block';
    }
    
    // Función para validar el formato del correo electrónico
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});

// Si deseas integrar el formulario con servicios como FormSubmit o Formspree,
// podrías implementar las siguientes funciones:

/*
// Ejemplo de integración con Formspree
function submitToFormspree() {
    const form = document.getElementById('contactForm');
    const formData = new FormData(form);
    
    fetch('https://formspree.io/f/tu-id-formspree', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Error en el envío del formulario');
    })
    .then(data => {
        showStatus('¡Mensaje enviado con éxito!', 'success');
        form.reset();
    })
    .catch(error => {
        showStatus('Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.', 'error');
    });
}
*/

/*
// Ejemplo de integración con EmailJS
function submitWithEmailJS() {
    emailjs.sendForm('tu_service_id', 'tu_template_id', document.getElementById('contactForm'))
    .then(function() {
        showStatus('¡Mensaje enviado con éxito!', 'success');
        document.getElementById('contactForm').reset();
    }, function(error) {
        showStatus('Hubo un error al enviar el mensaje: ' + error.text, 'error');
    });
}
*/