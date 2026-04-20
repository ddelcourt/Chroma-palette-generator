// ============================================================================
// APPLICATION INITIALIZATION
// Main initialization and event listeners
// ============================================================================

// Load saved theme on page load
window.addEventListener('load', () => {
  const savedTheme = localStorage.getItem('theme');
  const root = document.documentElement;
  const themeButton = document.querySelector('.theme-toggle-inline');
  
  if (savedTheme === 'light') {
    root.classList.add('light-theme');
    themeButton.textContent = 'Dark Mode';
  }
  
  // Check if there's a shared URL
  if (window.location.hash) {
    loadFromURL();
  } else {
    // Set random initial color only if not loading from URL
    const randomHue = getRandomInt(0, 360);
    const randomSat = getRandomInt(5, 100);
    const randomLight = getRandomInt(35, 65);
    const randomColor = hslToHex(randomHue, randomSat, randomLight);
    document.getElementById('baseColor').value = randomColor;
    
    generatePalette();
  }
  
  // Setup click-outside handler for hamburger menu
  document.addEventListener('click', function(event) {
    const menu = document.getElementById('dropdownMenu');
    const menuWrapper = document.querySelector('.menu-wrapper');
    
    if (menu && menuWrapper && 
        menu.classList.contains('show') &&
        !menuWrapper.contains(event.target)) {
      menu.classList.remove('show');
      document.querySelector('.hamburger-menu').classList.remove('active');
    }
  });
});

// Listen for Enter key to toggle fullscreen
document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' || e.key === 'Return') {
    e.preventDefault();
    toggleFullscreen();
  }
});

// Setup input event listeners
document.querySelectorAll('input').forEach(input => {
  input.addEventListener('input', handleInputChange);
  
  // Add value display update for range sliders
  if (input.type === 'range') {
    input.addEventListener('input', function() {
      updateSliderValue(this);
    });
    // Initialize display
    updateSliderValue(input);
  }
});
