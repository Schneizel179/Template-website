// Menu burger
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('active'));
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Custom cursor
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});
document.addEventListener('mouseleave', () => cursor.style.opacity = '0');
document.addEventListener('mouseenter', () => cursor.style.opacity = '1');

// Galerie images (Unsplash haute qualité)
const galleryImages = [
    'https://images.unsplash.com/photo-1585747860714-2ba6c120c2c9?w=800',
    'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800',
    'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800',
    'https://images.unsplash.com/photo-1582653291997-079a1c04e5a1?w=800',
    'https://images.unsplash.com/photo-1503951914875-3f5784d9a6b5?w=800',
    'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800'
];
const galleryGrid = document.querySelector('.gallery-grid');
if(galleryGrid) {
    galleryImages.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = 'Coupe barber';
        img.loading = 'lazy';
        galleryGrid.appendChild(img);
    });
}

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeLightbox = document.querySelector('.lightbox .close');
document.querySelectorAll('.gallery-grid img').forEach(img => {
    img.addEventListener('click', () => {
        lightbox.style.display = 'flex';
        lightboxImg.src = img.src;
    });
});
if(closeLightbox) {
    closeLightbox.addEventListener('click', () => lightbox.style.display = 'none');
    lightbox.addEventListener('click', (e) => {
        if(e.target === lightbox) lightbox.style.display = 'none';
    });
}

// Témoignages (défilement)
const testimonialsData = [
    { stars: 5, text: "Un accueil exceptionnel. Le soin barbe est un moment de pure détente. Je recommande vivement.", author: "Antoine D." },
    { stars: 5, text: "Coupe parfaite et ambiance très chic. Le meilleur barbier du 11e.", author: "Jordan L." },
    { stars: 5, text: "Professionnalisme et savoir-faire. Les prix sont très corrects pour la qualité.", author: "Sarah K." }
];
const track = document.getElementById('testimonialTrack');
function loadTestimonials() {
    track.innerHTML = '';
    testimonialsData.forEach(t => {
        const div = document.createElement('div');
        div.className = 'testimonial';
        let starsHtml = '';
        for(let i=0;i<5;i++) starsHtml += '<i class="fas fa-star"></i>';
        div.innerHTML = `
            <div class="stars">${starsHtml}</div>
            <p>“${t.text}”</p>
            <h4>— ${t.author}</h4>
        `;
        track.appendChild(div);
    });
    let current = 0;
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    function updateSlider() {
        track.style.transform = `translateX(-${current * 100}%)`;
    }
    if(prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            current = (current - 1 + testimonialsData.length) % testimonialsData.length;
            updateSlider();
        });
        nextBtn.addEventListener('click', () => {
            current = (current + 1) % testimonialsData.length;
            updateSlider();
        });
    }
}
loadTestimonials();

// Carte Leaflet
const map = L.map('map').setView([48.8566, 2.3779], 15);
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
}).addTo(map);
L.marker([48.8566, 2.3779]).addTo(map)
    .bindPopup('Barber Noir<br>24 rue de la Folie-Méricourt')
    .openPopup();

// Formulaire de contact (Formspree)
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
if(form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });
            if(response.ok) {
                formStatus.textContent = '✅ Message envoyé !';
                formStatus.style.color = '#c8a96e';
                form.reset();
            } else {
                formStatus.textContent = '❌ Erreur, réessayez.';
            }
        } catch(err) {
            formStatus.textContent = '❌ Erreur réseau.';
        }
    });
}

// Animation au scroll (simple)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });
document.querySelectorAll('.service-card, .gallery-grid img, .contact-grid > div').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = '0.6s';
    observer.observe(el);
});