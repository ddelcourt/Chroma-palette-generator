// ============================================================================
// UI CONTROLS AND INTERACTIONS
// Functions for handling user interface interactions
// ============================================================================

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Toggle hamburger menu
function toggleMenu(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  
  const menu = document.getElementById('dropdownMenu');
  const hamburger = document.querySelector('.hamburger-menu');
  
  if (menu && hamburger) {
    const isShowing = menu.classList.contains('show');
    
    if (isShowing) {
      menu.classList.remove('show');
      hamburger.classList.remove('active');
    } else {
      menu.classList.add('show');
      hamburger.classList.add('active');
    }
  }
}

function swapWarmth() {
  const leftInput = document.getElementById('leftWarmth');
  const rightInput = document.getElementById('rightWarmth');
  
  const temp = leftInput.value;
  leftInput.value = rightInput.value;
  rightInput.value = temp;
  
  // Update slider displays
  updateSliderValue(leftInput);
  updateSliderValue(rightInput);
  
  // Store current combinations before regenerating
  const currentCombinations = window.currentCombinations;
  
  generatePalette(true);
  
  // Restore the same combinations with the new palette
  if (currentCombinations) {
    restoreCombinations(currentCombinations);
  }
}

function swapLightness() {
  const minInput = document.getElementById('minLightness');
  const maxInput = document.getElementById('maxLightness');
  
  const temp = minInput.value;
  minInput.value = maxInput.value;
  maxInput.value = temp;
  
  // Update slider displays
  updateSliderValue(minInput);
  updateSliderValue(maxInput);
  
  // Store current combinations before regenerating
  const currentCombinations = window.currentCombinations;
  
  // Regenerate palette with swapped lightness
  const baseColorHex = document.getElementById('baseColor').value;
  const minLightness = parseFloat(document.getElementById('minLightness').value);
  const maxLightness = parseFloat(document.getElementById('maxLightness').value);
  const hueStep = parseFloat(document.getElementById('hueStep').value);
  const leftWarmth = parseFloat(document.getElementById('leftWarmth').value);
  const rightWarmth = parseFloat(document.getElementById('rightWarmth').value);

  // Convert base color to LCH
  const rgb = hexToRgb(baseColorHex);
  const baseLch = rgbToLch(rgb.r, rgb.g, rgb.b);

  // Generate palette
  const palette = createHueShiftPalette({
    base: baseLch,
    minLightness: minLightness,
    maxLightness: maxLightness,
    hueStep: hueStep,
    leftWarmth: leftWarmth,
    rightWarmth: rightWarmth
  });

  // Store palette globally for combinations
  window.currentPalette = palette;

  // Display palette
  const container = document.getElementById('paletteContainer');
  container.innerHTML = '<div class="palette"></div>';
  const paletteDiv = container.querySelector('.palette');

  palette.forEach((color, index) => {
    const hex = lchToHex(color.l, color.c, color.h);
    const rgb = lchToRgb(color.l, color.c, color.h);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    
    const colorItem = document.createElement('div');
    colorItem.className = 'color-item';
    
    const swatch = document.createElement('div');
    swatch.className = 'color-swatch';
    swatch.style.backgroundColor = hex;
    const copyText = `Copied to clipboard values:\n/* HSL */\n--color-hsl: hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%);\n/* RGB */\n--color-rgb: rgb(${rgb.r}, ${rgb.g}, ${rgb.b});`;
    swatch.onclick = () => copyToClipboard(copyText);
    
    const values = document.createElement('div');
    values.className = 'color-values';
    values.innerHTML = `
      <div class="hsl-value">hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)</div>
      <div class="lch-value">L:${color.l.toFixed(0)} C:${color.c.toFixed(0)} H:${color.h.toFixed(0)}</div>
    `;
    
    colorItem.appendChild(swatch);
    colorItem.appendChild(values);
    paletteDiv.appendChild(colorItem);
  });
  
  // Restore the same combinations with the new palette (if they exist)
  if (currentCombinations) {
    restoreCombinations(currentCombinations);
  } else {
    // First time - generate new combinations
    generateCombinations();
  }
}

function randomizeColor() {
  const randomHue = getRandomInt(0, 360);
  const randomSat = getRandomInt(5, 100);
  const randomLight = getRandomInt(35, 65);
  const randomColor = hslToHex(randomHue, randomSat, randomLight);
  document.getElementById('baseColor').value = randomColor;
  
  // Store current combinations before regenerating
  const currentCombinations = window.currentCombinations;
  
  generatePalette(true);
  
  // Restore the same combinations with the new palette (if they exist)
  if (currentCombinations) {
    restoreCombinations(currentCombinations);
  }
}

function randomizeAll() {
  // Randomize base color
  const randomHue = getRandomInt(0, 360);
  const randomSat = getRandomInt(5, 100);
  const randomLight = getRandomInt(35, 65);
  const randomColor = hslToHex(randomHue, randomSat, randomLight);
  document.getElementById('baseColor').value = randomColor;

  // Randomize lightness values
  const minLight = getRandomInt(5, 45);
  const maxLight = getRandomInt(55, 95);
  const minLightnessInput = document.getElementById('minLightness');
  const maxLightnessInput = document.getElementById('maxLightness');
  minLightnessInput.value = minLight;
  maxLightnessInput.value = maxLight;
  updateSliderValue(minLightnessInput);
  updateSliderValue(maxLightnessInput);

  // Randomize hue step (5 to 19 degrees)
  const randomHueStep = getRandomInt(5, 19);
  const hueStepInput = document.getElementById('hueStep');
  hueStepInput.value = randomHueStep;
  updateSliderValue(hueStepInput);

  // Randomize warmth values (-15 to 15 degrees)
  const randomLeftWarmth = getRandomInt(-15, 15);
  const randomRightWarmth = getRandomInt(-15, 15);
  const leftWarmthInput = document.getElementById('leftWarmth');
  const rightWarmthInput = document.getElementById('rightWarmth');
  leftWarmthInput.value = randomLeftWarmth;
  rightWarmthInput.value = randomRightWarmth;
  updateSliderValue(leftWarmthInput);
  updateSliderValue(rightWarmthInput);

  generatePalette();
}

function toggleTheme() {
  const root = document.documentElement;
  const themeButton = document.querySelector('.menu-button-item');
  
  if (root.classList.contains('light-theme')) {
    root.classList.remove('light-theme');
    themeButton.textContent = '🌙 Light Mode';
    localStorage.setItem('theme', 'dark');
  } else {
    root.classList.add('light-theme');
    themeButton.textContent = '☀️ Dark Mode';
    localStorage.setItem('theme', 'light');
  }
}

function switchTab(mode) {
  // Update tab buttons
  document.querySelectorAll('.tab-button').forEach(btn => {
    btn.classList.remove('active');
    // Add active class to the button that matches the mode
    if ((mode === 'bars' && btn.textContent === 'Bars') ||
        (mode === 'gradients' && btn.textContent === 'Gradients') ||
        (mode === 'circles' && btn.textContent === 'Dots')) {
      btn.classList.add('active');
    }
  });

  // Update presentation modes
  document.querySelectorAll('.presentation-mode').forEach(pm => pm.classList.remove('active'));
  document.getElementById(mode + '-mode').classList.add('active');
}

function updateSliderValue(slider) {
  const valueDisplay = slider.nextElementSibling;
  if (valueDisplay && valueDisplay.classList.contains('slider-value')) {
    valueDisplay.textContent = slider.value;
  }
}

function handleInputChange() {
  const currentCombinations = window.currentCombinations;
  generatePalette(true);
  if (currentCombinations) {
    restoreCombinations(currentCombinations);
  }
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      console.log('Error attempting to enable fullscreen:', err);
    });
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}
