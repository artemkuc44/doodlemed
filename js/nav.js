// ===== NAVIGATION & INTERACTIONS =====

// Smooth scrolling for better UX
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading animation to page transitions
    const interactiveElements = document.querySelectorAll('.topic-card, .subtopic-card');
    interactiveElements.forEach(element => {
        element.addEventListener('click', function(e) {
            // Add a subtle loading effect
            this.style.transform = 'scale(0.98)';
            this.style.opacity = '0.8';
            
            // Allow time for visual feedback before navigation
            setTimeout(() => {
                // Navigation handled by onclick attributes in HTML
            }, 150);
        });
    });

    // Back button enhancements
    const backButtons = document.querySelectorAll('.back-btn');
    backButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Add visual feedback
            this.style.transform = 'translateY(1px)';
            setTimeout(() => {
                this.style.transform = 'translateY(-1px)';
            }, 100);
        });
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // ESC key to go back (if back button exists)
        if (e.key === 'Escape') {
            const backBtn = document.querySelector('.back-btn');
            if (backBtn) {
                backBtn.click();
            }
        }

        // Enter or Space on focused interactive elements
        if (e.key === 'Enter' || e.key === ' ') {
            const focusedElement = document.activeElement;
            if (focusedElement.classList.contains('topic-card') || 
                focusedElement.classList.contains('subtopic-card')) {
                e.preventDefault();
                focusedElement.click();
            }
        }
    });

    // Make cards focusable for keyboard navigation
    interactiveElements.forEach(element => {
        element.setAttribute('tabindex', '0');
        element.setAttribute('role', 'button');
        
        // Add keyboard focus styles
        element.addEventListener('focus', function() {
            this.style.outline = '3px solid #4a90e2';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });

    // Intersection Observer for animations on scroll
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements that should animate in
        const animateElements = document.querySelectorAll('.topic-card, .subtopic-card, .content-article');
        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // Service Worker registration for better performance (optional)
    if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
        navigator.serviceWorker.register('/sw.js').catch(err => {
            // Service worker not critical, fail silently
            console.log('Service worker registration failed');
        });
    }
});

// Handle orientation changes on mobile
window.addEventListener('orientationchange', function() {
    setTimeout(function() {
        // Scroll to top to avoid layout issues
        window.scrollTo(0, 0);
        
        // Refresh any video iframes to ensure proper sizing
        const videos = document.querySelectorAll('.video-container iframe');
        videos.forEach(video => {
            const src = video.src;
            video.src = '';
            video.src = src;
        });
    }, 100);
});

// Error handling for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Fallback for broken images
            this.style.display = 'none';
            console.log(`Failed to load image: ${this.src}`);
        });
    });
});

// Analytics tracking (if needed)
function trackPageView(pageName) {
    // Placeholder for analytics tracking
    if (typeof gtag !== 'undefined') {
        gtag('config', 'GA_TRACKING_ID', {
            page_title: pageName,
            page_location: window.location.href
        });
    }
}

// Call on page load
document.addEventListener('DOMContentLoaded', function() {
    const pageTitle = document.title;
    trackPageView(pageTitle);
});

// Utility function for smooth page transitions
function navigateWithTransition(url) {
    document.body.style.opacity = '0.8';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        window.location.href = url;
    }, 300);
}

// Add error boundary for JavaScript errors
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Could send to error tracking service
});

// Accessibility improvements
document.addEventListener('DOMContentLoaded', function() {
    // Add skip link for screen readers
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #2c5aa0;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main landmark if not present
    const main = document.querySelector('main');
    if (main) {
        main.id = 'main';
    }
});