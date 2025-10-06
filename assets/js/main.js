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

// Video carousel functionality
function initVideoCarousel() {
  const carousel = document.querySelector(".video-carousel");
  const prevButton = document.querySelector(".carousel-control.prev");
  const nextButton = document.querySelector(".carousel-control.next");
  const container = document.querySelector(".video-carousel-container");

  if (!carousel || !prevButton || !nextButton || !container) {
    console.warn("Carousel elements not found");
    return;
  }

  let currentSlide = 0;
  const items = carousel.querySelectorAll(".carousel-item");
  const totalItems = items.length;
  let players = [];

  function getVisibleItems() {
    const viewportWidth = window.innerWidth;
    if (viewportWidth < 768) return 1;
    if (viewportWidth < 1200) return 2;
    return 3;
  }

  function updateCarousel() {
    const visibleItems = getVisibleItems();
    const itemWidth = container.offsetWidth / visibleItems;
    const maxSlide = Math.max(0, totalItems - visibleItems);
    
    items.forEach(item => {
      item.style.flex = `0 0 ${100 / visibleItems}%`;
      item.style.maxWidth = `${100 / visibleItems}%`;
    });

    const offset = currentSlide * itemWidth;
    carousel.style.transform = `translateX(-${offset}px)`;

    prevButton.disabled = currentSlide <= 0;
    nextButton.disabled = currentSlide >= maxSlide;
    prevButton.style.opacity = currentSlide <= 0 ? "0.5" : "1";
    nextButton.style.opacity = currentSlide >= maxSlide ? "0.5" : "1";
  }

  function moveCarousel(direction) {
    const visibleItems = getVisibleItems();
    const maxSlide = Math.max(0, totalItems - visibleItems);
    
    if (direction === "next" && currentSlide < maxSlide) {
      currentSlide++;
    } else if (direction === "prev" && currentSlide > 0) {
      currentSlide--;
    }
    
    updateCarousel();
  }

  prevButton.addEventListener("click", () => moveCarousel("prev"));
  nextButton.addEventListener("click", () => moveCarousel("next"));

  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      currentSlide = 0;
      updateCarousel();
    }, 100);
  });

  carousel.addEventListener("touchstart", (e) => {
    const touch = e.touches[0];
    let startX = touch.clientX;
    let moved = false;

    const handleTouchMove = (e) => {
      moved = true;
      const currentX = e.touches[0].clientX;
      const diff = startX - currentX;

      if (Math.abs(diff) > 50) {
        moveCarousel(diff > 0 ? "next" : "prev");
        startX = currentX;
      }
    };

    const handleTouchEnd = () => {
      carousel.removeEventListener("touchmove", handleTouchMove);
      carousel.removeEventListener("touchend", handleTouchEnd);
    };

    carousel.addEventListener("touchmove", handleTouchMove);
    carousel.addEventListener("touchend", handleTouchEnd);
  });

  // Initialize carousel
  updateCarousel();
}

  // Video Carousel functionality
  function initVideoCarousel() {
    const carousel = document.querySelector(".video-carousel");
    const prevButton = document.querySelector(".carousel-control.prev");
    const nextButton = document.querySelector(".carousel-control.next");
    const container = document.querySelector(".video-carousel-container");

    if (!carousel || !prevButton || !nextButton || !container) {
      console.warn("Carousel elements not found");
      return;
    }

    let currentSlide = 0;
    const items = carousel.querySelectorAll(".carousel-item");
    const totalItems = items.length;

    function getVisibleItems() {
      const viewportWidth = window.innerWidth;
      if (viewportWidth < 768) return 1;
      if (viewportWidth < 1200) return 2;
      return 3;
    }

    function updateCarousel() {
      const visibleItems = getVisibleItems();
      const itemWidth = container.offsetWidth / visibleItems;
      const maxSlide = Math.max(0, totalItems - visibleItems);
      
      // Update items width
      items.forEach(item => {
        item.style.flex = `0 0 ${100 / visibleItems}%`;
        item.style.maxWidth = `${100 / visibleItems}%`;
      });

      // Calculate and apply transform
      const offset = currentSlide * itemWidth;
      carousel.style.transform = `translateX(-${offset}px)`;

      // Update button states
      prevButton.disabled = currentSlide <= 0;
      nextButton.disabled = currentSlide >= maxSlide;
      
      prevButton.style.opacity = currentSlide <= 0 ? "0.5" : "1";
      nextButton.style.opacity = currentSlide >= maxSlide ? "0.5" : "1";
    }

    function moveCarousel(direction) {
      const visibleItems = getVisibleItems();
      const maxSlide = Math.max(0, totalItems - visibleItems);
      
      if (direction === "next" && currentSlide < maxSlide) {
        currentSlide++;
      } else if (direction === "prev" && currentSlide > 0) {
        currentSlide--;
      }
      
      updateCarousel();
    }

    // Event listeners
    prevButton.addEventListener("click", () => moveCarousel("prev"));
    nextButton.addEventListener("click", () => moveCarousel("next"));

    // Resize handling with debounce
    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        currentSlide = 0;
        updateCarousel();
      }, 100);
    });

    // Initialize carousel
    updateCarousel();

    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carousel.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > 50) { // Minimum swipe distance
        moveCarousel(diff > 0 ? "next" : "prev");
      }
    }, { passive: true });
  }

  // Initialize video carousel
  initVideoCarousel();
});
