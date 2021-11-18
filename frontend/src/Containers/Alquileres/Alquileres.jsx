import React, { useEffect, useState } from 'react';
import './Alquileres.css';
import axios from 'axios';
import Lateral from '../../Components/Lateral/Lateral';
import { connect } from 'react-redux';
import loading from '../../img/loading.svg';
import PantallaError from '../PantallaError/PantallaError';

const Alquileres = (props) => {

    //CREAMOS LA CONFIGURACIÓN DEL HEADER QUE SE VA A MANDAR
    let config = {
        headers: { Authorization: `Bearer ${props.datosLogin.token}` }
    };

    //HOOKS
    const [listaAlquileres, setListaAlquileres] = useState();

    //BUSCAMOS EN LA BASE DE DATOS TODOS LOS ALQUILERES QUE TENGA EL USUARIO QUE SE HA LOGADO
    const mostrarAlquileres = async () =>{
        let res = await axios.get(`https://aramossanchez-videoclub-api.herokuapp.com/pedidos/usuario/${props.datosLogin.usuario.id}`,config)
        setListaAlquileres(res.data);
    }

    const buscarDatosPelicula = (id) =>{
        // let res = await axios.get(`https://aramossanchez-videoclub-api.herokuapp.com/peliculas/${id}`);
        return "hola";
    }

    useEffect(()=>{
        mostrarAlquileres();
    }, [])

    if (props.datosLogin.usuario.rol !== "usuario") {
        return(
            <PantallaError/>
        )
    } else{
        return(
            <div id="container-alquileres">
                <Lateral/>
                <div id="contenido-alquileres">
                    <h2>Listado de alquileres</h2>
                    <div id="listado-alquileres">
                        {listaAlquileres?.map((alquiler)=>{
                            return(
                                <div id="alquiler">
                                    <div><img src={alquiler.pelicula.caratula} alt="Caratula" /></div>
                                    <p><span>Titulo de la película:</span> {alquiler.pelicula.titulo}</p>
                                    <p><span>Fecha de alquiler:</span> {alquiler.fecha_alquiler}</p>
                                    <p><span>Fecha de devolución:</span> {alquiler.fecha_devolucion}</p>
                                    <p><span>Precio:</span> {alquiler.precio}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
};

export default connect((state)=>({
    datosLogin: state.datosLogin,
}))(Alquileres);