document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Curseurs personnalisés ---
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
    const subtitleEl = document.querySelector('.subtitle');
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
            subtitleEl.textContent = currentText.substring(0, charIndex - 1) + "_";
            charIndex--;
            typingSpeed = 50;
        } else {
            subtitleEl.textContent = currentText.substring(0, charIndex + 1) + "_";
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause à la fin du mot
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textsToType.length;
            typingSpeed = 500; // Pause avant le prochain mot
        }

        setTimeout(typeWriter, typingSpeed);
    }
    if (subtitleEl) {
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

    // --- 4. Duplication de la piste pour le Marquee infini des compétences ---
    const skillsTrack = document.querySelector('.skills-track');
    if (skillsTrack) {
        // On duplique le contenu pour assurer une boucle fluide sans saccade
        skillsTrack.innerHTML += skillsTrack.innerHTML;
    }

    // --- 5. Simulation d'envoi du formulaire de contact ---
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = "ENVOI EN COURS...";
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.textContent = "MESSAGE TRANSMIS !";
                submitBtn.style.backgroundColor = "#10b981";
                contactForm.reset();

                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.backgroundColor = "";
                    submitBtn.disabled = false;
                }, 3000);
            }, 1200);
        });
    }
});