document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('main-nav');
    const landingSection = document.getElementById('landing');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    // Show nav after scrolling past landing page (or a portion of it)
    // Also handle scroll indicator color and visibility
    window.addEventListener('scroll', () => {
        const triggerPoint = landingSection.offsetHeight * 0.5; // Show when 50% scrolled
        const landingHeight = landingSection.offsetHeight;
        
        // Navigation visibility
        if (window.scrollY > triggerPoint) {
            nav.classList.add('visible');
        } else {
            nav.classList.remove('visible');
        }
        
        // Scroll indicator color change
        if (window.scrollY > landingHeight) {
            scrollIndicator.classList.add('dark');
        } else {
            scrollIndicator.classList.remove('dark');
        }
        
        // Hide scroll indicator when at bottom of page
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;
        const clientHeight = window.innerHeight;
        
        if (scrollTop + clientHeight >= scrollHeight - 50) {
            scrollIndicator.classList.add('hidden');
        } else {
            scrollIndicator.classList.remove('hidden');
        }
    });

    // Smooth scroll for anchor links (handled by CSS, but good to have JS backup/enhancement if needed)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% of element is visible
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
});
