# Verdura Fine Jewelry - Shopify Theme

A luxury jewelry Shopify theme inspired by Verdura Fine Jewelry, featuring elegant design, video backgrounds, and sophisticated product showcases.

## Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Video Hero Section**: Eye-catching homepage hero with video background support
- **Product Collection Selector**: Interactive product category navigation
- **Elegant Typography**: Uses Playfair Display and Montserrat fonts
- **Image Galleries**: Beautiful product and Instagram image displays
- **Newsletter Integration**: Built-in newsletter signup functionality
- **SEO Optimized**: Structured data and meta tags included
- **Accessible**: WCAG compliant design elements

## Theme Structure

```
verdura-shopify-theme/
├── assets/                 # CSS, JS, and image files
│   ├── base.css           # Base styles and utilities
│   └── global.js          # JavaScript functionality
├── config/                # Theme configuration
│   └── settings_schema.json
├── layout/                # Layout templates
│   └── theme.liquid       # Main layout file
├── sections/              # Reusable sections
│   ├── groups/           # Section groups
│   ├── header.liquid     # Site header
│   ├── footer.liquid     # Site footer
│   ├── hero-video.liquid # Hero video section
│   ├── collection-selector.liquid
│   ├── zodiac-banner.liquid
│   ├── new-arrivals.liquid
│   ├── heritage-section.liquid
│   └── visit-gallery.liquid
├── snippets/             # Reusable code snippets
│   └── meta-tags.liquid # SEO meta tags
└── templates/            # Page templates
    └── index.liquid      # Homepage template
```

## Installation

1. **Download the theme files** to your local machine

2. **Create a ZIP file** of the theme folder:
   ```bash
   zip -r verdura-theme.zip verdura-shopify-theme/
   ```

3. **Upload to Shopify**:
   - Go to your Shopify Admin
   - Navigate to Online Store > Themes
   - Click "Upload theme"
   - Select the ZIP file
   - Click "Upload"

4. **Activate the theme**:
   - Click "Actions" > "Publish" on the uploaded theme

## Configuration

### 1. Theme Settings
Access theme settings through **Online Store > Themes > Customize**:

- **Colors**: Customize brand colors and accents
- **Typography**: Select fonts for headings and body text
- **Layout**: Adjust page width and spacing
- **Product Cards**: Configure product display options

### 2. Header Configuration
- Upload your logo image
- Configure main navigation menu
- Set up collection and featured collection menus
- Customize announcement bar text and colors

### 3. Homepage Sections

#### Hero Video Section
- Upload background video (MP4 format recommended)
- Set fallback background image
- Configure overlay opacity
- Add call-to-action button

#### Collection Selector
- Add up to 5 product collections
- Each collection shows 4 featured products
- Automatic product grid generation

#### New Arrivals
- Select a product collection
- Configure number of products to show (3-12)
- Enable/disable navigation arrows

### 4. Footer Configuration
- Set up newsletter signup
- Add Instagram feed images
- Configure contact information
- Set social media links

## Content Management

### Product Collections
1. Create collections in **Products > Collections**
2. Add products to collections
3. Use collection selector section to showcase them

### Blog Articles
1. Create blog posts in **Online Store > Blog Posts**
2. Add featured images for better social sharing
3. Use categories and tags for organization

### Pages
Create additional pages in **Online Store > Pages**:
- About/Heritage page
- Contact page
- Customer service/FAQ
- Gallery/Visit page

## Customization

### CSS Customization
Edit `assets/base.css` to modify:
- Colors and fonts
- Layout and spacing
- Button styles
- Animation effects

### JavaScript Functionality
Edit `assets/global.js` to modify:
- Mobile menu behavior
- Cart functionality
- Form validation
- Scroll animations

### Adding New Sections
1. Create new `.liquid` file in `sections/` folder
2. Add schema configuration at the bottom
3. Include in templates using `{% section 'section-name' %}`

## SEO Features

- Structured data for products and organization
- Open Graph and Twitter Card meta tags
- Optimized image alt texts
- Semantic HTML structure
- Fast loading times

## Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Optimized images with responsive sizing
- Lazy loading for images
- Minimal JavaScript bundle
- CSS optimization
- Font optimization

## Support

For theme support and customization:
- Review Shopify's [theme development documentation](https://shopify.dev/themes)
- Check [Liquid template language reference](https://shopify.github.io/liquid/)
- Consult [Shopify Partner Academy](https://partners.shopify.com/academy)

## License

This theme is created for educational and demonstration purposes. Please ensure you have proper licensing for any commercial use.

## Credits

- Fonts: Google Fonts (Playfair Display, Montserrat)
- Inspired by: Verdura Fine Jewelry website design
- Built with: Shopify Liquid, CSS3, JavaScript ES6
