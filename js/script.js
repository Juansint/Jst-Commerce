// Navigation background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');

    if (window.scrollY > 0) {
        navbar.classList.add('navbar--scroll')
    } else {
        navbar.classList.remove('navbar--scroll')
    };
});

const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbzXXBSR_1etIsCs_nqbGQvmlu1mR09-7Rfu1dqtZIsRWVABaDipLDMxUK7OJzjUEZnK-w/exec'; // UPDATE THIS!

document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();

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

    try {
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        // Show success message
        statusDiv.innerHTML = '<p style="color: #5a9e7a; font-weight: bold; margin-top: 15px;">✓ Thank you! Your message has been sent. We\'ll get back to you within 24-48 hours.</p>';
        this.reset();

    } catch (error) {
        statusDiv.innerHTML = '<p style="color: #dc3545; font-weight: bold; margin-top: 15px;">✗ Error sending message. Please try again or email us directly at info@jst-commerce.com</p>';
        console.error('Error:', error);
    }

    // Re-enable button
    submitButton.disabled = false;
    submitButton.textContent = 'Send Message';
});