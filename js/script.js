$(document).ready(function() {
    
    // ============================================
    // Header Search Toggle
    // ============================================
    $('.search-icon').on('click', function(e) {
        e.preventDefault();
        $('.search-wrapper').toggleClass('active');
        
        if ($('.search-wrapper').hasClass('active')) {
            setTimeout(() => {
                $('.search-input').focus();
            }, 400);
        }
    });

    // Close search on clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.search-wrapper').length) {
            $('.search-wrapper').removeClass('active');
        }
    });

    // Prevent closing when clicking inside search
    $('.search-wrapper').on('click', function(e) {
        e.stopPropagation();
    });

    
    // ============================================
    // Header Scroll Effect
    // ============================================
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 50) {
            $('.header').addClass('scrolled');
        } else {
            $('.header').removeClass('scrolled');
        }
    });

    
    // ============================================
    // Smooth Scroll for Links
    // ============================================
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $(this.hash);
        
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 100
            }, 800, 'swing');
        }
    });

    
    // ============================================
    // Intersection Observer for Scroll Animations
    // ============================================
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    $(entry.target).addClass('visible');
                }, index * 100);
            }
        });
    }, observerOptions);

    // Observe elements
    $('.feature-item').each(function(index) {
        observer.observe(this);
    });

    $('.product-card').each(function(index) {
        observer.observe(this);
    });

    $('.newsletter-content').each(function() {
        observer.observe(this);
    });

    $('.about-text').each(function() {
        observer.observe(this);
    });

    $('.footer-column').each(function() {
        observer.observe(this);
    });

    
    // ============================================
    // Product Card Parallax Effect
    // ============================================
    $('.product-card').on('mousemove', function(e) {
        const card = $(this);
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.find('.product-image').css({
            'transform': `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`
        });
    });

    $('.product-card').on('mouseleave', function() {
        $(this).find('.product-image').css({
            'transform': 'perspective(1000px) rotateX(0) rotateY(0) scale(1)'
        });
    });

    
    // ============================================
    // Feature Icons Animation on Hover
    // ============================================
    $('.feature-item').hover(
        function() {
            $(this).find('.feature-icon').addClass('animated');
        },
        function() {
            $(this).find('.feature-icon').removeClass('animated');
        }
    );

    
    // ============================================
    // Hero Button Ripple Effect
    // ============================================
    $('.btn').on('click', function(e) {
        const button = $(this);
        const ripple = $('<span class="ripple"></span>');
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.css({
            width: size + 'px',
            height: size + 'px',
            left: x + 'px',
            top: y + 'px'
        });
        
        button.append(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });

    
    // ============================================
    // Navbar Link Active State
    // ============================================
    $('.nav-link').on('click', function() {
        $('.nav-link').removeClass('active');
        $(this).addClass('active');
    });

    
    // ============================================
    // Newsletter Form Validation
    // ============================================
    $('.newsletter-form, .footer-form').on('submit', function(e) {
        e.preventDefault();
        
        const form = $(this);
        const input = form.find('input[type="email"]');
        const email = input.val().trim();
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailRegex.test(email)) {
            // Success animation
            const button = form.find('button');
            const originalText = button.text();
            
            button.text('✓ Success!').css('background', '#4CAF50');
            
            setTimeout(() => {
                button.text(originalText).css('background', '');
                input.val('');
            }, 2000);
        } else {
            // Error animation
            input.addClass('error');
            input.attr('placeholder', 'Please enter a valid email');
            
            setTimeout(() => {
                input.removeClass('error');
                input.attr('placeholder', 'your@email.com');
            }, 2000);
        }
    });

    
    // ============================================
    // Icon Buttons Pulse Effect
    // ============================================
    $('.icon-btn, .social-link').on('mouseenter', function() {
        $(this).addClass('pulse');
    }).on('mouseleave', function() {
        $(this).removeClass('pulse');
    });

    
    // ============================================
    // Loading Animation for Images
    // ============================================
    $('.product-image, .hero-image, .about-image').each(function() {
        $(this).css('opacity', '0');
        
        setTimeout(() => {
            $(this).animate({ opacity: 1 }, 600);
        }, Math.random() * 500);
    });

    
    // ============================================
    // Counter Animation for Numbers
    // ============================================
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            $(element).text(Math.floor(current));
        }, 20);
    }

    // Example usage for potential counter elements
    $('.counter').each(function() {
        const target = parseInt($(this).data('target'));
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target, target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counterObserver.observe(this);
    });

    
    // ============================================
    // Mobile Menu Toggle (for future implementation)
    // ============================================
    $('.mobile-menu-toggle').on('click', function() {
        $('body').toggleClass('menu-open');
        $('.nav').slideToggle(300);
    });

    
    // ============================================
    // Text Typing Effect for Hero Title
    // ============================================
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.text('');
        
        function type() {
            if (i < text.length) {
                element.text(element.text() + text.charAt(i));
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Optional: Activate on page load
    // const heroTitle = $('.hero-title');
    // const titleText = heroTitle.text();
    // typeWriter(heroTitle, titleText, 30);

    
    // ============================================
    // Floating Animation for Feature Icons
    // ============================================
    setInterval(() => {
        $('.feature-icon').each(function(index) {
            setTimeout(() => {
                $(this).animate({ 
                    transform: 'translateY(-10px)' 
                }, 1000, function() {
                    $(this).animate({ 
                        transform: 'translateY(0)' 
                    }, 1000);
                });
            }, index * 200);
        });
    }, 5000);

    
    // ============================================
    // Product Card Click Analytics (example)
    // ============================================
    $('.product-card').on('click', function(e) {
        const productName = $(this).find('.product-name').text();
        const productPrice = $(this).find('.product-price').text();
        
        // Log analytics (example)
        console.log('Product clicked:', {
            name: productName,
            price: productPrice,
            timestamp: new Date()
        });
        
        // Add click effect
        $(this).addClass('clicked');
        setTimeout(() => {
            $(this).removeClass('clicked');
        }, 300);
    });

    
    // ============================================
    // Footer Reveal Animation
    // ============================================
    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                $('.footer-column').each(function(index) {
                    setTimeout(() => {
                        $(this).addClass('visible');
                    }, index * 150);
                });
            }
        });
    }, { threshold: 0.1 });

    if ($('.footer').length) {
        footerObserver.observe($('.footer')[0]);
    }

    
    // ============================================
    // Add CSS for additional animations
    // ============================================
    $('<style>')
        .text(`
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple-animation 0.6s ease-out;
                pointer-events: none;
            }
            
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            .pulse {
                animation: pulse-animation 0.6s ease-in-out;
            }
            
            @keyframes pulse-animation {
                0%, 100% {
                    transform: scale(1);
                }
                50% {
                    transform: scale(1.1);
                }
            }
            
            .clicked {
                animation: click-animation 0.3s ease;
            }
            
            @keyframes click-animation {
                0%, 100% {
                    transform: scale(1);
                }
                50% {
                    transform: scale(0.95);
                }
            }
            
            .error {
                animation: shake 0.5s;
                border-color: #f44336 !important;
            }
            
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-10px); }
                75% { transform: translateX(10px); }
            }

            .feature-icon.animated {
                animation: icon-bounce 0.6s ease;
            }

            @keyframes icon-bounce {
                0%, 100% {
                    transform: translateY(0) rotate(0deg);
                }
                25% {
                    transform: translateY(-10px) rotate(-5deg);
                }
                50% {
                    transform: translateY(0) rotate(0deg);
                }
                75% {
                    transform: translateY(-5px) rotate(5deg);
                }
            }
        `)
        .appendTo('head');

    // ============================================
    // Mobile Menu Improvements
    // ============================================
    function handleMobileResize() {
        const width = $(window).width();
        
        // Disable parallax on mobile
        if (width <= 768) {
            $('.hero-image, .hero-content').css('transform', 'none');
        }
        
        // Close search on mobile when scrolling
        if (width <= 768) {
            $(window).on('scroll', function() {
                $('.search-wrapper').removeClass('active');
            });
        }
    }
    
    handleMobileResize();
    $(window).on('resize', handleMobileResize);

    
    // ============================================
    // Console Log for Debugging
    // ============================================
    console.log('✨ Avion website loaded successfully!');
    console.log('🎨 All animations and effects are active');
});