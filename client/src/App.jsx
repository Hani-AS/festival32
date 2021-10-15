import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './GlobalStyles';
import {
  LandingPage,
  SuccessPage,
  NavBar,
  Loading,
  PayButton,
  Tickets,
  Profile,
  Protected,
  GuestForm,
  Footer,
  Schedule,
} from './components';
import './app.css';
import { GuestProvider } from './context/guestContext';

function App() {
  return (
    <GuestProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <NavBar />
          <Loading />
          <Container maxWidth='lg' style={{ paddingBottom: '250px' }}>
            <Switch>
              <Route exact path='/' component={LandingPage} />
              <Route exact path='/success' component={SuccessPage} />
              <Route exact path='/tickets' component={Tickets} />
              <Route exact path='/profile'>
                <Protected>
                  <Profile />
                </Protected>
              </Route>
              <Route exact path='/guestMode' component={GuestForm} />
              <Route exact path='/schedule' component={Schedule} />
            </Switch>
          </Container>
          <Footer />
        </Router>
        <PayButton />
      </ThemeProvider>
    </GuestProvider>
  );
}

export default App;
