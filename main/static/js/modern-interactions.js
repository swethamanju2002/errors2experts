/* ============================================================================
   MODERN INTERACTIONS - Premium JavaScript Enhancements
   Errors2Experts - Interactive Features
   ============================================================================ */

(function() {
    'use strict';

    // ===== SCROLL PROGRESS BAR =====
    function initScrollProgress() {
        const progressBar = document.querySelector('body::before');
        
        window.addEventListener('scroll', () => {
            const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            document.documentElement.style.setProperty('--progress', scrollPercentage + '%');
        });
    }

    // ===== NAVBAR SCROLL DETECTION =====
    function initNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        let lastScrollY = 0;
        
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            // Add scrolled class
            if (scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Hide/show on scroll direction
            if (scrollY > lastScrollY && scrollY > 500) {
                // Scrolling down
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollY = scrollY;
        }, { passive: true });
    }

    // ===== ACTIVE NAV LINK =====
    function initActiveNavLink() {
        const currentLocation = location.pathname;
        const navLinks = document.querySelectorAll('.navbar .nav-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentLocation || (href === '/' && currentLocation === '/')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // ===== PARALLAX EFFECT =====
    function initParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        if (parallaxElements.length === 0) return;

        window.addEventListener('scroll', () => {
            parallaxElements.forEach(element => {
                const factor = parseFloat(element.dataset.parallax) || 0.5;
                const yPos = window.scrollY * factor;
                element.style.transform = `translateY(${yPos}px)`;
            });
        }, { passive: true });
    }

    // ===== INTERSECTION OBSERVER FOR SCROLL ANIMATIONS =====
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements with data-aos attribute
        const animatedElements = document.querySelectorAll('[data-aos]');
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    // ===== STAGGER CARD ANIMATIONS =====
    function initStaggerCards() {
        const cardContainers = document.querySelectorAll('[data-stagger-container]');
        
        cardContainers.forEach(container => {
            const cards = container.querySelectorAll('[data-stagger-item]');
            
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        const delay = index * 0.1;
                        entry.target.style.animation = `revealUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s forwards`;
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            cards.forEach(card => observer.observe(card));
        });
    }

    // ===== COUNTER ANIMATION =====
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start) + '+';
            }
        }, 16);
    }

    function initCounters() {
        const counters = document.querySelectorAll('[data-counter]');
        
        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.dataset.counter);
                    animateCounter(entry.target, target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        counters.forEach(counter => observer.observe(counter));
    }

    // ===== BUTTON RIPPLE EFFECT =====
    function initRippleEffect() {
        const buttons = document.querySelectorAll('button, .btn, .register-btn, .explore-btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.5);
                    left: ${x}px;
                    top: ${y}px;
                    pointer-events: none;
                    animation: ripple 0.6s ease-out;
                `;

                button.style.position = 'relative';
                button.style.overflow = 'hidden';
                button.appendChild(ripple);

                setTimeout(() => ripple.remove(), 600);
            });
        });

        // Add ripple animation if not already present
        if (!document.querySelector('style[data-ripple]')) {
            const style = document.createElement('style');
            style.setAttribute('data-ripple', 'true');
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // ===== SMOOTH SCROLL ANCHOR LINKS =====
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    // ===== FORM VALIDATION WITH VISUAL FEEDBACK =====
    function initFormValidation() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                const inputs = form.querySelectorAll('input, textarea, select');
                let isValid = true;

                inputs.forEach(input => {
                    if (!input.value.trim() && input.hasAttribute('required')) {
                        isValid = false;
                        input.classList.add('is-invalid');
                        input.addEventListener('input', () => {
                            input.classList.remove('is-invalid');
                        });
                    }
                });

                if (!isValid) {
                    e.preventDefault();
                    console.warn('Form validation failed');
                }
            });
        });
    }

    // ===== TOOLTIP INITIALIZATION =====
    function initTooltips() {
        const tooltips = document.querySelectorAll('[data-tooltip]');
        
        tooltips.forEach(element => {
            element.addEventListener('mouseenter', () => {
                const tooltip = document.createElement('div');
                tooltip.className = 'custom-tooltip';
                tooltip.textContent = element.dataset.tooltip;
                tooltip.style.cssText = `
                    position: absolute;
                    background: rgba(0, 0, 0, 0.8);
                    color: white;
                    padding: 8px 12px;
                    border-radius: 6px;
                    font-size: 12px;
                    white-space: nowrap;
                    z-index: 1000;
                    pointer-events: none;
                `;
                document.body.appendChild(tooltip);

                const rect = element.getBoundingClientRect();
                tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
                tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';

                element.addEventListener('mouseleave', () => tooltip.remove());
            });
        });
    }

    // ===== LAZY LOAD IMAGES =====
    function initLazyLoad() {
        if ('IntersectionObserver' in window) {
            const images = document.querySelectorAll('img[data-src]');
            
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }
    }

    // ===== MODAL ENHANCEMENTS =====
    function initModalEnhancements() {
        const modals = document.querySelectorAll('.modal');
        
        modals.forEach(modal => {
            // Add animation on show
            modal.addEventListener('show.bs.modal', () => {
                modal.querySelector('.modal-content').style.animation = 'modalFadeIn 0.4s ease-out';
            });

            // Focus trap
            modal.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    const focusables = modal.querySelectorAll(
                        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                    );
                    const firstFocusable = focusables[0];
                    const lastFocusable = focusables[focusables.length - 1];

                    if (e.shiftKey && document.activeElement === firstFocusable) {
                        e.preventDefault();
                        lastFocusable.focus();
                    } else if (!e.shiftKey && document.activeElement === lastFocusable) {
                        e.preventDefault();
                        firstFocusable.focus();
                    }
                }
            });
        });
    }

    // ===== KEYBOARD SHORTCUTS =====
    function initKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + / for search
            if ((e.ctrlKey || e.metaKey) && e.key === '/') {
                e.preventDefault();
                const searchInput = document.querySelector('[data-search]');
                if (searchInput) searchInput.focus();
            }

            // Escape to close modals
            if (e.key === 'Escape') {
                const activeModal = document.querySelector('.modal.show');
                if (activeModal) {
                    const modalInstance = bootstrap.Modal.getInstance(activeModal);
                    if (modalInstance) modalInstance.hide();
                }
            }
        });
    }

    // ===== DARK MODE TOGGLE =====
    function initDarkMode() {
        const darkModeToggle = document.querySelector('[data-dark-mode-toggle]');
        if (!darkModeToggle) return;

        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const isDark = localStorage.getItem('darkMode') === 'true' || prefersDark;

        if (isDark) document.body.classList.add('dark-mode');

        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });
    }

    // ===== PERFORMANCE MONITORING =====
    function initPerformanceMonitoring() {
        if (window.performance && window.performance.timing) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const timing = window.performance.timing;
                    const loadTime = timing.loadEventEnd - timing.navigationStart;
                    console.log(`Page loaded in ${loadTime}ms`);
                }, 0);
            });
        }
    }

    // ===== INITIALIZE ALL =====
    function init() {
        // Check if DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                initScrollProgress();
                initNavbarScroll();
                initActiveNavLink();
                initParallax();
                initScrollAnimations();
                initStaggerCards();
                initCounters();
                initRippleEffect();
                initSmoothScroll();
                initFormValidation();
                initTooltips();
                initLazyLoad();
                initModalEnhancements();
                initKeyboardShortcuts();
                initDarkMode();
                initPerformanceMonitoring();
            });
        } else {
            initScrollProgress();
            initNavbarScroll();
            initActiveNavLink();
            initParallax();
            initScrollAnimations();
            initStaggerCards();
            initCounters();
            initRippleEffect();
            initSmoothScroll();
            initFormValidation();
            initTooltips();
            initLazyLoad();
            initModalEnhancements();
            initKeyboardShortcuts();
            initDarkMode();
            initPerformanceMonitoring();
        }
    }

    // Start initialization
    init();

})();
