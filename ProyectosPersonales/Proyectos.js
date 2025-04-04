// Función para manejar el efecto de las tarjetas de proyectos
document.addEventListener('DOMContentLoaded', () => {
    // Obtener todos los botones de proyecto
    const projectButtons = document.querySelectorAll('.project-btn');
    
    // Añadir event listener a cada botón
    projectButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            // Encontrar la tarjeta padre
            const projectCard = button.closest('.project-card');
            // Alternar la clase para girar la tarjeta
            projectCard.querySelector('.project-content').style.transform = 'rotateY(180deg)';
        });
    });
    
    // Permitir volver a la parte frontal al hacer clic en cualquier parte de la tarjeta
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        const backSide = card.querySelector('.project-back');
        backSide.addEventListener('click', (e) => {
            // Si se hizo clic en el enlace, no prevenimos la acción predeterminada
            if (!e.target.classList.contains('project-link')) {
                e.preventDefault();
                card.querySelector('.project-content').style.transform = 'rotateY(0deg)';
            }
        });
    });
});