import React, { useEffect, useState } from 'react';
import './Peliculas.css';
import axios from 'axios';
import lupa from '../../img/lupa.png';

const Peliculas = () =>{

    //HOOKS
    const [peliculas, setPeliculas] = useState([]);

    //HANDLERS
    //FILTRO POR CIUDAD
    const filtrarPorCiudad = async (e) =>{
        let indiceCiudadSeleccionada = e.target.selectedIndex;
        let ciudadSeleccionada = e.target.options[indiceCiudadSeleccionada].text;
        let res = await axios.get(`https://aramossanchez-videoclub-api.herokuapp.com/peliculas${ciudadSeleccionada === "España" ? "" : "/ciudad/" + ciudadSeleccionada}`);
        setPeliculas((res.data));
    };

    //BUSQUEDA POR TITULO
    const buscarTitulo = async () =>{
        let valorBusqueda = document.getElementById("busqueda-titulo").value;
        let res = await axios.get(`https://aramossanchez-videoclub-api.herokuapp.com/peliculas/titulo/${valorBusqueda}`)
        setPeliculas((res.data));
    }

    //BUSQUEDA POR GÉNERO
    const buscarGenero = async () =>{
        let valorBusqueda = document.getElementById("busqueda-genero").value;
        let res = await axios.get(`https://aramossanchez-videoclub-api.herokuapp.com/peliculas/genero/${valorBusqueda}`)
        setPeliculas((res.data));
    }

    //BUSQUEDA POR PROTAGONISTA
    const buscarProtagonista = async () =>{
        let valorBusqueda = document.getElementById("busqueda-protagonista").value;
        let res = await axios.get(`https://aramossanchez-videoclub-api.herokuapp.com/peliculas/actor_principal/${valorBusqueda}`)
        setPeliculas((res.data));
    }

    //CARGA DE TODAS LAS PELICULAS DE LA BASE DE DATOS
    useEffect(()=>{
        const cargarPeliculas = async () =>{
            let res = await axios.get("https://aramossanchez-videoclub-api.herokuapp.com/peliculas/");
            setPeliculas((res.data));
        }
        cargarPeliculas();
    }, [])

    return(
        <div id="container-peliculas">
            <div id="filtros-peliculas">
                {/* FILTRAR POR CIUDAD */}
                <div id="pelicula-ciudad">
                    <h2>Todas las películas disponibles en tu zona</h2>
                    <select name="ciudades" id="ciudades-disponibles" onChange={(e)=>filtrarPorCiudad(e)}>
                        <option value="Todas">España</option>
                        <option value="Valencia">Valencia</option>
                        <option value="Getafe">Getafe</option>
                        <option value="Albacete">Albacete</option>
                    </select>
                </div>
                {/* BUSQUEDA POR TITULO */}
                <div id="busqueda-pelicula-titulo">
                    <h2>Búsqueda de películas por título</h2>
                    <div className="barra-busqueda-peliculas">
                        <input type="text" name="busqueda" id="busqueda-titulo" autoComplete="off"/>
                        <div className="boton-lupa" onClick={()=>buscarTitulo()}><img src={lupa} alt="Lupa" /></div>
                    </div>
                </div>
                {/* BUSQUEDA POR GENERO */}
                <div id="busqueda-pelicula-genero">
                    <h2>Búsqueda de películas por género</h2>
                    <div className="barra-busqueda-peliculas">
                        <input type="text" name="busqueda" id="busqueda-genero" autoComplete="off"/>
                        <div className="boton-lupa" onClick={()=>buscarGenero()}><img src={lupa} alt="Lupa" /></div>
                    </div>
                </div>
                {/* BUSQUEDA POR PROTAGONISTA */}
                <div id="busqueda-pelicula-protagonista">
                    <h2>Búsqueda de películas por actor principal</h2>
                    <div className="barra-busqueda-peliculas">
                        <input type="text" name="busqueda" id="busqueda-protagonista" autoComplete="off"/>
                        <div className="boton-lupa" onClick={()=>buscarProtagonista()}><img src={lupa} alt="Lupa"/></div>
                    </div>
                </div>
            </div>
            {/* MOSTRAR LAS PELICULAS */}
            <div id="listado-peliculas">
                {peliculas.map((pelicula)=>{
                    return <div key={pelicula.id} className="pelicula-individual">
                        <p><span>Título:</span> {JSON.stringify(pelicula.titulo)}</p>
                        <p><span>Género:</span> {JSON.stringify(pelicula.genero)}</p>
                        <p><span>Protagonista:</span> {JSON.stringify(pelicula.actor_principal)}</p>
                        <p><span>Ciudad disponible:</span> {JSON.stringify(pelicula.ciudad)}</p>                        
                    </div>
                })}
            </div>
        </div>
    )
}

export default Peliculas;