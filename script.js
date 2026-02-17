document.addEventListener('DOMContentLoaded', () => {
    // Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeUpElements = document.querySelectorAll('.fade-up');
    fadeUpElements.forEach(el => observer.observe(el));

    // Smooth Scroll for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return; // Ignore single hash (used for triggers)

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                if (navLinks && window.innerWidth <= 768) {
                    navLinks.classList.remove('mobile-active');
                }
            }
        });
    });

    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            const isActive = navLinks.classList.contains('mobile-active');

            if (isActive) {
                navLinks.classList.remove('mobile-active');
                navLinks.style.display = '';
                navLinks.style.flexDirection = '';
                navLinks.style.position = '';
                navLinks.style.top = '';
                navLinks.style.left = '';
                navLinks.style.background = '';
                navLinks.style.width = '';
                navLinks.style.padding = '';
                navLinks.style.borderBottom = '';
                navLinks.style.gap = '';
                menuBtn.classList.remove('active');
            } else {
                navLinks.classList.add('mobile-active');
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '80px';
                navLinks.style.left = '0';
                navLinks.style.background = 'rgba(35, 7, 18, 0.98)';
                navLinks.style.width = '100%';
                navLinks.style.padding = '2rem';
                navLinks.style.borderBottom = '1px solid rgba(255,105,180,0.2)';
                navLinks.style.gap = '1.5rem';
                menuBtn.classList.add('active');
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                if (navLinks.classList.contains('mobile-active')) {
                    navLinks.classList.remove('mobile-active');
                    navLinks.style.display = '';
                    navLinks.style.flexDirection = '';
                    navLinks.style.position = '';
                    navLinks.style.top = '';
                    navLinks.style.left = '';
                    navLinks.style.background = '';
                    navLinks.style.width = '';
                    navLinks.style.padding = '';
                    navLinks.style.borderBottom = '';
                    navLinks.style.gap = '';
                    menuBtn.classList.remove('active');
                }
            }
        });
    }

    // Header Scroll Effect
    const header = document.querySelector('.fixed-header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 10px 30px -10px rgba(0,0,0,0.7)';
            header.style.background = 'rgba(35, 7, 18, 0.95)';
        } else {
            header.style.boxShadow = 'none';
            header.style.background = 'rgba(35, 7, 18, 0.85)';
        }
        lastScrollY = window.scrollY;
    });

    // Video Play/Pause on Hover (optional enhancement)
    const projectVideos = document.querySelectorAll('.project-video');
    projectVideos.forEach(video => {
        video.addEventListener('mouseenter', () => {
            video.play();
        });

        video.addEventListener('mouseleave', () => {
            video.pause();
        });
    });

    // Project Modal Logic
    const modal = document.getElementById('project-modal');
    const modalContainer = document.getElementById('modal-container');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const closeBtn = document.querySelector('.modal-close');

    function openModal(card) {
        const title = card.querySelector('h3').textContent;
        const description = card.querySelector('p').textContent;
        const img = card.querySelector('img');
        const videoSource = card.querySelector('video source');

        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modalContainer.innerHTML = ''; // Clear previous

        if (img) {
            const modalImg = document.createElement('img');
            modalImg.src = img.src;
            modalContainer.appendChild(modalImg);
        } else if (videoSource) {
            const video = document.createElement('video');
            video.controls = true;
            video.autoplay = true;
            video.src = videoSource.src;
            modalContainer.appendChild(video);
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scroll
    }

    function closeModal() {
        modal.classList.remove('active');
        modalContainer.innerHTML = ''; // Stop video playback
        document.body.style.overflow = '';
    }

    // Attach to links
    document.querySelectorAll('.link-arrow').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const card = link.closest('.project-card');
            openModal(card);
        });
    });

    // Also attach to media for more intuitive interaction
    document.querySelectorAll('.card-image, .card-media').forEach(media => {
        media.style.cursor = 'pointer';
        media.addEventListener('click', () => {
            const card = media.closest('.project-card');
            openModal(card);
        });
    });

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});