document.addEventListener('DOMContentLoaded', () => {
    const hamburgerButton = document.getElementById('hamburger-button');
    const mainNav = document.getElementById('main-nav');

    // Menú hamburguesa
    if (hamburgerButton && mainNav) {
        hamburgerButton.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });

        // Cerrar menú al hacer clic en un enlace
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
            });
        });
    }

    // Scroll suave para enlaces internos
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Efecto de scroll en el header
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(0, 0, 0, 0.98)';
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
            } else {
                header.style.background = 'rgba(0, 0, 0, 0.95)';
                header.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
            }
        });
    }

    // Animación de entrada para las cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplicar animación a las cards
    const cards = document.querySelectorAll('.character, .arco-card, .galeria-item, .detalle-item');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Efecto de hover mejorado para las imágenes de personajes
    const characterImages = document.querySelectorAll('.character img');
    characterImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Funcionalidad del menú desplegable de temporadas
    const temporadasToggle = document.getElementById('temporadas-toggle');
    const temporadasMenu = document.getElementById('temporadas-menu');
    
    if (temporadasToggle && temporadasMenu) {
        // Toggle del menú desplegable
        temporadasToggle.addEventListener('click', (e) => {
            e.preventDefault();
            temporadasMenu.classList.toggle('active');
        });

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!temporadasToggle.contains(e.target) && !temporadasMenu.contains(e.target)) {
                temporadasMenu.classList.remove('active');
            }
        });

        // Funcionalidad de navegación a temporadas específicas
        const temporadasLinks = temporadasMenu.querySelectorAll('a[href^="#"]');
        temporadasLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                
                // Si estamos en la página de arcos, navegar a la sección específica
                if (window.location.pathname.includes('arcos.html')) {
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                } else {
                    // Si no estamos en arcos.html, navegar a esa página
                    window.location.href = 'arcos.html#' + targetId;
                }
                
                // Cerrar el menú desplegable
                temporadasMenu.classList.remove('active');
            });
        });

        // Efecto de hover para mostrar información adicional
        temporadasLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                const episodes = this.getAttribute('data-episodes');
                if (episodes) {
                    this.title = `Episodios ${episodes}`;
                }
            });
        });
    }
});
