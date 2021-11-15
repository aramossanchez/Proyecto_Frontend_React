import React, { useEffect, useState } from 'react';
import './PerfilPelicula.css';
import { connect } from 'react-redux';
import axios from 'axios';
import flecha from '../../img/flecha.png';
import { useNavigate } from 'react-router';
import AlquilarPelicula from '../../Components/AlquilarPelicula/AlquilarPelicula';
import { MENSAJE_ALQUILAR } from '../../redux/types';
import { PELICULA_ALQUILADA } from '../../redux/types';
import loading from '../../img/loading.svg';

const PerfilPelicula = (props) =>{

    const navigate = useNavigate();

    //HOOK
    //CREADO PARA MOSTRAR ICONO CARGANDO
    const [cargando, setCargando] = useState(false);

    //HACE QUE SE VEA EL ICONO DE CARGANDO DURANTE 1 SEGUNDO
    const mostrarLoading = () =>{
        setCargando(true);
        setTimeout(() => {
            setCargando(false);
        }, 1000);
    }

    //AL CARGAR EL COMPONENTE, OBTENEMOS LOS DATOS DE LA PELICULA DE LA BASE DE DATOS Y LO GUARDAMOS EN REDUX
    useEffect(()=>{
        const guardarPelicula = async () => {
            let res = await axios.get(`https://aramossanchez-videoclub-api.herokuapp.com/peliculas/${props.idPeliculaBuscada}`)
            props.dispatch({type:PELICULA_ALQUILADA, payload: res.data});
        }
        mostrarLoading();
        guardarPelicula();
    }, []);

    //NOS REDIRIGE HACE LA VISTA PELICULAS
    const volverAtras = () =>{
        navigate("/peliculas")
    }

    //MARCAMOS COMO TRUE EL HOOK  alquilerPulsado PARA HACER VISIBLE EL MENSAJE DE ALQUILER
    const mostrarMensajeAlquiler = () =>{
        props.dispatch({type:MENSAJE_ALQUILAR, payload: true});
    }

    return(
        <div>
            {/* MOSTRAR LAS PELICULAS O ICONO DE CARGANDO*/}
            {cargando
            ?
            <img src={loading} alt="loading-pelicula-perfil" />
            :
            <div id="container-perfil-pelicula" style={{backgroundImage: `url(${props.controlarMensajeAlquiler.peliculaBuscada.imagen_promocional})`}}>
                {props.controlarMensajeAlquiler.verMensaje ? <AlquilarPelicula/> : ""}
                
                <div id="contenido-perfil-pelicula">
                    <h2>{props.controlarMensajeAlquiler.peliculaBuscada.titulo}</h2>
                    <div id="informacion-pelicula">
                        <div id="caratula-pelicula">
                            <img src={props.controlarMensajeAlquiler.peliculaBuscada.caratula} alt="Caratula" />
                        </div>
                        <div id="datos-pelicula">
                            <div><span>ID de película: </span>{props.controlarMensajeAlquiler.peliculaBuscada.id}</div>
                            <div><span>Género: </span>{props.controlarMensajeAlquiler.peliculaBuscada.genero}</div>
                            <div><span>Protagonista: </span>{props.controlarMensajeAlquiler.peliculaBuscada.actor_principal}</div>
                            <div><span>Sinopsis: </span></div>
                        </div>
                    </div>
                    <div id="botones-perfil-pelicula">
                        <div id="flecha-regreso" onClick={()=>volverAtras()}>
                            <img src={flecha} alt="Flecha volver atrás"/>
                            <p>Volver al listado de películas</p>
                        </div>
                        {/* SOLO APARECERÁ BOTÓN DE ALQUILAR CUANDO LA APLICACIÓN PERMITA HACER ESE ALQUILER */}
                        {props.datosLogin.usuario.ciudad === props.controlarMensajeAlquiler.peliculaBuscada.ciudad && props.controlarMensajeAlquiler.peliculaBuscada.alquilada === false
                        ?
                        <div className="boton" onClick={()=>mostrarMensajeAlquiler()}>ALQUILAR PELÍCULA</div>
                        :
                        ""
                        }
                    </div>
                </div>     
            </div>
            }
        </div>
    )
}
export default connect((state)=>({
    idPeliculaBuscada: state.idPeliculaBuscada,
    controlarMensajeAlquiler: state.controlarMensajeAlquiler,
    datosLogin: state.datosLogin
}))(PerfilPelicula);