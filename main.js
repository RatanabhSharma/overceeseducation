// Form Handling
document.addEventListener('DOMContentLoaded', function() {
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

    // Enhanced Slider with better mobile support
    const initEnhancedSlider = () => {
        const slider = {
            container: document.querySelector('.slider-container'),
            slides: document.querySelectorAll('.slide'),
            prevBtn: document.querySelector('.slider-nav.prev'),
            nextBtn: document.querySelector('.slider-nav.next'),
            dotsContainer: document.querySelector('.slider-dots'),
            currentSlide: 0,
            touchStartX: 0,
            touchEndX: 0,
            interval: null,

            init() {
                if (!this.container) return;

                // Add touch events for mobile
                this.container.addEventListener('touchstart', (e) => {
                    this.touchStartX = e.touches[0].clientX;
                });

                this.container.addEventListener('touchend', (e) => {
                    this.touchEndX = e.changedTouches[0].clientX;
                    this.handleSwipe();
                });

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

                // Adjust slider height for mobile
                this.adjustHeight();
                window.addEventListener('resize', () => this.adjustHeight());
            },

            handleSwipe() {
                const swipeThreshold = 50;
                const diff = this.touchStartX - this.touchEndX;

                if (Math.abs(diff) > swipeThreshold) {
                    if (diff > 0) {
                        this.nextSlide();
                    } else {
                        this.prevSlide();
                    }
                }
            },

            adjustHeight() {
                if (window.innerWidth <= 768) {
                    const activeSlide = this.slides[this.currentSlide];
                    const img = activeSlide.querySelector('img');
                    if (img) {
                        this.container.style.height = `${img.offsetWidth * 0.75}px`;
                    }
                } else {
                    this.container.style.height = '';
                }
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
    initSlider();
    initEnhancedSlider();

    // Handle footer links
    const handleFooterLinks = () => {
        const footerLinks = {
            'Study Abroad': 'study-abroad.html',
            'Blog': 'blogs.html',
            'Contact Us': 'contact.html',
            'Courses': 'courses.html'
        };

        document.querySelectorAll('.footer-links a').forEach(link => {
            const text = link.textContent.trim();
            if (footerLinks[text]) {
                link.href = footerLinks[text];
            }
        });
    };

    handleFooterLinks();
});