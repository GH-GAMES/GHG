// Файл: scripts/main.js

document.addEventListener('DOMContentLoaded', () => {

    // --- Мобильное меню ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.main-nav .nav-list');
    const navLinks = document.querySelectorAll('.main-nav .nav-list a');

    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navList.classList.toggle('active');
            // Toggle body scroll lock for mobile menu
            document.body.style.overflow = navList.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                 if (navList.classList.contains('active')) {
                    menuToggle.setAttribute('aria-expanded', 'false');
                    navList.classList.remove('active');
                    document.body.style.overflow = ''; // Re-enable scroll
                 }
            });
        });

        // Close menu if clicking outside
        document.addEventListener('click', (event) => {
             if (navList.classList.contains('active') &&
                 !navList.contains(event.target) && // Click was not inside the nav list
                 !menuToggle.contains(event.target)) // Click was not on the toggle button
             {
                   menuToggle.setAttribute('aria-expanded', 'false');
                   navList.classList.remove('active');
                   document.body.style.overflow = ''; // Re-enable scroll
             }
        });
    } else {
        console.warn('Mobile menu elements (.menu-toggle or .main-nav .nav-list) not found.');
    }

    // --- Кнопка "Наверх" ---
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            // Show button after scrolling down 300px
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        // Smooth scroll to top on click
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default anchor behavior
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    } else {
         console.warn('Back to top button (.back-to-top) not found.');
    }

    // --- Активный пункт меню ---
    try {
      // Get the current page filename (e.g., 'index.html', 'about.html')
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      const menuLinks = document.querySelectorAll('.main-nav .nav-list a');

      if (menuLinks.length > 0) {
          menuLinks.forEach(link => {
              const linkHref = link.getAttribute('href').split('/').pop() || 'index.html';
              // Add 'active' class if the link's href matches the current page
              if (linkHref === currentPage) {
                  link.classList.add('active');
              } else {
                  link.classList.remove('active');
              }
          });
      } else {
          console.warn('Menu links not found for active state highlighting.');
      }
    } catch (e) {
        console.error("Error highlighting active menu item:", e);
    }

    // --- Копирование Email (Contact Page) ---
    const copyButton = document.querySelector('.copy-button');
    const emailSpan = document.getElementById('email-to-copy');
    const confirmationSpan = document.querySelector('.copy-confirmation');

    if (copyButton && emailSpan && confirmationSpan) {
        copyButton.addEventListener('click', () => {
            const email = emailSpan.textContent;
            // Use Clipboard API to copy text
            navigator.clipboard.writeText(email).then(() => {
                // Show confirmation message
                confirmationSpan.textContent = 'Скопировано!'; // Reset message text
                confirmationSpan.classList.add('visible');
                // Hide confirmation after 2 seconds
                setTimeout(() => {
                    confirmationSpan.classList.remove('visible');
                }, 2000);
            }).catch(err => {
                // Handle potential errors (e.g., permissions denied)
                console.error('Failed to copy email: ', err);
                confirmationSpan.textContent = 'Ошибка!'; // Show error message
                confirmationSpan.classList.add('visible');
                 // Hide error message after 2 seconds
                setTimeout(() => {
                    confirmationSpan.classList.remove('visible');
                    // Reset to default text after hiding
                    setTimeout(() => { confirmationSpan.textContent = 'Скопировано!'; }, 300);
                }, 2000);
            });
        });
    } // No warning needed if elements are not on the current page

    // --- Инициализация Swiper для Gameplay (index.html) ---
    const gameplaySwiperContainer = document.querySelector('.gameplay-swiper');
    if (typeof Swiper !== 'undefined' && gameplaySwiperContainer) {
        try {
            const gameplaySwiper = new Swiper(gameplaySwiperContainer, {
                loop: true,
                grabCursor: true,
                // effect: 'fade', // Fade effect removed for standard slide
                // fadeEffect: { crossFade: true },
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true, // Pause autoplay on hover
                 },
                speed: 800, // <<< Increased speed for smoother transition
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true // Allow clicking on pagination bullets
                },
                // Navigation arrows are hidden via CSS for this slider
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                keyboard: {
                    enabled: true, // Enable keyboard navigation
                    onlyInViewport: false,
                },
                spaceBetween: 20, // Space between slides if multiple were visible
            });
        } catch (e) {
            console.error("Error initializing Gameplay Swiper:", e);
        }
    } else if (document.querySelector('.gameplay')) {
         // Only warn if the gameplay section exists but Swiper fails
         console.warn('Swiper library not loaded or .gameplay-swiper container not found.');
    }

    // --- Инициализация Swiper для Developers (about.html) - ЭФФЕКТ COVERFLOW ---
    const developerSwiperContainer = document.querySelector('.developer-swiper');
    if (typeof Swiper !== 'undefined' && developerSwiperContainer) {
         try {
            const developerSwiper = new Swiper(developerSwiperContainer, {
                // <<< Coverflow Configuration >>>
                effect: 'coverflow',    // Enable coverflow effect
                grabCursor: true,       // Show grab cursor on hover
                centeredSlides: true,   // Center the active slide
                slidesPerView: 'auto',  // Automatically determine slides per view based on size
                loop: true,             // Enable continuous loop
                speed: 800,             // <<< Increased speed for smoother transition
                coverflowEffect: {
                    rotate: 45,         // Rotation angle for side slides (adjust as needed)
                    stretch: 0,         // Space between slides (0 means no overlap modification)
                    depth: 120,         // Depth effect for side slides (Z-axis)
                    modifier: 1,        // Effect multiplier (1 = standard)
                    slideShadows: true, // Enable shadows on side slides
                },
                autoplay: {
                    delay: 4500,        // Slightly faster autoplay
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true, // Pause autoplay on hover
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                navigation: { // <<< Enable Navigation Arrows >>>
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                keyboard: {
                    enabled: true,
                    onlyInViewport: false
                },
                // spaceBetween is less relevant with coverflow, remove or set to 0
                // breakpoints: { ... } // Removed breakpoints, 'auto' slidesPerView is generally better for coverflow
            });
        } catch(e) {
             console.error("Error initializing Developer Swiper:", e);
        }
    } else if (document.querySelector('.developers-team')) {
        // Only warn if the developers section exists but Swiper fails
        console.warn('Swiper library not loaded or .developer-swiper container not found.');
    }

    // --- Анимация элементов при прокрутке (Intersection Observer) ---
    // <<< Target more elements for scroll animation >>>
    const scrollTargets = document.querySelectorAll(
        '.game-card, .gameplay-card-wrapper, .team-card, .developer-card, .company-card, .contact-block, section > .container > h2:not(.gameplay-card-wrapper > h2):not(.contact-section > .container > h2), .game-info'
    );

    // Check if IntersectionObserver is supported and targets exist
    if ("IntersectionObserver" in window && scrollTargets.length > 0) {
        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                // If the element is intersecting (visible)
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible'); // Add 'visible' class to trigger animation
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        };

        const observerOptions = {
            root: null, // Use the viewport as the root
            rootMargin: '0px',
            threshold: 0.1 // Trigger when 10% of the element is visible
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // Observe each target element
        scrollTargets.forEach(target => {
            target.classList.add('animate-on-scroll'); // Add base class for styling
            observer.observe(target);
        });
    } else if (scrollTargets.length > 0) {
         // Fallback for browsers without IntersectionObserver
         console.warn('IntersectionObserver not supported, animations will show immediately.');
         scrollTargets.forEach(target => {
             // Make elements visible immediately if observer isn't supported
             target.style.opacity = '1';
             target.style.transform = 'none';
         });
    } // No warning if no targets found

    // --- Эффект ужимания при клике на стрелку скролла (Homepage Hero) ---
    const scrollLink = document.querySelector('.scroll-down-link');
    const gameInfoSection = document.querySelector('.game-info'); // Target section below hero
    const gameplaySection = document.querySelector('.gameplay'); // Target next section too

    if (scrollLink && gameInfoSection) { // Check if scroll link and first target exist
        scrollLink.addEventListener('click', (e) => {
            // e.preventDefault(); // Keep default scroll behavior unless you want custom scroll

            // Add shrink class briefly for visual feedback
            gameInfoSection.classList.add('shrink-effect');
            if (gameplaySection) gameplaySection.classList.add('shrink-effect'); // Apply to next section if it exists

            // Remove the class after the transition duration (300ms) + a little buffer
            setTimeout(() => {
                gameInfoSection.classList.remove('shrink-effect');
                if (gameplaySection) gameplaySection.classList.remove('shrink-effect');
            }, 350); // Matches CSS transition duration
        });
    }

    // --- Параллакс фона для Hero на страницах About и Contact ---
    const aboutHero = document.querySelector('.page-about .hero');
    const contactHero = document.querySelector('.page-contact .hero');

    // Function to handle parallax calculation and update
    const handleParallax = () => {
        if (!aboutHero && !contactHero) return; // Exit if no relevant hero sections found

        const scrollY = window.scrollY;
        // Adjust multiplier for desired parallax speed (smaller = slower)
        const parallaxOffset = -(scrollY * 0.15); // Move background up slightly as page scrolls down

        // Apply the offset using a CSS variable (--scroll-offset)
        if (aboutHero) {
            aboutHero.style.setProperty('--scroll-offset', `${parallaxOffset}px`);
        }
        if (contactHero) {
            contactHero.style.setProperty('--scroll-offset', `${parallaxOffset}px`);
        }
    }

    // Add scroll listener only if relevant hero sections exist
    if (aboutHero || contactHero) {
        // Use passive: true for better scroll performance
        window.addEventListener('scroll', handleParallax, { passive: true });
        // Call once initially to set the correct position on page load
        handleParallax();
    }

}); // End DOMContentLoaded