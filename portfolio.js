// Mise à jour automatique de l'année dans le footer
document.addEventListener("DOMContentLoaded", () => {
    const yearSpan = document.getElementById("current-year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    console.log("SOC Security Portal loaded successfully - Ryad Slimani");
});

// Smooth scroll pour les ancres
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// --- APPARITION DU BOUTON RETOUR EN HAUT ---
document.addEventListener("DOMContentLoaded", () => {
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
    }
});

// --- ANIMATION MACHINE À ÉCRIRE (SUBTITLE) ---
document.addEventListener("DOMContentLoaded", function() {
    const words = [
        "Sécurité des Systèmes & Réseaux",
        "Analyste SOC / SecOps",
        "Pentester & Red Teamer",
        "Ingénieur Hardening & DevOps",
        "Architecte en Cybersécurité"
    ];
    
    let i = 0;
    const speed = 100; // Vitesse de frappe
    const deletingSpeed = 50; // Vitesse d'effacement
    const delayBetweenWords = 2000; // Pause avant effacement
    const element = document.getElementById("typed-text");

    function typeWriter(text, index, callback) {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            setTimeout(() => typeWriter(text, index + 1, callback), speed);
        } else {
            setTimeout(callback, delayBetweenWords);
        }
    }

    function deleteWriter(callback) {
        let currentText = element.textContent;
        if (currentText.length > 0) {
            element.textContent = currentText.substring(0, currentText.length - 1);
            setTimeout(() => deleteWriter(callback), deletingSpeed);
        } else {
            callback();
        }
    }

    function startLoop() {
        typeWriter(words[i], 0, function() {
            deleteWriter(function() {
                i = (i + 1) % words.length;
                startLoop();
            });
        });
    }

    if (element) {
        startLoop();
    }
});

// --- CURSEUR PERSONNALISÉ ---
document.addEventListener("DOMContentLoaded", () => {
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        let speed = 0.2; // Inertie
        
        cursorX += (mouseX - cursorX) * speed;
        cursorY += (mouseY - cursorY) * speed;
        
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();

    // Ajout de '.skill-badge' pour activer l'effet du curseur sur les compétences
    document.querySelectorAll('a, button, input, textarea, .card, .skill-badge').forEach(element => {
        element.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
        element.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });
});