document.addEventListener('DOMContentLoaded', () => {
    // Typing animation (optional — only for homepage if needed)
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

    // Contact form submission feedback (for Formspree)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            const formMessage = document.getElementById('form-message');
            formMessage.textContent = 'Sending...';
            formMessage.style.color = 'black';

            // Wait a bit and show confirmation after formspree redirect
            setTimeout(() => {
                formMessage.textContent = 'Message sent! Thank you for reaching out.';
                formMessage.style.color = 'green';
                contactForm.reset();
            }, 1500);
        });
    }
});