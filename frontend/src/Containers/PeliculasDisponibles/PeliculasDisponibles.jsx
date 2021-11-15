import React, { useEffect, useState } from 'react';
import './PeliculasDisponibles.css';
import axios from 'axios';
import Lateral from '../../Components/Lateral/Lateral';
import { connect } from 'react-redux';
import { GUARDAR_PELICULAS, GUARDAR_ID_PELICULA } from '../../redux/types';
import { useNavigate } from 'react-router';
import loading from '../../img/loading.svg';

const PeliculasDisponibles = (props) =>{

    const navigate = useNavigate();

    //HOOK
    //CREADO PARA MOSTRAR ICONO CARGANDO
    const [cargando, setCargando] = useState(false);

    //HACE QUE SE VEA EL ICONO DE CARGANDO DURANTE 1.25 SEGUNDOS
    const mostrarLoading = () =>{
        setCargando(true);
        setTimeout(() => {
            setCargando(false);
        }, 1250);
    }

    //GUARDA TODO EL LISTADO DE LAS PELICULAS DE LA BASE DE DATOS
    useEffect(()=>{
        const cargarPeliculas = async () =>{
            let res = await axios.get(`https://aramossanchez-videoclub-api.herokuapp.com/peliculas/ciudad/${props.datosLogin.usuario.ciudad}/alquilada/0`);
            props.dispatch({type:GUARDAR_PELICULAS, payload: res.data});
        }
        cargarPeliculas();
        mostrarLoading()
    }, [])

    //ACCEDER A DETALLES DE PELICULA CLICKADA
    const verDetallesPelicula = (id) =>{
        props.dispatch({type:GUARDAR_ID_PELICULA, payload: id});
        navigate("/detallespelicula");
    }

    return(
        <div id="container-peliculas">
            <Lateral/>
            <div id="contenido-peliculas">
                <h2>Listado de películas disponibles para alquilar en {props.datosLogin.usuario.ciudad}</h2>
                {/* MOSTRAR LAS PELICULAS O ICONO DE CARGANDO*/}
                {cargando
                ?
                <img src={loading} alt="loading" />
                :
                <div id="listado-peliculas">
                    
                    {props.peliculasMostradas.peliculas.map((pelicula)=>{
                        return <div key={pelicula.id} className="pelicula-individual" onClick={()=>verDetallesPelicula(pelicula.id)}>
                            <div><img src={pelicula.caratula} alt="Caratula" /></div>
                            <p><span>Título:</span> {pelicula.titulo}</p>
                            <p><span>Género:</span> {pelicula.genero}</p>
                            <p><span>Protagonista:</span> {pelicula.actor_principal}</p>                   
                        </div>
                    })}

                </div>
                }
            </div>
        </div>
    )
}

export default connect((state)=>({
    peliculasMostradas: state.peliculasMostradas,
    datosLogin: state.datosLogin
}))(PeliculasDisponibles);