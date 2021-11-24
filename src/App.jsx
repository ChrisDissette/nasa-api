import Photo from './components/Photo'
import Mars from './components/Mars'

import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    primary: {
      main: '#B1D4E0',
    },
    secondary: {
      main: '#0C2D48',
    },
  },
});

theme = responsiveFontSizes(theme)

function App() {
  return (
    <div className="container">
      <ThemeProvider theme={theme}>
        <Photo />
      </ThemeProvider>
    </div>
  );
}

export default App;
