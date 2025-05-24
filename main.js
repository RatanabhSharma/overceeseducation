// Form Handling
document.addEventListener('DOMContentLoaded', function() {
    // Handle all forms on the website
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            // Show loading state
            const submitButton = form.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = 'Processing...';
            submitButton.disabled = true;

            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                console.log('Form submitted:', formObject);
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success mt-3';
                successMessage.innerHTML = 'Thank you for your submission! We will contact you soon.';
                form.appendChild(successMessage);

                // Reset form and button
                form.reset();
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;

                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }, 1500);
        });
    });

    // Handle "Learn More" buttons
    const learnMoreButtons = document.querySelectorAll('.btn-outline-danger');
    learnMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const serviceName = this.closest('.card').querySelector('.card-title').textContent;
            console.log(`Learn more clicked for: ${serviceName}`);
            // Add your modal or navigation logic here
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar active state
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });

    // Form validation
    const formInputs = document.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value) {
                this.classList.add('is-invalid');
            } else {
                this.classList.remove('is-invalid');
            }
        });

        input.addEventListener('input', function() {
            if (this.classList.contains('is-invalid')) {
                this.classList.remove('is-invalid');
            }
        });
    });

    // Mobile menu toggle
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navbarToggler.contains(e.target) && !navbarCollapse.contains(e.target)) {
                navbarCollapse.classList.remove('show');
            }
        });
    }

    // Add animation to cards on scroll
    const cards = document.querySelectorAll('.card');
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        observer.observe(card);
    });
});

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu after clicking a link
            navLinks.classList.remove('active');
        }
    });
});

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const icon = question.querySelector('i');
        
        // Toggle answer visibility
        if (answer.style.display === 'block') {
            answer.style.display = 'none';
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
        } else {
            answer.style.display = 'block';
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
        }
    });
});

// Form Submissions
const assessmentForm = document.getElementById('assessmentForm');
const contactForm = document.getElementById('contactForm');

if (assessmentForm) {
    assessmentForm.addEventListener('submit', handleAssessmentSubmit);
}

if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
}

function handleAssessmentSubmit(e) {
    e.preventDefault();
    // Get form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // Here you would typically send the data to your server
    console.log('Assessment Form Data:', data);
    
    // Show success message
    alert('Thank you for submitting your assessment form. We will contact you shortly!');
    e.target.reset();
}

function handleContactSubmit(e) {
    e.preventDefault();
    // Get form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // Here you would typically send the data to your server
    console.log('Contact Form Data:', data);
    
    // Show success message
    alert('Thank you for your message. We will get back to you soon!');
    e.target.reset();
}

// Live Chat Button
const chatButton = document.getElementById('liveChatButton');

if (chatButton) {
    chatButton.addEventListener('click', () => {
        // Here you would typically initialize your chat widget
        alert('Live chat feature coming soon!');
    });
}

// Testimonials Slider
const testimonials = [
    {
        text: "Overseas Education helped me achieve my dream of studying in Australia. Their guidance was invaluable!",
        author: "Emily Wang"
    },
    {
        text: "The team made my application process smooth and stress-free. Highly recommended!",
        author: "James Smith"
    },
    {
        text: "Professional service with personal attention. They helped me choose the perfect course.",
        author: "Maria Garcia"
    }
];

let currentTestimonialIndex = 0;
const testimonialContainer = document.querySelector('.testimonial');

function updateTestimonial() {
    if (testimonialContainer) {
        const testimonial = testimonials[currentTestimonialIndex];
        testimonialContainer.innerHTML = `
            <p>"${testimonial.text}"</p>
            <h4>- ${testimonial.author}</h4>
        `;
    }
}

// Change testimonial every 5 seconds
setInterval(() => {
    currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
    updateTestimonial();
}, 5000);

// Initialize first testimonial
updateTestimonial();

// Sticky Header
const header = document.querySelector('.header');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (lastScrollY < window.scrollY) {
        header.classList.add('header-hidden');
    } else {
        header.classList.remove('header-hidden');
    }
    lastScrollY = window.scrollY;
});

// Social Media Links
const socialLinks = document.querySelectorAll('.social-links a');

socialLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#') {
            e.preventDefault();
            alert('Social media link coming soon!');
        }
    });
}); 