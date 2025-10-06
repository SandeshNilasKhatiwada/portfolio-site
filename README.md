# Sandesh Nilas Khatiwada - Portfolio Website

A modern, responsive personal portfolio and resume website built with Jekyll, featuring a bold orange and black theme with smooth animations and modern typography.

## 🎨 Design Features

- **Theme Colors:** Orange (#FF7A00), Black (#0A0A0A), White (#FFFFFF), Gray (#F5F5F5)
- **Typography:**
  - Headings: Playfair Display (italic)
  - Body Text: Helvetica Neue
  - Accent: Helvetica Neue Medium
- **Layout:** Single-page responsive design with smooth scrolling navigation
- **Animations:** Fade-in on scroll, hover effects, and smooth transitions

## 📁 Project Structure

```
├── _includes/          # Reusable HTML components
│   ├── header.html
│   ├── hero.html
│   ├── about.html
│   ├── services.html
│   ├── experience.html
│   ├── portfolio.html
│   ├── contact.html
│   └── footer.html
├── _layouts/           # Page layouts
│   └── default.html
├── _data/              # YAML data files
│   ├── services.yml
│   ├── experience.yml
│   └── projects.yml
├── _scss/              # SCSS partials
│   ├── _variables.scss
│   ├── _base.scss
│   ├── _header.scss
│   ├── _hero.scss
│   ├── _services.scss
│   ├── _experience.scss
│   ├── _about.scss
│   ├── _portfolio.scss
│   ├── _contact.scss
│   └── _footer.scss
├── assets/
│   ├── css/
│   │   └── main.scss
│   ├── js/
│   │   └── main.js
│   └── images/
├── _config.yml
├── index.html
└── Gemfile
```

## 🚀 Getting Started

### Prerequisites

- Ruby (version 2.7.0 or higher)
- Bundler gem

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sandesh-nilas/portfolio-website.git
   cd portfolio-website
   ```

2. Install dependencies:

   ```bash
   bundle install
   ```

3. Add your profile images:

   - Add your profile photo as `assets/images/profile.jpg`
   - Add your about section image as `assets/images/about-image.jpg`
   - Add portfolio project images in `assets/images/`

4. Customize content:

   - Update `_data/services.yml` with your services
   - Update `_data/experience.yml` with your work history
   - Update `_data/projects.yml` with your portfolio projects
   - Modify `_config.yml` with your information

5. Run the development server:

   ```bash
   bundle exec jekyll serve
   ```

6. Open your browser and navigate to `http://localhost:4000`

## 📝 Customization

### Adding/Editing Content

#### Services

Edit `_data/services.yml` to add or modify your services:

```yaml
- title: "Your Service"
  icon: "icon-name" # font-awesome icon class
  description: "Description of your service"
```

#### Work Experience

Edit `_data/experience.yml` to update your work history:

```yaml
- title: "Job Title"
  company: "Company Name"
  period: "Start Year – End Year"
  description: "Job description and responsibilities"
```

#### Portfolio Projects

Edit `_data/projects.yml` to showcase your work:

```yaml
- title: "Project Name"
  description: "Project description"
  image: "project-image.jpg" # Place image in assets/images/
  tags: ["Tech1", "Tech2", "Tech3"]
  url: "https://project-url.com"
```

### Styling

All styles are organized in SCSS partials within the `_scss/` directory. Main variables are defined in `_variables.scss` for easy customization.

### Colors

To change the color scheme, modify the CSS variables in `_scss/_variables.scss`:

```scss
:root {
  --primary-color: #ff7a00; // Orange
  --secondary-color: #0a0a0a; // Black
  --white-color: #ffffff; // White
  --gray-color: #f5f5f5; // Light Gray
}
```

## 📱 Responsive Design

The website is fully responsive and optimized for:

- Desktop (1200px+)
- Tablet (768px - 1024px)
- Mobile (320px - 767px)

## 🎯 Features

- [x] Responsive design
- [x] Smooth scrolling navigation
- [x] Animated sections on scroll
- [x] Mobile-friendly hamburger menu
- [x] Contact form (ready for backend integration)
- [x] SEO optimized
- [x] Performance optimized
- [x] Modern CSS Grid and Flexbox layouts
- [x] Hover effects and micro-interactions

## 📧 Contact Form Integration

The contact form is ready for integration with services like:

- [Formspree](https://formspree.io/)
- [Netlify Forms](https://www.netlify.com/products/forms/)
- [Getform](https://getform.io/)

## 🚀 Deployment

### GitHub Pages

1. Push your code to a GitHub repository
2. Go to repository Settings > Pages
3. Select source branch (usually `main` or `gh-pages`)
4. Your site will be available at `https://username.github.io/repository-name`

### Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `bundle exec jekyll build`
3. Set publish directory: `_site`
4. Deploy!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 👨‍💻 Author

**Sandesh Nilas Khatiwada**

- Email: sandeshnilaskhatiwada@gmail.com
- LinkedIn: [linkedin.com/in/sandesh-nilas-khatiwada](https://linkedin.com/in/sandesh-nilas-khatiwada)
- GitHub: [github.com/sandesh-nilas](https://github.com/sandesh-nilas)

---

⭐ Star this repository if you found it helpful!
