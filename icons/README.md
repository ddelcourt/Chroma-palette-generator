# PWA Icons

This folder should contain your app icons in various sizes for PWA support.

## Required Icon Sizes

Please create PNG icons with the following dimensions and save them in this folder:

- **icon-72x72.png** - 72x72 pixels
- **icon-96x96.png** - 96x96 pixels
- **icon-128x128.png** - 128x128 pixels
- **icon-144x144.png** - 144x144 pixels
- **icon-152x152.png** - 152x152 pixels
- **icon-192x192.png** - 192x192 pixels
- **icon-384x384.png** - 384x384 pixels
- **icon-512x512.png** - 512x512 pixels (most important)

## Icon Design Tips

1. **512x512 is the most important** - This is used for splash screens and app installation
2. Use a **square** design that works well at small sizes
3. The icon should look good both with and without padding
4. For the 512x512 icon marked as "maskable", ensure important content stays within the safe zone (center 80% of the icon)
5. Use simple, recognizable shapes that represent your color palette generator

## Tools to Generate Icons

You can use these online tools to generate all sizes from a single source image:

- https://www.pwabuilder.com/imageGenerator
- https://realfavicongenerator.net/
- https://favicon.io/

## Quick Generation

If you have a 512x512 PNG ready, you can use ImageMagick to generate all sizes:

```bash
convert icon-512x512.png -resize 72x72 icon-72x72.png
convert icon-512x512.png -resize 96x96 icon-96x96.png
convert icon-512x512.png -resize 128x128 icon-128x128.png
convert icon-512x512.png -resize 144x144 icon-144x144.png
convert icon-512x512.png -resize 152x152 icon-152x152.png
convert icon-512x512.png -resize 192x192 icon-192x192.png
convert icon-512x512.png -resize 384x384 icon-384x384.png
```
