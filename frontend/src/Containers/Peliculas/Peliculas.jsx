import React, { useEffect, useState } from 'react';
import './Peliculas.css';
import axios from 'axios';
import lupa from '../../img/lupa.png';
import Lateral from '../../Components/Lateral/Lateral';
import { connect } from 'react-redux';
import { GUARDAR_PELICULAS } from '../../redux/types';

const Peliculas = (props) =>{

    //GUARDA TODO EL LISTADO DE LAS PELICULAS DE LA BASE DE DATOS
    useEffect(()=>{
        const cargarPeliculas = async () =>{
            let res = await axios.get("https://aramossanchez-videoclub-api.herokuapp.com/peliculas/");
            props.dispatch({type:GUARDAR_PELICULAS, payload: res.data});
        }
        cargarPeliculas();
    }, [])

    
    //FILTRO POR CIUDAD
    const filtrarPorCiudad = async (e) =>{
        // let ciudadSeleccionada = e.target.value;
        // let res = await axios.get(`https://aramossanchez-videoclub-api.herokuapp.com/peliculas${ciudadSeleccionada === "España" ? "" : "/ciudad/" + ciudadSeleccionada}`);
        // setPeliculas((res.data));
    };

    //BUSQUEDA POR TITULO
    const buscarTitulo = async () =>{
        let valorBusqueda = document.getElementById("busqueda-titulo").value;
        let res = await axios.get(`https://aramossanchez-videoclub-api.herokuapp.com/peliculas/titulo/${valorBusqueda}`)
        props.dispatch({type:GUARDAR_PELICULAS, payload: res.data});
    }

    //BUSQUEDA POR GÉNERO
    const buscarGenero = async () =>{
        // let valorBusqueda = document.getElementById("busqueda-genero").value;
        // let res = await axios.get(`https://aramossanchez-videoclub-api.herokuapp.com/peliculas/genero/${valorBusqueda}`)
        // setPeliculas((res.data));
    }

    //BUSQUEDA POR PROTAGONISTA
    const buscarProtagonista = async () =>{
        // let valorBusqueda = document.getElementById("busqueda-protagonista").value;
        // let res = await axios.get(`https://aramossanchez-videoclub-api.herokuapp.com/peliculas/actor_principal/${valorBusqueda}`)
        // setPeliculas((res.data));
    }

    return(
        <div id="container-peliculas">
            <Lateral/>
            <div id="contenido-peliculas">
                <div id="filtros-peliculas">
                    {/* FILTRAR POR CIUDAD */}
                    <div id="pelicula-ciudad">
                        <h2>Todas las películas disponibles en tu zona</h2>
                        <select name="ciudades" id="ciudades-disponibles" onChange={(e)=>filtrarPorCiudad(e)}>
                            <option value="España">España</option>
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
                    
                    {props.peliculasMostradas.peliculas.map((pelicula)=>{
                        return <div key={pelicula.id} className="pelicula-individual">
                            <div></div>
                            <p><span>Título:</span> {pelicula.titulo}</p>
                            <p><span>Género:</span> {pelicula.genero}</p>
                            <p><span>Protagonista:</span> {pelicula.actor_principal}</p>
                            <p><span>Ciudad disponible:</span> {pelicula.ciudad}</p>                        
                        </div>
                    })}

                </div>
            </div>
        </div>
    )
}

export default connect((state)=>({
    peliculasMostradas: state.peliculasMostradas,
}))(Peliculas);