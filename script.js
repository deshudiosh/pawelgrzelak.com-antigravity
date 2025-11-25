document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('main-nav');
    const landingSection = document.getElementById('landing');
    
    // Show nav after scrolling past landing page (or a portion of it)
    window.addEventListener('scroll', () => {
        const triggerPoint = landingSection.offsetHeight - 100; // 100px before end of landing
        
        if (window.scrollY > triggerPoint) {
            nav.classList.add('visible');
        } else {
            nav.classList.remove('visible');
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
});
