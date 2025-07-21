// AWS Console Theme JavaScript

// Tab Navigation
function showTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.aws-tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all nav links
    const navLinks = document.querySelectorAll('.aws-nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Show selected tab content
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Add active class to corresponding nav link
    const selectedNavLink = document.querySelector(`[data-tab="${tabName}"]`);
    if (selectedNavLink) {
        selectedNavLink.classList.add('active');
    }
}

// Event listeners for navigation
document.addEventListener('DOMContentLoaded', function() {
    // Tab navigation
    const navLinks = document.querySelectorAll('.aws-nav-link[data-tab]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const tabName = this.getAttribute('data-tab');
            showTab(tabName);
        });
    });
    
    // Profile image loading with fallbacks
    loadProfileImages();
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmission);
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Profile image loading function
function loadProfileImages() {
    const profileImages = document.querySelectorAll('.profile-image');
    
    // LinkedIn profile image URLs (these are placeholders - in production you'd need proper API access)
    const linkedinImages = {
        'Varun Kumar Manik': 'https://via.placeholder.com/80x80/232F3E/FFFFFF?text=VK',
        'Naresh Kumar': 'https://via.placeholder.com/80x80/232F3E/FFFFFF?text=NK', 
        'Garima Bajpai': 'https://via.placeholder.com/80x80/FF9900/FFFFFF?text=GB',
        'Vinod G': 'https://via.placeholder.com/80x80/DC3545/FFFFFF?text=VG',
        'Jay Shah': 'https://via.placeholder.com/80x80/17A2B8/FFFFFF?text=JS'
    };
    
    profileImages.forEach(img => {
        const altText = img.getAttribute('alt');
        if (linkedinImages[altText]) {
            img.src = linkedinImages[altText];
        }
        
        // Handle image load errors
        img.addEventListener('error', function() {
            const altText = this.getAttribute('alt');
            if (linkedinImages[altText]) {
                this.src = linkedinImages[altText];
            }
        });
    });
}

// Contact form submission handler
function handleContactFormSubmission(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const subject = document.getElementById('contactSubject').value;
    const message = document.getElementById('contactMessage').value;
    
    // Basic validation
    if (!name || !email || !message) {
        showNotification('Please fill in all required fields.', 'warning');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address.', 'warning');
        return;
    }
    
    // Simulate form submission (in production, you'd send this to a server)
    showNotification('Thank you for your message! We will get back to you soon.', 'success');
    
    // Reset form
    event.target.reset();
    
    // In a real implementation, you would send the data to your backend:
    // fetch('/api/contact', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ name, email, subject, message })
    // });
}

// Utility function to create AWS-style notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `aws-notification aws-notification-${type}`;
    notification.innerHTML = `
        <div class="aws-notification-content">
            <i class="bi bi-${getNotificationIcon(type)} me-2"></i>
            ${message}
            <button class="aws-notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="bi bi-x"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Get appropriate icon for notification type
function getNotificationIcon(type) {
    switch(type) {
        case 'success': return 'check-circle';
        case 'warning': return 'exclamation-triangle';
        case 'danger': return 'x-circle';
        default: return 'info-circle';
    }
}

// Keynote session highlighting
function highlightKeynoteSession() {
    const keynoteRow = document.querySelector('.keynote-session');
    if (keynoteRow) {
        keynoteRow.style.animation = 'keynoteGlow 2s ease-in-out infinite alternate';
    }
}

// Initialize highlighting after page load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(highlightKeynoteSession, 1000);
});
