// JavaScript para menús desplegables de arcos
document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const dropdownContent = document.getElementById(targetId);
            
            // Cerrar todos los otros dropdowns
            document.querySelectorAll('.dropdown-content').forEach(content => {
                if (content.id !== targetId) {
                    content.classList.remove('active');
                    content.previousElementSibling.classList.remove('active');
                }
            });
            
            // Toggle del dropdown actual
            dropdownContent.classList.toggle('active');
            this.classList.toggle('active');
            
            // Scroll suave hacia el dropdown si se está abriendo
            if (dropdownContent.classList.contains('active')) {
                setTimeout(() => {
                    dropdownContent.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest'
                    });
                }, 300);
            }
        });
    });
    
    // Cerrar dropdowns al hacer clic fuera de ellos
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.arco-dropdown')) {
            document.querySelectorAll('.dropdown-content').forEach(content => {
                content.classList.remove('active');
            });
            document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
                toggle.classList.remove('active');
            });
        }
    });
    
    // Cerrar dropdowns con la tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.dropdown-content').forEach(content => {
                content.classList.remove('active');
            });
            document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
                toggle.classList.remove('active');
            });
        }
    });
    
    // Animación de entrada para los elementos de la lista
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = `${Array.from(entry.target.parentNode.children).indexOf(entry.target) * 0.1}s`;
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observar todos los elementos de lista de arcos
    document.querySelectorAll('.arco-arcs li').forEach(li => {
        observer.observe(li);
    });
});
