document.addEventListener('DOMContentLoaded', () => {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const callback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(callback, options);

    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}); 