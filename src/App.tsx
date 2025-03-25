import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Button,
  ThemeProvider,
  createTheme,
  Paper,
  Grid2 as Grid,
  Typography,
  Switch,
  FormControlLabel,
  Snackbar,
  Alert,
} from '@mui/material';
import { ChromePicker, ColorResult } from 'react-color';
import { ContentCopy, Download, Contrast, Lightbulb, DarkMode } from '@mui/icons-material';
import chroma from 'chroma-js';
import { saveAs } from 'file-saver';
import Head from './components/Head';
import ProjectDescription from './components/ProjectDescription';

interface ColorDisplayProps {
  color: {
    light: string;
    main: string;
    dark: string;
    contrastText: string;
  };
  name: string;
}

const ColorDisplay: React.FC<ColorDisplayProps> = ({ color, name }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        {name.toUpperCase()}
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            sx={{
              bgcolor: color.light,
              color: chroma(color.light).luminance() > 0.4 ? '#000' : '#fff',
              p: 2,
              height: 100,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Box display="flex" alignItems="center">
              <Lightbulb fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="body2">light</Typography>
            </Box>
            <Typography variant="body2">{color.light}</Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            sx={{
              bgcolor: color.main,
              color: color.contrastText,
              p: 2,
              height: 100,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: color.main === '#ffffff' ? '1px solid #ddd' : 'none',
            }}
          >
            <Typography variant="body2">main</Typography>
            <Typography variant="body2">{color.main}</Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            sx={{
              bgcolor: color.dark,
              color: chroma(color.dark).luminance() > 0.4 ? '#000' : '#fff',
              p: 2,
              height: 100,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Box display="flex" alignItems="center">
              <DarkMode fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="body2">dark</Typography>
            </Box>
            <Typography variant="body2">{color.dark}</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Paper
        sx={{
          mt: 2,
          bgcolor: color.main,
          color: color.contrastText,
          p: 2,
          display: 'flex',
          alignItems: 'center',
          border: color.main === '#ffffff' ? '1px solid #ddd' : 'none',
        }}
      >
        <Contrast sx={{ mr: 1 }} />
        <Typography variant="body2">
          contrastText: {color.contrastText} (
          {chroma(color.contrastText).luminance() > 0.5 ? 'light' : 'dark'})
        </Typography>
      </Paper>
    </Box>
  );
};

const ThemeGenerator = () => {
  const [primaryColor, setPrimaryColor] = useState('#3f50b5');
  const [secondaryColor, setSecondaryColor] = useState('#f44336');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [showColorPicker, setShowColorPicker] = useState<'primary' | 'secondary' | null>(null);
  const pickerRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside color picker
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowColorPicker(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getContrastText = (color: string) => {
    const luminance = chroma(color).luminance();
    return luminance > 0.4 ? '#000000' : '#ffffff';
  };

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        light: chroma(primaryColor).brighten(0.4).hex(),
        main: primaryColor,
        dark: chroma(primaryColor).darken(0.4).hex(),
        contrastText: getContrastText(primaryColor),
      },
      secondary: {
        light: chroma(secondaryColor).brighten(0.4).hex(),
        main: secondaryColor,
        dark: chroma(secondaryColor).darken(0.4).hex(),
        contrastText: getContrastText(secondaryColor),
      },
      background: {
        default: mode === 'dark' ? '#121212' : '#f5f5f5',
        paper: mode === 'dark' ? '#1e1e1e' : '#ffffff',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
  });

  const handleColorChange = (color: ColorResult, type: 'primary' | 'secondary') => {
    if (type === 'primary') {
      setPrimaryColor(color.hex);
    } else {
      setSecondaryColor(color.hex);
    }
  };

  const copyThemeCode = () => {
    const themeCode = `import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: '${mode}',
    primary: {
      light: '${chroma(primaryColor).brighten(0.4).hex()}',
      main: '${primaryColor}',
      dark: '${chroma(primaryColor).darken(0.4).hex()}',
      contrastText: '${getContrastText(primaryColor)}',
    },
    secondary: {
      light: '${chroma(secondaryColor).brighten(0.4).hex()}',
      main: '${secondaryColor}',
      dark: '${chroma(secondaryColor).darken(0.4).hex()}',
      contrastText: '${getContrastText(secondaryColor)}',
    },
    background: {
      default: '${mode === 'dark' ? '#121212' : '#f5f5f5'}',
      paper: '${mode === 'dark' ? '#1e1e1e' : '#ffffff'}',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default theme;`;
    navigator.clipboard
      .writeText(themeCode)
      .then(() => {
        setOpenSnackbar(true);
      })
      .catch((err) => {
        console.error('Failed to copy:', err);
      });
  };

  const exportTheme = () => {
    const themeCode = `import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: '${mode}',
    primary: {
      light: '${chroma(primaryColor).brighten(0.4).hex()}',
      main: '${primaryColor}',
      dark: '${chroma(primaryColor).darken(0.4).hex()}',
      contrastText: '${getContrastText(primaryColor)}',
    },
    secondary: {
      light: '${chroma(secondaryColor).brighten(0.4).hex()}',
      main: '${secondaryColor}',
      dark: '${chroma(secondaryColor).darken(0.4).hex()}',
      contrastText: '${getContrastText(secondaryColor)}',
    },
    background: {
      default: '${mode === 'dark' ? '#121212' : '#f5f5f5'}',
      paper: '${mode === 'dark' ? '#1e1e1e' : '#ffffff'}',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default theme;`;

    const blob = new Blob([themeCode], { type: 'text/javascript' });
    saveAs(blob, 'mui-theme.tsx');
  };

  return (
    <ThemeProvider theme={theme}>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          Copied to clipboard!
        </Alert>
      </Snackbar>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', p: 3 }}>
        <Head />
        <ProjectDescription />
        {/* Color Picker Modal */}
        {showColorPicker && (
          <Box
            ref={pickerRef}
            sx={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1300,
              bgcolor: 'background.paper',
              p: 3,
              borderRadius: 2,
              boxShadow: 24,
            }}
          >
            <ChromePicker
              color={showColorPicker === 'primary' ? primaryColor : secondaryColor}
              onChange={(color) => handleColorChange(color, showColorPicker)}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() => setShowColorPicker(null)}
            >
              Close
            </Button>
          </Box>
        )}

        {/* Color Selection */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Button
              fullWidth
              variant="contained"
              sx={{
                bgcolor: primaryColor,
                '&:hover': { bgcolor: primaryColor },
                color: getContrastText(primaryColor),
                height: 60,
                fontSize: '1.1rem',
                border: primaryColor === '#ffffff' ? '1px solid #ddd' : 'none',
              }}
              onClick={(e) => {
                e.stopPropagation();
                setShowColorPicker('primary');
              }}
            >
              {primaryColor === '#ffffff' ? 'White (with border)' : 'Primary Color'}
            </Button>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Button
              fullWidth
              variant="contained"
              sx={{
                bgcolor: secondaryColor,
                '&:hover': { bgcolor: secondaryColor },
                color: getContrastText(secondaryColor),
                height: 60,
                fontSize: '1.1rem',
                border: secondaryColor === '#ffffff' ? '1px solid #ddd' : 'none',
              }}
              onClick={(e) => {
                e.stopPropagation();
                setShowColorPicker('secondary');
              }}
            >
              {secondaryColor === '#ffffff' ? 'White (with border)' : 'Secondary Color'}
            </Button>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={mode === 'dark'}
                  onChange={() => setMode(mode === 'light' ? 'dark' : 'light')}
                />
              }
              label={
                <Typography color="text.primary">
                  {`${mode === 'light' ? 'Light' : 'Dark'} Mode`}
                </Typography>
              }
              sx={{ color: 'text.primary' }}
            />
          </Grid>
        </Grid>

        {/* Color Palette Display */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Color Palette
          </Typography>

          <ColorDisplay
            color={{
              light: chroma(primaryColor).brighten(0.4).hex(),
              main: primaryColor,
              dark: chroma(primaryColor).darken(0.4).hex(),
              contrastText: getContrastText(primaryColor),
            }}
            name="Primary"
          />

          <ColorDisplay
            color={{
              light: chroma(secondaryColor).brighten(0.4).hex(),
              main: secondaryColor,
              dark: chroma(secondaryColor).darken(0.4).hex(),
              contrastText: getContrastText(secondaryColor),
            }}
            name="Secondary"
          />
        </Paper>

        {/* Theme Code */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Theme Code
          </Typography>
          <Box
            component="pre"
            sx={{
              p: 2,
              bgcolor: 'background.paper',
              borderRadius: 1,
              overflowX: 'auto',
              mb: 2,
            }}
          >
            {`import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: '${mode}',
    primary: {
      light: '${chroma(primaryColor).brighten(0.4).hex()}',
      main: '${primaryColor}',
      dark: '${chroma(primaryColor).darken(0.4).hex()}',
      contrastText: '${getContrastText(primaryColor)}',
    },
    secondary: {
      light: '${chroma(secondaryColor).brighten(0.4).hex()}',
      main: '${secondaryColor}',
      dark: '${chroma(secondaryColor).darken(0.4).hex()}',
      contrastText: '${getContrastText(secondaryColor)}',
    },
    background: {
      default: '${mode === 'dark' ? '#121212' : '#f5f5f5'}',
      paper: '${mode === 'dark' ? '#1e1e1e' : '#ffffff'}',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default theme;`}
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" startIcon={<ContentCopy />} onClick={copyThemeCode}>
              Copy Code
            </Button>
            <Button variant="outlined" startIcon={<Download />} onClick={exportTheme}>
              Export Theme
            </Button>
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default ThemeGenerator;
