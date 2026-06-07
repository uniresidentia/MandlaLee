(function() {
  // Contact form handling
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const detailsInput = document.getElementById('details');
      
      // Validate all fields are filled
      if (!nameInput.value.trim() || !emailInput.value.trim() || !detailsInput.value.trim()) {
        feedback.innerHTML = '<span style="color:#c34e2c;">All fields are required.</span>';
        return;
      }
      
      // Validate email format
      const emailPattern = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
      if (!emailPattern.test(emailInput.value.trim())) {
        feedback.innerHTML = '<span style="color:#c34e2c;">Please enter a valid email address.</span>';
        return;
      }
      
      // Success message
      feedback.innerHTML = '<span style="color:#111;">✓ Message received. I\'ll reply within 24 hours.</span>';
      form.reset();
      
      // Clear feedback after 4 seconds
      setTimeout(() => { 
        feedback.innerHTML = ''; 
      }, 4000);
    });
  }
  
  // Smooth scroll for anchor navigation
  const navLinks = document.querySelectorAll('.nav-links a');
  const projectHashLinks = document.querySelectorAll('.project-link[href^="#"]');
  const allAnchorLinks = [...navLinks, ...projectHashLinks];
  
  allAnchorLinks.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const hash = this.getAttribute('href');
      if (hash && hash.startsWith('#') && hash !== '#') {
        const target = document.querySelector(hash);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
  
  // Optional: Add active state to navigation on scroll
  const sections = document.querySelectorAll('#work, #about, #services, #contact');
  const navItems = document.querySelectorAll('.nav-links a');
  
  function updateActiveNavOnScroll() {
    let current = '';
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navItems.forEach(item => {
      item.style.borderBottom = 'none';
      const href = item.getAttribute('href').substring(1);
      if (href === current) {
        item.style.borderBottom = '1px solid #111';
      }
    });
  }
  
  // Only run if sections exist
  if (sections.length && navItems.length) {
    window.addEventListener('scroll', updateActiveNavOnScroll);
    updateActiveNavOnScroll(); // Initial call
  }
})();
