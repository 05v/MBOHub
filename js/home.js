document.addEventListener('DOMContentLoaded', () => {
    // Load content from localStorage
    const storedContent = localStorage.getItem('homeContent');
    console.log('Home page loaded content:', storedContent); // Debug log
    
    if (storedContent) {
        const content = JSON.parse(storedContent);
        
        // Update hero section
        const heroTitle = document.querySelector('.hero h1');
        const heroSubtitle = document.querySelector('.hero p');
        console.log('Hero elements:', { heroTitle, heroSubtitle }); // Debug log
        
        if (heroTitle && content.heroTitle) heroTitle.textContent = content.heroTitle;
        if (heroSubtitle && content.heroSubtitle) heroSubtitle.textContent = content.heroSubtitle;
        
        console.log('Updated hero content:', { 
            title: heroTitle?.textContent, 
            subtitle: heroSubtitle?.textContent 
        }); // Debug log

        // Update CTA buttons
        const ctaPrimary = document.querySelector('.cta-primary');
        const ctaSecondary = document.querySelector('.cta-secondary');
        if (ctaPrimary) {
            if (content.ctaPrimaryText) ctaPrimary.childNodes[0].textContent = content.ctaPrimaryText;
            if (content.ctaPrimaryLink) ctaPrimary.href = content.ctaPrimaryLink;
        }
        if (ctaSecondary) {
            if (content.ctaSecondaryText) ctaSecondary.textContent = content.ctaSecondaryText;
            if (content.ctaSecondaryLink) ctaSecondary.href = content.ctaSecondaryLink;
        }

        // Update intro section
        const introTitle = document.querySelector('.info-section .section-title');
        const introText = document.querySelector('.info-section .info-text');
        if (introTitle && content.introTitle) introTitle.textContent = content.introTitle;
        if (introText && content.introText) introText.textContent = content.introText;

        // Update info cards
        const cards = document.querySelectorAll('.info-cards .card');
        if (cards.length >= 3) {
            // Card 1
            if (content.card1Title) cards[0].querySelector('.card-title').textContent = content.card1Title;
            if (content.card1Text) cards[0].querySelector('.card-text').textContent = content.card1Text;
            if (content.card1Link) cards[0].href = content.card1Link;
            
            // Card 2
            if (content.card2Title) cards[1].querySelector('.card-title').textContent = content.card2Title;
            if (content.card2Text) cards[1].querySelector('.card-text').textContent = content.card2Text;
            if (content.card2Link) cards[1].href = content.card2Link;
            
            // Card 3
            if (content.card3Title) cards[2].querySelector('.card-title').textContent = content.card3Title;
            if (content.card3Text) cards[2].querySelector('.card-text').textContent = content.card3Text;
            if (content.card3Link) cards[2].href = content.card3Link;
        }

        // Update video section
        const videoTitle = document.querySelector('.video-container').previousElementSibling;
        const videoIframe = document.querySelector('.video-container iframe');
        if (videoTitle && content.videoTitle) videoTitle.textContent = content.videoTitle;
        if (videoIframe && content.videoUrl) {
            videoIframe.src = `https://www.youtube.com/embed/${content.videoUrl}`;
        }
    }
}); 