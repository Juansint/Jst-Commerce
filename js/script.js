// Navigation background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');

    if (window.scrollY > 0) {
        navbar.classList.add('navbar--scroll')
    } else {
        navbar.classList.remove('navbar--scroll')
    };
});

// Your webhook URL
const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbxNaiGxzrZl3gezeDokh4A-OyJtZhxE3-KF5mR_oaMgJnp45AHMg313rAVIRMNo1SnQSQ/exec';

document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const submitButton = this.querySelector('button[type="submit"]');
    const statusDiv = document.getElementById('formStatus');

    // Disable button and show loading
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    statusDiv.textContent = '';

    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        company: document.getElementById('company').value,
        message: document.getElementById('message').value
    };

    try {
        // Send to Google Apps Script (using no-cors with fetch)
        await fetch(WEBHOOK_URL, {
            method: 'POST',
            mode: 'no-cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        // With no-cors, we can't read the response, but if no error thrown, assume success
        statusDiv.innerHTML = '<p style="color: #5a9e7a; font-weight: bold;">✓ Thank you! Your message has been sent. We\'ll get back to you within 24-48 hours.</p>';
        this.reset(); // Clear form

    } catch (error) {
        // Show error message
        statusDiv.innerHTML = '<p style="color: #dc3545; font-weight: bold;">✗ Error sending message. Please try again or email us directly.</p>';
        console.error('Error:', error);
    } finally {
        // Re-enable button
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
    }
});