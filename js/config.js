// ============================================================================
// CONFIGURATION - Base URL for Share Links
// ============================================================================
// 
// This constant determines the URL used when generating share links.
// 
// OPTION 1: Auto-detect (DEFAULT)
// Uses the current page URL automatically. Works anywhere but may not be clean.
// const BASE_URL = window.location.origin + window.location.pathname;
//
// OPTION 2: Manual (RECOMMENDED for production)
const BASE_URL = 'http://labs.delcourt.ch/lch/';
// Set your specific URL for cleaner, predictable share links.
// Uncomment ONE of these examples and customize:
//
// const BASE_URL = 'https://yoursite.com/palette.html';
// const BASE_URL = 'https://yourusername.github.io/color-palette/';
// const BASE_URL = 'https://colors.yoursite.com/';
// const BASE_URL = 'http://localhost:8000/palette.html'; // For local testing
//
// IMPORTANT: 
// - Include the full path to the HTML file
// - Do NOT include a trailing slash if pointing to a file
// - DO include a trailing slash if pointing to a directory with index.html
// - Test the URL before sharing to ensure it loads correctly
//
// ============================================================================

// Global state variables
let notificationTimeout = null;
