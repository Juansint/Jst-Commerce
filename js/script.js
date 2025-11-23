// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrollTop = document.getElementById('scrollTop');

    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        scrollTop.classList.add('visible');
    } else {
        navbar.classList.remove('scrolled');
        scrollTop.classList.remove('visible');
    }
});

// Mobile menu toggle
function toggleMenu() {
    document.getElementById('navMenu').classList.toggle('active');
}

function closeMenu() {
    document.getElementById('navMenu').classList.remove('active');
}

// Scroll to top
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Reveal elements on scroll
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);
reveal(); // Check on load

// Form handling
document.addEventListener('DOMContentLoaded', function() {
    const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbxNaiGxzrZl3gezeDokh4A-OyJtZhxE3-KF5mR_oaMgJnp45AHMg313rAVIRMNo1SnQSQ/exec';
    const contactForm = document.getElementById('contactForm');
    const statusDiv = document.getElementById('formStatus');

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;

        // Show loading
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="spinner"></span> Sending...';
        statusDiv.textContent = '';
        statusDiv.className = '';

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            company: document.getElementById('company').value || 'Not provided',
            message: document.getElementById('message').value,
            timestamp: new Date().toLocaleString()
        };

        try {
            await fetch(WEBHOOK_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            // Success
            statusDiv.textContent = '✓ Thank you! Your message has been sent. We\'ll respond within 24-48 hours.';
            statusDiv.className = 'success';
            this.reset();

        } catch (error) {
            // Error
            statusDiv.textContent = '✗ Error sending message. Please email us directly at info@jst-commerce.com';
            statusDiv.className = 'error';
        }

        // Reset button
        submitButton.disabled = false;
        submitButton.textContent = originalText;
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});