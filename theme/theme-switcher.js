 // Función para manejar el cambio de tema
 function setupThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    
    // Verificar si hay una preferencia guardada
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    themeToggleBtn.addEventListener('click', function() {
        // Verificar el tema actual
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        
        // Cambiar al tema opuesto
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // Actualizar el atributo en el HTML
        document.documentElement.setAttribute('data-theme', newTheme);
        
        // Guardar la preferencia en localStorage
        localStorage.setItem('theme', newTheme);
    });
    
    // Comprobar si el sistema del usuario prefiere modo oscuro
    function checkSystemPreference() {
        if (!localStorage.getItem('theme') && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    }
    
    checkSystemPreference();
    
    // Escuchar cambios en la preferencia del sistema
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            if (!localStorage.getItem('theme')) {
                const newTheme = event.matches ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', newTheme);
            }
        });
    }
}

// Inicializar el toggle de tema cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    setupThemeToggle();
});
 
 // Back to top button functionality
 const backToTopButton = document.getElementById('backToTop');
        
 window.addEventListener('scroll', () => {
     if (window.pageYOffset > 300) {
         backToTopButton.classList.add('visible');
     } else {
         backToTopButton.classList.remove('visible');
     }
 });
 
 // Smooth scrolling for all links
 document.querySelectorAll('a[href^="#"]').forEach(anchor => {
     anchor.addEventListener('click', function(e) {
         e.preventDefault();
         
         document.querySelector(this.getAttribute('href')).scrollIntoView({
             behavior: 'smooth'
         });
     });
 });
 
 // Fade-in animation for sections when scrolling
 const fadeElems = document.querySelectorAll('.fade-in');
 
 const fadeInObserver = new IntersectionObserver((entries) => {
     entries.forEach(entry => {
         if (entry.isIntersecting) {
             entry.target.style.opacity = 1;
             entry.target.style.transform = 'translateY(0)';
             fadeInObserver.unobserve(entry.target);
         }
     });
 }, {
     threshold: 0.1
 });
 
 fadeElems.forEach(elem => {
     elem.style.opacity = 0;
     elem.style.transform = 'translateY(20px)';
     elem.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
     fadeInObserver.observe(elem);
 });
