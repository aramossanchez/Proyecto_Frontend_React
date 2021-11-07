import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Containers/Home/Home';
import Header from './Components/Header/Header';
import Perfil from './Containers/Perfil/Perfil';
import Peliculas from './Containers/Peliculas/Peliculas';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        
        <Header />

        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/peliculas" element={<Peliculas />} />

        </Routes>

      </BrowserRouter>
      
    </div>
  );
}

export default App;
