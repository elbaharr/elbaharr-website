// Navigation between pages
function showPortfolio() {
  document.getElementById("homePage").classList.remove("active")
  document.getElementById("portfolioPage").classList.add("active")
  window.scrollTo(0, 0)
}

function showHome() {
  document.getElementById("portfolioPage").classList.remove("active")
  document.getElementById("homePage").classList.add("active")
  window.scrollTo(0, 0)
}

// Filter projects
function filterProjects(category) {
  // Update active button
  const buttons = document.querySelectorAll(".filter-btn")
  buttons.forEach((btn) => btn.classList.remove("active"))
  event.target.closest(".filter-btn").classList.add("active")

  // Show/hide sections
  const sections = document.querySelectorAll(".projects-section")

  if (category === "all") {
    sections.forEach((section) => section.classList.remove("hidden"))
  } else {
    sections.forEach((section) => {
      if (section.dataset.category === category) {
        section.classList.remove("hidden")
      } else {
        section.classList.add("hidden")
      }
    })
  }
}

// Smooth scroll behavior
document.addEventListener("DOMContentLoaded", () => {
  // Add smooth scroll to all links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        })
      }
    })
  })

  // Add animation on scroll (optional)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe project cards for animation
  document.querySelectorAll(".project-card").forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(20px)"
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(card)
  })
})

// Handle image loading errors
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".project-image img")
  images.forEach((img) => {
    img.addEventListener("error", function () {
      // If image fails to load, show a placeholder
      this.style.display = "none"
      const placeholder = document.createElement("div")
      placeholder.style.cssText =
        "width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #1e293b, #0f172a);"

      const icon = document.createElement("div")
      icon.innerHTML = `
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#4b5563" stroke-width="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                </svg>
            `
      placeholder.appendChild(icon)

      this.parentElement.insertBefore(placeholder, this)
    })
  })
})

// Contact Modal Functions
function showContactModal() {
  const modal = document.getElementById("contactModal")
  modal.classList.add("show")
  modal.style.display = "flex"
  document.body.style.overflow = "hidden" // Prevent background scrolling
}

function hideContactModal() {
  const modal = document.getElementById("contactModal")
  modal.classList.remove("show")
  modal.style.display = "none"
  document.body.style.overflow = "auto" // Restore scrolling
}


// Close modal when clicking outside
document.addEventListener("click", (event) => {
  const modal = document.getElementById("contactModal")
  if (event.target === modal) {
    hideContactModal()
  }
})

// Close modal with Escape key
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hideContactModal()
  }
})

// Copy to clipboard function
async function copyToClipboard(text, button) {
  try {
    await navigator.clipboard.writeText(text);
    const originalText = button.innerHTML;
    button.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="copy-success">
      <path d="M20 6L9 17l-5-5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
    setTimeout(() => {
      button.innerHTML = originalText;
    }, 2000);
  } catch (err) {
    console.error('Failed to copy:', err);
  }
}
