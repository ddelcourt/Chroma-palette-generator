// ============================================================================
// PALETTE GENERATION
// Functions for creating color palettes using LCH color space
// ============================================================================

function adjustHue(val) {
  if (val < 0) val += Math.ceil(-val / 360) * 360;
  return val % 360;
}

function map(n, start1, end1, start2, end2) {
  return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
}

function createHueShiftPalette(opts) {
  const { base, minLightness, maxLightness, hueStep, leftWarmth = 0, rightWarmth = 0 } = opts;
  const palette = [base];

  // minLightness = Initial (left/visual start)
  // maxLightness = End (right/visual end)

  for (let i = 1; i < 5; i++) {
    // Blend factor: outermost (i=4) gets 100%, innermost (i=1) gets 25%
    const blendFactor = i / 4;
    
    // Left side (visual left): undertones affect BOTH hue and chroma
    const hueLeft = adjustHue(base.h + (hueStep * i) + (leftWarmth * blendFactor));
    const chromaLeft = Math.max(0, base.c + (leftWarmth * blendFactor * 0.5));
    
    // Right side (visual right): undertones affect BOTH hue and chroma - SUBTRACT rightWarmth
    const hueRight = adjustHue(base.h - (hueStep * i) - (rightWarmth * blendFactor));
    const chromaRight = Math.max(0, base.c - (rightWarmth * blendFactor * 0.5));
    
    // Left side uses minLightness (initial), Right side uses maxLightness (end)
    const lightnessLeft = map(i, 0, 4, base.l, minLightness);
    const lightnessRight = map(i, 0, 4, base.l, maxLightness);

    // Push to right (end of array)
    palette.push({
      l: lightnessRight,
      c: chromaRight,
      h: hueRight,
      mode: "lch"
    });

    // Unshift to left (beginning of array)
    palette.unshift({
      l: lightnessLeft,
      c: chromaLeft,
      h: hueLeft,
      mode: "lch"
    });
  }

  return palette;
}

function generatePalette(preserveExistingCombinations = false) {
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

  // Generate combinations only if not preserving existing ones
  if (!preserveExistingCombinations) {
    generateCombinations();
  }
}
