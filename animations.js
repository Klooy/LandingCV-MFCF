// ====== SCRIPTS PARA ANIMACIONES AVANZADAS ======

// Intersection Observer para animaciones on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

// Aplicar observer a elementos específicos
document.addEventListener('DOMContentLoaded', function() {
    // Elementos que se animarán al hacer scroll
    const animateElements = document.querySelectorAll('.section, .education-item, .experience-item, .certification');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // Animación de entrada progresiva para elementos de lista
    const skillLists = document.querySelectorAll('.skill-list');
    skillLists.forEach(list => {
        const items = list.querySelectorAll('li');
        items.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
            item.classList.add('slide-in-bottom');
        });
    });

    // Efecto de escritura para títulos de sección
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach((title, index) => {
        title.style.animationDelay = `${index * 0.5}s`;
    });

    // Animación de contador para fechas
    const dates = document.querySelectorAll('.item-date');
    dates.forEach((date, index) => {
        date.style.animationDelay = `${index * 0.2}s`;
    });

    // Efecto magnetic para elementos interactivos
    const magneticElements = document.querySelectorAll('.download-cv, .contact-form-link, .back-to-top');
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0, 0)';
        });
    });

    // Animación de partículas en el header
    createFloatingParticles();

    // Efecto de parallax suave
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.intro');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Animación de carga para skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        setTimeout(() => {
            tag.style.animation = 'slideInFromBottom 0.5s ease-out forwards';
        }, index * 100);
    });
});

// Función para crear partículas flotantes
function createFloatingParticles() {
    const header = document.querySelector('header');
    const particleCount = 5;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background-color: var(--accent-color);
            border-radius: 50%;
            opacity: 0.6;
            pointer-events: none;
            z-index: 1;
        `;
        
        // Posición aleatoria
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Animación aleatoria
        particle.style.animation = `float ${3 + Math.random() * 2}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        header.appendChild(particle);
    }
}

// Efecto de typewriter mejorado
function typewriterEffect(element, text, speed = 100) {
    element.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Aplicar efecto typewriter al nombre principal
const mainTitle = document.querySelector('.header-text h1');
if (mainTitle) {
    const originalText = mainTitle.textContent;
    setTimeout(() => {
        typewriterEffect(mainTitle, originalText, 150);
    }, 1000);
}

// Animación de counter para números
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    
    function step(timestamp) {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    }
    
    window.requestAnimationFrame(step);
}

// Efecto de reveal para contenido
function revealContent() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealContent);

// Efecto de smooth scroll mejorado
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animación de entrada para proyectos
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    
    setTimeout(() => {
        card.style.transition = 'all 0.6s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, index * 200);
});

// Efecto de hover mejorado para enlaces
const links = document.querySelectorAll('a');
links.forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Performance optimization: Reduce animaciones en dispositivos móviles
function isMobile() {
    return window.innerWidth <= 768;
}

if (isMobile()) {
    // Desactivar algunas animaciones complejas en móviles
    document.documentElement.style.setProperty('--animation-duration', '0.3s');
} else {
    document.documentElement.style.setProperty('--animation-duration', '0.6s');
}