# Contributing to LCH Palette Generator

First off, thank you for considering contributing to LCH Palette Generator! It's people like you that make this tool better for everyone.

## Code of Conduct

Be respectful, constructive, and professional in all interactions.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the behavior
- **Expected behavior**
- **Actual behavior**
- **Screenshots** if applicable
- **Browser and version**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Clear title and description**
- **Use case** — why would this be useful?
- **Possible implementation** — if you have ideas

### Pull Requests

1. Fork the repo and create your branch from `main`
2. Make your changes
3. Test thoroughly in multiple browsers
4. Update documentation if needed
5. Ensure code follows existing style
6. Create a pull request

## Development Guidelines

### Code Style

- **JavaScript:** ES6 syntax, clear function names, comments for complex logic
- **CSS:** Use CSS custom properties, maintain existing naming conventions
- **HTML:** Semantic markup, accessibility considerations

### Module Structure

When adding functionality:

1. Identify the appropriate module (or create a new one if needed)
2. Maintain single responsibility principle
3. Document new functions with JSDoc-style comments
4. Update module dependency graph if needed

### Testing

- Test in Chrome, Firefox, and Safari
- Test light and dark themes
- Test with various screen sizes
- Test keyboard navigation
- Verify share links work correctly

### Documentation

- Update relevant `.md` files in `documentation/`
- Add mermaid diagrams for new complex flows
- Update README.md if adding features
- Keep documentation concise and clear (Swiss style)

## Project Philosophy

### Design Principles

- **Simplicity** — Keep UI minimal and focused
- **Performance** — No unnecessary dependencies or complexity
- **Accessibility** — Keyboard navigation, color contrast
- **Education** — Help users understand color theory

### Technical Principles

- **No build process** — Keep it simple, vanilla JavaScript
- **Modular** — Separation of concerns
- **Documented** — Code should be understandable
- **Tested** — Verify across browsers

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/lch-palette-generator.git
   ```

2. **Make changes** — Edit files in `js/`, `style/`, or `documentation/`

3. **Test locally** — Open `index.html` in browser

4. **Check documentation** — Verify `docs.html` renders correctly

5. **Commit with clear messages**
   ```bash
   git commit -m "Add feature: export as CSS variables"
   ```

## Areas We'd Love Help With

- **Accessibility improvements** — WCAG compliance, screen reader support
- **Color science features** — Contrast calculations, color blindness simulation
- **Export formats** — ASE/ACO for Adobe apps, GIMP palettes
- **Performance optimizations** — If you spot bottlenecks
- **Browser compatibility** — Testing on edge cases
- **Documentation** — Improvements, translations, examples

## Questions?

Feel free to open an issue with your question. We're here to help!

## Recognition

Contributors will be acknowledged in the README. Significant contributions may be highlighted in release notes.

---

Thank you for contributing! 🎨
