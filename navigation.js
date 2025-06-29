// Script separado para menú hamburguesa y botón back-to-top
// Este script es independiente y no interfiere con otros scripts

(function() {
    'use strict';
    
    console.log('🚀 Script de navegación cargado');
    
    // Esperar a que el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavigation);
    } else {
        initNavigation();
    }
    
    function initNavigation() {
        console.log('📱 Inicializando navegación...');
        
        setupHamburgerMenu();
        setupBackToTopButton();
        setupScrollEffects();
    }
    
    function setupHamburgerMenu() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        console.log('🍔 Configurando menú hamburguesa:', {
            toggle: !!navToggle,
            menu: !!navMenu
        });
        
        if (!navToggle || !navMenu) {
            console.warn('❌ Elementos del menú no encontrados');
            return;
        }
        
        // Event listener para el botón hamburguesa
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('🍔 Click en hamburguesa');
            
            const isOpen = navMenu.classList.contains('show');
            console.log('Estado actual del menú:', isOpen ? 'abierto' : 'cerrado');
            
            if (isOpen) {
                // Cerrar menú
                navMenu.classList.remove('show');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
                console.log('✅ Menú cerrado');
            } else {
                // Abrir menú
                navMenu.classList.add('show');
                navToggle.classList.add('active');
                navToggle.setAttribute('aria-expanded', 'true');
                document.body.style.overflow = 'hidden';
                console.log('✅ Menú abierto');
            }
        });
        
        // Cerrar menú al hacer click fuera
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                if (navMenu.classList.contains('show')) {
                    navMenu.classList.remove('show');
                    navToggle.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            }
        });
        
        // Cerrar menú con Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
        
        // Cerrar menú al hacer click en enlaces
        const navLinks = navMenu.querySelectorAll('a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('show');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
        
        console.log('✅ Menú hamburguesa configurado correctamente');
    }
    
    function setupBackToTopButton() {
        const backToTop = document.getElementById('back-to-top');
        
        console.log('⬆️ Configurando botón back-to-top:', !!backToTop);
        
        if (!backToTop) {
            console.warn('❌ Botón back-to-top no encontrado');
            return;
        }
        
        // Event listener para el botón
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('⬆️ Click en back-to-top');
            
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        console.log('✅ Botón back-to-top configurado correctamente');
    }
    
    function setupScrollEffects() {
        const header = document.getElementById('header');
        const backToTop = document.getElementById('back-to-top');
        
        console.log('📜 Configurando efectos de scroll');
        
        // Throttle function para optimizar performance
        function throttle(func, limit) {
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
        
        const handleScroll = throttle(function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Efecto del header
            if (header) {
                if (scrollTop > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            }
            
            // Mostrar/ocultar botón back-to-top
            if (backToTop) {
                if (scrollTop > 300) {
                    backToTop.classList.add('show');
                } else {
                    backToTop.classList.remove('show');
                }
            }
        }, 16);
        
        window.addEventListener('scroll', handleScroll);
        
        // Ejecutar una vez para estado inicial
        handleScroll();
        
        console.log('✅ Efectos de scroll configurados correctamente');
    }
    
    // Cerrar menú móvil al cambiar tamaño de ventana
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            const navMenu = document.getElementById('nav-menu');
            const navToggle = document.getElementById('nav-toggle');
            
            if (navMenu && navToggle) {
                navMenu.classList.remove('show');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        }
    });
    
    console.log('🎯 Script de navegación inicializado completamente');
    
})();
