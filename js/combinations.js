// ============================================================================
// COMBINATIONS GENERATION AND RENDERING
// Functions for generating and displaying color combinations
// ============================================================================

function getRandomColors(palette, count, usedSets) {
  let attempts = 0;
  const maxAttempts = 100;
  
  while (attempts < maxAttempts) {
    const indices = [];
    while (indices.length < count) {
      const randomIndex = Math.floor(Math.random() * palette.length);
      if (!indices.includes(randomIndex)) {
        indices.push(randomIndex);
      }
    }
    
    indices.sort((a, b) => a - b);
    const setKey = indices.join('-');
    
    if (!usedSets.has(setKey)) {
      usedSets.add(setKey);
      return {
        colors: indices.map(i => palette[i]),
        indices: indices
      };
    }
    attempts++;
  }
  
  // If we can't find unique combination, just return random colors
  const indices = [];
  while (indices.length < count) {
    const randomIndex = Math.floor(Math.random() * palette.length);
    if (!indices.includes(randomIndex)) {
      indices.push(randomIndex);
    }
  }
  return {
    colors: indices.map(i => palette[i]),
    indices: indices
  };
}

function generateCombinations() {
  if (!window.currentPalette) return;

  const palette = window.currentPalette;

  // Generate color combinations ONCE
  const twoCombos = [];
  const twoIndices = [];
  const usedTwo = new Set();
  for (let i = 0; i < 6; i++) {
    const result = getRandomColors(palette, 2, usedTwo);
    twoCombos.push(result.colors);
    twoIndices.push(result.indices);
  }

  const threeCombos = [];
  const threeIndices = [];
  const usedThree = new Set();
  for (let i = 0; i < 6; i++) {
    const result = getRandomColors(palette, 3, usedThree);
    threeCombos.push(result.colors);
    threeIndices.push(result.indices);
  }

  const fourCombos = [];
  const fourIndices = [];
  const usedFour = new Set();
  for (let i = 0; i < 6; i++) {
    const result = getRandomColors(palette, 4, usedFour);
    fourCombos.push(result.colors);
    fourIndices.push(result.indices);
  }

  // Store indices globally
  window.currentCombinations = {
    two: twoIndices,
    three: threeIndices,
    four: fourIndices
  };

  // Render the SAME combinations in all three modes
  renderBarsMode(twoCombos, threeCombos, fourCombos);
  renderCirclesMode(twoCombos, threeCombos, fourCombos);
  renderGradientsMode(twoCombos, threeCombos, fourCombos);
}

function restoreCombinations(storedCombinations) {
  const palette = window.currentPalette;
  
  // Convert stored indices back to color objects from new palette
  const twoCombos = storedCombinations.two.map(indices => 
    indices.map(idx => palette[idx])
  );
  const threeCombos = storedCombinations.three.map(indices => 
    indices.map(idx => palette[idx])
  );
  const fourCombos = storedCombinations.four.map(indices => 
    indices.map(idx => palette[idx])
  );

  // Render with restored combinations
  renderBarsMode(twoCombos, threeCombos, fourCombos);
  renderCirclesMode(twoCombos, threeCombos, fourCombos);
  renderGradientsMode(twoCombos, threeCombos, fourCombos);
}

function renderBarsMode(twoCombos, threeCombos, fourCombos) {
  const twoContainer = document.getElementById('twoCombinations');
  twoContainer.innerHTML = '';
  twoCombos.forEach(colors => {
    const item = createCombinationItem(colors, false);
    twoContainer.appendChild(item);
  });

  const threeContainer = document.getElementById('threeCombinations');
  threeContainer.innerHTML = '';
  threeCombos.forEach(colors => {
    const item = createCombinationItem(colors, false);
    threeContainer.appendChild(item);
  });

  const fourContainer = document.getElementById('fourCombinations');
  fourContainer.innerHTML = '';
  fourCombos.forEach(colors => {
    const item = createCombinationItem(colors, true);
    fourContainer.appendChild(item);
  });
}

function renderCirclesMode(twoCombos, threeCombos, fourCombos) {
  const twoContainer = document.getElementById('twoCombinationsCircles');
  twoContainer.innerHTML = '';
  twoCombos.forEach(colors => {
    const item = createCircleCombinationItem(colors, 2);
    twoContainer.appendChild(item);
  });

  const threeContainer = document.getElementById('threeCombinationsCircles');
  threeContainer.innerHTML = '';
  threeCombos.forEach(colors => {
    const item = createCircleCombinationItem(colors, 3);
    threeContainer.appendChild(item);
  });

  const fourContainer = document.getElementById('fourCombinationsCircles');
  fourContainer.innerHTML = '';
  fourCombos.forEach(colors => {
    const item = createCircleCombinationItem(colors, 4);
    fourContainer.appendChild(item);
  });
}

function renderGradientsMode(twoCombos, threeCombos, fourCombos) {
  const twoContainer = document.getElementById('twoCombinationsGradients');
  twoContainer.innerHTML = '';
  twoCombos.forEach(colors => {
    const item = createGradientCombinationItem(colors, false);
    twoContainer.appendChild(item);
  });

  const threeContainer = document.getElementById('threeCombinationsGradients');
  threeContainer.innerHTML = '';
  threeCombos.forEach(colors => {
    const item = createGradientCombinationItem(colors, false);
    threeContainer.appendChild(item);
  });

  const fourContainer = document.getElementById('fourCombinationsGradients');
  fourContainer.innerHTML = '';
  fourCombos.forEach(colors => {
    const item = createGradientCombinationItem(colors, true);
    fourContainer.appendChild(item);
  });
}

function createCombinationItem(colors, isFourColor) {
  const item = document.createElement('div');
  item.className = 'combination-item';
  
  // Sort colors by lightness (dark to light)
  const sortedColors = [...colors].sort((a, b) => a.l - b.l);
  
  const hslVariables = [];
  const rgbVariables = [];
  sortedColors.forEach((color, index) => {
    const hex = lchToHex(color.l, color.c, color.h);
    const rgb = lchToRgb(color.l, color.c, color.h);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    hslVariables.push(`--color-${index + 1}-hsl: hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%);`);
    rgbVariables.push(`--color-${index + 1}-rgb: rgb(${rgb.r}, ${rgb.g}, ${rgb.b});`);
  });
  
  const copyText = 'Copied to clipboard values:\n/* HSL */\n' + hslVariables.join('\n') + '\n/* RGB */\n' + rgbVariables.join('\n');
  item.onclick = () => copyToClipboard(copyText);
  
  sortedColors.forEach(color => {
    const hex = lchToHex(color.l, color.c, color.h);
    const swatch = document.createElement('div');
    swatch.className = isFourColor ? 'combination-swatch four-color' : 'combination-swatch';
    swatch.style.backgroundColor = hex;
    item.appendChild(swatch);
  });
  
  return item;
}

function createCircleCombinationItem(colors, count) {
  const item = document.createElement('div');
  const classNames = {
    2: 'circle-combination-item two-circles',
    3: 'circle-combination-item three-circles',
    4: 'circle-combination-item four-circles'
  };
  item.className = classNames[count];
  
  // Sort colors by lightness (dark to light)
  const sortedColors = [...colors].sort((a, b) => a.l - b.l);
  
  const hslVariables = [];
  const rgbVariables = [];
  sortedColors.forEach((color, index) => {
    const hex = lchToHex(color.l, color.c, color.h);
    const rgb = lchToRgb(color.l, color.c, color.h);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    hslVariables.push(`--color-${index + 1}-hsl: hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%);`);
    rgbVariables.push(`--color-${index + 1}-rgb: rgb(${rgb.r}, ${rgb.g}, ${rgb.b});`);
  });
  
  const copyText = 'Copied to clipboard values:\n/* HSL */\n' + hslVariables.join('\n') + '\n/* RGB */\n' + rgbVariables.join('\n');
  item.onclick = () => copyToClipboard(copyText);
  
  sortedColors.forEach(color => {
    const hex = lchToHex(color.l, color.c, color.h);
    const circle = document.createElement('div');
    circle.className = 'circle-swatch';
    circle.style.backgroundColor = hex;
    item.appendChild(circle);
  });
  
  return item;
}

function createGradientCombinationItem(colors, isFourColor) {
  const item = document.createElement('div');
  item.className = isFourColor ? 'gradient-combination-item four-gradient' : 'gradient-combination-item';
  
  // Sort colors by lightness (dark to light)
  const sortedColors = [...colors].sort((a, b) => a.l - b.l);
  
  const hexColors = sortedColors.map(color => lchToHex(color.l, color.c, color.h));
  
  const hslVariables = [];
  const rgbVariables = [];
  sortedColors.forEach((color, index) => {
    const hex = lchToHex(color.l, color.c, color.h);
    const rgb = lchToRgb(color.l, color.c, color.h);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    hslVariables.push(`--color-${index + 1}-hsl: hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%);`);
    rgbVariables.push(`--color-${index + 1}-rgb: rgb(${rgb.r}, ${rgb.g}, ${rgb.b});`);
  });
  
  // Create linear gradient
  const gradient = `linear-gradient(to right, ${hexColors.join(', ')})`;
  item.style.background = gradient;
  
  const copyText = 'Copied to clipboard values:\n/* HSL */\n' + hslVariables.join('\n') + '\n/* RGB */\n' + rgbVariables.join('\n');
  item.onclick = () => copyToClipboard(copyText);
  
  return item;
}

function shuffleTwoCombinations() {
  if (!window.currentPalette) return;
  
  const palette = window.currentPalette;
  
  // Generate combinations ONCE
  const twoCombos = [];
  const twoIndices = [];
  const usedTwo = new Set();
  for (let i = 0; i < 6; i++) {
    const result = getRandomColors(palette, 2, usedTwo);
    twoCombos.push(result.colors);
    twoIndices.push(result.indices);
  }
  
  // Update stored indices
  window.currentCombinations.two = twoIndices;
  
  // Render in all modes
  const twoContainer = document.getElementById('twoCombinations');
  twoContainer.innerHTML = '';
  twoCombos.forEach(colors => {
    const item = createCombinationItem(colors, false);
    twoContainer.appendChild(item);
  });
  
  const twoCirclesContainer = document.getElementById('twoCombinationsCircles');
  twoCirclesContainer.innerHTML = '';
  twoCombos.forEach(colors => {
    const item = createCircleCombinationItem(colors, 2);
    twoCirclesContainer.appendChild(item);
  });
  
  const twoGradientsContainer = document.getElementById('twoCombinationsGradients');
  twoGradientsContainer.innerHTML = '';
  twoCombos.forEach(colors => {
    const item = createGradientCombinationItem(colors, false);
    twoGradientsContainer.appendChild(item);
  });
}

function shuffleThreeCombinations() {
  if (!window.currentPalette) return;
  
  const palette = window.currentPalette;
  
  // Generate combinations ONCE
  const threeCombos = [];
  const threeIndices = [];
  const usedThree = new Set();
  for (let i = 0; i < 6; i++) {
    const result = getRandomColors(palette, 3, usedThree);
    threeCombos.push(result.colors);
    threeIndices.push(result.indices);
  }
  
  // Update stored indices
  window.currentCombinations.three = threeIndices;
  
  // Render in all modes
  const threeContainer = document.getElementById('threeCombinations');
  threeContainer.innerHTML = '';
  threeCombos.forEach(colors => {
    const item = createCombinationItem(colors, false);
    threeContainer.appendChild(item);
  });
  
  const threeCirclesContainer = document.getElementById('threeCombinationsCircles');
  threeCirclesContainer.innerHTML = '';
  threeCombos.forEach(colors => {
    const item = createCircleCombinationItem(colors, 3);
    threeCirclesContainer.appendChild(item);
  });
  
  const threeGradientsContainer = document.getElementById('threeCombinationsGradients');
  threeGradientsContainer.innerHTML = '';
  threeCombos.forEach(colors => {
    const item = createGradientCombinationItem(colors, false);
    threeGradientsContainer.appendChild(item);
  });
}

function shuffleFourCombinations() {
  if (!window.currentPalette) return;
  
  const palette = window.currentPalette;
  
  // Generate combinations ONCE
  const fourCombos = [];
  const fourIndices = [];
  const usedFour = new Set();
  for (let i = 0; i < 6; i++) {
    const result = getRandomColors(palette, 4, usedFour);
    fourCombos.push(result.colors);
    fourIndices.push(result.indices);
  }
  
  // Update stored indices
  window.currentCombinations.four = fourIndices;
  
  // Render in all modes
  const fourContainer = document.getElementById('fourCombinations');
  fourContainer.innerHTML = '';
  fourCombos.forEach(colors => {
    const item = createCombinationItem(colors, true);
    fourContainer.appendChild(item);
  });
  
  const fourCirclesContainer = document.getElementById('fourCombinationsCircles');
  fourCirclesContainer.innerHTML = '';
  fourCombos.forEach(colors => {
    const item = createCircleCombinationItem(colors, 4);
    fourCirclesContainer.appendChild(item);
  });
  
  const fourGradientsContainer = document.getElementById('fourCombinationsGradients');
  fourGradientsContainer.innerHTML = '';
  fourCombos.forEach(colors => {
    const item = createGradientCombinationItem(colors, true);
    fourGradientsContainer.appendChild(item);
  });
}
