document.addEventListener('DOMContentLoaded', () => {
    const filterTags = document.querySelectorAll('.filter-tag');
    const projectCards = document.querySelectorAll('.project-card');

    function filterProjects(category) {
        projectCards.forEach(card => {
            const cardCategory = card.querySelector('.project-tag').textContent;
            
            // If "Alle projecten" is selected or the card matches the selected category
            if (category === 'Alle projecten' || cardCategory === category) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Add click handlers to filter tags
    filterTags.forEach(tag => {
        tag.addEventListener('click', () => {
            // Remove active class from all tags
            filterTags.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tag
            tag.classList.add('active');
            // Filter the projects
            filterProjects(tag.textContent);
        });
    });

    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}); 