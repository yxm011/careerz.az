# Careerz.az - Career Exploration Through Job Simulators

A modern career exploration platform for Azerbaijan - like Forage but for Azerbaijan. Students can explore careers and prepare for jobs through hundreds of free virtual work simulations designed by top employers.

## Features

- 🎨 Modern, beautiful UI with TailwindCSS
- 📱 Fully responsive design
- 🎯 200+ job simulators across multiple industries
- 💼 Virtual work experiences from real companies
- 🏆 Earn certificates upon completion
- 📊 Explore career paths (Tech, Finance, Marketing, etc.)
- 🚀 Completely free for students

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
```

## Deployment to GitHub Pages

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it whatever you like (e.g., `careerz-website`)
3. Don't initialize with README (we already have files)

### Step 2: Push Code to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Careerz.az website"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Deploy to GitHub Pages

```bash
# Install gh-pages if not already installed
npm install --save-dev gh-pages

# Deploy
npm run deploy
```

### Step 4: Configure Custom Domain (careerz.az)

1. **In GitHub Repository Settings:**
   - Go to your repository on GitHub
   - Click "Settings" → "Pages"
   - Under "Custom domain", enter: `careerz.az`
   - Click "Save"

2. **Configure DNS at your domain registrar:**
   
   Add the following DNS records for careerz.az:

   **A Records (for apex domain):**
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

   **CNAME Record (for www subdomain):**
   ```
   www.careerz.az → YOUR_USERNAME.github.io
   ```

3. **Wait for DNS propagation** (can take 24-48 hours, but usually faster)

4. **Enable HTTPS:**
   - After DNS propagates, go back to GitHub Pages settings
   - Check "Enforce HTTPS"

## Project Structure

```
careerz-az/
├── public/
│   ├── index.html
│   ├── manifest.json
│   ├── CNAME (for custom domain)
│   └── robots.txt
├── src/
│   ├── App.js (main component)
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
└── README.md
```

## Technologies Used

- **React** - UI framework
- **TailwindCSS** - Styling
- **Lucide React** - Icons
- **GitHub Pages** - Free hosting

## License

MIT License
