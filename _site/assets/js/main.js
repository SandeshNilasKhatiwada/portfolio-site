// Enhanced Portfolio JavaScript with modern animations and interactions
class PortfolioApp {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.initializeComponents();
    this.setupAnimations();
  }

  setupEventListeners() {
    document.addEventListener("DOMContentLoaded", () => {
      this.initMobileMenu();
      this.initSmoothScrolling();
      this.initHeaderEffects();
      this.initVideoCarousel();
      this.initScrollAnimations();
      this.initContactForm();
      this.initPortfolioInteractions();
    });
  }

  initializeComponents() {
    // Initialize any other components that need to be set up
    this.setupPerformanceOptimizations();
  }

  // Mobile Menu Functionality
  initMobileMenu() {
    const navToggle = document.getElementById("nav-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (navToggle && navMenu) {
      navToggle.addEventListener("click", () => {
        const isActive = navMenu.classList.toggle("active");
        navToggle.classList.toggle("active");

        // Prevent body scroll when menu is open
        document.body.style.overflow = isActive ? "hidden" : "";

        // Update ARIA attributes
        navToggle.setAttribute("aria-expanded", isActive);
        navMenu.setAttribute("aria-hidden", !isActive);
      });

      // Close menu when clicking outside
      document.addEventListener("click", (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
          navMenu.classList.remove("active");
          navToggle.classList.remove("active");
          document.body.style.overflow = "";
          navToggle.setAttribute("aria-expanded", "false");
          navMenu.setAttribute("aria-hidden", "true");
        }
      });

      // Close menu on escape key
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && navMenu.classList.contains("active")) {
          navMenu.classList.remove("active");
          navToggle.classList.remove("active");
          document.body.style.overflow = "";
          navToggle.focus();
        }
      });
    }
  }

  // Enhanced Smooth Scrolling
  initSmoothScrolling() {
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        const targetId = link.getAttribute("href");
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
          const headerHeight =
            document.querySelector(".header")?.offsetHeight || 0;
          const targetPosition = targetSection.offsetTop - headerHeight - 20;

          // Smooth scroll with easing
          this.smoothScrollTo(targetPosition, 800);

          // Close mobile menu
          const navMenu = document.getElementById("nav-menu");
          const navToggle = document.getElementById("nav-toggle");
          if (navMenu?.classList.contains("active")) {
            navMenu.classList.remove("active");
            navToggle?.classList.remove("active");
            document.body.style.overflow = "";
          }

          // Update active link
          this.updateActiveNavLink(targetId);
        }
      });
    });
  }

  smoothScrollTo(targetPosition, duration = 800) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    const animateScroll = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      // Easing function (ease-in-out-cubic)
      const ease =
        progress < 0.5
          ? 4 * progress * progress * progress
          : (progress - 1) * (2 * progress - 2) * (2 * progress - 2) + 1;

      window.scrollTo(0, startPosition + distance * ease);

      if (timeElapsed < duration) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  }

  updateActiveNavLink(targetId) {
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === targetId) {
        link.classList.add("active");
      }
    });
  }

  // Enhanced Header Effects
  initHeaderEffects() {
    const header = document.querySelector(".header");
    if (!header) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.pageYOffset;

          // Header background effect
          if (scrollY > 100) {
            header.classList.add("scrolled");
          } else {
            header.classList.remove("scrolled");
          }

          // Update active navigation based on scroll position
          this.updateActiveNavOnScroll();

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
  }

  updateActiveNavOnScroll() {
    const sections = document.querySelectorAll("section[id]");
    const scrollPos = window.pageYOffset + 200;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        this.updateActiveNavLink(`#${sectionId}`);
      }
    });
  }

  // Enhanced Video Carousel
  initVideoCarousel() {
    const carousel = document.querySelector(".video-carousel");
    const prevButton = document.querySelector(".carousel-control.prev");
    const nextButton = document.querySelector(".carousel-control.next");
    const container = document.querySelector(".video-carousel-container");

    if (!carousel || !prevButton || !nextButton || !container) {
      return;
    }

    let currentSlide = 0;
    let isTransitioning = false;
    let touchStartX = 0;
    let touchStartY = 0;
    let isDragging = false;

    const items = carousel.querySelectorAll(".carousel-item");
    const totalItems = items.length;

    const getVisibleItems = () => {
      const viewportWidth = window.innerWidth;
      if (viewportWidth < 768) return 1;
      if (viewportWidth < 1200) return 2;
      return 3;
    };

    const updateCarousel = (animate = true) => {
      if (isTransitioning) return;

      const visibleItems = getVisibleItems();
      const containerWidth = container.offsetWidth;
      const gap = 32; // 2rem gap
      const itemWidth =
        (containerWidth - gap * (visibleItems - 1)) / visibleItems;
      const maxSlide = Math.max(0, totalItems - visibleItems);

      // Constrain current slide
      currentSlide = Math.max(0, Math.min(currentSlide, maxSlide));

      // Apply transform
      const offset = currentSlide * (itemWidth + gap);
      carousel.style.transition = animate
        ? "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
        : "none";
      carousel.style.transform = `translateX(-${offset}px)`;

      // Update button states
      prevButton.disabled = currentSlide <= 0;
      nextButton.disabled = currentSlide >= maxSlide;
      prevButton.style.opacity = currentSlide <= 0 ? "0.5" : "1";
      nextButton.style.opacity = currentSlide >= maxSlide ? "0.5" : "1";

      // Update accessibility
      items.forEach((item, index) => {
        const isVisible =
          index >= currentSlide && index < currentSlide + visibleItems;
        item.setAttribute("aria-hidden", !isVisible);
        item.style.opacity = isVisible ? "1" : "0.7";
      });

      if (animate) {
        isTransitioning = true;
        setTimeout(() => {
          isTransitioning = false;
        }, 600);
      }
    };

    const moveCarousel = (direction) => {
      if (isTransitioning) return;

      const visibleItems = getVisibleItems();
      const maxSlide = Math.max(0, totalItems - visibleItems);

      if (direction === "next" && currentSlide < maxSlide) {
        currentSlide++;
      } else if (direction === "prev" && currentSlide > 0) {
        currentSlide--;
      }

      updateCarousel();
    };

    // Event listeners
    prevButton.addEventListener("click", () => moveCarousel("prev"));
    nextButton.addEventListener("click", () => moveCarousel("next"));

    // Keyboard navigation
    container.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        moveCarousel("prev");
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        moveCarousel("next");
      }
    });

    // Touch events with improved handling
    let startTime;

    carousel.addEventListener(
      "touchstart",
      (e) => {
        if (e.target.closest("iframe")) return;

        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        startTime = Date.now();
        isDragging = false;
      },
      { passive: true },
    );

    carousel.addEventListener(
      "touchmove",
      (e) => {
        if (e.target.closest("iframe")) return;

        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;
        const deltaX = Math.abs(touchX - touchStartX);
        const deltaY = Math.abs(touchY - touchStartY);

        // Determine if this is a horizontal swipe
        if (deltaX > deltaY && deltaX > 10) {
          isDragging = true;
          e.preventDefault();
        }
      },
      { passive: false },
    );

    carousel.addEventListener(
      "touchend",
      (e) => {
        if (e.target.closest("iframe") || !isDragging) return;

        const touchEndX = e.changedTouches[0].clientX;
        const distance = touchStartX - touchEndX;
        const time = Date.now() - startTime;

        // Swipe detection: minimum distance or fast swipe
        if (
          Math.abs(distance) > 50 ||
          (Math.abs(distance) > 20 && time < 300)
        ) {
          moveCarousel(distance > 0 ? "next" : "prev");
        }

        isDragging = false;
      },
      { passive: true },
    );

    // Resize handling with debounce
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const visibleItems = getVisibleItems();
        const maxSlide = Math.max(0, totalItems - visibleItems);
        currentSlide = Math.min(currentSlide, maxSlide);
        updateCarousel(false);
      }, 150);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    // Initialize
    updateCarousel(false);
  }

  // Enhanced Scroll Animations
  initScrollAnimations() {
    const animatedElements = document.querySelectorAll("[data-aos]");
    if (animatedElements.length === 0) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute("data-aos-delay") || 0;
          setTimeout(() => {
            entry.target.classList.add("animate");
          }, parseInt(delay));
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Add CSS for animations
    this.addAnimationStyles();

    animatedElements.forEach((element) => {
      observer.observe(element);
    });
  }

  addAnimationStyles() {
    if (document.getElementById("portfolio-animations")) return;

    const style = document.createElement("style");
    style.id = "portfolio-animations";
    style.textContent = `
      [data-aos] {
        opacity: 0;
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      [data-aos="fade-up"] {
        transform: translateY(40px);
      }
      
      [data-aos="fade-in"] {
        opacity: 0;
      }
      
      [data-aos="slide-left"] {
        transform: translateX(-40px);
      }
      
      [data-aos="slide-right"] {
        transform: translateX(40px);
      }
      
      [data-aos="zoom-in"] {
        transform: scale(0.9);
      }
      
      [data-aos].animate {
        opacity: 1;
        transform: translateY(0) translateX(0) scale(1);
      }

      /* Enhanced portfolio card animations */
      .portfolio-item {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .portfolio-item:hover {
        animation: cardFloat 0.3s ease-out forwards;
      }

      @keyframes cardFloat {
        to {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }
      }

      /* Tag hover animations */
      .tag {
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .tag:hover {
        animation: tagPop 0.2s ease-out forwards;
      }

      @keyframes tagPop {
        50% {
          transform: translateY(-3px) scale(1.05);
        }
        100% {
          transform: translateY(-2px) scale(1.02);
        }
      }

      /* Button animations */
      .btn {
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
      }

      .btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: left 0.5s;
      }

      .btn:hover::before {
        left: 100%;
      }
    `;

    document.head.appendChild(style);
  }

  // Portfolio Interactions
  initPortfolioInteractions() {
    // Add stagger animation to portfolio grids
    const portfolioGrids = document.querySelectorAll(".portfolio-grid");

    portfolioGrids.forEach((grid) => {
      const items = grid.querySelectorAll(".portfolio-item");
      items.forEach((item, index) => {
        item.style.animationDelay = `${index * 100}ms`;
      });
    });

    // Enhanced tag interactions
    const tags = document.querySelectorAll(".tag");
    tags.forEach((tag) => {
      tag.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-2px) scale(1.05)";
      });

      tag.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0) scale(1)";
      });
    });

    // Video modal functionality
    this.initVideoModal();
  }

  initVideoModal() {
    const videoButtons = document.querySelectorAll(".play-video-btn");
    let modal = document.querySelector(".video-modal");

    // Create modal if it doesn't exist
    if (!modal) {
      modal = this.createVideoModal();
    }

    videoButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const videoId = button.getAttribute("data-video-id");
        this.openVideoModal(videoId, modal);
      });
    });
  }

  createVideoModal() {
    const modal = document.createElement("div");
    modal.className = "video-modal";
    modal.innerHTML = `
      <div class="video-modal-content">
        <div class="video-modal-header">
          <h3 class="video-modal-title">Project Demo</h3>
          <button class="modal-close" aria-label="Close video">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="video-modal-body">
          <iframe src="" frameborder="0" allowfullscreen></iframe>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Close modal events
    const closeBtn = modal.querySelector(".modal-close");
    closeBtn.addEventListener("click", () => this.closeVideoModal(modal));

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        this.closeVideoModal(modal);
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("active")) {
        this.closeVideoModal(modal);
      }
    });

    return modal;
  }

  openVideoModal(videoId, modal) {
    const iframe = modal.querySelector("iframe");
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;

    modal.classList.add("active");
    document.body.style.overflow = "hidden";

    // Focus management
    modal.querySelector(".modal-close").focus();
  }

  closeVideoModal(modal) {
    const iframe = modal.querySelector("iframe");
    iframe.src = "";

    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  // Contact Form Enhancement
  initContactForm() {
    const contactForm = document.querySelector(".contact-form");
    if (!contactForm) return;

    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      // Show loading state
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      // Simulate form submission (replace with actual logic)
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Success feedback
        this.showFormMessage(
          "Thank you! Your message has been sent.",
          "success",
        );
        contactForm.reset();
      } catch (error) {
        this.showFormMessage(
          "Sorry, there was an error. Please try again.",
          "error",
        );
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }

  showFormMessage(message, type) {
    const existingMessage = document.querySelector(".form-message");
    if (existingMessage) {
      existingMessage.remove();
    }

    const messageEl = document.createElement("div");
    messageEl.className = `form-message form-message--${type}`;
    messageEl.textContent = message;

    const form = document.querySelector(".contact-form");
    form.appendChild(messageEl);

    setTimeout(() => {
      messageEl.remove();
    }, 5000);
  }

  // Performance Optimizations
  setupPerformanceOptimizations() {
    // Lazy load images if they exist
    if ("IntersectionObserver" in window) {
      const images = document.querySelectorAll("img[data-src]");
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach((img) => imageObserver.observe(img));
    }

    // Preload critical assets
    this.preloadCriticalAssets();
  }

  preloadCriticalAssets() {
    // Preload fonts if needed
    const fontPreloads = [
      "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
    ];

    fontPreloads.forEach((fontUrl) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "style";
      link.href = fontUrl;
      document.head.appendChild(link);
    });
  }

  setupAnimations() {
    // Any additional animation setup
    this.setupScrollProgress();
  }

  setupScrollProgress() {
    // Add a scroll progress indicator
    const progressBar = document.createElement("div");
    progressBar.className = "scroll-progress";
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: linear-gradient(90deg, var(--primary-color), #ff9533);
      z-index: 9999;
      transition: width 0.1s ease;
    `;

    document.body.appendChild(progressBar);

    let ticking = false;
    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            const scrolled =
              (window.pageYOffset /
                (document.documentElement.scrollHeight - window.innerHeight)) *
              100;
            progressBar.style.width = `${Math.min(scrolled, 100)}%`;
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true },
    );
  }
}

// Initialize the portfolio app
const portfolioApp = new PortfolioApp();
