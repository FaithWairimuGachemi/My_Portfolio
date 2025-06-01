// Typewriter effect for multiple headings
const headings = [
    {
        element: document.getElementById('heading1'),
        text: "Hi.\nI'm Faith Wairimu.",
        speed: 100
    },
    {
        element: document.getElementById('heading2'),
        text: "A software Engineer",
        speed: 80
    },
    {
        element: document.getElementById('heading3'),
        text: "Welcome to My Portfolio",
        speed: 90
    }
];

let currentHeadingIndex = 0;

function typeWriter(headingObj, callback) {
    const element = headingObj.element;
    const text = headingObj.text;
    const speed = headingObj.speed;
    let charIndex = 0;

    element.classList.add('typing');
    element.innerHTML = '';

    function type() {
        if (charIndex < text.length) {
            if (text.charAt(charIndex) === '\n') {
                element.innerHTML += '<br/>';
            } else {
                element.innerHTML += text.charAt(charIndex);
            }
            charIndex++;
            setTimeout(type, speed);
        } else {
            element.classList.remove('typing');
            element.classList.add('finished');
            if (callback) {
                setTimeout(callback, 500); // Wait 500ms before starting next heading
            }
        }
    }

    type();
}

function startTypewriterSequence() {
    if (currentHeadingIndex < headings.length) {
        typeWriter(headings[currentHeadingIndex], () => {
            currentHeadingIndex++;
            startTypewriterSequence();
        });
    } else {
        // Reset to start the sequence again after a pause
        setTimeout(() => {
            currentHeadingIndex = 0;
            // Clear all headings before starting again
            headings.forEach(heading => {
                heading.element.innerHTML = '';
                heading.element.classList.remove('finished');
            });
            startTypewriterSequence();
        }, 5000); // Wait 2 seconds before restarting the sequence
    }
}

// Mobile Menu Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Page switching for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        showPage(targetId);

        // Update active navigation link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        this.classList.add('active');
    });
});

// Function to show specific page
function showPage(pageId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // Show target section
    const targetSection = document.getElementById(pageId);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // Restart typewriter effect if returning to home
    if (pageId === 'home') {
        setTimeout(() => {
            currentHeadingIndex = 0;
            headings.forEach(heading => {
                heading.element.innerHTML = '';
                heading.element.classList.remove('finished');
            });
            startTypewriterSequence();
        }, 300);
    }
}

// Contact Form Handler
document.addEventListener('DOMContentLoaded', () => {
    startTypewriterSequence();

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('.submit-btn');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoading = submitBtn.querySelector('.btn-loading');

            // Show loading state
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline';

            // Hide previous messages
            formMessage.style.display = 'none';
            formMessage.className = 'form-message';

            try {
                const formData = new FormData(contactForm);
                const data = {
                    name: formData.get('name'),
                    email: formData.get('email'),
                    subject: formData.get('subject'),
                    message: formData.get('message')
                };

                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (result.success) {
                    formMessage.className = 'form-message success';
                    formMessage.textContent = result.message;
                    contactForm.reset();
                } else {
                    formMessage.className = 'form-message error';
                    formMessage.textContent = result.message;
                }

            } catch (error) {
                console.error('Contact form error:', error);
                formMessage.className = 'form-message error';
                formMessage.textContent = 'Sorry, there was an error sending your message. Please try again later.';
            } finally {
                // Reset button state
                submitBtn.disabled = false;
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';

                // Show message
                formMessage.style.display = 'block';

                // Auto-hide success message after 5 seconds
                if (formMessage.classList.contains('success')) {
                    setTimeout(() => {
                        formMessage.style.display = 'none';
                    }, 5000);
                }
            }
        });
    }
});