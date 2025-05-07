// Create scroll progress indicator
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

// Logo animation and interactivity
const logoLetters = document.querySelectorAll('.logo-letter');
const logoBrackets = document.querySelectorAll('.logo-bracket');

// Add staggered animation to logo letters on page load
logoLetters.forEach((letter, index) => {
    setTimeout(() => {
        letter.style.opacity = '1';
        letter.style.transform = 'translateY(0)';
    }, 100 * index);
});

// Add hover effects to individual letters
logoLetters.forEach(letter => {
    letter.addEventListener('mouseover', () => {
        letter.style.color = '#ff7846';
        letter.style.transform = 'translateY(-10px) rotate(5deg)';
    });
    
    letter.addEventListener('mouseout', () => {
        letter.style.color = '';
        letter.style.transform = 'translateY(0) rotate(0deg)';
    });
});

// Add animation to brackets
logoBrackets.forEach(bracket => {
    bracket.addEventListener('mouseover', () => {
        bracket.style.transform = 'scale(1.5) rotate(15deg)';
    });
    
    bracket.addEventListener('mouseout', () => {
        bracket.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Add click effect to logo
const logo = document.querySelector('.logo');
logo.addEventListener('click', () => {
    // Create code particles effect
    for (let i = 0; i < 10; i++) {
        createCodeParticle(logo);
    }
});

// Function to create code particles
function createCodeParticle(element) {
    const particle = document.createElement('span');
    const symbols = ['{ }', '[ ]', '( )', '< >', '//', '/*', '*/', '==', '=>', ';;', 'const', 'let', 'function', 'return', 'if()', 'for()', 'while', 'async', 'await'];
    
    particle.className = 'code-particle';
    particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    
    // Random position around the logo
    const x = Math.random() * 100 - 50;
    const y = Math.random() * 100 - 50;
    
    // Random rotation
    const rotation = Math.random() * 40 - 20;
    
    // Random colors
    const colors = ['#4a6cf7', '#ff7846', '#2ecc71', '#9b59b6', '#f1c40f'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.left = `calc(50% + ${x}px)`;
    particle.style.top = `calc(50% + ${y}px)`;
    particle.style.color = color;
    particle.style.transform = `rotate(${rotation}deg)`;
    particle.style.setProperty('--x', `${x * 2}px`);
    particle.style.setProperty('--y', `${y * 2}px`);
    
    element.appendChild(particle);
    
    // Remove particle after animation completes
    setTimeout(() => {
        element.removeChild(particle);
    }, 1000);
}

// Update scroll progress
const updateScrollProgress = () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = `${scrolled}%`;
};

window.addEventListener('scroll', updateScrollProgress);

// Dark Mode Toggle
const body = document.body;
const darkModeToggle = document.createElement('button');
darkModeToggle.className = 'dark-mode-toggle';
darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
document.querySelector('nav').appendChild(darkModeToggle);

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const icon = darkModeToggle.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
    localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
});

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    body.classList.add('dark-mode');
    darkModeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
}

// Mobile Navigation Toggle
// DOM Elements
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const header = document.querySelector('header');

// Project Filtering
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        projectCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            }, 300);
        });
    });
});

// Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    // Lazy loading implementation
    var lazyImages = [].slice.call(document.querySelectorAll('img.lazy'));

    if ('IntersectionObserver' in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove('lazy');
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }

    // Project carousel functionality
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach(carousel => {
        const items = carousel.querySelectorAll('.carousel-item');
        const indicators = carousel.querySelectorAll('.indicator');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        let currentIndex = 0;

        // Function to update carousel state
        const updateCarousel = (newIndex) => {
            items.forEach(item => item.classList.remove('active'));
            indicators.forEach(indicator => indicator.classList.remove('active'));
            
            items[newIndex].classList.add('active');
            indicators[newIndex].classList.add('active');
            currentIndex = newIndex;
        };

        // Navigation button handlers
        prevBtn.addEventListener('click', () => {
            const newIndex = (currentIndex - 1 + items.length) % items.length;
            updateCarousel(newIndex);
        });

        nextBtn.addEventListener('click', () => {
            const newIndex = (currentIndex + 1) % items.length;
            updateCarousel(newIndex);
        });

        // Indicator click handlers
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => updateCarousel(index));
        });

        // Touch support
        let touchStartX = 0;
        let touchEndX = 0;

        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);

        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const difference = touchStartX - touchEndX;

            if (Math.abs(difference) > 30) { // Minimum swipe distance
                if (difference > 0) {
                    // Swipe left - next slide
                    const newIndex = (currentIndex + 1) % items.length;
                    updateCarousel(newIndex);
                } else {
                    // Swipe right - previous slide
                    const newIndex = (currentIndex - 1 + items.length) % items.length;
                    updateCarousel(newIndex);
                }
            }
        }, false);

        // Keyboard navigation
        carousel.setAttribute('tabindex', '0');
        carousel.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                const newIndex = (currentIndex - 1 + items.length) % items.length;
                updateCarousel(newIndex);
            } else if (e.key === 'ArrowRight') {
                const newIndex = (currentIndex + 1) % items.length;
                updateCarousel(newIndex);
            }
        });
    });
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Skill descriptions data

// Animate Skill Bars on Scroll with Intersection Observer
const skillsContainer = document.querySelector('.skills-container');
const skillLevels = document.querySelectorAll('.skill-level');

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            skillsContainer.classList.add('visible');
            skillLevels.forEach(skill => {
                skill.style.width = skill.parentElement.previousElementSibling.querySelector('p:last-child').textContent;
            });
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

// Reset skill bar widths initially and observe skills container
skillLevels.forEach(skill => skill.style.width = '0');
skillsObserver.observe(skillsContainer);

// Testimonials Slider
class TestimonialSlider {
    constructor() {
        this.slider = document.querySelector('.testimonials-slider');
        this.cards = document.querySelectorAll('.testimonial-card');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.currentIndex = 0;
        this.interval = null;
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.isAnimating = false;

        this.init();
    }

    init() {
        if (!this.slider || !this.cards.length) return;

        // Initialize first card
        this.cards[0].classList.add('active');

        // Setup event listeners
        this.setupEventListeners();

        // Start auto-sliding
        this.startAutoSlide();
    }

    setupEventListeners() {
        // Navigation buttons
        this.prevBtn?.addEventListener('click', () => this.navigate('prev'));
        this.nextBtn?.addEventListener('click', () => this.navigate('next'));

        // Touch events
        this.slider.addEventListener('touchstart', (e) => {
            this.pauseAutoSlide();
            this.touchStartX = e.changedTouches[0].screenX;
        });

        this.slider.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].screenX;
            const difference = this.touchStartX - this.touchEndX;

            if (Math.abs(difference) > 30) {
                this.navigate(difference > 0 ? 'next' : 'prev');
            }
            this.startAutoSlide();
        });

        // Mouse hover events
        this.slider.addEventListener('mouseenter', () => this.pauseAutoSlide());
        this.slider.addEventListener('mouseleave', () => this.startAutoSlide());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.navigate('prev');
            if (e.key === 'ArrowRight') this.navigate('next');
        });
    }

    navigate(direction) {
        if (this.isAnimating) return;
        this.isAnimating = true;

        const newIndex = direction === 'next'
            ? (this.currentIndex + 1) % this.cards.length
            : (this.currentIndex - 1 + this.cards.length) % this.cards.length;

        // Remove active class from current card
        this.cards[this.currentIndex].classList.remove('active');

        // Add active class to new card
        this.cards[newIndex].classList.add('active');

        this.currentIndex = newIndex;

        // Reset animation flag after transition
        setTimeout(() => {
            this.isAnimating = false;
        }, 500); // Match this with CSS transition duration
    }

    startAutoSlide() {
        if (this.interval) this.pauseAutoSlide();
        this.interval = setInterval(() => this.navigate('next'), 5000);
    }

    pauseAutoSlide() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
}

// Initialize testimonial slider
document.addEventListener('DOMContentLoaded', () => {
    new TestimonialSlider();
});


// Animate on scroll
window.addEventListener('scroll', () => {
    animateSkills();
});

// Form Validation and Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const formProps = Object.fromEntries(formData);
        
        // Basic validation
        let isValid = true;
        const email = formProps.email;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            isValid = false;
        }
        
        if (isValid) {
            try {
                // Simulate form submission
                const submitButton = contactForm.querySelector('button[type="submit"]');
                submitButton.disabled = true;
                submitButton.textContent = 'Sending...';
                
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                alert('Message sent successfully!');
                contactForm.reset();
            } catch (error) {
                alert('Failed to send message. Please try again.');
            } finally {
                const submitButton = contactForm.querySelector('button[type="submit"]');
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            }
        }
    });
}

// Enhanced Intersection Observer for Fade-in Animation with different directions
const fadeElements = document.querySelectorAll('.fade-in');
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Add random animation direction
            const directions = ['fade-up', 'fade-down', 'fade-left', 'fade-right'];
            const randomDirection = directions[Math.floor(Math.random() * directions.length)];
            entry.target.classList.add(randomDirection);
        }
    });
}, { threshold: 0.3, rootMargin: '0px 0px -50px 0px' });

fadeElements.forEach(element => fadeObserver.observe(element));

// Enhanced Typing Animation for Hero Section with cursor
const typeText = (element, text, speed = 100) => {
    // Add cursor element
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    cursor.textContent = '|';
    element.appendChild(cursor);
    let index = 0;
    element.textContent = '';
    
    const typing = setInterval(() => {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
        } else {
            clearInterval(typing);
        }
    }, speed);
};

const heroTitle = document.querySelector('.hero-content h2');
if (heroTitle) {
    const originalText = heroTitle.textContent;
    typeText(heroTitle, originalText);
}