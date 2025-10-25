$(document).ready(function() {


    // ============================================
    // Search Toggle
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
    // Navigation Active State
    // ============================================
    $('.nav-link').on('click', function() {
        $('.nav-link').removeClass('active');
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
    // Cart Item Hover Animation
    // ============================================
    $('.cart-item').hover(
        function() {
            $(this).css('background', 'rgba(249, 249, 249, 0.5)');
        },
        function() {
            $(this).css('background', 'transparent');
        }
    );

    
    // ============================================
    // Checkout Button Ripple Effect
    // ============================================
    $('.btn-checkout').on('click', function(e) {
        e.preventDefault();
        
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
        
        // Simulate checkout
        const originalText = button.text();
        button.text('Processing...').prop('disabled', true);
        
        setTimeout(() => {
            button.text('✓ Success!').css('background', '#4CAF50');
            
            setTimeout(() => {
                button.text(originalText).css('background', '').prop('disabled', false);
            }, 2000);
        }, 1500);
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
    // Footer Form Validation
    // ============================================
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
    // Cart Item Image Zoom on Hover
    // ============================================
    $('.cart-item-image').on('mouseenter', function() {
        $(this).css({
            'transform': 'scale(1.05)',
            'box-shadow': '0 0.5vh 2vh rgba(0, 0, 0, 0.1)'
        });
    }).on('mouseleave', function() {
        $(this).css({
            'transform': 'scale(1)',
            'box-shadow': 'none'
        });
    });

    
    // ============================================
    // Subtotal Animation on Load
    // ============================================
    function animateSubtotal() {
        const subtotal = $('.subtotal-amount');
        const targetValue = 210;
        let currentValue = 0;
        const increment = targetValue / 30;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
                currentValue = targetValue;
                clearInterval(timer);
            }
            subtotal.text('£' + Math.floor(currentValue));
        }, 30);
    }

    setTimeout(() => {
        animateSubtotal();
    }, 1000);

    
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
            
            .cart-item {
                cursor: pointer;
            }
        `)
        .appendTo('head');

    
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
    // Mobile Responsive Behavior
    // ============================================
    function handleMobileResize() {
        const width = $(window).width();
        
        if (width <= 480) {
            // Add mobile-specific behaviors here if needed
            console.log('Mobile view active');
        }
    }
    
    handleMobileResize();
    $(window).on('resize', handleMobileResize);

    
    // ============================================
    // Console Log
    // ============================================
    console.log('🛒 Shopping cart page loaded successfully!');
    console.log('📦 Items in cart: 2');
    console.log('💰 Subtotal: £210');
});
