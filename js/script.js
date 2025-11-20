// Navigation background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');

    if (window.scrollY > 0) {
        navbar.classList.add('navbar--scroll')
    } else {
        navbar.classList.remove('navbar--scroll')
    };
});

// Wait for the page to fully load before running the script
document.addEventListener('DOMContentLoaded', function() {

    const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbxNaiGxzrZl3gezeDokh4A-OyJtZhxE3-KF5mR_oaMgJnp45AHMg313rAVIRMNo1SnQSQ/exec';

    const contactForm = document.getElementById('contactForm');

    // Check if form exists
    if (!contactForm) {
        console.error('Contact form not found!');
        return;
    }

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        console.log('Form submitted!');

        const submitButton = this.querySelector('button[type="submit"]');
        const statusDiv = document.getElementById('formStatus');

        // Disable button and show loading
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        statusDiv.innerHTML = '';

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            company: document.getElementById('company').value || '',
            message: document.getElementById('message').value
        };

        console.log('Form data:', formData);

        try {
            console.log('Sending to:', WEBHOOK_URL);

            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            console.log('Response received');

            // Show success message
            statusDiv.innerHTML = '<p style="color: #5a9e7a; font-weight: bold; margin-top: 15px;">✓ Thank you! Your message has been sent. We\'ll get back to you within 24-48 hours.</p>';
            this.reset();

        } catch (error) {
            console.error('Fetch error:', error);
            statusDiv.innerHTML = '<p style="color: #dc3545; font-weight: bold; margin-top: 15px;">✗ Error sending message. Please try again or email us directly at info@jst-commerce.com</p>';
        }

        // Re-enable button
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
    });

    console.log('Form handler loaded successfully');
});