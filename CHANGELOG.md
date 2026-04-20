# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-04-20

### Initial Release

#### Added
- **Core Features**
  - LCH color space palette generation with 11 colors
  - Hue shifting algorithm for natural color progressions
  - Undertone control (warm/cool adjustments)
  - Lightness range control (0-100)
  - Base color selection with color picker
  
- **Presentation Modes**
  - Bars mode: Classic horizontal color bars
  - Gradients mode: Smooth color transitions
  - Circles mode: Circular dot presentation
  
- **Color Combinations**
  - Automatic 2-color combinations (12 variations)
  - Automatic 3-color combinations (12 variations)
  - Automatic 4-color combinations (12 variations)
  - Shuffle functionality for each combination type
  
- **Persistence & Sharing**
  - Share via URL with base64-encoded state
  - Download palette as JSON file
  - Load palette from JSON file
  - URL parameter restoration on page load
  
- **UI Features**
  - Light/Dark theme toggle with localStorage persistence
  - Swap lightness progression button
  - Swap undertone progression button
  - Randomize color button
  - Randomize all parameters button
  - Fullscreen mode (Enter key)
  - Click to copy color values
  - Live slider value displays
  
- **Documentation**
  - Comprehensive user guide (readme.md)
  - Technical documentation with module flows (technical.md)
  - LCH color space deep dive (lch-guide.md)
  - Documentation page with markdown rendering
  - Mermaid diagram support
  - Syntax highlighting for code blocks
  - Light/Dark theme for documentation
  
- **Architecture**
  - Modular JavaScript structure (7 modules)
  - Clean separation of concerns
  - No build process required
  - No external dependencies (except documentation libs)
  - ~1,200 lines of JavaScript
  - ~700 lines of CSS

#### Technical Details
- **Color Conversions:** LCH ↔ LAB ↔ XYZ ↔ RGB ↔ HSL ↔ HEX
- **Browser Support:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Dependencies:** marked.js, mermaid.js, highlight.js, DOMPurify, typeset.js (docs only)

### Credits
- Concept & Development: ddelcourt
- Inspiration: George Francis (Codrops article on LCH color)
- Design: Swiss typography principles

---

## Future Releases

### [Unreleased]

#### Planned Features
- Export combinations as CSS variables
- WCAG contrast ratio calculations
- Palette history/undo functionality
- Named palette presets
- Export as ASE/ACO files for Adobe applications
- Color blindness simulation modes
- Keyboard shortcuts for common actions
- Mobile app version (PWA)

[1.0.0]: https://github.com/yourusername/lch-palette-generator/releases/tag/v1.0.0
