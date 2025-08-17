// Elena Raven Portfolio - Interactive Effects

document.addEventListener("DOMContentLoaded", function () {
  // Initialize all interactive features
  initSmoothScrolling();
  initParallaxEffect();
  initGalleryEffects();
  initNavigationEffects();
  initAmbienceToggle();
  initScrollAnimations();
  initCursorEffect();
  initMobileNavigation();
  initMobileEnhancements();
});

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const scrollIndicator = document.querySelector(".scroll-indicator");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 100;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Scroll to manifesto when clicking scroll indicator
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", function () {
      const manifestoSection = document.getElementById("manifesto");
      if (manifestoSection) {
        const offsetTop = manifestoSection.offsetTop - 100;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  }
}

// Parallax Effect for Hero Background
function initParallaxEffect() {
  const heroBackground = document.querySelector(".hero-background");

  if (!heroBackground) return;

  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;

    heroBackground.style.transform = `translateY(${
      scrolled * parallaxSpeed
    }px)`;
  });
}

// Gallery Hover Effects and Image Loading
function initGalleryEffects() {
  // Tattoo Gallery Effects
  const galleryItems = document.querySelectorAll(".gallery-item");

  galleryItems.forEach((item) => {
    const image = item.querySelector("img");
    const info = item.querySelector(".gallery-info");

    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)";
      if (info) {
        info.style.opacity = "1";
        info.style.transform = "translateY(0)";
      }
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      if (info) {
        info.style.opacity = "0";
        info.style.transform = "translateY(20px)";
      }
    });

    // Click to view larger image (placeholder functionality)
    item.addEventListener("click", function () {
      const title = item.querySelector("h3")?.textContent || "Artwork";
      console.log(`Viewing: ${title}`);
      // Here you could implement a lightbox or modal
    });
  });

  // Painting Gallery Effects
  const paintingItems = document.querySelectorAll(
    ".painting-large, .painting-small"
  );

  paintingItems.forEach((item) => {
    item.addEventListener("click", function () {
      const title = item.querySelector("h3")?.textContent || "Painting";
      console.log(`Viewing painting: ${title}`);
      // Implement lightbox functionality here
    });
  });

  // Sketch Gallery Effects
  const sketchItems = document.querySelectorAll(".sketch-item");

  sketchItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });

    item.addEventListener("click", function () {
      const title = item.querySelector("h3")?.textContent || "Sketch";
      console.log(`Viewing sketch: ${title}`);
    });
  });
}

// Navigation Effects
function initNavigationEffects() {
  const nav = document.querySelector(".main-nav");
  let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Change navigation background opacity based on scroll
    if (scrollTop > 100) {
      nav.style.background =
        "linear-gradient(to bottom, rgba(10, 10, 10, 0.95), rgba(10, 10, 10, 0.3))";
    } else {
      nav.style.background =
        "linear-gradient(to bottom, rgba(10, 10, 10, 0.9), transparent)";
    }

    // Hide/show navigation on scroll
    if (scrollTop > lastScrollTop && scrollTop > 200) {
      nav.style.transform = "translateY(-100%)";
    } else {
      nav.style.transform = "translateY(0)";
    }

    lastScrollTop = scrollTop;
  });

  // Active link highlighting
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.clientHeight;

      if (
        window.pageYOffset >= sectionTop &&
        window.pageYOffset < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

// Ambience Toggle (Sound and Visual Effects)
function initAmbienceToggle() {
  const ambienceToggle = document.querySelector(".ambience-toggle");
  let ambienceActive = false;

  if (!ambienceToggle) return;

  ambienceToggle.addEventListener("click", function () {
    ambienceActive = !ambienceActive;

    if (ambienceActive) {
      // Add ambient effects
      document.body.classList.add("ambience-active");
      console.log("Ambience activated");

      // Add subtle animations to glow effects
      const glowEffects = document.querySelectorAll(".glow-effect");
      glowEffects.forEach((glow, index) => {
        setTimeout(() => {
          glow.style.animation = "pulseGlow 4s ease-in-out infinite";
        }, index * 500);
      });

      // Change toggle text
      ambienceToggle.querySelector("span").textContent = "Silence";
    } else {
      // Remove ambient effects
      document.body.classList.remove("ambience-active");
      console.log("Ambience deactivated");

      // Remove animations
      const glowEffects = document.querySelectorAll(".glow-effect");
      glowEffects.forEach((glow) => {
        glow.style.animation = "";
      });

      // Reset toggle text
      ambienceToggle.querySelector("span").textContent = "Ambience";
    }
  });
}

// Scroll Animations for Elements
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".section-title, .manifesto-block, .gallery-item, .painting-large, .painting-small, .sketch-item, .about-text, .exhibition-details"
  );

  animateElements.forEach((el) => {
    el.classList.add("animate-element");
    observer.observe(el);
  });
}

// Custom Cursor Effect
function initCursorEffect() {
  const cursor = document.createElement("div");
  cursor.className = "custom-cursor";
  document.body.appendChild(cursor);

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  document.addEventListener("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    const diffX = mouseX - cursorX;
    const diffY = mouseY - cursorY;

    cursorX += diffX * 0.1;
    cursorY += diffY * 0.1;

    cursor.style.left = cursorX + "px";
    cursor.style.top = cursorY + "px";

    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  // Cursor hover effects
  const hoverElements = document.querySelectorAll(
    "a, button, .gallery-item, .painting-large, .painting-small, .sketch-item"
  );

  hoverElements.forEach((el) => {
    el.addEventListener("mouseenter", function () {
      cursor.classList.add("cursor-hover");
    });

    el.addEventListener("mouseleave", function () {
      cursor.classList.remove("cursor-hover");
    });
  });
}

// Form Interactions (if contact form is added)
function initFormInteractions() {
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Add form submission logic here
      console.log("Form submitted");

      // Show success message
      const successMessage = document.createElement("div");
      successMessage.textContent = "Message sent successfully!";
      successMessage.className = "success-message";
      form.appendChild(successMessage);

      setTimeout(() => {
        successMessage.remove();
      }, 3000);
    });
  });
}

// Button Interactions
document.addEventListener("click", function (e) {
  // Reserve Tickets Button
  if (e.target.classList.contains("reserve-btn")) {
    e.preventDefault();
    console.log("Reserving tickets...");

    // Add loading state
    const originalText = e.target.textContent;
    e.target.textContent = "Processing...";
    e.target.disabled = true;

    setTimeout(() => {
      e.target.textContent = originalText;
      e.target.disabled = false;
      alert("Ticket reservation functionality would be implemented here.");
    }, 2000);
  }

  // View More Buttons
  if (e.target.classList.contains("btn-underline")) {
    e.preventDefault();
    const buttonText = e.target.textContent;
    console.log(`Clicked: ${buttonText}`);

    // Implement specific functionality for each "View More" button
    if (buttonText.includes("Collection")) {
      console.log("Opening full tattoo collection...");
    } else if (buttonText.includes("Gallery")) {
      console.log("Opening paintings gallery...");
    } else if (buttonText.includes("Sketch")) {
      console.log("Opening sketch collection...");
    } else if (buttonText.includes("Biography")) {
      console.log("Opening full biography...");
    }
  }
});

// Resize handler for responsive adjustments
window.addEventListener("resize", function () {
  // Recalculate positions for sticky elements
  const nav = document.querySelector(".main-nav");
  if (nav) {
    nav.style.transform = "translateY(0)";
  }
});

// Keyboard navigation
document.addEventListener("keydown", function (e) {
  // ESC key to close any open modals
  if (e.key === "Escape") {
    const modals = document.querySelectorAll(".modal, .lightbox");
    modals.forEach((modal) => {
      modal.style.display = "none";
    });
  }

  // Arrow keys for gallery navigation
  if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    // Implement gallery navigation
    console.log(`Gallery navigation: ${e.key}`);
  }
});

// Add CSS for animations via JavaScript
const style = document.createElement("style");
style.textContent = `
    .animate-element {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.8s ease-out;
    }
    
    .animate-element.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .custom-cursor {
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(154, 123, 79, 0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        mix-blend-mode: difference;
    }
    
    .custom-cursor.cursor-hover {
        transform: scale(2);
        background: rgba(194, 91, 63, 0.7);
    }
    
    @keyframes pulseGlow {
        0%, 100% {
            opacity: 0.2;
            transform: scale(1);
        }
        50% {
            opacity: 0.4;
            transform: scale(1.1);
        }
    }
    
    .nav-links a.active {
        color: #9a7b4f;
    }
    
    .nav-links a.active::after {
        width: 100%;
    }
    
    .success-message {
        background: #4ade80;
        color: #ffffff;
        padding: 1rem;
        border-radius: 4px;
        margin-top: 1rem;
        text-align: center;
        animation: slideInUp 0.3s ease-out;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .main-nav {
        transition: transform 0.3s ease, background 0.3s ease;
    }
    
    @media (max-width: 768px) {
        .custom-cursor {
            display: none;
        }
    }
`;

document.head.appendChild(style);

// Performance optimization
window.addEventListener("load", function () {
  // Preload images for better performance
  const images = [
    "https://images.unsplash.com/photo-1549479994-d90fae83a9e0?w=1920&h=900&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1549479994-d90fae83a9e0?w=600&h=760&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1565058379802-bbe93b2e6e50?w=600&h=760&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1518990744747-7f5d909633f5?w=600&h=760&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=760&fit=crop&crop=center",
  ];

  images.forEach((src) => {
    const img = new Image();
    img.src = src;
  });

  console.log("Elena Raven Portfolio loaded successfully");
});

// Mobile Navigation Toggle
function initMobileNavigation() {
  const mobileToggle = document.querySelector(".mobile-nav-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

  if (mobileToggle && mobileNav) {
    // Toggle mobile navigation
    mobileToggle.addEventListener("click", function () {
      this.classList.toggle("active");
      mobileNav.classList.toggle("active");

      // Prevent body scroll when menu is open
      if (mobileNav.classList.contains("active")) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    });

    // Close mobile nav when clicking on links
    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);

        // Close mobile nav
        mobileToggle.classList.remove("active");
        mobileNav.classList.remove("active");
        document.body.style.overflow = "";

        // Smooth scroll to target
        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      });
    });

    // Close mobile nav when clicking outside
    document.addEventListener("click", function (e) {
      if (!mobileNav.contains(e.target) && !mobileToggle.contains(e.target)) {
        mobileToggle.classList.remove("active");
        mobileNav.classList.remove("active");
        document.body.style.overflow = "";
      }
    });

    // Close mobile nav on escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mobileNav.classList.contains("active")) {
        mobileToggle.classList.remove("active");
        mobileNav.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }
}

// Mobile Enhancements
function initMobileEnhancements() {
  // Check if mobile device
  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    // Add mobile-specific classes and behaviors
    addScrollRevealAnimations();
    addTouchRippleEffects();
    addProgressiveImageLoading();
    addMobileParallax();
  }

  // Handle orientation change
  window.addEventListener("orientationchange", function () {
    setTimeout(() => {
      if (window.innerWidth <= 768) {
        addScrollRevealAnimations();
      }
    }, 100);
  });
}

// Scroll Reveal Animations for Mobile
function addScrollRevealAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;
        element.classList.add("animated");

        // Add specific animation classes
        if (element.classList.contains("gallery-item")) {
          element.classList.add("slide-up");
        } else if (element.classList.contains("manifesto-block")) {
          element.classList.add("scale-in");
        } else if (element.classList.contains("painting-large")) {
          element.classList.add("slide-right");
        } else if (element.classList.contains("painting-small")) {
          element.classList.add("slide-left");
        } else {
          element.classList.add("slide-up");
        }

        observer.unobserve(element);
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const elementsToAnimate = document.querySelectorAll(
    ".gallery-item, .manifesto-block, .painting-large, .painting-small, .sketch-item, .section-title"
  );

  elementsToAnimate.forEach((el) => {
    el.classList.add("animate-on-scroll");
    observer.observe(el);
  });
}

// Touch Ripple Effects
function addTouchRippleEffects() {
  const touchElements = document.querySelectorAll(
    ".mobile-nav-link, .gallery-item, .btn-underline, .reserve-btn"
  );

  touchElements.forEach((element) => {
    element.classList.add("mobile-touch-ripple");
  });
}

// Progressive Image Loading
function addProgressiveImageLoading() {
  const images = document.querySelectorAll("img");

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.style.opacity = "0";
        img.style.transition = "opacity 0.6s ease";

        img.onload = () => {
          img.style.opacity = "1";
        };

        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// Mobile Parallax Effect
function addMobileParallax() {
  let ticking = false;

  function updateParallax() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.3;

    const heroBackground = document.querySelector(".hero-background");
    if (heroBackground) {
      heroBackground.style.transform = `translateY(${rate}px)`;
    }

    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  window.addEventListener("scroll", requestTick);
}

// Export functions for external use (if needed)
window.ElenaRavenPortfolio = {
  initSmoothScrolling,
  initParallaxEffect,
  initGalleryEffects,
  initNavigationEffects,
  initAmbienceToggle,
  initScrollAnimations,
  initMobileNavigation,
  initMobileEnhancements,
};
