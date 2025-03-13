// Navigation functionality
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelector('.nav-links');
const burger = document.querySelector('.burger');
const links = document.querySelectorAll('.nav-links a');

// Toggle navigation menu on mobile
burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('toggle');
});

// Close menu when clicking on a link
links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        burger.classList.remove('toggle');
    });
});

// Change navbar style on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Add active class to nav links based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Skills to Projects navigation
document.querySelectorAll('.skill-item').forEach(skill => {
    skill.addEventListener('click', () => {
        const skillId = skill.getAttribute('data-skill');
        
        // Find related projects
        const relatedLinks = document.querySelectorAll(`.related-links a[data-skill="${skillId}"]`);
        
        if (relatedLinks.length > 0) {
            // Navigate to the first related project
            const projectId = relatedLinks[0].getAttribute('data-project');
            const projectElement = document.querySelector(`[data-project="${projectId}"]`);
            
            if (projectElement) {
                projectElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Projects to Skills navigation
document.querySelectorAll('.project-card').forEach(project => {
    project.addEventListener('click', (e) => {
        // Only trigger if not clicking on the "View details" button
        if (!e.target.classList.contains('project-btn')) {
            const projectId = project.getAttribute('data-project');
            
            // Find related skills
            const relatedLinks = document.querySelectorAll(`.related-links a[data-project="${projectId}"]`);
            
            if (relatedLinks.length > 0) {
                // Navigate to the first related skill
                const skillId = relatedLinks[0].getAttribute('data-skill');
                const skillElement = document.querySelector(`[data-skill="${skillId}"]`);
                
                if (skillElement) {
                    skillElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Here you would normally handle the form submission with AJAX
        // For now, just show a success message
        const formElements = contactForm.elements;
        let isValid = true;
        
        // Basic validation
        for (let i = 0; i < formElements.length; i++) {
            if (formElements[i].hasAttribute('required') && !formElements[i].value) {
                isValid = false;
                formElements[i].style.borderColor = 'red';
            } else {
                formElements[i].style.borderColor = '#ddd';
            }
        }
        
        if (isValid) {
            // Create success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Votre message a été envoyé avec succès!';
            successMessage.style.color = '#2ecc71';
            successMessage.style.padding = '15px';
            successMessage.style.marginTop = '20px';
            successMessage.style.textAlign = 'center';
            successMessage.style.fontWeight = 'bold';
            
            // Add success message to the form
            contactForm.appendChild(successMessage);
            
            // Reset form
            contactForm.reset();
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        }
    });
}

// Animation on scroll
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in class to elements when they come into view
    const fadeElements = document.querySelectorAll('.about-card, .skill-item, .project-card, .timeline-item');
    
    const fadeInOptions = {
        threshold: 0.3,
        rootMargin: "0px 0px -100px 0px"
    };
    
    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, fadeInOptions);
    
    fadeElements.forEach(element => {
        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";
        element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        fadeInObserver.observe(element);
    });
    
    // Add the CSS for the fade-in animation
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});
