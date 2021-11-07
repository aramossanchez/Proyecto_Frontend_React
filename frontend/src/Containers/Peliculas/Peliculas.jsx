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
        console.log(ciudadSeleccionada);
        let res = await axios.get(`https://aramossanchez-videoclub-api.herokuapp.com/peliculas${ciudadSeleccionada == "España" ? "" : "/ciudad/" + ciudadSeleccionada}`);
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

    //CARGA DE TODAS LAS PELICULAS DE LA BASE DE DATOS
    useEffect(async ()=>{
        let res = await axios.get("https://aramossanchez-videoclub-api.herokuapp.com/peliculas/");
        setPeliculas((res.data));
    }, [])

    return(
        <div id="container-peliculas">
            <div id="filtros-peliculas">
                {/* FILTRAR POR CIUDAD */}
                <div id="pelicula-ciudad">
                    <p>Todas las películas disponibles en tu zona</p>
                    <select name="ciudades" id="ciudades-disponibles" onChange={(e)=>filtrarPorCiudad(e)}>
                        <option value="Todas">España</option>
                        <option value="Valencia">Valencia</option>
                        <option value="Getafe">Getafe</option>
                        <option value="Albacete">Albacete</option>
                    </select>
                </div>
                {/* BUSQUEDA POR TITULO */}
                <div id="busqueda-pelicula-nombre">
                    <p>Búsqueda de películas por título</p>
                    <div id="barra-busqueda-peliculas-titulo">
                        <input type="text" name="busqueda" id="busqueda-titulo" autoComplete="off"/>
                        <div id="boton-buscar-pelicula-nombre" onClick={()=>buscarTitulo()}><img src={lupa} /></div>
                    </div>
                </div>
                {/* BUSQUEDA POR GENERO */}
                <div id="busqueda-pelicula-nombre">
                    <p>Búsqueda de películas por género</p>
                    <div id="barra-busqueda-peliculas-titulo">
                        <input type="text" name="busqueda" id="busqueda-genero" autoComplete="off"/>
                        <div id="boton-buscar-pelicula-nombre" onClick={()=>buscarGenero()}><img src={lupa} /></div>
                    </div>
                </div>
            </div>
            {/* MOSTRAR LAS PELICULAS */}
            <div id="listado-peliculas">
                {peliculas.map((pelicula)=>{
                    return <div key={pelicula.id} className="pelicula-individual">
                        <p>Título: {JSON.stringify(pelicula.titulo)}</p>
                        <p>Género: {JSON.stringify(pelicula.genero)}</p>
                        <p>Protagonista: {JSON.stringify(pelicula.actor_principal)}</p>
                        <p>Ciudad disponible: {JSON.stringify(pelicula.ciudad)}</p>
                        <p>Disponible para alquilar: {JSON.stringify(pelicula.alquilada)}</p>
                        
                        </div>
                })}
            </div>
        </div>
    )
}

export default Peliculas;