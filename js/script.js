// Basic interactvity

document.addEventListener('DOMContentLoaded', () => {
    // Improved Header scroll effect for Educavo style
    const header = document.getElementById('header');
    
    // Smoother sticky effect detector
    window.addEventListener('scroll', () => {
        header.classList.toggle('sticky-header', window.scrollY > 10);
    }, { passive: true });

    // Mobile menu toggle (simple version)
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if(mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Scroll Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Optional: stop observing once revealed
            }
        });
    };

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // FAQ Accordion
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.faq-item');
            const isOpen = item.classList.contains('open');

            // Close all open items
            document.querySelectorAll('.faq-item.open').forEach(openItem => {
                openItem.classList.remove('open');
                openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });

            // Toggle clicked item
            if (!isOpen) {
                item.classList.add('open');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // Testimonials Slider Logic
    const slider = document.getElementById('testimonial-slider');
    const prevBtn = document.getElementById('prev-test');
    const nextBtn = document.getElementById('next-test');
    const dotContainer = document.getElementById('slider-dots');
    const cards = document.querySelectorAll('.testimonial-card');

    if (slider && cards.length > 0) {
        let autoSlideInterval;
        
        const getCardWidth = () => cards[0].offsetWidth + 32; // card + gap

        const updateSlider = () => {
            const cardWidth = getCardWidth();
            const visibleCards = Math.round(slider.offsetWidth / cardWidth) || 1;
            const totalPages = Math.ceil(cards.length / visibleCards);
            
            dotContainer.innerHTML = '';
            for (let i = 0; i < totalPages; i++) {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    slider.scrollTo({ 
                        left: i * visibleCards * cardWidth, 
                        behavior: 'smooth' 
                    });
                });
                dotContainer.appendChild(dot);
            }
        };

        const startAutoSlide = () => {
            autoSlideInterval = setInterval(() => {
                const cardWidth = getCardWidth();
                const maxScroll = slider.scrollWidth - slider.offsetWidth;
                
                if (slider.scrollLeft >= maxScroll - 10) {
                    slider.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    slider.scrollBy({ left: cardWidth, behavior: 'smooth' });
                }
            }, 4000);
        };

        const stopAutoSlide = () => clearInterval(autoSlideInterval);

        updateSlider();
        startAutoSlide();

        slider.addEventListener('scroll', () => {
            const cardWidth = getCardWidth();
            const visibleCards = Math.round(slider.offsetWidth / cardWidth) || 1;
            const activePage = Math.round(slider.scrollLeft / (visibleCards * cardWidth));
            
            const dots = dotContainer.querySelectorAll('.dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === activePage);
            });
        }, { passive: true });

        // Pause on hover
        slider.addEventListener('mouseenter', stopAutoSlide);
        slider.addEventListener('mouseleave', startAutoSlide);

        // Button Controls (Slide one by one)
        nextBtn.addEventListener('click', () => {
            const cardWidth = getCardWidth();
            if (slider.scrollLeft >= slider.scrollWidth - slider.offsetWidth - 10) {
                slider.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                slider.scrollBy({ left: cardWidth, behavior: 'smooth' });
            }
            stopAutoSlide();
            startAutoSlide();
        });

        prevBtn.addEventListener('click', () => {
            const cardWidth = getCardWidth();
            if (slider.scrollLeft <= 10) {
                slider.scrollTo({ left: slider.scrollWidth, behavior: 'smooth' });
            } else {
                slider.scrollBy({ left: -cardWidth, behavior: 'smooth' });
            }
            stopAutoSlide();
            startAutoSlide();
        });

        window.addEventListener('resize', updateSlider);
    }

    // ScrollSpy: Update active nav-links as you scroll
    const sections = document.querySelectorAll('main > section[id]');
    const navItems = document.querySelectorAll('.nav-links a:not(.btn)');

    const scrollSpyOptions = {
        threshold: 0.3, 
        rootMargin: "0px 0px -40% 0px" // Trigger when section is in top half
    };

    const scrollSpyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navItems.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, scrollSpyOptions);

    sections.forEach(sec => scrollSpyObserver.observe(sec));

    // Special case for top of page (Home)
    window.addEventListener('scroll', () => {
        if (window.scrollY < 100) {
            navItems.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === '#hero');
            });
        }
    }, { passive: true });

    // AI Orbital Rotation logic removed as per request.
});

// Register Form Handler
function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('reg-name').value.trim();
    const course = document.getElementById('reg-course').value;
    alert(`🎉 Thank you, ${name}! You've been registered for "${course}". We'll be in touch soon!`);
    e.target.reset();
}

