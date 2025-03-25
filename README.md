<a name="readme-top"></a>
# MUI Theme Generator 🎨

A powerful Material-UI theme generator with real-time preview and export capabilities. Create perfect color palettes for your React applications in seconds.

## Features ✨

- 🎨 **Interactive Color Picker** - Visually select primary and secondary colors
- 🌓 **Dark/Light Mode** - Preview themes in both color schemes
- 📋 **Automatic Code Generation** - Get ready-to-use theme configuration
- 💾 **Multiple Export Options** - Copy to clipboard or download as JS file
- 🚀 **React 19 & MUI 6 Ready** - Built with the latest technologies

## Project Structure 📂

```
src/
├── assets/               # Static assets and images
├── components/           # Reusable components
│   ├── Head.tsx          # Document head component
│   └── ProjectDescription.tsx # Project intro component
├── App.tsx               # Main application component
├── main.tsx              # Application entry point
└── vite-env.d.ts         # TypeScript declarations
```

## Installation 💻

```bash
# Clone the repository
git clone https://github.com/azael1412/mui-palette-generator.git

# Navigate to project directory
cd mui-palette-generator

# Install dependencies
npm install

# Start development server
npm run dev
```

## Usage 🖱️

1. Select your primary and secondary colors
2. Toggle between light/dark mode previews
3. Copy the generated theme code or export as a file
4. Implement in your project:

```tsx
// Paste this in your theme configuration
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f50b5',
      light: '#757ce8',
      dark: '#002884',
      contrastText: '#fff'
    },
    // Generated configuration
  }
});
```

## Dependencies 🧩

### Core
- React 19
- Material-UI (MUI) 6
- TypeScript 5
- Chroma.js (color calculations)
- FileSaver (file exports)

### Development
- Vite (build tool)
- ESLint (code linting)
- Prettier (code formatting)

## Contributing 🤝

We welcome contributions! Please follow these steps:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- ## License 📄

This project is licensed under the [MIT License](LICENSE).

--- -->

⭐ If you find this project useful, please give it a star!  
🐛 Found an issue? [Report it here](https://github.com/azael1412/mui-palette-generator/issues).

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>