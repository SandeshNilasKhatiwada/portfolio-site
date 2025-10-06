// Smooth scrolling for navigation links
document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");
      navToggle.classList.toggle("active");
    });
  }

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Close mobile menu if open
        if (navMenu.classList.contains("active")) {
          navMenu.classList.remove("active");
          navToggle.classList.remove("active");
        }

        // Update active link
        navLinks.forEach((navLink) => navLink.classList.remove("active"));
        this.classList.add("active");
      }
    });
  });

  // Header scroll effect
  const header = document.querySelector(".header");

  function handleScroll() {
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Update active navigation link based on scroll position
    updateActiveNavLink();
  }

  function updateActiveNavLink() {
    const sections = document.querySelectorAll("section[id]");
    const scrollPos = window.scrollY + 200;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", handleScroll);

  // Initialize AOS (Animate On Scroll) alternative
  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll("[data-aos]");

    function checkElements() {
      animatedElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add("animate");
        }
      });
    }

    // Add CSS animation classes
    const style = document.createElement("style");
    style.textContent = `
            [data-aos] {
                opacity: 0;
                transition: all 0.6s ease;
            }
            
            [data-aos="fade-up"] {
                transform: translateY(30px);
            }
            
            [data-aos].animate {
                opacity: 1;
                transform: translateY(0);
            }
        `;
    document.head.appendChild(style);

    window.addEventListener("scroll", checkElements);
    checkElements(); // Initial check
  }

  initScrollAnimations();

  // Contact form handling
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const name = formData.get("name");
      const email = formData.get("email");
      const message = formData.get("message");

      // Simple validation
      if (!name || !email || !message) {
        alert("Please fill in all fields.");
        return;
      }

      // Here you would typically send the form data to a server
      // For now, we'll just show a success message
      alert("Thank you for your message! I'll get back to you soon.");
      this.reset();
    });
  }

  // Add typing effect to hero title
  function typeWriter() {
    const heroTitle = document.querySelector(".hero-title");
    if (!heroTitle) return;

    const text = heroTitle.innerHTML;
    heroTitle.innerHTML = "";
    heroTitle.style.borderRight = "2px solid #FF7A00";

    let i = 0;
    function type() {
      if (i < text.length) {
        heroTitle.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, 50);
      } else {
        setTimeout(() => {
          heroTitle.style.borderRight = "none";
        }, 1000);
      }
    }

    setTimeout(type, 1000);
  }

  // Uncomment the line below if you want the typing effect
  // typeWriter();

  // Statistics counter animation
  function animateCounters() {
    const counters = document.querySelectorAll(".stat-number");

    counters.forEach((counter) => {
      const target = parseInt(counter.textContent.replace("+", ""));
      const increment = target / 100;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target + "+";
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current) + "+";
        }
      }, 20);
    });
  }

  // Intersection Observer for counter animation
  const aboutSection = document.querySelector(".about");
  if (aboutSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(aboutSection);
  }

  // Video functionality for portfolio
  function initVideoPlayers() {
    const modal = document.getElementById("videoModal");
    const modalFrame = document.getElementById("modalVideoFrame");
    const modalTitle = document.getElementById("modalVideoTitle");
    const modalClose = document.getElementById("modalClose");

    // Play video button handlers
    const playButtons = document.querySelectorAll(
      ".play-video-btn, .video-thumbnail",
    );

    playButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        const videoId =
          this.getAttribute("data-video-id") ||
          this.closest("[data-video-id]").getAttribute("data-video-id");
        const projectTitle =
          this.closest(".portfolio-item").querySelector(
            ".portfolio-title",
          ).textContent;
        openVideoModal(videoId, projectTitle);
      });
    });

    // Close modal handlers
    if (modalClose) {
      modalClose.addEventListener("click", closeVideoModal);
    }

    if (modal) {
      modal.addEventListener("click", function (e) {
        if (e.target === modal) {
          closeVideoModal();
        }
      });
    }

    // Escape key to close modal
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        closeVideoModal();
      }
    });

    function openVideoModal(videoId, title) {
      if (modal && modalFrame && modalTitle) {
        modalTitle.textContent = title;
        modalFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
        modal.classList.add("active");
        document.body.style.overflow = "hidden"; // Prevent background scrolling
      }
    }

    function closeVideoModal() {
      if (modal && modalFrame) {
        modal.classList.remove("active");
        modalFrame.src = ""; // Stop video
        document.body.style.overflow = ""; // Restore scrolling
      }
    }

    // Make functions globally accessible for cleanup
    window.closeVideoModal = closeVideoModal;
  }

  // Initialize video players
  initVideoPlayers();

  // Video Carousel functionality
  function initVideoCarousel() {
    const carousel = document.querySelector(".video-carousel");
    const prevButton = document.querySelector(".carousel-control.prev");
    const nextButton = document.querySelector(".carousel-control.next");

    if (!carousel || !prevButton || !nextButton) return;

    let currentPosition = 0;
    const items = carousel.querySelectorAll(".carousel-item");
    const itemWidth = items[0].offsetWidth + 32; // Including gap
    const maxPosition = -(items.length - getVisibleItems()) * itemWidth;

    function getVisibleItems() {
      const viewportWidth = window.innerWidth;
      if (viewportWidth < 768) return 1;
      if (viewportWidth < 1200) return 2;
      return 3;
    }

    function updateCarouselPosition() {
      carousel.style.transform = `translateX(${currentPosition}px)`;

      // Update button states
      prevButton.style.opacity = currentPosition === 0 ? "0.5" : "1";
      nextButton.style.opacity = currentPosition <= maxPosition ? "0.5" : "1";
    }

    function moveCarousel(direction) {
      const step = itemWidth * (direction === "next" ? -1 : 1);
      const newPosition = currentPosition + step;

      if (newPosition <= 0 && newPosition >= maxPosition) {
        currentPosition = newPosition;
        updateCarouselPosition();
      }
    }

    prevButton.addEventListener("click", () => moveCarousel("prev"));
    nextButton.addEventListener("click", () => moveCarousel("next"));

    // Update carousel on window resize
    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        currentPosition = 0;
        updateCarouselPosition();
      }, 100);
    });

    // Initialize button states
    updateCarouselPosition();
  }

  // Initialize video carousel
  initVideoCarousel();
});
