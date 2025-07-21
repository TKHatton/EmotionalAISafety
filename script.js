// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.resource-card, .testimonial-card, .problem-text, .tool-features, .creator-bio').forEach(el => {
        observer.observe(el);
    });

    // Download button functionality
    document.querySelectorAll('.download-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const resource = this.getAttribute('data-resource');
            
            // Create a simple PDF placeholder (in a real implementation, you'd have actual PDFs)
            const pdfContent = generatePDFContent(resource);
            downloadPDF(pdfContent, `${resource}-guide.pdf`);
            
            // Show feedback
            showDownloadFeedback(this);
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('speakingForm');
    if (contactForm) {
contactForm.addEventListener('submit', function(e) {
    // Let Netlify handle the submission, just show loading state
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Don't prevent default - let Netlify handle it!
});

    // Button hover effects
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Video placeholder click
    document.querySelector('.play-button')?.addEventListener('click', function() {
        showComingSoonMessage();
    });

    // Social sharing functionality
    addSocialSharing();
});

// Generate PDF content (placeholder function)
function generatePDFContent(resource) {
    const content = {
        'bonding': {
            title: 'Human Bonding Mechanisms',
            content: `
# Human Bonding Mechanisms in AI Interactions

## Understanding Emotional Attachment

Human beings are naturally wired to form emotional connections. This guide explores:

1. **Attachment Theory Basics**
   - Secure vs. insecure attachment patterns
   - How AI can trigger attachment responses

2. **Neurochemical Responses**
   - Oxytocin and dopamine in digital interactions
   - The role of mirror neurons

3. **Vulnerability Indicators**
   - Signs of unhealthy AI dependency
   - Red flags in AI conversation patterns

4. **Protective Strategies**
   - Maintaining emotional boundaries
   - Regular relationship audits

## Key Takeaways

- AI systems can exploit natural bonding mechanisms
- Awareness is the first step to protection
- Healthy boundaries preserve authentic human connections
            `
        },
        'framework': {
            title: '5 C\'s Framework for AI Relationships',
            content: `
# The 5 C's Framework

## A Comprehensive Guide to Healthy AI Interactions

### 1. CLARITY
- Understand AI capabilities and limitations
- Know when you're interacting with AI vs. humans
- Recognize AI's lack of genuine emotions

### 2. CONSENT
- Informed agreement to AI interaction terms
- Understanding data usage and privacy
- Right to discontinue interactions

### 3. CONTAINMENT
- Appropriate boundaries for AI relationships
- Time limits on AI interactions
- Separate AI advice from human judgment

### 4. CARE
- Prioritizing human wellbeing over engagement
- Recognizing manipulation tactics
- Seeking human support when needed

### 5. CLOSURE
- Healthy endings to AI interactions
- Processing AI relationship impacts
- Transitioning back to human connections

## Implementation Guide

Use this framework to evaluate any AI interaction and maintain healthy digital relationships.
            `
        }
    };
    
    return content[resource] || { title: 'Resource Guide', content: 'Content coming soon...' };
}

// Download PDF function (simplified for demo)
function downloadPDF(content, filename) {
    const blob = new Blob([`${content.title}\n\n${content.content}`], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Show download feedback
function showDownloadFeedback(button) {
    const originalText = button.textContent;
    button.textContent = 'Downloaded!';
    button.style.background = '#10b981';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
    }, 2000);
}

// Show coming soon message for video
function showComingSoonMessage() {
    const message = document.createElement('div');
    message.className = 'coming-soon-popup';
    message.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
            z-index: 10000;
            text-align: center;
            max-width: 400px;
        ">
            <h3 style="color: #1e3a8a; margin-bottom: 1rem;">Coming Soon!</h3>
            <p style="margin-bottom: 1.5rem;">This video presentation is currently in production. Sign up for our newsletter to be notified when it's available.</p>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: #d97706;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 8px;
                cursor: pointer;
            ">Got it</button>
        </div>
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 9999;
        " onclick="this.parentElement.remove()"></div>
    `;
    
    document.body.appendChild(message);
}

// Add social sharing functionality
function addSocialSharing() {
    const shareButtons = document.querySelectorAll('.social-link');
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.textContent.toLowerCase();
            const url = window.location.href;
            const title = 'Emotional AI for a Sustainable Society';
            const text = 'Learn about building healthy relationships with AI systems';
            
            let shareUrl = '';
            switch(platform) {
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
                    break;
                case 'email':
                    shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + ' ' + url)}`;
                    break;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Animate hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeInUp 1s ease-out';
    }
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close any open modals
        document.querySelectorAll('.success-message, .coming-soon-popup').forEach(modal => {
            modal.remove();
        });
        
        // Close mobile menu
        document.querySelector('.hamburger').classList.remove('active');
        document.querySelector('.nav-menu').classList.remove('active');
    }
});

// Performance optimization: Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

