// Main application initialization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize language
    initializeLanguage();
    
    // Initialize animations
    initializeAnimations();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
    
    // Initialize lazy loading
    initializeLazyLoading();
    
    // Initialize performance monitoring
    initializePerformanceMonitoring();
    
    // Initialize chat
    chatState.language = currentLanguage;
    updateChatContent();
    
    // Add scroll event listener for header
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', throttle(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    }, 100));
    
    // Add active nav link highlighting
    updateActiveNavLink();
    window.addEventListener('scroll', debounce(updateActiveNavLink, 100));
    
    // Initialize contact form if present
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        initializeContactForm();
    }
    
    // Initialize any other forms
    const forms = document.querySelectorAll('form[data-form-type]');
    forms.forEach(initializeForm);
});

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(currentSection)) {
            link.classList.add('active');
        }
    });
}

// Initialize contact form
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (!validateForm(form)) {
            return;
        }
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = showLoading(submitBtn);
        
        try {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // Simulate API call (replace with actual endpoint)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            showAlert(t('contact.success'), 'success');
            form.reset();
            
        } catch (error) {
            console.error('Form submission error:', error);
            showAlert(t('contact.error'), 'error');
        } finally {
            hideLoading(submitBtn, originalText);
        }
    });
}

// Initialize generic forms
function initializeForm(form) {
    const formType = form.getAttribute('data-form-type');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (!validateForm(form)) {
            return;
        }
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = showLoading(submitBtn);
        
        try {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // Handle different form types
            switch (formType) {
                case 'career':
                    await handleCareerForm(data);
                    break;
                case 'newsletter':
                    await handleNewsletterForm(data);
                    break;
                default:
                    await handleGenericForm(data);
            }
            
            showAlert('Form submitted successfully!', 'success');
            form.reset();
            
        } catch (error) {
            console.error('Form submission error:', error);
            showAlert('There was an error submitting the form. Please try again.', 'error');
        } finally {
            hideLoading(submitBtn, originalText);
        }
    });
}

// Form handlers
async function handleCareerForm(data) {
    // Simulate API call for career form
    console.log('Career form data:', data);
    await new Promise(resolve => setTimeout(resolve, 1500));
}

async function handleNewsletterForm(data) {
    // Simulate API call for newsletter
    console.log('Newsletter form data:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
}

async function handleGenericForm(data) {
    // Simulate API call for generic form
    console.log('Generic form data:', data);
    await new Promise(resolve => setTimeout(resolve, 1500));
}

// Search functionality (if needed)
function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    if (!searchInput || !searchResults) return;
    
    searchInput.addEventListener('input', debounce(async (e) => {
        const query = e.target.value.trim();
        
        if (query.length < 2) {
            searchResults.innerHTML = '';
            searchResults.style.display = 'none';
            return;
        }
        
        try {
            const results = await performSearch(query);
            displaySearchResults(results);
        } catch (error) {
            console.error('Search error:', error);
        }
    }, 300));
}

async function performSearch(query) {
    // Simulate search API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock search results
    return [
        { title: 'Cloud Services', url: '/services#cloud', type: 'service' },
        { title: 'About Us', url: '/about', type: 'page' },
        { title: 'Contact', url: '/contact', type: 'page' }
    ].filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase())
    );
}

function displaySearchResults(results) {
    const searchResults = document.getElementById('search-results');
    
    if (results.length === 0) {
        searchResults.innerHTML = '<div class="search-no-results">No results found</div>';
    } else {
        searchResults.innerHTML = results.map(result => `
            <a href="${result.url}" class="search-result-item">
                <div class="search-result-title">${result.title}</div>
                <div class="search-result-type">${result.type}</div>
            </a>
        `).join('');
    }
    
    searchResults.style.display = 'block';
}

// Analytics tracking (placeholder)
function trackEvent(eventName, properties = {}) {
    // Replace with actual analytics implementation
    console.log('Analytics Event:', eventName, properties);
    
    // Example: Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, properties);
    }
}

// Track page views
function trackPageView() {
    trackEvent('page_view', {
        page_title: document.title,
        page_location: window.location.href
    });
}

// Track form submissions
function trackFormSubmission(formType) {
    trackEvent('form_submit', {
        form_type: formType
    });
}

// Track button clicks
function trackButtonClick(buttonText, buttonLocation) {
    trackEvent('button_click', {
        button_text: buttonText,
        button_location: buttonLocation
    });
}

// Add click tracking to important buttons
document.addEventListener('click', function(e) {
    const button = e.target.closest('button, .btn');
    if (button) {
        const buttonText = button.textContent.trim();
        const buttonLocation = button.closest('section')?.className || 'unknown';
        trackButtonClick(buttonText, buttonLocation);
    }
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    
    // Track errors in analytics
    trackEvent('javascript_error', {
        error_message: e.message,
        error_filename: e.filename,
        error_lineno: e.lineno
    });
});

// Unhandled promise rejection handling
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
    
    trackEvent('promise_rejection', {
        reason: e.reason?.toString() || 'Unknown'
    });
});

// Initialize page tracking
trackPageView();

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes modals/dropdowns
    if (e.key === 'Escape') {
        // Close language dropdown
        const languageDropdown = document.getElementById('language-dropdown');
        if (languageDropdown) {
            languageDropdown.classList.remove('active');
        }
        
        // Close mobile menu
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu) {
            mobileMenu.classList.remove('active');
        }
        
        // Close chat
        if (chatState.isOpen) {
            toggleChat();
        }
    }
});

// Print functionality
function printPage() {
    window.print();
}

// Share functionality
async function shareContent(title, text, url) {
    if (navigator.share) {
        try {
            await navigator.share({ title, text, url });
            trackEvent('content_shared', { method: 'native' });
        } catch (error) {
            console.log('Error sharing:', error);
        }
    } else {
        // Fallback to clipboard
        try {
            await navigator.clipboard.writeText(url);
            showAlert('Link copied to clipboard!', 'success');
            trackEvent('content_shared', { method: 'clipboard' });
        } catch (error) {
            console.log('Error copying to clipboard:', error);
        }
    }
}

// Accessibility improvements
function initializeAccessibility() {
    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
        skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content ID if not present
    const main = document.querySelector('main');
    if (main && !main.id) {
        main.id = 'main-content';
    }
    
    // Improve focus management
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    // Trap focus in modals/dropdowns when open
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            const activeDropdown = document.querySelector('.language-dropdown.active');
            const activeMobileMenu = document.querySelector('.mobile-menu.active');
            const activeChatWindow = document.querySelector('.chat-window.active');
            
            if (activeDropdown || activeMobileMenu || activeChatWindow) {
                const container = activeDropdown || activeMobileMenu || activeChatWindow;
                const focusableContent = container.querySelectorAll(focusableElements);
                const firstFocusable = focusableContent[0];
                const lastFocusable = focusableContent[focusableContent.length - 1];
                
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        lastFocusable.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        firstFocusable.focus();
                        e.preventDefault();
                    }
                }
            }
        }
    });
}

// Initialize accessibility features
initializeAccessibility();

// Responsive image loading
function initializeResponsiveImages() {
    const images = document.querySelectorAll('img[data-srcset]');
    
    images.forEach(img => {
        const srcset = img.getAttribute('data-srcset');
        if (srcset) {
            img.srcset = srcset;
            img.removeAttribute('data-srcset');
        }
    });
}

// Initialize responsive images
initializeResponsiveImages();

// Cookie consent (if needed)
function initializeCookieConsent() {
    const cookieConsent = localStorage.getItem('cookie-consent');
    
    if (!cookieConsent) {
        showCookieConsent();
    }
}

function showCookieConsent() {
    const consentBanner = document.createElement('div');
    consentBanner.className = 'cookie-consent';
    consentBanner.style.cssText = `
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: var(--secondary);
        color: white;
        padding: 1rem;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        flex-wrap: wrap;
    `;
    
    consentBanner.innerHTML = `
        <div>
            <p style="margin: 0;">We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.</p>
        </div>
        <div style="display: flex; gap: 0.5rem;">
            <button onclick="acceptCookies()" class="btn btn-primary" style="white-space: nowrap;">Accept</button>
            <button onclick="declineCookies()" class="btn btn-outline" style="white-space: nowrap; color: white; border-color: white;">Decline</button>
        </div>
    `;
    
    document.body.appendChild(consentBanner);
}

function acceptCookies() {
    localStorage.setItem('cookie-consent', 'accepted');
    removeCookieConsent();
    trackEvent('cookie_consent', { action: 'accepted' });
}

function declineCookies() {
    localStorage.setItem('cookie-consent', 'declined');
    removeCookieConsent();
    trackEvent('cookie_consent', { action: 'declined' });
}

function removeCookieConsent() {
    const consentBanner = document.querySelector('.cookie-consent');
    if (consentBanner) {
        consentBanner.remove();
    }
}

// Initialize cookie consent
// initializeCookieConsent(); // Uncomment if needed

// Theme detection and handling
function initializeThemeHandling() {
    // Detect system theme preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Listen for theme changes
    prefersDark.addEventListener('change', (e) => {
        if (e.matches) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    });
    
    // Apply initial theme
    if (prefersDark.matches) {
        document.body.classList.add('dark-theme');
    }
}

// Initialize theme handling
initializeThemeHandling();

// Intersection Observer for lazy loading and animations
function createIntersectionObserver(callback, options = {}) {
    const defaultOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observerOptions = { ...defaultOptions, ...options };
    
    return new IntersectionObserver(callback, observerOptions);
}

// Utility function to format numbers
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Utility function to format dates
function formatDate(date, locale = 'en-US') {
    return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(date));
}

// Utility function to truncate text
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
}

// Export functions for use in other scripts
window.SpintatechUtils = {
    changeLanguage,
    toggleMobileMenu,
    toggleLanguageDropdown,
    toggleChat,
    changeChatLanguage,
    handleChatOption,
    showAlert,
    trackEvent,
    shareContent,
    formatNumber,
    formatDate,
    truncateText,
    validateForm,
    showLoading,
    hideLoading
};

// Development helpers (remove in production)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    // Add development console commands
    window.dev = {
        changeLanguage: (lang) => changeLanguage(lang),
        showAlert: (msg, type) => showAlert(msg, type),
        resetChat: () => {
            chatState.currentNode = 'welcome';
            updateChatContent();
        },
        testAnimations: () => {
            document.querySelectorAll('.stat-number').forEach(el => {
                const target = parseInt(el.getAttribute('data-count'));
                animateCounter(el, target);
            });
        }
    };
    
    console.log('Development mode active. Use window.dev for debugging.');
}