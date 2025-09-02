// Mobile menu functionality
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const isActive = mobileMenu.classList.contains('active');
    
    if (isActive) {
        mobileMenu.classList.remove('active');
    } else {
        mobileMenu.classList.add('active');
    }
}

// Language dropdown functionality
function toggleLanguageDropdown() {
    const dropdown = document.getElementById('language-dropdown');
    const isActive = dropdown.classList.contains('active');
    
    if (isActive) {
        dropdown.classList.remove('active');
    } else {
        dropdown.classList.add('active');
    }
}

// Close dropdowns when clicking outside
document.addEventListener('click', function(event) {
    const languageDropdown = document.getElementById('language-dropdown');
    const languageBtn = document.querySelector('.language-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    // Close language dropdown
    if (languageDropdown && !languageBtn.contains(event.target) && !languageDropdown.contains(event.target)) {
        languageDropdown.classList.remove('active');
    }
    
    // Close mobile menu
    if (mobileMenu && !mobileMenuBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
        mobileMenu.classList.remove('active');
    }
});

// Animated counter function
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (target - start) * easeOutQuart);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Intersection Observer for animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate counters
                const counters = entry.target.querySelectorAll('[data-count]');
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-count'));
                    animateCounter(counter, target);
                });
                
                // Add animation classes
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                
                // Stop observing this element
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe stats section
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        observer.observe(statsSection);
    }
    
    // Observe other sections for fade-in animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Chat widget functionality
let chatState = {
    isOpen: false,
    currentNode: 'welcome',
    language: 'en'
};

const chatFlow = {
    welcome: {
        message: {
            en: "Hello! I'm here to help you learn about Spintatech Services. How can I assist you today?",
            hi: "नमस्ते! मैं स्पिंटाटेक सर्विसेज के बारे में जानने में आपकी मदद करने के लिए यहाँ हूँ। आज मैं आपकी कैसे सहायता कर सकता हूँ?"
        },
        options: [
            { label: { en: "🔧 Learn about our services", hi: "🔧 हमारी सेवाओं के बारे में जानें" }, next: "services" },
            { label: { en: "🏢 Industries we serve", hi: "🏢 हमारे द्वारा सेवित उद्योग" }, next: "industries" },
            { label: { en: "📞 Get in touch", hi: "📞 संपर्क करें" }, next: "contact" },
            { label: { en: "ℹ️ About Spintatech", hi: "ℹ️ स्पिंटाटेक के बारे में" }, next: "about" }
        ]
    },
    services: {
        message: {
            en: "We offer comprehensive technology solutions including Cloud & DevOps, Data & AI, Digital Transformation, Cybersecurity, and Enterprise Solutions. Which area interests you most?",
            hi: "हम क्लाउड और DevOps, डेटा और AI, डिजिटल परिवर्तन, साइबर सुरक्षा, और एंटरप्राइज़ समाधान सहित व्यापक प्रौद्योगिकी समाधान प्रदान करते हैं। कौन सा क्षेत्र आपको सबसे दिलचस्प लगता है?"
        },
        options: [
            { label: { en: "☁️ Cloud & DevOps", hi: "☁️ क्लाउड और DevOps" }, next: "cloud" },
            { label: { en: "🤖 Data & AI", hi: "🤖 डेटा और AI" }, next: "ai" },
            { label: { en: "🔒 Cybersecurity", hi: "🔒 साइबर सुरक्षा" }, next: "security" },
            { label: { en: "🏠 Back to main menu", hi: "🏠 मुख्य मेनू पर वापस" }, next: "welcome" }
        ]
    },
    industries: {
        message: {
            en: "We serve various industries including Banking & Financial Services, Healthcare, Retail & E-commerce, and Manufacturing. Which industry would you like to know more about?",
            hi: "हम बैंकिंग और वित्तीय सेवाओं, स्वास्थ्य सेवा, खुदरा और ई-कॉमर्स, और विनिर्माण सहित विभिन्न उद्योगों की सेवा करते हैं। आप किस उद्योग के बारे में और जानना चाहेंगे?"
        },
        options: [
            { label: { en: "🏦 Banking & Finance", hi: "🏦 बैंकिंग और वित्त" }, next: "banking" },
            { label: { en: "🏥 Healthcare", hi: "🏥 स्वास्थ्य सेवा" }, next: "healthcare" },
            { label: { en: "🛒 Retail & E-commerce", hi: "🛒 खुदरा और ई-कॉमर्स" }, next: "retail" },
            { label: { en: "🏠 Back to main menu", hi: "🏠 मुख्य मेनू पर वापस" }, next: "welcome" }
        ]
    },
    contact: {
        message: {
            en: "Great! You can reach us at contact@spintatech.com or +91 20 1234 5678. Would you like to visit our contact page for more information?",
            hi: "बहुत बढ़िया! आप हमसे contact@spintatech.com या +91 20 1234 5678 पर संपर्क कर सकते हैं। क्या आप अधिक जानकारी के लिए हमारे संपर्क पृष्ठ पर जाना चाहेंगे?"
        },
        options: [
            { label: { en: "📧 Visit Contact Page", hi: "📧 संपर्क पृष्ठ पर जाएं" }, next: "contact-page" },
            { label: { en: "🏠 Back to main menu", hi: "🏠 मुख्य मेनू पर वापस" }, next: "welcome" }
        ]
    },
    about: {
        message: {
            en: "Spintatech Services is a technology consulting company focused on helping organizations accelerate their digital transformation. We bring deep expertise in cloud, data, AI, cybersecurity, and enterprise solutions.",
            hi: "स्पिंटाटेक सर्विसेज एक प्रौद्योगिकी परामर्श कंपनी है जो संगठनों को उनके डिजिटल परिवर्तन को तेज़ करने में मदद करने पर केंद्रित है। हम क्लाउड, डेटा, AI, साइबर सुरक्षा, और एंटरप्राइज़ समाधानों में गहरी विशेषज्ञता लाते हैं।"
        },
        options: [
            { label: { en: "📄 Learn More About Us", hi: "📄 हमारे बारे में और जानें" }, next: "about-page" },
            { label: { en: "🏠 Back to main menu", hi: "🏠 मुख्य मेनू पर वापस" }, next: "welcome" }
        ]
    }
};

function toggleChat() {
    const chatWindow = document.getElementById('chat-window');
    const chatToggle = document.getElementById('chat-toggle');
    
    chatState.isOpen = !chatState.isOpen;
    
    if (chatState.isOpen) {
        chatWindow.classList.add('active');
        chatToggle.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        `;
    } else {
        chatWindow.classList.remove('active');
        chatToggle.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
        `;
    }
}

function changeChatLanguage(lang) {
    chatState.language = lang;
    updateChatContent();
    
    // Update button states
    const buttons = document.querySelectorAll('[id^="chat-lang-"]');
    buttons.forEach(btn => {
        btn.style.background = 'transparent';
        btn.style.fontWeight = 'normal';
    });
    
    const activeBtn = document.getElementById(`chat-lang-${lang}`);
    if (activeBtn) {
        activeBtn.style.background = 'rgba(255, 255, 255, 0.2)';
        activeBtn.style.fontWeight = 'bold';
    }
}

function updateChatContent() {
    const node = chatFlow[chatState.currentNode];
    if (!node) return;
    
    const messageElement = document.getElementById('chat-message');
    const optionsElement = document.getElementById('chat-options');
    
    if (messageElement) {
        messageElement.textContent = node.message[chatState.language];
    }
    
    if (optionsElement && node.options) {
        optionsElement.innerHTML = '';
        node.options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'chat-option';
            button.textContent = option.label[chatState.language];
            button.onclick = () => handleChatOption(option.next);
            optionsElement.appendChild(button);
        });
    }
}

function handleChatOption(next) {
    if (next === 'contact-page') {
        window.location.href = 'pages/contact.html';
        return;
    }
    
    if (next === 'about-page') {
        window.location.href = 'pages/about.html';
        return;
    }
    
    chatState.currentNode = next;
    updateChatContent();
}

// Form validation and submission
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        const value = input.value.trim();
        const errorElement = input.parentNode.querySelector('.error-message');
        
        // Remove existing error
        if (errorElement) {
            errorElement.remove();
        }
        
        // Validate
        if (!value) {
            showFieldError(input, 'This field is required');
            isValid = false;
        } else if (input.type === 'email' && !isValidEmail(value)) {
            showFieldError(input, 'Please enter a valid email address');
            isValid = false;
        }
    });
    
        return isValid;
}

function showFieldError(input, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.style.color = '#dc2626';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '0.25rem';
    errorElement.textContent = message;
    input.parentNode.appendChild(errorElement);
    input.style.borderColor = '#dc2626';
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Loading state management
function showLoading(button) {
    const originalText = button.textContent;
    button.disabled = true;
    button.innerHTML = `
        <div class="spinner"></div>
        <span>Loading...</span>
    `;
    return originalText;
}

function hideLoading(button, originalText) {
    button.disabled = false;
    button.textContent = originalText;
}

// Alert system
function showAlert(message, type = 'info') {
    const alertElement = document.createElement('div');
    alertElement.className = `alert alert-${type}`;
    alertElement.textContent = message;
    
    // Insert at top of main content
    const main = document.querySelector('main');
    if (main) {
        main.insertBefore(alertElement, main.firstChild);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (alertElement.parentNode) {
                alertElement.parentNode.removeChild(alertElement);
            }
        }, 5000);
    }
}

// Utility functions
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
    }
}

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Performance monitoring
function initializePerformanceMonitoring() {
    // Log page load time
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
    });
    
    // Monitor largest contentful paint
    if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log(`LCP: ${lastEntry.startTime.toFixed(2)}ms`);
        });
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }
}