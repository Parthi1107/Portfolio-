// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const typingText = document.getElementById('typing-text');
const particles = document.getElementById('particles');
const contactForm = document.getElementById('contact-form');
const downloadResumeBtn = document.getElementById('download-resume');

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);
});

// Typing Animation
const typingTexts = [
    'Account Manager & Sales Professional',
    'Customer Success Specialist',
    'CRM Management Expert',
    'Team Leadership Professional'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 150;

function typeText() {
    const currentText = typingTexts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex);
        charIndex--;
        typingDelay = 75;
    } else {
        typingText.textContent = currentText.substring(0, charIndex);
        charIndex++;
        typingDelay = 150;
    }
    
    if (!isDeleting && charIndex > currentText.length) {
        charIndex = currentText.length;
        typingDelay = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex < 0) {
        charIndex = 0;
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        typingDelay = 500;
    }
    
    setTimeout(typeText, typingDelay);
}

// Start typing animation after page load
setTimeout(() => {
    typeText();
}, 2000);

// Particle System
function createParticles() {
    const particleCount = 50;
    particles.innerHTML = '';
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particles.appendChild(particle);
    }
}

// Initialize particles
createParticles();

// Navigation Functionality
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Sticky Navigation
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active Navigation Link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Animated Counter
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        element.textContent = Math.floor(current);
    }, 16);
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Handle different animation types
            if (entry.target.classList.contains('stat-number')) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                animateCounter(entry.target, target);
            }
            
            if (entry.target.classList.contains('skill-bar')) {
                const skillLevel = entry.target.getAttribute('data-skill');
                const progressBar = entry.target.querySelector('.skill-progress-bar');
                setTimeout(() => {
                    progressBar.style.width = skillLevel + '%';
                }, 300);
            }
            
            if (entry.target.classList.contains('skill-circle')) {
                const skillLevel = entry.target.getAttribute('data-skill');
                const progressCircle = entry.target.querySelector('.circle-progress-bar');
                const circumference = 2 * Math.PI * 45;
                const offset = circumference - (skillLevel / 100) * circumference;
                setTimeout(() => {
                    progressCircle.style.strokeDashoffset = offset;
                }, 300);
            }
        }
    });
}, observerOptions);

// Notification system - Enhanced for better visibility
function showNotification(message, type = 'info') {
    // Remove any existing notifications first
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    // Enhanced styling for better visibility
    const backgroundColor = type === 'success' ? '#10b981' : 
                          type === 'error' ? '#ef4444' : 
                          type === 'warning' ? '#f59e0b' : '#3b82f6';
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        left: 20px;
        max-width: 400px;
        margin: 0 auto;
        background: ${backgroundColor};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 10001;
        transform: translateY(-100px);
        transition: transform 0.3s ease;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        font-weight: 500;
        font-size: 14px;
        text-align: center;
        border: 2px solid rgba(255, 255, 255, 0.2);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateY(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateY(-100px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Contact Form Handling - Enhanced with better feedback
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        
        // Simulate form submission
        setTimeout(() => {
            showNotification('Thank you for your message! I will get back to you soon.', 'success');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
        }, 1500);
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Download Resume Functionality - Enhanced
if (downloadResumeBtn) {
    downloadResumeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Show loading state
        const originalText = downloadResumeBtn.textContent;
        downloadResumeBtn.textContent = 'Downloading...';
        downloadResumeBtn.disabled = true;
        
        // Create resume content based on actual resume data
        const resumeContent = `
EMIMAL P
Account Manager & Sales Professional

Contact Information:
Phone: 9663393431
Email: emimal1716@gmail.com
Address: No. 568, 8th cross, Ramamurthy nagar, Bangalore
Date of Birth: 16/09/1996

PROFESSIONAL SUMMARY:
Dynamic and result-oriented professional with over 5 years of experience across customer service, sales, and team management roles. Recognized for building strong client relationships, streamlining operations, and contributing to business growth. Adept at working under pressure, leading teams, and delivering solutions that enhance customer satisfaction. Skilled in CRM tools, sales automation, and market analysis. Committed to continuous learning and excellence in all professional endeavors.

PROFESSIONAL EXPERIENCE:

Account Manager | Magicbricks | Bangalore (01/2025 - 05/2025)
Real estate online platform
- Built and maintained long-term client relationships, ensuring satisfaction and retention
- Acted as a key point of contact for issue resolution, bridging gaps between clients and internal teams
- Identified cross-selling and upselling opportunities to enhance revenue
- Contributed to the achievement of quarterly targets by increasing account renewals

Senior Sales Executive | Quikr | Bangalore (05/2024 - 12/2025)
Online classified advertisement platform
- Utilized C-Zentrix CRM to manage client interactions, track communication history, and streamline the sales pipeline
- Building relationships with existing clients and seeking out new ones
- Providing excellent customer service and personalized follow-ups to encourage repeat business
- Negotiating deals with clients to reach mutually beneficial agreements and close deals
- Identifying business opportunities and creating strategies
- Preparing and analyzing sales reports and data, and conducting market research
- Meeting with clients, demonstrating products, and resolving customer concerns

Senior Executive | No Broker | Bangalore (01/2022 - 03/2024)
Real estate online platform
- Leveraged Univw-NB CRM for lead management, data tracking, and customer follow-ups
- Automated recurring tasks using CRM tools to save time and boost efficiency
- Produced insights from customer data to improve service quality and drive decision-making
- Mentored junior staff and shared best practices in client handling
- Collaborated with cross-functional teams to align lead generation strategies with business goals
- Maintained high lead conversion rates through consistent follow-ups and personalized communication
- Analyzed lead behavior and campaign performance to refine outreach strategies and boost ROI

Shift Manager | McDonald's | Bangalore (05/2014 - 08/2018)
Global fast-food restaurant chain
- Managed day-to-day store operations, staff scheduling, and inventory controls
- Monitored team KPIs and implemented training to improve performance
- Led customer service initiatives, resulting in improved satisfaction scores
- Maintained hygiene and quality standards across all shift operations
- Supporting, coaching, and empowering crew to bring their best
- Handling customer complaints and inquiries in a professional manner
- Ensuring all standards are met and solving operational problems

EDUCATION:
- Diploma in I.T.E.S Management | St Joseph College, Bangalore (01/2017 - 12/2017)
- 2nd PUC | Bangalore city college, Bangalore (01/2014 - 12/2014)
- 10th | Radiant High School, Bangalore (01/2012 - 12/2012)

SKILLS:
Technical Skills:
- Univw-NB CRM
- C-zentrix CRM
- Microsoft Office
- Microsoft Power Point
- MS Excel
- Lead Generation

Soft Skills:
- Active listening
- Problem Solving
- Tone Management
- Decision Making
- Adaptability
- Teamwork

ACHIEVEMENTS:
- Top Performer – Magicbricks: Appreciated for "Top Performer of the Quarter" for consistently exceeding client satisfaction targets and contributing to account growth through effective relationship management.
- Sales Excellence – Quikr: Recognized by Quikr Sales Leadership for consistently achieving monthly sales goals and contributing to team revenue growth.
- Customer Champion – NoBroker: Appreciated by senior management for exceptional client handling and effective use of Salesforce CRM to improve response time and customer experience.
- Team Player Award – McDonald's: Received Best Team Player award for leading shift teams efficiently, solving operational issues swiftly, and maintaining high service quality during peak hours.
        `;
        
        // Create and download the resume
        setTimeout(() => {
            const blob = new Blob([resumeContent], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Emimal_P_Resume.txt';
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            
            // Reset button state
            downloadResumeBtn.textContent = originalText;
            downloadResumeBtn.disabled = false;
            
            showNotification('Resume downloaded successfully!', 'success');
        }, 1000);
    });
}

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Observe stat numbers
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => observer.observe(stat));
    
    // Observe timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => observer.observe(item));
    
    // Observe skill bars
    const skillBars = document.querySelectorAll('.skill-bar');
    skillBars.forEach(bar => observer.observe(bar));
    
    // Observe skill circles
    const skillCircles = document.querySelectorAll('.skill-circle');
    skillCircles.forEach(circle => observer.observe(circle));
    
    // Observe education cards
    const educationCards = document.querySelectorAll('.education-card');
    educationCards.forEach(card => observer.observe(card));
    
    // Observe achievement cards
    const achievementCards = document.querySelectorAll('.achievement-card');
    achievementCards.forEach(card => observer.observe(card));
    
    // Observe general fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => observer.observe(element));
});

// Smooth scrolling for all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroBackground = document.querySelector('.hero-background');
    
    if (hero && heroBackground) {
        const rate = scrolled * -0.5;
        heroBackground.style.transform = `translate3d(0, ${rate}px, 0)`;
    }
});

// Enhanced button interactions
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Card hover effects
document.querySelectorAll('.card, .timeline-content, .education-card, .achievement-card, .contact-item').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const debouncedScrollHandler = debounce(() => {
    updateActiveNavLink();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Initialize tooltips for skill tags
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Add loading states to buttons
document.querySelectorAll('button, .btn').forEach(button => {
    button.addEventListener('click', function() {
        if (!this.disabled) {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        }
    });
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Focus management for accessibility
document.querySelectorAll('.nav-link, .btn, .social-link').forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '2px solid var(--color-primary)';
        this.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Close mobile menu on resize
    if (window.innerWidth > 768) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    // Recreate particles on resize
    createParticles();
}, 250));

console.log('Emimal P Portfolio loaded successfully! 🚀');