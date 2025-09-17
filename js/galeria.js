// Galería Modal JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalClose = document.querySelector('.modal-close');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    const galleryItems = document.querySelectorAll('.polaroid-item');
    let currentImageIndex = 0;
    
    // Abrir modal al hacer clic en una imagen
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentImageIndex = index;
            openModal();
        });
    });
    
    // Cerrar modal
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Navegación con botones
    prevBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
        updateModalImage();
    });
    
    nextBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
        updateModalImage();
    });
    
    // Navegación con teclado
    document.addEventListener('keydown', function(e) {
        if (modal.classList.contains('show')) {
            switch(e.key) {
                case 'Escape':
                    closeModal();
                    break;
                case 'ArrowLeft':
                    currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
                    updateModalImage();
                    break;
                case 'ArrowRight':
                    currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
                    updateModalImage();
                    break;
            }
        }
    });
    
    function openModal() {
        modal.classList.add('show');
        updateModalImage();
        document.body.style.overflow = 'hidden'; // Prevenir scroll del body
    }
    
    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto'; // Restaurar scroll del body
    }
    
    function updateModalImage() {
        const currentItem = galleryItems[currentImageIndex];
        const img = currentItem.querySelector('.polaroid-img');
        const title = currentItem.getAttribute('data-title');
        const description = currentItem.getAttribute('data-description');
        const largeImageSrc = currentItem.getAttribute('data-large');
        
        // Usar la imagen grande si está disponible, sino usar la pequeña
        modalImage.src = largeImageSrc || img.src;
        modalImage.alt = img.alt;
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        
        // Actualizar visibilidad de botones de navegación
        if (galleryItems.length <= 1) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'flex';
        }
    }
    
    // Prevenir que el clic en la imagen cierre el modal
    modalImage.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // Prevenir que el clic en la información cierre el modal
    document.querySelector('.modal-info').addEventListener('click', function(e) {
        e.stopPropagation();
    });
});
