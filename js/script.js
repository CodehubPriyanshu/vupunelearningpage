// DOM Elements
const header = document.getElementById('header');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navList = document.querySelector('.nav-list');
const admissionForm = document.getElementById('admissionForm');
const sharedAdmissionForm = document.getElementById('sharedAdmissionForm');
const applicationModal = document.getElementById('applicationModal');
const successModal = document.getElementById('successModal');
const modalCloseBtn = document.querySelector('.modal-close');
const successModalCloseBtn = document.getElementById('successModalCloseBtn');
const statNumbers = document.querySelectorAll('.stat-number');

// Sticky button elements
const applyStickyBtn = document.getElementById('applyStickyBtn');
const brochureStickyBtn = document.getElementById('brochureStickyBtn');
const modalCloseButtons = document.querySelectorAll('.modal-close');

// Header Sticky Behavior
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});

// Mobile Menu Toggle
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navList.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    });
}

// Close mobile menu when clicking on a link
if (navList) {
    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            if (mobileMenuBtn) {
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });
}

// Removed JS-driven testimonial slider; CSS handles continuous scrolling

// Statistics Counter Animation
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    if (isNaN(target)) return;
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

function initCounters() {
    if (!statNumbers || statNumbers.length === 0) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                animateCounter(counter);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(counter => {
        observer.observe(counter);
    });
}

// Modal Functions
function openModal(modalElement) {
    if (modalElement) {
        modalElement.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    }
}

function closeModal(modalElement) {
    if (modalElement) {
        modalElement.classList.remove('active');
        document.body.style.overflow = ''; // Restore scroll
    }
}

// Close modals when clicking close button
modalCloseButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const modal = button.closest('.modal-overlay');
        closeModal(modal);
    });
});

// Close modals when clicking outside
document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
});

// Close modals with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach(modal => {
            closeModal(modal);
        });
    }
});

// Handle sticky button clicks
if (applyStickyBtn) {
    applyStickyBtn.addEventListener('click', () => {
        // Update modal content for application
        document.getElementById('modalTitle').textContent = 'Apply for Admission 2026';
        document.getElementById('modalSubtitle').textContent = 'Begin your journey towards excellence';
        openModal(applicationModal);
    });
}

if (brochureStickyBtn) {
    brochureStickyBtn.addEventListener('click', () => {
        // Update modal content for brochure request
        document.getElementById('modalTitle').textContent = 'Request Programme Brochure';
        document.getElementById('modalSubtitle').textContent = 'Get detailed information about our programmes';
        openModal(applicationModal);
    });
}

// Handle hero section form submission
if (admissionForm) {
    admissionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const mobile = document.getElementById('mobile').value;
        const programme = document.getElementById('programme').value;
        const level = document.getElementById('level').value;
        
        // Simple validation
        if (!fullName || !email || !mobile || !programme || !level) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Validate mobile number (Indian format)
        const mobileRegex = /^[6-9]\d{9}$/;
        if (!mobileRegex.test(mobile)) {
            alert('Please enter a valid 10-digit Indian mobile number.');
            return;
        }
        
        // If validation passes, show success modal
        if (successModal) openModal(successModal);
        
        // Reset form
        admissionForm.reset();
    });
}

// Handle shared modal form submission
if (sharedAdmissionForm) {
    sharedAdmissionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const fullName = document.getElementById('modalFullName').value;
        const email = document.getElementById('modalEmail').value;
        const mobile = document.getElementById('modalMobile').value;
        const programme = document.getElementById('modalProgramme').value;
        const level = document.getElementById('modalLevel').value;
        
        // Simple validation
        if (!fullName || !email || !mobile || !programme || !level) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Validate mobile number (Indian format)
        const mobileRegex = /^[6-9]\d{9}$/;
        if (!mobileRegex.test(mobile)) {
            alert('Please enter a valid 10-digit Indian mobile number.');
            return;
        }
        
        // Close application modal and show success modal
        closeModal(applicationModal);
        setTimeout(() => {
            openModal(successModal);
        }, 300); // Small delay for smooth transition
        
        // Reset form
        sharedAdmissionForm.reset();
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize counters
    initCounters();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation to elements when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.advantage-card, .programme-card, .placement-stat, .ranking-card').forEach(el => {
        observer.observe(el);
    });
});