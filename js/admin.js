document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');
    const pageSelect = document.getElementById('pageSelect');

    // Check if user is already logged in
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
    if (isLoggedIn && window.location.pathname === '/admin/') {
        window.location.href = '/admin/dashboard.html';
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Simple authentication (replace with proper backend authentication in production)
            if (username === 'beheerder' && password === 'login') {
                sessionStorage.setItem('adminLoggedIn', 'true');
                window.location.href = '/admin/dashboard.html';
            } else {
                loginError.textContent = 'Ongeldige inloggegevens';
            }
        });
    }

    // Dashboard functionality
    const logoutButton = document.getElementById('logoutButton');
    const saveButton = document.getElementById('saveButton');
    const saveContactButton = document.getElementById('saveContactButton');
    const successMessage = document.getElementById('successMessage');
    const contactSuccessMessage = document.getElementById('contactSuccessMessage');

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            sessionStorage.removeItem('adminLoggedIn');
            window.location.href = '/admin/';
        });
    }

    // Check if user is logged in on dashboard
    if (window.location.pathname === '/admin/dashboard.html' && !isLoggedIn) {
        window.location.href = '/admin/';
    }

    // Page switching functionality
    if (pageSelect) {
        pageSelect.addEventListener('change', () => {
            // Hide all content sections
            document.querySelectorAll('.admin-content').forEach(content => {
                content.style.display = 'none';
            });
            
            // Show selected content section
            const selectedContent = document.getElementById(`${pageSelect.value}Content`);
            if (selectedContent) {
                selectedContent.style.display = 'block';
            }
        });
    }

    // Load current content
    const loadContent = () => {
        // Load home content
        const storedHomeContent = localStorage.getItem('homeContent');
        if (storedHomeContent) {
            const content = JSON.parse(storedHomeContent);
            Object.keys(content).forEach(key => {
                const element = document.getElementById(key);
                if (element) {
                    element.value = content[key];
                }
            });
        }

        // Load contact content
        const storedContactContent = localStorage.getItem('contactContent');
        if (storedContactContent) {
            const content = JSON.parse(storedContactContent);
            Object.keys(content).forEach(key => {
                const element = document.getElementById(key);
                if (element) {
                    element.value = content[key];
                }
            });
        }
    };

    // Save content changes for home page
    if (saveButton) {
        saveButton.addEventListener('click', () => {
            const content = {
                // Hero section
                heroTitle: document.getElementById('heroTitle').value,
                heroSubtitle: document.getElementById('heroSubtitle').value,
                
                // Intro section
                introTitle: document.getElementById('introTitle').value,
                introText: document.getElementById('introText').value,
                
                // Info cards
                card1Title: document.getElementById('card1Title').value,
                card1Text: document.getElementById('card1Text').value,
                card1Link: document.getElementById('card1Link').value,
                card2Title: document.getElementById('card2Title').value,
                card2Text: document.getElementById('card2Text').value,
                card2Link: document.getElementById('card2Link').value,
                card3Title: document.getElementById('card3Title').value,
                card3Text: document.getElementById('card3Text').value,
                card3Link: document.getElementById('card3Link').value,
                
                // CTA buttons
                ctaPrimaryText: document.getElementById('ctaPrimaryText').value,
                ctaPrimaryLink: document.getElementById('ctaPrimaryLink').value,
                ctaSecondaryText: document.getElementById('ctaSecondaryText').value,
                ctaSecondaryLink: document.getElementById('ctaSecondaryLink').value,
                
                // Video section
                videoTitle: document.getElementById('videoTitle').value,
                videoUrl: document.getElementById('videoUrl').value
            };

            localStorage.setItem('homeContent', JSON.stringify(content));
            
            // Show success message
            successMessage.textContent = 'Content succesvol opgeslagen!';
            setTimeout(() => {
                successMessage.textContent = '';
            }, 3000);
        });
    }

    // Save content changes for contact page
    if (saveContactButton) {
        saveContactButton.addEventListener('click', () => {
            const content = {
                // Hero section
                contactHeroTitle: document.getElementById('contactHeroTitle').value,
                contactHeroText: document.getElementById('contactHeroText').value,
                
                // Contact information
                contactInfoTitle: document.getElementById('contactInfoTitle').value,
                contactInfoText: document.getElementById('contactInfoText').value,
                contactEmail: document.getElementById('contactEmail').value,
                contactPhone: document.getElementById('contactPhone').value,
                contactLocation: document.getElementById('contactLocation').value,
                
                // Social media section
                socialTitle: document.getElementById('socialTitle').value,
                socialText: document.getElementById('socialText').value,
                
                // Project section
                projectTitle: document.getElementById('projectTitle').value,
                projectText: document.getElementById('projectText').value,
                projectButtonText: document.getElementById('projectButtonText').value,
                projectButtonHref: document.getElementById('projectButtonHref').value
            };

            localStorage.setItem('contactContent', JSON.stringify(content));
            
            // Show success message
            contactSuccessMessage.textContent = 'Contact pagina content succesvol opgeslagen!';
            setTimeout(() => {
                contactSuccessMessage.textContent = '';
            }, 3000);
        });
    }

    // Load content on dashboard
    if (window.location.pathname === '/admin/dashboard.html') {
        loadContent();
    }
}); 