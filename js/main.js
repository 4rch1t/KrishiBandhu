document.addEventListener('DOMContentLoaded', function() {
    // Replace missing images with placeholders
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.onerror = function() {
            // Get image dimensions from the image or use defaults
            const width = this.getAttribute('width') || 800;
            const height = this.getAttribute('height') || 600;
            
            // Replace with placeholder
            this.src = `https://via.placeholder.com/${width}x${height}?text=${encodeURIComponent(this.alt || 'KrishiBandhu')}`;
            this.onerror = null; // Prevent infinite loop
        };
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('show');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
    }
    
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentTestimonial = 0;
    
    if (testimonials.length > 0) {
        // Hide all testimonials except the first one
        testimonials.forEach((testimonial, index) => {
            if (index !== 0) {
                testimonial.style.display = 'none';
            }
        });
        
        // Function to show a specific testimonial
        function showTestimonial(index) {
            testimonials.forEach(testimonial => {
                testimonial.style.display = 'none';
            });
            testimonials[index].style.display = 'grid';
        }
        
        // Event listeners for prev/next buttons
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', function() {
                currentTestimonial--;
                if (currentTestimonial < 0) {
                    currentTestimonial = testimonials.length - 1;
                }
                showTestimonial(currentTestimonial);
            });
            
            nextBtn.addEventListener('click', function() {
                currentTestimonial++;
                if (currentTestimonial >= testimonials.length) {
                    currentTestimonial = 0;
                }
                showTestimonial(currentTestimonial);
            });
        }
    }
    
    // Scroll Animation
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .user-type, .testimonial, .cta');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('fade-in');
            }
        });
    };
    
    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    // Run once on page load
    animateOnScroll();
    
    // Form Validation
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    
                    // Create error message if it doesn't exist
                    let errorMessage = field.nextElementSibling;
                    if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                        errorMessage = document.createElement('div');
                        errorMessage.classList.add('error-message');
                        errorMessage.textContent = 'This field is required';
                        field.parentNode.insertBefore(errorMessage, field.nextSibling);
                    }
                } else {
                    field.classList.remove('error');
                    
                    // Remove error message if it exists
                    const errorMessage = field.nextElementSibling;
                    if (errorMessage && errorMessage.classList.contains('error-message')) {
                        errorMessage.remove();
                    }
                }
            });
            
            if (!isValid) {
                event.preventDefault();
            }
        });
    });
    
    // Video Call Simulation (for demo purposes)
    const videoCallButtons = document.querySelectorAll('.video-call-btn');
    
    videoCallButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            
            // Show a modal or redirect to video call page
            alert('Video call feature would connect you with the seller in a real implementation.');
            
            // In a real implementation, this would initialize WebRTC or a similar technology
        });
    });
    
    // Product Filtering (for marketplace page)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    if (filterButtons.length > 0 && productCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filterValue = this.getAttribute('data-filter');
                
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                // Filter products
                productCards.forEach(card => {
                    if (filterValue === 'all') {
                        card.style.display = 'block';
                    } else {
                        if (card.classList.contains(filterValue)) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
    
    // Search Functionality
    const searchInput = document.querySelector('.search-input');
    
    if (searchInput && productCards.length > 0) {
        searchInput.addEventListener('keyup', function() {
            const searchTerm = this.value.toLowerCase();
            
            productCards.forEach(card => {
                const title = card.querySelector('.product-title').textContent.toLowerCase();
                const description = card.querySelector('.product-description').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    // Add to Cart Functionality (simplified)
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    let cartCount = 0;
    
    if (addToCartButtons.length > 0) {
        const cartCounter = document.querySelector('.cart-count');
        
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault();
                
                cartCount++;
                if (cartCounter) {
                    cartCounter.textContent = cartCount;
                    cartCounter.classList.add('pulse');
                    
                    // Remove animation class after animation completes
                    setTimeout(() => {
                        cartCounter.classList.remove('pulse');
                    }, 300);
                }
                
                // Show confirmation message
                const productCard = this.closest('.product-card');
                const productName = productCard.querySelector('.product-title').textContent;
                
                const message = document.createElement('div');
                message.classList.add('toast-message');
                message.textContent = `${productName} added to cart`;
                document.body.appendChild(message);
                
                // Remove message after 3 seconds
                setTimeout(() => {
                    message.remove();
                }, 3000);
            });
        });
    }
    
    // Initialize any interactive maps if they exist
    const mapElement = document.getElementById('seller-map');
    
    if (mapElement) {
        // This would be replaced with actual map initialization code
        // using Google Maps, Leaflet, or another mapping library
        console.log('Map would be initialized here in a real implementation');
    }
});