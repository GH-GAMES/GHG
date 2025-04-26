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
    const copyButtonTextSpan = copyButton?.querySelector('span'); // Get the span inside the button

    if (copyButton && emailSpan && confirmationSpan) {
        copyButton.addEventListener('click', () => {
            const email = emailSpan.textContent;
            navigator.clipboard.writeText(email).then(() => {
                // Show confirmation message - Use translation
                const copiedKey = confirmationSpan.getAttribute('data-translate');
                confirmationSpan.textContent = translations[currentLanguage]?.[copiedKey] || 'Copied!'; // Use translated text
                confirmationSpan.classList.add('visible');
                setTimeout(() => {
                    confirmationSpan.classList.remove('visible');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy email: ', err);
                confirmationSpan.textContent = 'Error!'; // Keep Error simple
                confirmationSpan.classList.add('visible');
                setTimeout(() => {
                    confirmationSpan.classList.remove('visible');
                     // Reset to default translated text after hiding error
                    setTimeout(() => {
                         const copiedKey = confirmationSpan.getAttribute('data-translate');
                         confirmationSpan.textContent = translations[currentLanguage]?.[copiedKey] || 'Copied!';
                    }, 300);
                }, 2000);
            });
        });
    }

    // --- Инициализация Swiper для Gameplay (index.html) ---
    const gameplaySwiperContainer = document.querySelector('.gameplay-swiper');
    if (typeof Swiper !== 'undefined' && gameplaySwiperContainer) {
        try {
            const gameplaySwiper = new Swiper(gameplaySwiperContainer, {
                loop: true,
                grabCursor: true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                 },
                speed: 800,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                navigation: { // Keep navigation config even if hidden by CSS
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                keyboard: {
                    enabled: true,
                    onlyInViewport: false,
                },
                spaceBetween: 20,
            });
        } catch (e) {
            console.error("Error initializing Gameplay Swiper:", e);
        }
    } else if (document.querySelector('.gameplay')) {
         console.warn('Swiper library not loaded or .gameplay-swiper container not found.');
    }

    // --- Инициализация Swiper для Developers (about.html) ---
    const developerSwiperContainer = document.querySelector('.developer-swiper');
    if (typeof Swiper !== 'undefined' && developerSwiperContainer) {
         try {
            const developerSwiper = new Swiper(developerSwiperContainer, {
                effect: 'coverflow',
                grabCursor: true,
                centeredSlides: true,
                slidesPerView: 'auto',
                loop: true,
                speed: 800,
                coverflowEffect: {
                    rotate: 45,
                    stretch: 0,
                    depth: 120,
                    modifier: 1,
                    slideShadows: true,
                },
                autoplay: {
                    delay: 4500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                keyboard: {
                    enabled: true,
                    onlyInViewport: false
                },
            });
        } catch(e) {
             console.error("Error initializing Developer Swiper:", e);
        }
    } else if (document.querySelector('.developers-team')) {
        console.warn('Swiper library not loaded or .developer-swiper container not found.');
    }

    // --- Анимация элементов при прокрутке (Intersection Observer) ---
    const scrollTargets = document.querySelectorAll(
        '.game-card, .gameplay-card-wrapper, .team-card, .developer-card, .company-card, .contact-block, section > .container > h2:not(.gameplay-card-wrapper > h2):not(.contact-section > .container > h2), .game-info'
    );

    if ("IntersectionObserver" in window && scrollTargets.length > 0) {
        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Delay adding the visible class slightly for a smoother effect
                    setTimeout(() => {
                         entry.target.classList.add('visible');
                    }, 100); // Adjust delay as needed (e.g., 100ms)

                    observer.unobserve(entry.target);
                }
            });
        };

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        scrollTargets.forEach(target => {
            target.classList.add('animate-on-scroll');
            observer.observe(target);
        });
    } else if (scrollTargets.length > 0) {
         console.warn('IntersectionObserver not supported, animations will show immediately.');
         scrollTargets.forEach(target => {
             target.style.opacity = '1';
             target.style.transform = 'none';
         });
    }

    // --- Эффект ужимания при клике на стрелку скролла (Homepage Hero) ---
    const scrollLink = document.querySelector('.scroll-down-link');
    const gameInfoSection = document.querySelector('.game-info');
    const gameplaySection = document.querySelector('.gameplay');

    if (scrollLink && gameInfoSection) {
        scrollLink.addEventListener('click', (e) => {
            // e.preventDefault(); // Keep default scroll behavior

            gameInfoSection.classList.add('shrink-effect');
            if (gameplaySection) gameplaySection.classList.add('shrink-effect');

            setTimeout(() => {
                gameInfoSection.classList.remove('shrink-effect');
                if (gameplaySection) gameplaySection.classList.remove('shrink-effect');
            }, 350);
        });
    }

    // --- Параллакс фона для Hero на страницах About и Contact ---
    const aboutHero = document.querySelector('.page-about .hero');
    const contactHero = document.querySelector('.page-contact .hero');

    const handleParallax = () => {
        if (!aboutHero && !contactHero) return;

        const scrollY = window.scrollY;
        const parallaxOffset = -(scrollY * 0.15);

        if (aboutHero) {
            aboutHero.style.setProperty('--scroll-offset', `${parallaxOffset}px`);
        }
        if (contactHero) {
            contactHero.style.setProperty('--scroll-offset', `${parallaxOffset}px`);
        }
    }

    if (aboutHero || contactHero) {
        window.addEventListener('scroll', handleParallax, { passive: true });
        handleParallax(); // Initial call
    }


    // --- НОВЫЙ КОД ЛОКАЛИЗАЦИИ ---
    const languageSelector = document.querySelector('.language-selector');
    const selectedLangDisplay = languageSelector?.querySelector('.selected-lang');
    const langOptions = languageSelector?.querySelector('.lang-options');
    const selectedLangFlag = document.getElementById('selected-lang-flag');
    const selectedLangCode = document.getElementById('selected-lang-code');

    // Fallback to 'en' if saved language is invalid or not found in future
    const supportedLangs = ['ru', 'en', 'de', 'fr', 'es', 'ar', 'zh', 'ja'];
    let savedLang = localStorage.getItem('language') || 'en'; // Default en
    if (!supportedLangs.includes(savedLang)) {
        savedLang = 'en'; // Fallback to English if saved lang is weird
        localStorage.setItem('language', savedLang); // Correct localStorage
    }
    let currentLanguage = savedLang;
    let translations = {};

    // Function to fetch localization data
    async function fetchTranslations() {
        try {
            // Assuming localizations.json is in the root or same dir as HTML files
            // If it's in /scripts/, change the path to 'scripts/localizations.json'
            const response = await fetch('localizations.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            translations = await response.json();
            // Ensure the initially determined language is applied
            setLanguage(currentLanguage);
        } catch (error) {
            console.error("Could not fetch translations:", error);
            // Fallback or show error
            document.body.style.visibility = 'visible'; // Make sure content is visible even if translations fail
        }
    }

    // Function to apply translations to the page
    function applyTranslations(lang) {
        if (!translations || !translations[lang]) {
            console.warn(`Translations for language "${lang}" not found or not loaded yet.`);
            // Make sure content is visible
            document.body.style.visibility = 'visible';
            return;
        }
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = translations[lang][key];

            if (translation !== undefined && translation !== null) {
                const attrToTranslate = element.getAttribute('data-translate-attr');
                if (attrToTranslate) {
                    // Special case for lang attribute on <html>
                    if (element.tagName === 'HTML' && attrToTranslate === 'lang') {
                         element.lang = translation;
                    } else {
                         element.setAttribute(attrToTranslate, translation);
                    }
                } else {
                    // Use textContent for security unless you specifically need HTML
                    element.textContent = translation;
                }
            } else if (key) { // Only warn if a key was actually provided
                console.warn(`Translation key "${key}" not found for language "${lang}".`);
            }
        });

         // Update ARIA label for menu toggle dynamically
         const menuToggle = document.querySelector('.menu-toggle');
         if(menuToggle) {
             const menuToggleKey = 'menu_toggle_label'; // Use the key from JSON
             if(translations[lang][menuToggleKey]){
                 menuToggle.setAttribute('aria-label', translations[lang][menuToggleKey]);
             }
         }

         // Make body visible after applying translations
         document.body.style.visibility = 'visible';
    }

    // Function to set the language
    function setLanguage(lang) {
        if (!supportedLangs.includes(lang)) {
            console.error(`Attempted to set unsupported language: "${lang}"`);
            return; // Don't proceed with unsupported language
        }
        currentLanguage = lang;
        localStorage.setItem('language', lang); // Save language preference

        // Apply translations and update UI
        applyTranslations(lang);

        // Update the language selector display
        const selectedOption = langOptions?.querySelector(`li[data-lang="${lang}"]`);
        if (selectedOption && selectedLangFlag && selectedLangCode) {
			const flagImg = selectedOption.querySelector('img');
			if (flagImg) {
				selectedLangFlag.innerHTML = flagImg.outerHTML;  // Копируем <img> флага
			}
			selectedLangCode.textContent = lang.toUpperCase();   // Устанавливаем код языка
        } else if (selectedLangFlag && selectedLangCode) {
            // Fallback if options not found (e.g., during initial load)
            const defaultFlags = { ru: '🇷🇺', en: '🇬🇧', de: '🇩🇪', fr: '🇫🇷', es: '🇪🇸', ar: '🇸🇦', zh: '🇨🇳', ja: '🇯🇵' };
            selectedLangFlag.textContent = defaultFlags[lang] || '🏳️';
            selectedLangCode.textContent = lang.toUpperCase();
        }

        // Add/Remove 'rtl' class for Arabic
        if (lang === 'ar') {
            document.body.classList.add('rtl');
        } else {
            document.body.classList.remove('rtl');
        }

        // Close the dropdown after selection
        if (langOptions) langOptions.style.display = 'none';
    }

    // Event Listeners for Language Selector
    if (languageSelector && selectedLangDisplay && langOptions) {
        selectedLangDisplay.addEventListener('click', (e) => {
            e.stopPropagation();
            const currentDisplay = window.getComputedStyle(langOptions).display;
            langOptions.style.display = currentDisplay === 'block' ? 'none' : 'block';
        });

        langOptions.addEventListener('click', (e) => {
            const targetLi = e.target.closest('li[data-lang]');
            if (targetLi) {
                const newLang = targetLi.getAttribute('data-lang');
                if (newLang !== currentLanguage) {
                     setLanguage(newLang);
                } else {
                     // Close dropdown if clicking the already selected language
                     langOptions.style.display = 'none';
                }
            }
        });

        // Close dropdown if clicking outside
        document.addEventListener('click', (e) => {
            if (!languageSelector.contains(e.target) && langOptions.style.display === 'block') {
                langOptions.style.display = 'none';
            }
        });

        // Close dropdown on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && langOptions.style.display === 'block') {
                langOptions.style.display = 'none';
            }
        });

    } else {
         console.warn("Language selector elements not found.");
         // Make body visible even if selector fails
         document.body.style.visibility = 'visible';
    }

    // Hide body initially to prevent flash of untranslated content (FOUC)
    // Apply only if not already visible (e.g., error occurred)
    if(document.body.style.visibility !== 'visible') {
        document.body.style.visibility = 'hidden';
    }

    // Initial fetch of translations when the DOM is ready
    fetchTranslations();

    // --- End Localization ---


}); // End DOMContentLoaded