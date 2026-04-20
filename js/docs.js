// ============================================================================
// DOCUMENTATION RENDERER
// Loads and renders markdown documentation with mermaid support
// ============================================================================

// Configure marked.js
marked.setOptions({
  breaks: true,
  gfm: true,
  headerIds: true,
  mangle: false
});

// Configure mermaid
mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  securityLevel: 'loose',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif'
});

// Get page parameter from URL
function getPageParameter() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('page') || 'readme';
}

// Load markdown file
async function loadMarkdown(page) {
  try {
    const response = await fetch(`documentation/${page}.md`);
    if (!response.ok) {
      throw new Error(`Failed to load ${page}.md`);
    }
    const markdown = await response.text();
    return markdown;
  } catch (error) {
    console.error('Error loading markdown:', error);
    return `# Error\n\nFailed to load documentation page: ${page}`;
  }
}

// Render markdown content
async function renderMarkdown(markdown) {
  // Parse markdown to HTML
  let html = marked.parse(markdown);
  
  // Sanitize HTML
  html = DOMPurify.sanitize(html);
  
  // Insert into content div
  const contentDiv = document.getElementById('content');
  contentDiv.innerHTML = html;
  
  // Apply syntax highlighting
  contentDiv.querySelectorAll('pre code').forEach((block) => {
    hljs.highlightElement(block);
  });
  
  // Render mermaid diagrams
  const mermaidElements = contentDiv.querySelectorAll('.language-mermaid, code.language-mermaid');
  mermaidElements.forEach((element, index) => {
    const code = element.textContent;
    const pre = element.closest('pre');
    
    if (pre) {
      const div = document.createElement('div');
      div.className = 'mermaid';
      div.textContent = code;
      pre.replaceWith(div);
    }
  });
  
  // Initialize mermaid
  await mermaid.run({
    querySelector: '.mermaid'
  });
  
  // Apply typographic refinements
  if (typeof typeset !== 'undefined') {
    typeset(contentDiv);
  }
}

// Initialize documentation
async function initDocs() {
  const page = getPageParameter();
  const markdown = await loadMarkdown(page);
  await renderMarkdown(markdown);
  
  // Update page title
  const firstHeading = document.querySelector('.docs-content h1');
  if (firstHeading) {
    document.title = `${firstHeading.textContent} — LCH Palette Generator`;
  }
}

// Theme toggle
function toggleDocsTheme() {
  const root = document.documentElement;
  const themeButton = document.querySelector('.theme-toggle');
  
  if (root.classList.contains('dark-theme')) {
    root.classList.remove('dark-theme');
    themeButton.textContent = 'Dark Mode';
    localStorage.setItem('docsTheme', 'light');
  } else {
    root.classList.add('dark-theme');
    themeButton.textContent = 'Light Mode';
    localStorage.setItem('docsTheme', 'dark');
  }
  
  // Re-render mermaid diagrams with new theme
  setTimeout(() => {
    mermaid.run({
      querySelector: '.mermaid'
    });
  }, 100);
}

// Load saved theme
function loadDocsTheme() {
  const savedTheme = localStorage.getItem('docsTheme');
  const root = document.documentElement;
  const themeButton = document.querySelector('.theme-toggle');
  
  if (savedTheme === 'dark') {
    root.classList.add('dark-theme');
    themeButton.textContent = 'Light Mode';
  }
}

// Run on page load
window.addEventListener('DOMContentLoaded', () => {
  loadDocsTheme();
  initDocs();
});
