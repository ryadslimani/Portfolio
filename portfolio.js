document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Gestion propre du curseur personnalisé ---
    const existingCursor = document.querySelector('.custom-cursor');
    if (existingCursor) existingCursor.remove();

    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function renderCursor() {
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        cursor.style.transform = `translate3d(${cursorX - 6}px, ${cursorY - 6}px, 0)`;
        requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Effet hover sur les éléments cliquables
    const hoverElements = document.querySelectorAll('a, button, input, textarea, .skill-badge, .card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });

    // --- 2. Effet de frappe (Typing Effect) dans la Hero Section ---
    const typedTextEl = document.getElementById('typed-text');
    const textsToType = [
        "Bachelor Cybersécurité @ EPITA",
        "Passionné de Sécurité des Systèmes & Réseaux",
        "Développeur Full-Stack & Scripts Python",
        "Créateur de Solutions Numériques"
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeWriter() {
        const currentText = textsToType[textIndex];
        
        if (isDeleting) {
            typedTextEl.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedTextEl.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textsToType.length;
            typingSpeed = 500;
        }

        setTimeout(typeWriter, typingSpeed);
    }
    if (typedTextEl) {
        setTimeout(typeWriter, 1000);
    }

    // --- 3. Bouton Retour en haut de page ---
    const backToTopBtn = document.createElement('a');
    backToTopBtn.href = '#';
    backToTopBtn.classList.add('back-to-top');
    backToTopBtn.innerHTML = '&#8593;';
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- 4. Duplication de la piste pour le Marquee infini ---
    const skillsTrack = document.querySelector('.skills-track');
    if (skillsTrack) {
        skillsTrack.innerHTML += skillsTrack.innerHTML;
    }
});