document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('main-nav');
    const landingSection = document.getElementById('landing');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    // Show nav after scrolling past landing page (or a portion of it)
    // Also handle scroll indicator visibility
    window.addEventListener('scroll', () => {
        const triggerPoint = landingSection.offsetHeight * 0.5; // Trigger at 50% of landing
        
        // Navigation visibility
        if (window.scrollY > triggerPoint) {
            nav.classList.add('visible');
        } else {
            nav.classList.remove('visible');
        }
        
        // Hide scroll indicator after scrolling past half of landing page
        if (window.scrollY > triggerPoint) {
            scrollIndicator.classList.add('hidden');
        } else {
            scrollIndicator.classList.remove('hidden');
        }
    });

    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    // nav is already defined at the top of the file
    
    function toggleMenu() {
        const isActive = hamburger.classList.contains('active');
        
        if (!isActive) {
            // Open menu
            hamburger.classList.add('active');
            navLinks.classList.add('active');
            nav.classList.add('mobile-active');
            document.body.style.overflow = 'hidden'; // Lock scroll
        } else {
            // Close menu
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            nav.classList.remove('mobile-active');
            document.body.style.overflow = ''; // Unlock scroll
        }
    }
    
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent triggering document click if we add one later
        toggleMenu();
    });
    
    // Close menu when clicking anywhere on the overlay (links or background)
    navLinks.addEventListener('click', () => {
        if (hamburger.classList.contains('active')) {
            toggleMenu();
        }
    });

    // Smooth scroll for anchor links with View Transitions API
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Check if View Transitions API is supported
                if (document.startViewTransition) {
                    // Use View Transitions API for smooth animated transition
                    document.startViewTransition(() => {
                        targetSection.scrollIntoView({
                            behavior: 'smooth'
                        });
                    });
                } else {
                    // Fallback for browsers that don't support View Transitions
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Check if it's a project card for staggered animation
                if (entry.target.classList.contains('project-card')) {
                    // Get all project cards
                    const projectCards = document.querySelectorAll('.project-card');
                    const index = Array.from(projectCards).indexOf(entry.target);
                    
                    // Add staggered delay (150ms per card)
                    setTimeout(() => {
                        entry.target.classList.add('active');
                    }, index * 150);
                } else {
                    // Non-project elements reveal immediately
                    entry.target.classList.add('active');
                }
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
