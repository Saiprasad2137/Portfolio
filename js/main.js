document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);


    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));


    // CV Modal
    const modal = document.getElementById('cv-modal');
    // const btn = document.getElementById('view-cv-btn'); // OLD ID based
    const btns = document.querySelectorAll('.view-cv-trigger'); // NEW Class based
    const span = document.getElementsByClassName('close-modal')[0];

    console.log('CV Modal Script Loaded');

    if (btns.length > 0 && modal) {
        btns.forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                console.log('View CV Clicked');
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
    } else {
        console.warn('CV Modal or Buttons not found!');
    }

    if (span && modal) {
        span.onclick = function () {
            console.log('Close Modal Clicked');
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Enable background scrolling
        }
    }

    if (modal) {
        window.onclick = function (event) {
            if (event.target == modal) {
                console.log('Clicked outside modal');
                modal.classList.remove('active');
                document.body.style.overflow = ''; // Enable background scrolling
            }
        }
    }

    // Scroll Spy for Navigation
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 200; // Increased offset to trigger earlier

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Only consider sections with an ID
            if (section.getAttribute('id') && scrollPosition >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (current && link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Scroll Spy (existing code...)

    // Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.style.display = 'block';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Typing Animation
    const typingText = document.querySelector('.typing-text');
    const words = ["Full-Stack Developer", "Web Designer", "Freelancer", "Computer Science Engineer"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex--);
            typeSpeed = 50;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex++);
            typeSpeed = 150;
        }

        if (!isDeleting && charIndex === currentWord.length + 1) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before new word
        }

        setTimeout(type, typeSpeed);
    }

    if (typingText) {
        type();
    }

});
