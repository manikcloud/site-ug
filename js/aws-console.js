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

// Hyperlint AI Slides Functions
function showHyperlintSlides() {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.aws-tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
        content.style.display = 'none';
    });
    
    // Remove active class from all nav links
    const navLinks = document.querySelectorAll('.aws-nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Show hyperlint slides tab
    const slidesTab = document.getElementById('hyperlint-slides');
    if (slidesTab) {
        slidesTab.classList.add('active');
        slidesTab.style.display = 'block';
    }
    
    // Show notification
    showNotification('Loading AI Event Slides from July 31st meetup...', 'info');
}

function downloadSlides() {
    // Create a simple HTML file with the slides content
    const slidesContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UG AI Event Slides - July 31st</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .slide { background: white; padding: 30px; margin: 20px 0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .slide h1 { color: #232F3E; border-bottom: 3px solid #FF9900; padding-bottom: 10px; }
        .slide h2 { color: #FF9900; }
        .highlight { background: #FFF3CD; padding: 10px; border-left: 4px solid #FF9900; margin: 15px 0; }
    </style>
</head>
<body>
    <div class="slide">
        <h1>🚀 Hyperlint AI Tools & Resources</h1>
        <h2>AWS User Group Mississauga - July 31st Event</h2>
        <p>Welcome to our AI-focused meetup exploring cutting-edge development tools and intelligent infrastructure management.</p>
    </div>
    
    <div class="slide">
        <h1>🤖 What is Hyperlint?</h1>
        <div class="highlight">
            <strong>Hyperlint</strong> represents the next generation of AI-powered development tools that enhance code quality, 
            security, and performance through intelligent analysis and automated optimization.
        </div>
        <ul>
            <li>Advanced static code analysis with ML-powered insights</li>
            <li>Real-time security vulnerability detection</li>
            <li>Performance optimization recommendations</li>
            <li>Infrastructure-as-Code best practices enforcement</li>
        </ul>
    </div>
    
    <div class="slide">
        <h1>🏗️ AI-Driven Infrastructure</h1>
        <h2>Key Benefits:</h2>
        <ul>
            <li><strong>Intelligent Scaling:</strong> ML-powered auto-scaling based on usage patterns</li>
            <li><strong>Predictive Maintenance:</strong> Proactive issue detection and resolution</li>
            <li><strong>Cost Optimization:</strong> AI-driven resource allocation and cost management</li>
            <li><strong>Security Enhancement:</strong> Automated threat detection and response</li>
        </ul>
    </div>
    
    <div class="slide">
        <h1>🔧 Implementation Strategies</h1>
        <div class="highlight">
            <strong>Best Practices for AI Integration:</strong>
        </div>
        <ol>
            <li>Start with pilot projects to validate AI tools</li>
            <li>Integrate gradually into existing CI/CD pipelines</li>
            <li>Train teams on AI-assisted development workflows</li>
            <li>Monitor and measure AI tool effectiveness</li>
            <li>Scale successful implementations across organization</li>
        </ol>
    </div>
    
    <div class="slide">
        <h1>📊 Real-World Results</h1>
        <h2>Organizations using AI-powered development tools report:</h2>
        <ul>
            <li>40% reduction in code review time</li>
            <li>60% fewer security vulnerabilities in production</li>
            <li>25% improvement in application performance</li>
            <li>50% faster incident resolution</li>
        </ul>
    </div>
    
    <div class="slide">
        <h1>🚀 Next Steps</h1>
        <h2>Getting Started with Hyperlint AI:</h2>
        <ol>
            <li>Explore the GitHub repository: <a href="https://github.com/manikcloud/hyperlint-ai">github.com/manikcloud/hyperlint-ai</a></li>
            <li>Join our community discussions</li>
            <li>Attend hands-on workshops</li>
            <li>Contribute to open-source AI tools</li>
        </ol>
        <div class="highlight">
            <strong>Thank you for attending AWS User Group Mississauga!</strong><br>
            Questions? Contact us at awsusergroup.mississauga@gmail.com
        </div>
    </div>
</body>
</html>`;
    
    // Create and download the file
    const blob = new Blob([slidesContent], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'UG_ai_event_slides.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    showNotification('AI Event Slides downloaded successfully!', 'success');
}
