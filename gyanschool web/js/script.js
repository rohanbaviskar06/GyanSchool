// Basic interactvity

document.addEventListener('DOMContentLoaded', () => {
    // Improved Header scroll effect for Educavo style
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('sticky-header');
        } else {
            header.classList.remove('sticky-header');
        }
    });

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

    // AI Orbital Rotation Logic
    const orbitalPath = document.querySelector('.ai-orbital-path');
    const iconBoxes = document.querySelectorAll('.ai-icon-box');
    
    if (orbitalPath && iconBoxes.length > 0) {
        let rotation = 0;
        let scrollSpeed = 0;
        let lastScrollY = window.scrollY;
        let isCircleComplete = false;
        let rotationBoost = 0; 
        
        // 1. Position icons in an even LARGER circle
        const radius = 350; // Increased to ensure no overlap and a spacious look
        const totalIcons = iconBoxes.length;
        const revealDelay = 80; // FASTER speed to make the circle
        
        iconBoxes.forEach((box, index) => {
            // Position them accurately from the start
            const angle = (index / totalIcons) * 2 * Math.PI - (Math.PI / 2); // Start from top 
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            box.style.transform = `translate(${x}px, ${y}px)`;
            
            // Fast sequential reveal
            setTimeout(() => {
                box.classList.add('visible');
                
                // If this is the last icon, trigger the smooth rotation phase
                if (index === totalIcons - 1) {
                    setTimeout(() => {
                        isCircleComplete = true;
                        rotationBoost = 0.5; // Very tiny boost for a SMOOTH start
                    }, 300); 
                }
            }, index * revealDelay);
        });

        // 3. Continuous Rotation Loop
        const animateRotation = () => {
            if (isCircleComplete) {
                const baseSpeed = 0.05; 
                const scrollBoost = Math.abs(scrollSpeed) * 0.08;
                // Combined speed is low for a smooth, non-rushed feel
                const currentSpeed = baseSpeed + scrollBoost + rotationBoost;
                rotation += currentSpeed;
                
                const rotationInRadians = (rotation * Math.PI) / 180;
                
                iconBoxes.forEach((box, index) => {
                    const baseAngle = (index / totalIcons) * 2 * Math.PI - (Math.PI / 2);
                    const currentAngle = baseAngle + rotationInRadians;
                    
                    const x = Math.cos(currentAngle) * radius;
                    const y = Math.sin(currentAngle) * radius;
                    
                    box.style.transform = `translate(${x}px, ${y}px)`;
                });

                // Decay boosts slowly for smoothness
                scrollSpeed *= 0.95;
                rotationBoost *= 0.98;
                if (rotationBoost < 0.01) rotationBoost = 0;
            }
            
            requestAnimationFrame(animateRotation);
        };

        // 4. Scroll Detection
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            scrollSpeed = (currentScrollY - lastScrollY);
            lastScrollY = currentScrollY;
        }, { passive: true });

        requestAnimationFrame(animateRotation);
    }
});

// Register Form Handler
function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('reg-name').value.trim();
    const course = document.getElementById('reg-course').value;
    alert(`🎉 Thank you, ${name}! You've been registered for "${course}". We'll be in touch soon!`);
    e.target.reset();
}

