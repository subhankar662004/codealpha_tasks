const galleryItems = document.querySelectorAll('.gallery-item');
const filterBtns = document.querySelectorAll('.filter-btn');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const closeBtn = document.getElementById('closeBtn');

let currentIndex = 0;
let filteredItems = Array.from(galleryItems);


filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        if (filter === 'all') {
            filteredItems = Array.from(galleryItems);
            galleryItems.forEach(item => item.style.display = 'block');
        } else {
            filteredItems = Array.from(galleryItems).filter(item => item.getAttribute('data-category') === filter);
            galleryItems.forEach(item => {
                if (item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        }
    });
});


galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentIndex = Array.from(filteredItems).indexOf(item);
        showLightbox(currentIndex);
    });
});

function showLightbox(index) {
    const item = filteredItems[index];
    lightboxImg.src = item.querySelector('img').src;
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    lightbox.style.display = 'none';
}

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    showLightbox(currentIndex);
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % filteredItems.length;
    showLightbox(currentIndex);
});

closeBtn.addEventListener('click', () => {
    closeLightbox();
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') {
        if (e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn.click();
        } else if (e.key === 'Escape') {
            closeLightbox();
        }
    }
});
