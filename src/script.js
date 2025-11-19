// ==========================================
// MOBILE MENU FUNCTIONALITY
// ==========================================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

// Toggle mobile menu
mobileMenuBtn.addEventListener('click', function() {
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('show');
});

// Close mobile menu when a link is clicked
mobileLinks.forEach(function(link) {
    link.addEventListener('click', function() {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('show');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const isClickInsideMenu = mobileMenu.contains(event.target);
    const isClickOnButton = mobileMenuBtn.contains(event.target);
    
    if (!isClickInsideMenu && !isClickOnButton && mobileMenu.classList.contains('show')) {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('show');
    }
});

// ==========================================
// SKILLS TAB FUNCTIONALITY
// ==========================================
const tabButtons = document.querySelectorAll('.tab-button');
const skillContents = document.querySelectorAll('.skill-content');

tabButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        const targetTab = this.getAttribute('data-tab');
        
        // Remove active class from all buttons
        tabButtons.forEach(function(btn) {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Hide all skill content sections
        skillContents.forEach(function(content) {
            content.classList.add('hidden');
            // Reset animation for stagger items
            const staggerItems = content.querySelectorAll('.stagger-item');
            staggerItems.forEach(item => item.classList.remove('active'));
        });
        
        // Show the selected skill content
        const targetContent = document.querySelector(`[data-content="${targetTab}"]`);
        if (targetContent) {
            targetContent.classList.remove('hidden');
            
            // Trigger stagger animation for new content
            const staggerItems = targetContent.querySelectorAll('.stagger-item');
            staggerItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('active');
                }, index * 100); // 100ms delay between each item
            });
        }
    });
});

// ==========================================
// SMOOTH SCROLLING FOR NAVIGATION LINKS
// ==========================================
const navLinks = document.querySelectorAll('a[href^="#"]');

navLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // 80px offset for fixed nav
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// CONTACT FORM SUBMISSION
// ==========================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Show success message
        alert(`Thank you ${name}! Your message has been received. We'll get back to you at ${email} soon.`);
        
        // Reset form
        contactForm.reset();
    });
}

// ==========================================
// SCROLL ANIMATION SYSTEM
// ==========================================

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            // For stagger items in visible skill content, add delays
            if (entry.target.classList.contains('skill-content') && !entry.target.classList.contains('hidden')) {
                const staggerItems = entry.target.querySelectorAll('.stagger-item');
                staggerItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('active');
                    }, index * 100); // 100ms delay between each item
                });
            }
        }
    });
}, observerOptions);

// Observe all animated elements
const animatedElements = document.querySelectorAll('.fade-up, .fade-in, .slide-left, .slide-right, .scale-up');
animatedElements.forEach(el => observer.observe(el));

// Observe skill content containers for stagger animation
const skillContainers = document.querySelectorAll('.skill-content');
skillContainers.forEach(container => observer.observe(container));

// ==========================================
// ACTIVE NAVIGATION HIGHLIGHT ON SCROLL
// ==========================================
const sections = document.querySelectorAll('section[id]');
const desktopNavLinks = document.querySelectorAll('.nav-link');

function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(function(section) {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            desktopNavLinks.forEach(function(link) {
                link.classList.remove('gradient-text');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('gradient-text');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavOnScroll);

// ==========================================
// INITIALIZE ON PAGE LOAD
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    // console.log('Portfolio website loaded successfully!');
    
    // Trigger initial scroll check
    highlightNavOnScroll();
    
    // Animate initial skill badges (Salesforce tab is active by default)
    const initialSkillContent = document.querySelector('.skill-content:not(.hidden)');
    if (initialSkillContent) {
        const staggerItems = initialSkillContent.querySelectorAll('.stagger-item');
        staggerItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('active');
            }, index * 100);
        });
    }
});