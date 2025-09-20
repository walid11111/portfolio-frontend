// Main JavaScript for common functionality across all pages
document.addEventListener('DOMContentLoaded', function() {
  // Theme toggle functionality - REMOVED
  // Theme is now set to dark mode by default with no toggle option
  
  // Set dark mode as default
  document.body.classList.add('dark-mode');
  localStorage.setItem('theme', 'dark-mode');
  
  // Mobile menu functionality
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const closeMobileMenu = document.getElementById('close-mobile-menu');
  const mobileMenu = document.getElementById('mobile-menu');
  
  mobileMenuButton.addEventListener('click', function() {
    mobileMenu.classList.add('open');
  });
  
  closeMobileMenu.addEventListener('click', function() {
    mobileMenu.classList.remove('open');
  });
  
  // Close mobile menu when clicking on a link
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileMenu.classList.remove('open');
    });
  });
  
  // CV download functionality
  const downloadCvButtons = document.querySelectorAll('#download-cv, .mobile-menu a[href="#"]');
  downloadCvButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      // Create a temporary anchor element to trigger download
      const link = document.createElement('a');
      link.href = portfolioData.profile.cvUrl;
      link.download = 'Walid_Khan_CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80; // Adjust for header height
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
});