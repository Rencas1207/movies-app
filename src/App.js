import 'swiper/swiper.min.css';
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import './App.scss';

import { BrowserRouter, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Routes } from './config/Routes';
import { Footer } from './components/Footer/Footer';

import { HelmetProvider } from 'react-helmet-async';

function App() {
  // const

  return (
    <BrowserRouter>
      <Route
        render={(props) => (
          <HelmetProvider>
            <Header {...props} />
            <main>
              <Routes />
            </main>
            <Footer />
          </HelmetProvider>
        )}
      />
    </BrowserRouter>
  );
}

export default App;
