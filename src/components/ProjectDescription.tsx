import { Alert, Box, Typography, useTheme, Chip } from '@mui/material';
import { Info, Code, Palette, Contrast } from '@mui/icons-material';

const ProjectDescription = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        mb: 4,
        p: 3,
        borderRadius: 1,
        bgcolor: 'background.paper',
        borderLeft: '4px solid',
        borderColor: 'primary.main',
        boxShadow:
          theme.palette.mode === 'dark' ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{ display: 'flex', alignItems: 'center', color: 'text.primary' }}
      >
        <Info color="primary" sx={{ mr: 1 }} />
        MUI Theme Generator
      </Typography>

      <Typography sx={{ color: 'text.primary' }}>
        Create <strong>custom Material-UI themes</strong> in seconds! This tool helps you:
      </Typography>

      <Box
        component="ul"
        sx={{
          paddingLeft: '24px',
          marginTop: 0,
          '& .MuiTypography-root': {
            color: 'text.primary',
          },
        }}
      >
        <li>
          <Typography>
            🎨 <strong>Visualize colors</strong> with automatic light/dark variants
          </Typography>
        </li>
        <li>
          <Typography>
            ⚡️ <strong>Generate theme code</strong> ready for your React project
          </Typography>
        </li>
        <li>
          <Typography>
            🌓 <strong>Preview in both modes</strong> (light/dark) simultaneously
          </Typography>
        </li>
        <li>
          <Typography>
            📋 <strong>One-click copy</strong> or export as JS file
          </Typography>
        </li>
      </Box>

      {/* System Requirements Section */}
      <Box sx={{ mt: 3, mb: 2 }}>
        <Typography
          variant="subtitle1"
          sx={{ display: 'flex', alignItems: 'center', mb: 1, color: 'text.primary' }}
        >
          <Code color="secondary" sx={{ mr: 1 }} />
          <strong>System Requirements:</strong>
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <Chip
            icon={<Palette fontSize="small" />}
            label="Material-UI v5+"
            size="small"
            color="success"
            variant="outlined"
          />
          <Chip
            icon={<Contrast fontSize="small" />}
            label="React 16.8+"
            size="small"
            color="success"
            variant="outlined"
          />
          <Chip label="TypeScript 4.0+" size="small" variant="outlined" />
          <Chip label="@emotion/react" size="small" variant="outlined" />
          <Chip label="@emotion/styled" size="small" variant="outlined" />
        </Box>
      </Box>

      <Alert
        severity="info"
        sx={{
          mt: 2,
          bgcolor: theme.palette.mode === 'dark' ? 'rgba(2, 136, 209, 0.2)' : undefined,
          '& .MuiAlert-message': {
            width: '100%',
          },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography>
            <strong>How to use:</strong>
          </Typography>
          <ol style={{ marginTop: 4, marginBottom: 0, paddingLeft: 24 }}>
            <li>Select your primary/secondary colors</li>
            <li>Toggle between light/dark modes</li>
            <li>Copy or export the generated theme</li>
            <li>
              Paste into your{' '}
              <Box
                component="code"
                sx={{
                  bgcolor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.05)',
                  p: '2px 4px',
                  borderRadius: 1,
                  fontFamily: 'monospace',
                }}
              >
                createTheme()
              </Box>{' '}
              configuration
            </li>
          </ol>
        </Box>
      </Alert>

      <Typography
        variant="body2"
        sx={{
          mt: 2,
          fontStyle: 'italic',
          color: 'text.secondary',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Info color="secondary" sx={{ mr: 1, fontSize: 16 }} />
        Note: This tool uses Chroma.js for color calculations and FileSaver.js for exports.
      </Typography>
    </Box>
  );
};

export default ProjectDescription;
