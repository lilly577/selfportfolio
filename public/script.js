document.addEventListener('DOMContentLoaded', () => {
    // Typing animation for home page
    if (document.querySelector('.typing-text')) {
        const typingText = document.querySelector('.typing-text span');
        const words = ['Web Designer', 'Front-end Developer', 'UI/UX Enthusiast'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];
            const currentText = isDeleting 
                ? currentWord.substring(0, charIndex - 1)
                : currentWord.substring(0, charIndex + 1);
            
            typingText.textContent = currentText;

            if (!isDeleting && charIndex < currentWord.length) {
                charIndex++;
                setTimeout(type, 100);
            } else if (isDeleting && charIndex > 0) {
                charIndex--;
                setTimeout(type, 50);
            } else {
                isDeleting = !isDeleting;
                if (!isDeleting) {
                    wordIndex = (wordIndex + 1) % words.length;
                }
                setTimeout(type, isDeleting ? 50 : 1000);
            }
        }

        type();
    }

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message')
            };

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });

                const formMessage = document.getElementById('form-message');
                if (response.ok) {
                    formMessage.textContent = 'Message sent successfully!';
                    formMessage.style.color = 'green';
                    contactForm.reset();
                } else {
                    formMessage.textContent = 'Failed to send message. Please try again.';
                    formMessage.style.color = 'red';
                }
            } catch (error) {
                const formMessage = document.getElementById('form-message');
                formMessage.textContent = 'An error occurred. Please try again later.';
                formMessage.style.color = 'red';
            }
        });
    }
});