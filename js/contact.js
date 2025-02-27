document.addEventListener('DOMContentLoaded', () => {
    // Load content from localStorage
    const storedContent = localStorage.getItem('contactContent');
    if (storedContent) {
        const content = JSON.parse(storedContent);
        console.log('Loading content:', content); // Debug log
        
        // Update hero section
        const heroTitle = document.querySelector('.contact-hero h1');
        const heroText = document.querySelector('.contact-hero p');
        if (heroTitle && content.contactHeroTitle) heroTitle.textContent = content.contactHeroTitle;
        if (heroText && content.contactHeroText) heroText.textContent = content.contactHeroText;

        // Update contact information
        const contactInfoTitle = document.querySelector('.contact-page-card h2');
        const contactInfoText = document.querySelector('.contact-page-card > p');
        if (contactInfoTitle && content.contactInfoTitle) contactInfoTitle.textContent = content.contactInfoTitle;
        if (contactInfoText && content.contactInfoText) contactInfoText.textContent = content.contactInfoText;

        // Update contact details
        const emailLink = document.querySelector('.email-info');
        const phoneLink = document.querySelector('.phone-info');
        const locationText = document.querySelector('.location-info');
        
        if (emailLink && content.contactEmail) {
            // Clear existing content
            emailLink.innerHTML = '';
            // Add icon
            const icon = document.createElement('i');
            icon.className = 'fa-regular fa-envelope';
            emailLink.appendChild(icon);
            // Add text
            const text = document.createTextNode(content.contactEmail);
            emailLink.appendChild(text);
            // Update href
            emailLink.href = `mailto:${content.contactEmail}`;
        }
        
        if (phoneLink && content.contactPhone) {
            // Clear existing content
            phoneLink.innerHTML = '';
            // Add icon
            const icon = document.createElement('i');
            icon.className = 'fa-solid fa-phone';
            phoneLink.appendChild(icon);
            // Add text
            const text = document.createTextNode(content.contactPhone);
            phoneLink.appendChild(text);
            // Update href
            phoneLink.href = `tel:${content.contactPhone.replace(/\s/g, '')}`;
        }
        
        if (locationText && content.contactLocation) {
            // Clear existing content
            locationText.innerHTML = '';
            // Add icon
            const icon = document.createElement('i');
            icon.className = 'fa-solid fa-location-dot';
            locationText.appendChild(icon);
            // Add text
            const text = document.createTextNode(content.contactLocation);
            locationText.appendChild(text);
        }

        // Update social media section
        const socialTitle = document.querySelector('.social-section h2');
        const socialText = document.querySelector('.social-section p');
        if (socialTitle && content.socialTitle) socialTitle.textContent = content.socialTitle;
        if (socialText && content.socialText) socialText.textContent = content.socialText;

        // Update project section
        const projectTitle = document.querySelector('.project-card h2');
        const projectText = document.querySelector('.project-card p');
        const projectButton = document.querySelector('.contact-project-button');
        if (projectTitle && content.projectTitle) projectTitle.textContent = content.projectTitle;
        if (projectText && content.projectText) projectText.textContent = content.projectText;
        if (projectButton) {
            if (content.projectButtonText) projectButton.textContent = content.projectButtonText;
            // Use the stored href if available, otherwise use default mailto
            if (content.projectButtonHref) {
                projectButton.href = content.projectButtonHref;
            } else {
                projectButton.href = 'mailto:info@mbo-hub.amsterdam';
            }
            console.log('Project button href set to:', projectButton.href);
        }

        console.log('Contact page content updated successfully'); // Debug log
    } else {
        console.log('No stored contact content found'); // Debug log
    }
}); 