// ===== MOBILE MENU TOGGLE =====
const mobileMenuToggle = () => {
    const menuBtn = document.createElement('button');
    menuBtn.innerHTML = '☰';
    menuBtn.classList.add('mobile-menu-btn');
    menuBtn.setAttribute('aria-label', 'Toggle navigation menu');
    
    const nav = document.querySelector('nav');
    const header = document.querySelector('header');
    
    // Create mobile menu button
    header.insertBefore(menuBtn, nav);
    
    // Toggle menu function
    const toggleMenu = () => {
        nav.classList.toggle('active');
        menuBtn.innerHTML = nav.classList.contains('active') ? '✕' : '☰';
    };
    
    menuBtn.addEventListener('click', toggleMenu);
    
    // Close menu when clicking on links
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
    
    // Responsive check
    const checkScreenSize = () => {
        if (window.innerWidth > 768) {
            nav.classList.remove('active');
            menuBtn.innerHTML = '☰';
        }
    };
    
    window.addEventListener('resize', checkScreenSize);
};

// ===== SMOOTH SCROLLING =====
const smoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
};

// ===== TESTIMONIAL SLIDER =====
const testimonialSlider = () => {
    const testimonials = [
        {
            quote: "This platform changed my career trajectory! My mentor gave me both technical skills and life advice.",
            author: "Michael T.",
            role: "Software Developer"
        },
        {
            quote: "I found the perfect mentor who understood my unique career challenges and helped me navigate them.",
            author: "Sarah J.",
            role: "UX Designer"
        },
        {
            quote: "As a mentor, I've found incredible fulfillment in helping others grow while expanding my own perspective.",
            author: "David K.",
            role: "Product Manager"
        }
    ];
    
    const quoteContainer = document.querySelector('.quote-container');
    if (!quoteContainer) return;
    
    let currentIndex = 0;
    
    const renderTestimonial = (index) => {
        const testimonial = testimonials[index];
        quoteContainer.innerHTML = `
            <div class="quote">
                <p>${testimonial.quote}</p>
                <p class="author">- ${testimonial.author}, ${testimonial.role}</p>
            </div>
        `;
    };
    
    // Auto-rotate testimonials every 5 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        renderTestimonial(currentIndex);
    }, 5000);
    
    // Initial render
    renderTestimonial(currentIndex);
};

// ===== LIGHTS CAROUSEL NAVIGATION =====
const lightsCarousel = () => {
    const lightsGrid = document.querySelector('.lights-grid');
    if (!lightsGrid) return;
    
    const scrollAmount = 300;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            lightsGrid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else if (e.key === 'ArrowRight') {
            lightsGrid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    });
};

// ===== FORM VALIDATION =====
const setupForms = () => {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const inputs = form.querySelectorAll('input, textarea');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.classList.add('error');
                    isValid = false;
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (isValid) {
                // In a real app, you would submit the form here
                alert('Form submitted successfully!');
                form.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    });
};

// ===== SCROLL ANIMATIONS =====
const scrollAnimations = () => {
    const animateOnScroll = (elements, className) => {
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add(className);
            }
        });
    };
    
    const animatedElements = document.querySelectorAll('.step, .light-card, .quote');
    window.addEventListener('scroll', () => {
        animateOnScroll(animatedElements, 'animate');
    });
    
    // Initial check in case elements are already visible
    animateOnScroll(animatedElements, 'animate');
};

// ===== CTA BUTTON TRACKING =====
const trackCtaClicks = () => {
    document.querySelectorAll('.primary-btn, .secondary-btn, .light-card button, .cta button').forEach(button => {
        button.addEventListener('click', () => {
            // In a real app, you would send this to analytics
            console.log(`CTA clicked: ${button.textContent.trim()}`);
        });
    });
};

// ===== INITIALIZE EVERYTHING =====
document.addEventListener('DOMContentLoaded', () => {
    mobileMenuToggle();
    smoothScroll();
    testimonialSlider();
    lightsCarousel();
    setupForms();
    scrollAnimations();
    trackCtaClicks();
    
    // Add any additional initialization here
    console.log('Light Platform initialized');
});

// ===== ADDITIONAL CSS FOR JS FUNCTIONALITY =====
// This would be added to your styles.css
const addDynamicStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        /* Mobile menu styles */
        .mobile-menu-btn {
            display: none;
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: var(--dark);
        }
        
        nav.active {
            display: flex !important;
            flex-direction: column;
            position: absolute;
            top: 80px;
            left: 0;
            width: 100%;
            background: var(--white);
            padding: 20px;
            box-shadow: 0 5px 10px rgba(0,0,0,0.1);
        }
        
        /* Form error styles */
        .error {
            border: 1px solid red !important;
        }
        
        /* Animation classes */
        .animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .step, .light-card, .quote {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s ease;
        }
        
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: block;
            }
            
            nav {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);
};

// Add the dynamic styles when the page loads
addDynamicStyles();