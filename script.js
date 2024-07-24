document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true
    });

    // GSAP Animations
    gsap.from('nav ul li', { duration: 1, opacity: 0, y: -20, stagger: 0.2 });
    gsap.from('#home h1', { duration: 1, opacity: 0, y: 50 });
    gsap.from('#home p', { duration: 1, opacity: 0, y: 50, delay: 0.5 });

    // Home section animation
    gsap.from('.content', { duration: 1, opacity: 0, y: 50, stagger: 0.3 });
});
