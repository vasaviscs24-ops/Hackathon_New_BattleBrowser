/* =========================================
   NAVBAR SCROLL EFFECT
========================================= */
window.addEventListener('scroll', () => {
    const header = document.getElementById('navbar');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Trigger Curtain and Sequential Entrance on Page Load
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

/* =========================================
   HERO SLIDER (AUTO CHANGE EVERY 10S)
========================================= */
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        
        const nextSlide = () => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        };

        setInterval(nextSlide, 10000);
    }
});

/* =========================================
   SCROLL REVEAL ANIMATIONS
========================================= */
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if(entry.target.classList.contains('about-block')){
                entry.target.classList.add('visible');
            }
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0) scale(1)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach(el => {
        el.style.opacity = 0;
        if (el.classList.contains('right')) {
            el.style.transform = 'translateX(40px) scale(0.95)';
        } else if (el.classList.contains('left')) {
            el.style.transform = 'translateX(-40px) scale(0.95)';
        } else {
            el.style.transform = 'translateY(40px) scale(0.95)';
        }
        el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
    });
});

/* =========================================
   🌟 UNIQUE INTERACTIVE ANIMATIONS 🌟
========================================= */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mouse Parallax for Backgrounds
    document.addEventListener('mousemove', (e) => {
        // Parallax background watermark logo
        const bg = document.querySelector('.about-brand-bg');
        if (bg) {
            const x = (window.innerWidth - e.pageX * 2) / 90;
            const y = (window.innerHeight - e.pageY * 2) / 90;
            bg.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
        }

        const researchBg = document.querySelector('.research-brand-bg');
        if (researchBg) {
            const x = (window.innerWidth - e.pageX * 2) / 60;
            const y = (window.innerHeight - e.pageY * 2) / 60;
            researchBg.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
        }

        const placementBg = document.querySelector('.placement-brand-bg');
        if (placementBg) {
            const x = (window.innerWidth - e.pageX * 2) / 60;
            const y = (window.innerHeight - e.pageY * 2) / 60;
            placementBg.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
        }

        // Parallax background orbs
        const orbX = (window.innerWidth - e.pageX * 2) / 100;
        const orbY = (window.innerHeight - e.pageY * 2) / 100;
        document.body.style.setProperty('--mouseX', `${orbX}px`);
        document.body.style.setProperty('--mouseY', `${orbY}px`);
    });

    // 2. Interactive 3D Glare & Tilt Effect for Glass Cards
    const tiltElements = document.querySelectorAll('.about-block, .preview-content, .visionary-card, .partner-card, .club-item');
    
    tiltElements.forEach(el => {
        el.style.transformStyle = 'preserve-3d';
        
        el.addEventListener('mousemove', (e) => {
            if (window.innerWidth <= 820) return; // Disable tilt on mobile for performance and better touch interaction
            
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -3;
            const rotateY = ((x - centerX) / centerX) * 3;
            
            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            el.style.transition = 'transform 0.1s ease-out';
            el.style.background = `rgba(255, 255, 255, 0.03) radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.08) 0%, transparent 60%)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
            el.style.transition = 'transform 0.5s ease-out, background 0.5s ease-out';
            el.style.background = 'rgba(255, 255, 255, 0.03)';
        });
    });

    /* =========================================
       MOBILE HAMBURGER MENU
    ========================================= */
    const header = document.getElementById('navbar');
    if (header) {
        // Inject hamburger button
        const hamburger = document.createElement('button');
        hamburger.classList.add('hamburger');
        hamburger.setAttribute('aria-label', 'Toggle navigation');
        hamburger.innerHTML = '<span></span><span></span><span></span>';
        header.appendChild(hamburger);

        // Inject overlay
        const overlay = document.createElement('div');
        overlay.classList.add('nav-overlay');
        document.body.appendChild(overlay);

        const navLinks = header.querySelector('.nav-links');

        // Add dropdown arrows to mobile dropdowns
        const dropdowns = navLinks ? navLinks.querySelectorAll('.dropdown > a') : [];
        dropdowns.forEach(a => {
            const arrow = document.createElement('span');
            arrow.classList.add('dropdown-arrow');
            arrow.textContent = '▾';
            a.appendChild(arrow);
        });

        const openNav = () => {
            hamburger.classList.add('open');
            if (navLinks) navLinks.classList.add('open');
            overlay.classList.add('open');
            document.body.style.overflow = 'hidden';
            overlay.style.display = 'block';
            setTimeout(() => { overlay.style.opacity = '1'; }, 10);
        };

        const closeNav = () => {
            hamburger.classList.remove('open');
            if (navLinks) navLinks.classList.remove('open');
            overlay.style.opacity = '0';
            setTimeout(() => { 
                overlay.classList.remove('open');
                overlay.style.display = 'none'; 
            }, 400);
            document.body.style.overflow = '';
            if (navLinks) {
                navLinks.querySelectorAll('.dropdown').forEach(d => d.classList.remove('mobile-open'));
            }
        };

        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            if (hamburger.classList.contains('open')) closeNav();
            else openNav();
        });

        overlay.addEventListener('click', closeNav);

        // Mobile accordion dropdowns
        dropdowns.forEach(a => {
            a.addEventListener('click', (e) => {
                if (window.innerWidth <= 820) {
                    e.preventDefault();
                    e.stopPropagation();
                    const parent = a.closest('.dropdown');
                    parent.classList.toggle('mobile-open');
                }
            });
        });

        // Close nav on resize back to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 820) closeNav();
        });
    }
});
