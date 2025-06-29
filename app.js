// Professional Website JavaScript for David Eduardo Espinosa Rojas
// Enhanced with accessibility and smooth interactions

class ProfessionalWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeComponents();
        this.handleInitialLoad();
    }

    setupEventListeners() {
        // Navigation
        document.addEventListener('DOMContentLoaded', () => {
            this.setupNavigation();
            this.setupScrollEffects();
            this.setupContactForm();
            this.setupModal();
            this.setupBackToTop();
        });

        // Window events
        window.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), 16));
        window.addEventListener('resize', this.debounce(this.handleResize.bind(this), 300));
    }

    initializeComponents() {
        // Initialize all interactive components
        this.navToggle = document.getElementById('nav-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.header = document.getElementById('header');
        this.backToTop = document.getElementById('back-to-top');
        this.contactForm = document.getElementById('contact-form');
        this.serviceModal = document.getElementById('service-modal');
        
        // Service data for modal
        this.serviceData = {
            'web-development': {
                title: 'Desarrollo Web Completo',
                price: '$800 - $2,500 USD',
                description: 'Desarrollo de aplicaciones web modernas y escalables con las últimas tecnologías del mercado.',
                details: [
                    'Frontend moderno con Angular o React',
                    'Backend robusto con NestJS',
                    'Base de datos optimizada (PostgreSQL/MongoDB)',
                    'Autenticación y seguridad avanzada',
                    'Deploy automatizado con CI/CD',
                    'Optimización SEO y performance',
                    'Responsive design para todos los dispositivos',
                    'Documentación técnica completa',
                    '3 meses de soporte post-entrega'
                ],
                timeline: '2-8 semanas según complejidad',
                technologies: ['Angular', 'React', 'NestJS', 'PostgreSQL', 'AWS', 'Docker']
            },
            'api-backend': {
                title: 'APIs y Backend',
                price: '$600 - $1,800 USD',
                description: 'Desarrollo de APIs REST y GraphQL escalables con arquitectura profesional.',
                details: [
                    'APIs REST y GraphQL con NestJS',
                    'Autenticación JWT y OAuth2',
                    'Validación de datos robusta',
                    'Documentación automática con Swagger',
                    'Testing automatizado completo',
                    'Optimización de performance',
                    'Integración con servicios externos',
                    'Monitoreo y logging avanzado',
                    'Deploy en cloud (AWS/GCP/Azure)'
                ],
                timeline: '1-6 semanas según complejidad',
                technologies: ['NestJS', 'GraphQL', 'PostgreSQL', 'JWT', 'Swagger', 'Docker']
            },
            'consulting': {
                title: 'Consultoría Técnica',
                price: '$150/hora',
                description: 'Asesoría especializada para optimizar tu arquitectura y procesos de desarrollo.',
                details: [
                    'Auditoría de código y arquitectura',
                    'Optimización de performance',
                    'Implementación de mejores prácticas',
                    'Mentoring técnico personalizado',
                    'Migración de sistemas legacy',
                    'Implementación de CI/CD',
                    'Arquitectura de microservicios',
                    'Estrategias de escalabilidad',
                    'Code reviews y documentación'
                ],
                timeline: 'Flexible según necesidades',
                technologies: ['Análisis de múltiples tecnologías', 'DevOps', 'Arquitectura', 'Metodologías']
            },
            'mobile-development': {
                title: 'Desarrollo Móvil Kotlin',
                price: '$1,000 - $3,000 USD',
                description: 'Aplicaciones móviles nativas para Android con Material Design y máximo rendimiento.',
                details: [
                    'Desarrollo nativo con Kotlin',
                    'Material Design 3 implementado',
                    'Integración con APIs REST',
                    'Almacenamiento local optimizado',
                    'Notificaciones push',
                    'Compatibilidad multi-dispositivo',
                    'Testing automatizado',
                    'Publicación en Google Play Store',
                    'Soporte post-lanzamiento'
                ],
                timeline: '3-10 semanas según complejidad',
                technologies: ['Kotlin', 'Android Studio', 'Material Design', 'Retrofit', 'Room']
            }
        };
    }

    handleInitialLoad() {
        // Handle initial page load
        this.updateActiveNavLink();
        
        // Smooth scroll for anchor links
        if (window.location.hash) {
            setTimeout(() => {
                this.scrollToSection(window.location.hash.substring(1));
            }, 100);
        }
    }

    setupNavigation() {
        // Mobile menu toggle
        if (this.navToggle && this.navMenu) {
            this.navToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!this.navMenu.contains(e.target) && !this.navToggle.contains(e.target)) {
                    this.closeMobileMenu();
                }
            });

            // Close menu on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.navMenu.classList.contains('show')) {
                    this.closeMobileMenu();
                    this.navToggle.focus();
                }
            });
        }

        // Smooth scroll for navigation links
        const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
                this.closeMobileMenu();
            });
        });
    }

    toggleMobileMenu() {
        const isOpen = this.navMenu.classList.contains('show');
        
        if (isOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    openMobileMenu() {
        this.navMenu.classList.add('show');
        this.navToggle.setAttribute('aria-expanded', 'true');
        this.navToggle.setAttribute('aria-label', 'Cerrar menú de navegación');
        
        // Trap focus within menu
        const firstFocusable = this.navMenu.querySelector('a, button');
        if (firstFocusable) {
            firstFocusable.focus();
        }
    }

    closeMobileMenu() {
        this.navMenu.classList.remove('show');
        this.navToggle.setAttribute('aria-expanded', 'false');
        this.navToggle.setAttribute('aria-label', 'Abrir menú de navegación');
    }

    setupScrollEffects() {
        // Intersection Observer for section visibility
        const sections = document.querySelectorAll('section[id]');
        const options = {
            root: null,
            rootMargin: '-20% 0px -20% 0px',
            threshold: 0
        };

        this.sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.updateActiveNavLink(entry.target.id);
                }
            });
        }, options);

        sections.forEach(section => {
            this.sectionObserver.observe(section);
        });
    }

    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Header scroll effect
        if (this.header) {
            if (scrollTop > 50) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }
        }

        // Back to top button
        if (this.backToTop) {
            if (scrollTop > 300) {
                this.backToTop.classList.add('show');
            } else {
                this.backToTop.classList.remove('show');
            }
        }
    }

    updateActiveNavLink(activeId) {
        const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (activeId && link.getAttribute('href') === `#${activeId}`) {
                link.classList.add('active');
            }
        });
    }

    setupBackToTop() {
        if (this.backToTop) {
            this.backToTop.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    setupContactForm() {
        if (this.contactForm) {
            this.contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit();
            });

            // Real-time validation
            const inputs = this.contactForm.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', () => {
                    this.validateField(input);
                });
                
                input.addEventListener('input', () => {
                    this.clearFieldError(input);
                });
            });
        }
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Clear previous errors
        this.clearFieldError(field);

        // Required field validation
        if (field.required && !value) {
            isValid = false;
            errorMessage = 'Este campo es obligatorio';
        }

        // Email validation
        if (fieldName === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Por favor ingresa un email válido';
            }
        }

        // Name validation
        if (fieldName === 'name' && value) {
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'El nombre debe tener al menos 2 caracteres';
            }
        }

        // Message validation
        if (fieldName === 'message' && value) {
            if (value.length < 10) {
                isValid = false;
                errorMessage = 'El mensaje debe tener al menos 10 caracteres';
            }
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    showFieldError(field, message) {
        const errorElement = document.getElementById(`${field.name}-error`);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
        field.classList.add('error');
        field.setAttribute('aria-invalid', 'true');
    }

    clearFieldError(field) {
        const errorElement = document.getElementById(`${field.name}-error`);
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.classList.remove('show');
        }
        field.classList.remove('error');
        field.setAttribute('aria-invalid', 'false');
    }

    handleFormSubmit() {
        const formData = new FormData(this.contactForm);
        const requiredFields = this.contactForm.querySelectorAll('[required]');
        let isFormValid = true;

        // Validate all required fields
        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            // Show success message
            this.showFormSuccess();
            
            // Here you would typically send the data to your backend
            console.log('Form data:', Object.fromEntries(formData));
            
            // Reset form after successful submission
            setTimeout(() => {
                this.contactForm.reset();
                this.hideFormSuccess();
            }, 3000);
        } else {
            // Focus on first invalid field
            const firstInvalidField = this.contactForm.querySelector('.error');
            if (firstInvalidField) {
                firstInvalidField.focus();
            }
        }
    }

    showFormSuccess() {
        const submitButton = this.contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = '✓ Solicitud Enviada';
        submitButton.disabled = true;
        submitButton.classList.add('success');
        
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Gracias por tu mensaje. Te contactaré pronto.';
        successMessage.style.cssText = `
            background: rgba(33, 128, 141, 0.1);
            color: var(--color-success);
            padding: var(--space-12);
            border-radius: var(--radius-base);
            margin-top: var(--space-16);
            text-align: center;
            font-weight: var(--font-weight-medium);
        `;
        
        this.contactForm.appendChild(successMessage);
        
        // Reset after 3 seconds
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            submitButton.classList.remove('success');
        }, 3000);
    }

    hideFormSuccess() {
        const successMessage = this.contactForm.querySelector('.success-message');
        if (successMessage) {
            successMessage.remove();
        }
    }

    setupModal() {
        if (this.serviceModal) {
            // Close modal when clicking overlay
            const overlay = this.serviceModal.querySelector('.modal__overlay');
            if (overlay) {
                overlay.addEventListener('click', () => {
                    this.closeServiceModal();
                });
            }

            // Close modal on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.serviceModal.classList.contains('show')) {
                    this.closeServiceModal();
                }
            });
        }
    }

    openServiceModal(serviceId) {
        const service = this.serviceData[serviceId];
        if (!service || !this.serviceModal) return;

        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');

        if (modalTitle) {
            modalTitle.textContent = service.title;
        }

        if (modalBody) {
            modalBody.innerHTML = `
                <div class="service-modal-content">
                    <div class="service-modal-price">
                        <strong>${service.price}</strong>
                    </div>
                    <p class="service-modal-description">
                        ${service.description}
                    </p>
                    
                    <h4>¿Qué incluye?</h4>
                    <ul class="service-modal-features">
                        ${service.details.map(detail => `<li>✓ ${detail}</li>`).join('')}
                    </ul>
                    
                    <div class="service-modal-timeline">
                        <h4>Tiempo de entrega</h4>
                        <p>${service.timeline}</p>
                    </div>
                    
                    <div class="service-modal-tech">
                        <h4>Tecnologías</h4>
                        <div class="tech-tags-modal">
                            ${service.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                    </div>
                </div>
            `;
        }

        this.serviceModal.classList.add('show');
        this.serviceModal.setAttribute('aria-hidden', 'false');
        
        // Focus on close button for accessibility
        const closeButton = this.serviceModal.querySelector('.modal__close');
        if (closeButton) {
            closeButton.focus();
        }

        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    closeServiceModal() {
        if (this.serviceModal) {
            this.serviceModal.classList.remove('show');
            this.serviceModal.setAttribute('aria-hidden', 'true');
            
            // Restore body scroll
            document.body.style.overflow = '';
        }
    }

    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const headerHeight = this.header ? this.header.offsetHeight : 0;
            const offsetTop = section.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    handleResize() {
        // Close mobile menu on resize to larger screen
        if (window.innerWidth > 768) {
            this.closeMobileMenu();
        }
    }

    // Utility functions
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    debounce(func, wait) {
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
}

// Global functions for button onclick handlers
function scrollToSection(sectionId) {
    if (window.professionalWebsite) {
        window.professionalWebsite.scrollToSection(sectionId);
    }
}

function openServiceModal(serviceId) {
    if (window.professionalWebsite) {
        window.professionalWebsite.openServiceModal(serviceId);
    }
}

function closeServiceModal() {
    if (window.professionalWebsite) {
        window.professionalWebsite.closeServiceModal();
    }
}

// Initialize the website when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.professionalWebsite = new ProfessionalWebsite();
});

// Additional enhancements
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll behavior for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const offsetTop = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add loading animation to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.classList.contains('loading') && this.type !== 'submit') {
                this.classList.add('loading');
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 600);
            }
        });
    });

    // Lazy loading for images (if any were added)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Add subtle animations to cards on scroll
    const cards = document.querySelectorAll('.card, .service, .testimonial');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    cards.forEach(card => {
        cardObserver.observe(card);
    });

    // Add CSS animation for cards
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .card, .service, .testimonial {
            opacity: 0;
        }
        
        .btn.loading {
            pointer-events: none;
            opacity: 0.7;
        }
        
        .btn.loading::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 16px;
            height: 16px;
            margin: -8px 0 0 -8px;
            border: 2px solid transparent;
            border-top: 2px solid currentColor;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .tech-tags-modal {
            display: flex;
            flex-wrap: wrap;
            gap: var(--space-8);
            margin-top: var(--space-8);
        }
        
        .service-modal-content {
            line-height: 1.6;
        }
        
        .service-modal-price {
            font-size: var(--font-size-xl);
            color: var(--color-accent-professional);
            margin-bottom: var(--space-16);
        }
        
        .service-modal-features {
            list-style: none;
            padding: 0;
            margin: var(--space-12) 0;
        }
        
        .service-modal-features li {
            padding: var(--space-4) 0;
            color: var(--color-text-secondary);
        }
        
        .service-modal-timeline,
        .service-modal-tech {
            margin-top: var(--space-20);
        }
        
        .service-modal-timeline h4,
        .service-modal-tech h4 {
            color: var(--color-primary-professional);
            margin-bottom: var(--space-8);
        }
    `;
    document.head.appendChild(style);
});

// Performance optimization
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Preload critical resources
        const criticalLinks = document.querySelectorAll('a[href^="#"]');
        criticalLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    // Preload section content
                    target.getBoundingClientRect();
                }
            }
        });
    });
}

// Service Worker registration (if available)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Only register if service worker file exists
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}