# LCH Palette Generator

A perceptually uniform color palette generator built with the LCH color space. Create harmonious color schemes with precise control over lightness, chroma, and hue progression.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)

## Features

- **Perceptually Uniform** — LCH color space ensures consistent perceived color differences
- **Hue Shifting** — Intelligent hue progression creates natural color transitions
- **Undertone Control** — Fine-tune warm/cool character across the palette
- **Multiple Presentations** — View combinations as bars, gradients, or circular dots
- **Shareable URLs** — Share palettes via base64-encoded URL parameters
- **Save/Load** — Export and import palettes as JSON files
- **Modular Architecture** — Clean separation of concerns across 7 JavaScript modules
- **Light/Dark Themes** — Interface and documentation support both themes

## Demo

[View Live Demo](https://labs.delcourt.ch/lch-palette-generator/)

## Quick Start

### Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/lch-palette-generator.git
cd lch-palette-generator
```

### Running Locally

Simply open `index.html` in a modern web browser. No build process or dependencies required.

```bash
open index.html
# or
python -m http.server 8000
# then visit http://localhost:8000
```

## Usage

1. **Choose Base Color** — Select a starting color with the color picker
2. **Adjust Parameters:**
   - Hue Step: Control angular distance between palette colors (1-45°)
   - Lightness Range: Set minimum and maximum lightness (0-100)
   - Undertones: Adjust warm/cool progression (-30 to +30)
3. **Generate Combinations** — View 2, 3, and 4-color harmonies
4. **Share or Save** — Export via URL or download as JSON

### Keyboard Shortcuts

- `Enter` — Toggle fullscreen mode

## Documentation

Comprehensive documentation available at `docs.html`:

- **[Read Me](docs.html?page=readme)** — User guide and quick start
- **[Technical Documentation](docs.html?page=technical)** — Module architecture and API reference
- **[LCH Color Space Guide](docs.html?page=lch-guide)** — Color theory deep dive

## Project Structure

```
lch-palette-generator/
├── index.html              # Main application
├── docs.html               # Documentation page
├── documentation/          # Markdown documentation files
│   ├── readme.md
│   ├── technical.md
│   └── lch-guide.md
├── js/                     # JavaScript modules
│   ├── config.js           # Configuration & globals
│   ├── colorUtils.js       # Color space conversions
│   ├── paletteGenerator.js # Palette generation algorithms
│   ├── combinations.js     # Combination generation & rendering
│   ├── uiControls.js       # UI interaction handlers
│   ├── persistence.js      # Save/load/share functionality
│   ├── app.js              # Application initialization
│   └── docs.js             # Documentation renderer
├── style/                  # Stylesheets
│   ├── styles.css          # Main application styles
│   └── docs.css            # Documentation styles
└── lib/                    # Third-party libraries
    ├── marked.min.js
    ├── mermaid.min.js
    ├── highlight.min.js
    ├── purify.min.js
    └── typeset.js
```

## Architecture

Built with a modular JavaScript architecture (no frameworks):

```
config.js → colorUtils.js → paletteGenerator.js → combinations.js → uiControls.js → persistence.js → app.js
```

Each module handles a specific concern:

1. **config.js** (30 lines) — Configuration and global state
2. **colorUtils.js** (175 lines) — Color space conversions (LCH ↔ RGB ↔ HSL ↔ HEX)
3. **paletteGenerator.js** (125 lines) — Palette generation with hue shifting
4. **combinations.js** (479 lines) — Combination generation and rendering
5. **uiControls.js** (230 lines) — User interface interactions
6. **persistence.js** (152 lines) — Save, load, and share functionality
7. **app.js** (48 lines) — Application initialization and event binding

See [Technical Documentation](docs.html?page=technical) for detailed module flows and API reference.

## Color Science

### Why LCH?

LCH (Lightness, Chroma, Hue) provides perceptual uniformity that traditional RGB and HSL lack:

- Equal numeric changes = equal perceived changes
- Predictable color progression for gradients
- Better interpolation between colors
- Scientifically-based color relationships

### Conversion Pipeline

```
LCH → LAB → XYZ → RGB → HEX
```

All conversions use D65 illuminant and sRGB color space with proper gamma correction.

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Required features:** ES6 syntax, CSS custom properties, Flexbox/Grid, Clipboard API, localStorage

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Future Enhancements

- [ ] Export combinations as CSS variables
- [ ] WCAG contrast ratio calculations
- [ ] Palette history/undo
- [ ] Named palette presets
- [ ] Export as ASE/ACO files for Adobe apps
- [ ] Color blindness simulation

## Credits

**Concept & Development:** [ddelcourt](https://github.com/yourusername) — 2026

**Inspiration:** [Coloring with Code: A Programmatic Approach to Design](https://tympanus.net/codrops/2021/12/07/coloring-with-code-a-programmatic-approach-to-design/) by George Francis

**Color Science:** CIE L\*C\*h° color space specification

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- George Francis for the foundational color theory article
- Swiss typography principles for documentation design
- The web standards community for LCH color space advocacy

---

**[Live Demo](https://labs.delcourt.ch/lch-palette-generator/)** | **[Documentation](docs.html)** | **[Report Bug](https://github.com/yourusername/lch-palette-generator/issues)** | **[Request Feature](https://github.com/yourusername/lch-palette-generator/issues)**
