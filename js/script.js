// Navigation background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');

    if (window.scrollY > 0) {
        navbar.classList.add('navbar--scroll')
    } else {
        navbar.classList.remove('navbar--scroll')
    };
});


// Replace YOUR_WEB_APP_URL with the URL from Step 3
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
        // Send to Google Apps Script
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            mode: 'no-cors', // Important for cross-origin requests
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        // Show success message
        statusDiv.innerHTML = '<p style="color: green;">✓ Thank you! Your message has been sent.</p>';
        this.reset(); // Clear form

    } catch (error) {
        // Show error message
        statusDiv.innerHTML = '<p style="color: red;">✗ Error sending message. Please try again.</p>';
        console.error('Error:', error);
    }

    // Re-enable button
    submitButton.disabled = false;
    submitButton.textContent = 'Submit';
});