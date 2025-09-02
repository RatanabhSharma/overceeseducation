// Form Handling
document.addEventListener('DOMContentLoaded', function() {
    // Form Validation and Submission Handler
    const handleForms = () => {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Basic form validation
                const requiredFields = form.querySelectorAll('[required]');
                let isValid = true;

                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.classList.add('is-invalid');
                    } else {
                        field.classList.remove('is-invalid');
                    }
                });

                if (isValid) {
                    const formData = new FormData(form);
                    const data = Object.fromEntries(formData);
                    const submitBtn = form.querySelector('button[type="submit"]');
                    const originalText = submitBtn.innerHTML;
                    
                    // Show loading state
                    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Submitting...';
                    submitBtn.disabled = true;

                    // Simulate API call
                    setTimeout(() => {
                        console.log('Form Data:', data);
                        form.reset();
                        alert('Thank you! Your request has been submitted successfully.');
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    }, 1500);
                }
            });
        });
    };

    // Hero Slider Implementation
    const initSlider = () => {
        const slider = {
            container: document.querySelector('.slider-container'),
            slides: document.querySelectorAll('.slide'),
            prevBtn: document.querySelector('.slider-nav.prev'),
            nextBtn: document.querySelector('.slider-nav.next'),
            dotsContainer: document.querySelector('.slider-dots'),
            currentSlide: 0,
            interval: null,
            
            init() {
                if (!this.container) return;

                // Create dots
                this.slides.forEach((_, index) => {
                    const dot = document.createElement('div');
                    dot.classList.add('dot');
                    if (index === 0) dot.classList.add('active');
                    dot.addEventListener('click', () => this.goToSlide(index));
                    this.dotsContainer.appendChild(dot);
                });

                // Add event listeners
                this.prevBtn.addEventListener('click', () => this.prevSlide());
                this.nextBtn.addEventListener('click', () => this.nextSlide());

                // Start auto rotation
                this.startAutoRotation();

                // Pause auto rotation on hover
                this.container.addEventListener('mouseenter', () => this.stopAutoRotation());
                this.container.addEventListener('mouseleave', () => this.startAutoRotation());
            },

            updateSlide(index) {
                this.slides.forEach(slide => slide.classList.remove('active'));
                document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
                
                this.slides[index].classList.add('active');
                document.querySelectorAll('.dot')[index].classList.add('active');
                this.currentSlide = index;
            },

            nextSlide() {
                const next = (this.currentSlide + 1) % this.slides.length;
                this.updateSlide(next);
            },

            prevSlide() {
                const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
                this.updateSlide(prev);
            },

            goToSlide(index) {
                this.updateSlide(index);
            },

            startAutoRotation() {
                this.interval = setInterval(() => this.nextSlide(), 5000);
            },

            stopAutoRotation() {
                clearInterval(this.interval);
            }
        };

        slider.init();
    };

    // Initialize all functionality
    handleForms();
    initSlider();
});