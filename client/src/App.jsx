import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { GlobalStyle, theme } from './GlobalStyles';
import { LandingPage, NavBar } from './components';
import { Tickets } from './components';
import './app.css';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <CssBaseline />
      <Router>
        <NavBar />
        <Container maxWidth='lg'>
          <LandingPage />
        </Container>
        <Switch>
          <Route path='/tickets' component={Tickets} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
