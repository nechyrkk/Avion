$(document).ready(function() {
    
    // ============================================
    // Promo Banner Close
    // ============================================
    $('.promo-close').on('click', function() {
        $('.promo-banner').slideUp(300, function() {
            $(this).remove();
        });
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

    // Observe story sections
    $('.story-content').each(function() {
        observer.observe(this);
    });

    // Observe feature items
    $('.feature-item').each(function() {
        observer.observe(this);
    });

    // Observe newsletter content
    $('.newsletter-content-wide').each(function() {
        observer.observe(this);
    });

    // Observe footer columns
    $('.footer-column').each(function() {
        observer.observe(this);
    });

    
    // ============================================
    // Navigation Active State
    // ============================================
    $('.header-nav-link, .secondary-nav-link').on('click', function() {
        $('.header-nav-link, .secondary-nav-link').removeClass('active');
        $(this).addClass('active');
    });

    
    // ============================================
    // Icon Buttons Hover Effect
    // ============================================
    $('.icon-btn').on('mouseenter', function() {
        $(this).addClass('pulse');
    }).on('mouseleave', function() {
        $(this).removeClass('pulse');
    });

    
    // ============================================
    // Feature Icons Animation
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
    // Button Ripple Effect
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
    // Newsletter Form Validation
    // ============================================
    $('.newsletter-form').on('submit', function(e) {
        e.preventDefault();
        
        const form = $(this);
        const input = form.find('input[type="email"]');
        const email = input.val().trim();
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailRegex.test(email)) {
            const button = form.find('button');
            const originalText = button.text();
            
            button.text('✓ Success!').css('background', '#4CAF50');
            
            setTimeout(() => {
                button.text(originalText).css('background', '');
                input.val('');
            }, 2000);
        } else {
            input.addClass('error');
            input.attr('placeholder', 'Please enter a valid email');
            
            setTimeout(() => {
                input.removeClass('error');
                input.attr('placeholder', 'your@email.com');
            }, 2000);
        }
    });

    // Footer form validation
    $('.footer-form').on('submit', function(e) {
        e.preventDefault();
        
        const form = $(this);
        const input = form.find('input[type="email"]');
        const email = input.val().trim();
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailRegex.test(email)) {
            const button = form.find('button');
            const originalText = button.text();
            
            button.text('✓').css('background', '#4CAF50');
            
            setTimeout(() => {
                button.text(originalText).css('background', '');
                input.val('');
            }, 2000);
        } else {
            input.addClass('error');
            
            setTimeout(() => {
                input.removeClass('error');
            }, 2000);
        }
    });

    
    // ============================================
    // Benefit Items Animation
    // ============================================
    $('.benefit-item').each(function(index) {
        $(this).css({
            'opacity': '0',
            'transform': 'translateY(2vh)'
        });
        
        setTimeout(() => {
            $(this).animate({
                'opacity': 1
            }, 600).css({
                'transform': 'translateY(0)',
                'transition': 'transform 0.6s ease'
            });
        }, 200 * index);
    });

    
    // ============================================
    // Loading Animation for Images
    // ============================================
    $('.story-image').each(function() {
        $(this).css('opacity', '0');
        
        setTimeout(() => {
            $(this).animate({ opacity: 1 }, 800);
        }, Math.random() * 400);
    });

    
    // ============================================
    // Add Custom CSS for Animations
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
    // Mobile Responsive Behavior
    // ============================================
    function handleMobileResize() {
        const width = $(window).width();
        
        // Parallax disabled for all devices to prevent sliding
        $('.story-image').css('transform', 'none');
    }

    handleMobileResize();
    $(window).on('resize', handleMobileResize);
    
    
    // ============================================
    // Footer Animation
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
    // Story Sections Sequential Animation
    // ============================================
    const storyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                $(entry.target).find('.story-content').addClass('visible');
            }
        });
    }, { threshold: 0.2 });

    $('.story-section').each(function() {
        storyObserver.observe(this);
    });

    
    // ============================================
    // Console Log
    // ============================================
    console.log('✨ About page loaded successfully!');
    console.log('📖 All animations and effects are active');
});
