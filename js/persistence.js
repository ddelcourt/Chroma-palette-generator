// ============================================================================
// PERSISTENCE AND SHARING
// Functions for saving, loading, and sharing palettes
// ============================================================================

function copyToClipboard(text) {
  // Try modern clipboard API first (requires HTTPS)
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showNotification(text);
    }).catch(err => {
      console.error('Failed to copy:', err);
      fallbackCopyToClipboard(text);
    });
  } else {
    // Fallback for HTTP or older browsers
    fallbackCopyToClipboard(text);
  }
}

function getCurrentState() {
  return {
    version: "1.0",
    baseColor: document.getElementById('baseColor').value,
    hueStep: parseFloat(document.getElementById('hueStep').value),
    minLightness: parseFloat(document.getElementById('minLightness').value),
    maxLightness: parseFloat(document.getElementById('maxLightness').value),
    leftWarmth: parseFloat(document.getElementById('leftWarmth').value),
    rightWarmth: parseFloat(document.getElementById('rightWarmth').value),
    combinations: window.currentCombinations || null,
    activeTab: document.querySelector('.tab-button.active')?.textContent.toLowerCase() || 'bars'
  };
}

function loadState(state) {
  // Restore input values
  document.getElementById('baseColor').value = state.baseColor;
  document.getElementById('hueStep').value = state.hueStep;
  document.getElementById('minLightness').value = state.minLightness;
  document.getElementById('maxLightness').value = state.maxLightness;
  document.getElementById('leftWarmth').value = state.leftWarmth;
  document.getElementById('rightWarmth').value = state.rightWarmth;

  // Update slider displays
  updateSliderValue(document.getElementById('hueStep'));
  updateSliderValue(document.getElementById('minLightness'));
  updateSliderValue(document.getElementById('maxLightness'));
  updateSliderValue(document.getElementById('leftWarmth'));
  updateSliderValue(document.getElementById('rightWarmth'));

  // Regenerate palette
  generatePalette(true);

  // Restore combinations if they exist
  if (state.combinations) {
    restoreCombinations(state.combinations);
  }

  // Switch to saved tab
  if (state.activeTab === 'gradients') {
    switchTab('gradients');
  } else if (state.activeTab === 'dots') {
    switchTab('circles');
  } else {
    switchTab('bars');
  }
}

function copyShareLink() {
  const state = getCurrentState();
  const encoded = btoa(JSON.stringify(state));
  const url = BASE_URL + '#' + encoded;
  
  // Try modern clipboard API first (requires HTTPS)
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url).then(() => {
      showNotification('Share link copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy link:', err);
      fallbackCopyToClipboard(url);
    });
  } else {
    // Fallback for HTTP or older browsers
    fallbackCopyToClipboard(url);
  }
}

function fallbackCopyToClipboard(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  
  try {
    document.execCommand('copy');
    showNotification('Share link copied to clipboard!');
  } catch (err) {
    console.error('Fallback copy failed:', err);
    alert('Failed to copy. Link: ' + text);
  }
  
  document.body.removeChild(textarea);
}

function showNotification(message) {
  const notification = document.getElementById('copiedNotification');
  notification.textContent = message;
  
  if (notificationTimeout) {
    clearTimeout(notificationTimeout);
  }
  
  notification.classList.add('show');
  notificationTimeout = setTimeout(() => {
    notification.classList.remove('show');
    notificationTimeout = null;
  }, 4000);
}

function downloadJSON() {
  const state = getCurrentState();
  const json = JSON.stringify(state, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'color-palette-' + Date.now() + '.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function loadJSON() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'application/json';
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const state = JSON.parse(event.target.result);
          loadState(state);
          
          // Show success notification
          const notification = document.getElementById('copiedNotification');
          notification.textContent = 'Palette loaded successfully!';
          
          if (notificationTimeout) {
            clearTimeout(notificationTimeout);
          }
          
          notification.classList.add('show');
          notificationTimeout = setTimeout(() => {
            notification.classList.remove('show');
            notificationTimeout = null;
          }, 4000);
        } catch (err) {
          console.error('Failed to load JSON:', err);
          alert('Failed to load palette. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };
  input.click();
}

function loadFromURL() {
  if (window.location.hash) {
    try {
      const encoded = window.location.hash.slice(1);
      const state = JSON.parse(atob(encoded));
      loadState(state);
    } catch (err) {
      console.error('Failed to load from URL:', err);
    }
  }
}
