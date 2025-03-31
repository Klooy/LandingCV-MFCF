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
     elem.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
     fadeInObserver.observe(elem);
 });

 // Carrusel functionality
document.addEventListener('DOMContentLoaded', () => {
// Inicializar todos los carruseles en la página
const carousels = document.querySelectorAll('.carousel');

carousels.forEach(carousel => {
 const container = carousel.querySelector('.carousel-container');
 const items = carousel.querySelectorAll('.carousel-item');
 const prevBtn = carousel.querySelector('.prev');
 const nextBtn = carousel.querySelector('.next');
 const indicators = carousel.querySelectorAll('.carousel-indicator');
 const carouselId = carousel.id;
 
 let currentIndex = 0;
 const totalItems = items.length;
 
 // Función para mover el carrusel a un índice específico
 const moveToIndex = (index) => {
     if (index < 0) index = totalItems - 1;
     if (index >= totalItems) index = 0;
     
     currentIndex = index;
     const translateValue = -index * 100 + '%';
     container.style.transform = 'translateX(' + translateValue + ')';
     
     // Actualizar indicadores
     indicators.forEach((indicator, i) => {
         if (i === currentIndex) {
             indicator.classList.add('active');
         } else {
             indicator.classList.remove('active');
         }
     });
 };
 
 // Event listeners para los botones de navegación
 if (prevBtn) {
     prevBtn.addEventListener('click', () => {
         moveToIndex(currentIndex - 1);
     });
 }
 
 if (nextBtn) {
     nextBtn.addEventListener('click', () => {
         moveToIndex(currentIndex + 1);
     });
 }
 
 // Event listeners para los indicadores
 indicators.forEach((indicator, index) => {
     indicator.addEventListener('click', () => {
         moveToIndex(index);
     });
 });
 
 // Inicializar el carrusel
 moveToIndex(0);
});
});