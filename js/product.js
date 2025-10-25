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
    // Quantity Controls
    // ============================================
    $('.quantity-btn.plus').on('click', function() {
        const input = $(this).siblings('.quantity-input');
        let value = parseInt(input.val());
        const max = parseInt(input.attr('max'));
        
        if (value < max) {
            input.val(value + 1);
            animateQuantityChange(input);
        }
    });

    $('.quantity-btn.minus').on('click', function() {
        const input = $(this).siblings('.quantity-input');
        let value = parseInt(input.val());
        const min = parseInt(input.attr('min'));
        
        if (value > min) {
            input.val(value - 1);
            animateQuantityChange(input);
        }
    });

    // Validate quantity input
    $('.quantity-input').on('input', function() {
        let value = parseInt($(this).val());
        const min = parseInt($(this).attr('min'));
        const max = parseInt($(this).attr('max'));
        
        if (value < min) $(this).val(min);
        if (value > max) $(this).val(max);
        if (isNaN(value)) $(this).val(min);
    });

    function animateQuantityChange(input) {
        input.addClass('quantity-changed');
        setTimeout(() => {
            input.removeClass('quantity-changed');
        }, 300);
    }

    
    // ============================================
    // Add to Cart Button
    // ============================================
    $('.btn-add-to-cart').on('click', function(e) {
        e.preventDefault();
        
        const button = $(this);
        const originalText = button.text();
        const quantity = $('.quantity-input').val();
        
        // Add ripple effect
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
        
        // Change button text
        button.text('✓ Added to cart!');
        button.addClass('added');
        
        // Animate cart icon
        $('.icon-btn[aria-label="Cart"]').addClass('cart-bounce');
        
        setTimeout(() => {
            button.text(originalText);
            button.removeClass('added');
            $('.icon-btn[aria-label="Cart"]').removeClass('cart-bounce');
        }, 2000);
        
        // Log for analytics
        console.log('Product added to cart:', {
            product: $('.product-title').text(),
            quantity: quantity,
            price: $('.product-price').text()
        });
    });

    
    // ============================================
    // Product Image Hover Effect - Simple version
    // ============================================
    $('.product-image-main').hover(
        function() {
            $(this).css('transform', 'scale(1.02)');
        },
        function() {
            $(this).css('transform', 'scale(1)');
        }
    );

    
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
    $('.feature-item').each(function() {
        observer.observe(this);
    });

    $('.product-card').each(function() {
        observer.observe(this);
    });

    $('.newsletter-content').each(function() {
        observer.observe(this);
    });

    
    // ============================================
    // Product Card Hover Effects
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
    // Header Navigation Active State
    // ============================================
    $('.header-nav-link').on('click', function() {
        $('.header-nav-link').removeClass('active');
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
    // Dimensions Hover Effect
    // ============================================
    $('.dimension-item').hover(
        function() {
            $(this).css({
                'transform': 'translateY(-5px)',
                'transition': 'all 0.3s ease'
            });
        },
        function() {
            $(this).css('transform', 'translateY(0)');
        }
    );

    
    // ============================================
    // Loading Animation for Images
    // ============================================
    $('.product-image, .product-image-main').each(function() {
        $(this).css('opacity', '0');
        
        setTimeout(() => {
            $(this).animate({ opacity: 1 }, 600);
        }, Math.random() * 300);
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
            
            .cart-bounce {
                animation: cart-bounce-animation 0.6s ease;
            }
            
            @keyframes cart-bounce-animation {
                0%, 100% {
                    transform: translateY(0);
                }
                25% {
                    transform: translateY(-10px);
                }
                50% {
                    transform: translateY(0);
                }
                75% {
                    transform: translateY(-5px);
                }
            }
            
            .quantity-changed {
                animation: quantity-pulse 0.3s ease;
            }
            
            @keyframes quantity-pulse {
                0%, 100% {
                    transform: scale(1);
                }
                50% {
                    transform: scale(1.2);
                    color: #2A254B;
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
            
            .btn-add-to-cart.added {
                background: #4CAF50 !important;
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
        
        // Adjust behaviors for mobile
        if (width <= 768) {
            // Disable complex hover effects on mobile
            $('.product-image-main, .product-card').off('mousemove mouseleave');
        }
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
    // Console Log
    // ============================================
    console.log('✨ Product page loaded successfully!');
    console.log('🛍️ Product:', $('.product-title').text());
    console.log('💰 Price:', $('.product-price').text());
});
