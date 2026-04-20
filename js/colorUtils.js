// ============================================================================
// COLOR CONVERSION UTILITIES
// Functions for converting between different color spaces (LCH, RGB, HSL, HEX)
// ============================================================================

// LCH to RGB conversion
function lchToRgb(l, c, h) {
  // LCH to Lab
  const a = c * Math.cos(h * Math.PI / 180);
  const b = c * Math.sin(h * Math.PI / 180);

  // Lab to XYZ
  let fy = (l + 16) / 116;
  let fx = a / 500 + fy;
  let fz = fy - b / 200;

  const delta = 6 / 29;
  const xn = 0.95047;
  const yn = 1.00000;
  const zn = 1.08883;

  const fx3 = fx * fx * fx;
  const fy3 = fy * fy * fy;
  const fz3 = fz * fz * fz;

  const x = xn * (fx3 > delta * delta * delta ? fx3 : (fx - 16 / 116) / 7.787);
  const y = yn * (fy3 > delta * delta * delta ? fy3 : (fy - 16 / 116) / 7.787);
  const z = zn * (fz3 > delta * delta * delta ? fz3 : (fz - 16 / 116) / 7.787);

  // XYZ to RGB
  let r = x * 3.2406 + y * -1.5372 + z * -0.4986;
  let g = x * -0.9689 + y * 1.8758 + z * 0.0415;
  let blu = x * 0.0557 + y * -0.2040 + z * 1.0570;

  // Gamma correction
  r = r > 0.0031308 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : 12.92 * r;
  g = g > 0.0031308 ? 1.055 * Math.pow(g, 1 / 2.4) - 0.055 : 12.92 * g;
  blu = blu > 0.0031308 ? 1.055 * Math.pow(blu, 1 / 2.4) - 0.055 : 12.92 * blu;

  // Clamp to 0-255
  r = Math.max(0, Math.min(255, Math.round(r * 255)));
  g = Math.max(0, Math.min(255, Math.round(g * 255)));
  blu = Math.max(0, Math.min(255, Math.round(blu * 255)));

  return { r, g, b: blu };
}

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

function lchToHex(l, c, h) {
  const rgb = lchToRgb(l, c, h);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
}

// HEX to RGB conversion
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function rgbToLch(r, g, b) {
  // Normalize RGB
  r = r / 255;
  g = g / 255;
  b = b / 255;

  // RGB to XYZ
  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  const x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
  const y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.00000;
  const z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;

  // XYZ to Lab
  const fx = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x + 16 / 116);
  const fy = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y + 16 / 116);
  const fz = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z + 16 / 116);

  const L = 116 * fy - 16;
  const a = 500 * (fx - fy);
  const bVal = 200 * (fy - fz);

  // Lab to LCH
  const C = Math.sqrt(a * a + bVal * bVal);
  let H = Math.atan2(bVal, a) * 180 / Math.PI;
  if (H < 0) H += 360;

  return { l: L, c: C, h: H };
}

function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }

  const rVal = Math.round((r + m) * 255);
  const gVal = Math.round((g + m) * 255);
  const bVal = Math.round((b + m) * 255);

  return rgbToHex(rVal, gVal, bVal);
}
