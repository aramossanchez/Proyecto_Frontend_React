import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Inicio from './Containers/Inicio/Inicio';
import TuZona from './Containers/TuZona/TuZona';
import Perfil from './Containers/Perfil/Perfil';
import Peliculas from './Containers/Peliculas/Peliculas';
import PeliculasDisponibles from './Containers/PeliculasDisponibles/PeliculasDisponibles';
import Contacto from './Containers/Contacto/Contacto';
import PantallaError from './Containers/PantallaError/PantallaError';
import RegistroUsuarios from './Containers/RegistroUsuarios/RegistroUsuarios';
import BuscarUsuario from './Containers/BuscarUsuario/BuscarUsuario';
import ListadoUsuarios from './Containers/ListadoUsuarios/ListadoUsuarios';
import ListadoPedidos from './Containers/ListadoPedidos/ListadoPedidos';
import PerfilPelicula from './Containers/PerfilPelicula/PerfilPelicula';
import Alquileres from './Containers/Alquileres/Alquileres';
import BuscarPedido from './Containers/BuscarPedido/BuscarPedido';

function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <Routes>

          <Route path="/error" element={<PantallaError />} />
          <Route path="/" element={<Inicio />} />
          <Route path="/tuzona" element={<TuZona />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/alquileres" element={<Alquileres />} />
          <Route path="/peliculas" element={<Peliculas />} />
          <Route path="/peliculasdisponibles" element={<PeliculasDisponibles />} />
          <Route path="/detallespelicula" element={<PerfilPelicula />} />
          <Route path="/registrousuarios" element={<RegistroUsuarios />} />
          <Route path="/buscarusuario" element={<BuscarUsuario />} />
          <Route path="/listadousuarios" element={<ListadoUsuarios />} />
          <Route path="/buscarpedido" element={<BuscarPedido />} />
          <Route path="/listadopedidos" element={<ListadoPedidos />} />


          <Route path="/contacto" element={<Contacto />} />

        </Routes>

      </BrowserRouter>
      
    </div>
  );
}

export default App;
