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
    //GUARDO EL LISTADO DE ALQUILERES
    const [listaAlquileres, setListaAlquileres] = useState([]);

    //BUSCAMOS EN LA BASE DE DATOS TODOS LOS ALQUILERES QUE TENGA EL USUARIO QUE SE HA LOGADO
    const mostrarAlquileres = async () =>{
        let res = await axios.get(`https://aramossanchez-videoclub-api.herokuapp.com/pedidos/usuario/${props.datosLogin.usuario.id}`,config)
        setListaAlquileres(res.data);
    }

    //TRADUCE FECHA DE ALQUILER DE FORMATO BBDD A FORMATO ESPAÑOL
    const calcularFechaAlquiler = (fecha) =>{
        let fechaBBDD = fecha.split(/[- : T .]/);
        let fechaProvisional = [fechaBBDD[2], fechaBBDD[1], fechaBBDD[0]];
        return fechaProvisional.join('-');
    }

    //TRADUCE FECHA DE DEVOLUCION DE FORMATO BBDD A FORMATO ESPAÑOL
    const calcularFechaDevolucion = (fecha) =>{
        let fechaBBDD = fecha.split(/[- : T .]/);
        let fechaProvisional = [fechaBBDD[2], fechaBBDD[1], fechaBBDD[0]];
        return fechaProvisional.join('-');
    }

    useEffect(()=>{
        mostrarAlquileres();
    }, [])

    useEffect(()=>{
        console.log(listaAlquileres);
    }, [listaAlquileres])

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
                    {listaAlquileres[0] === undefined
                    ?
                    <div>No has hecho aún ningún alquiler.</div>
                    :
                    <div id="listado-alquileres">
                        {listaAlquileres?.map((alquiler)=>{
                            return(
                                <div id="alquiler">
                                    <div><img src={alquiler.pelicula.caratula} alt="Caratula" /></div>
                                    <p><span>Titulo de la película:</span> {alquiler.pelicula.titulo}</p>
                                    <p><span>Fecha de alquiler:</span> {calcularFechaAlquiler(alquiler.fecha_alquiler)}</p>
                                    <p><span>Fecha de devolución:</span> {calcularFechaDevolucion(alquiler.fecha_devolucion)}</p>
                                    <p><span>Precio:</span> {alquiler.precio}</p>
                                </div>
                            )
                        })}
                    </div>
                    }
                </div>
            </div>
        )
    }
};

export default connect((state)=>({
    datosLogin: state.datosLogin,
}))(Alquileres);