import React from 'react';
import './AlquilarPelicula.css';
import { connect } from 'react-redux';
import { MENSAJE_ALQUILAR } from '../../redux/types';
import axios from 'axios';

const AlquilarPelicula = (props) =>{

    console.log(props.controlarMensajeAlquiler.peliculaBuscada.id);
    console.log(props.datosLogin.usuario.id);

    //CAMBIAMOS ESTADO DE REDUX A FALSE, PARA DEJAR DE MOSTRAR MENSAJE DE ALQUILER DE PELICULAS
    const cerrarMensajeAlquiler = () =>{
        props.dispatch({type:MENSAJE_ALQUILAR, payload: false});
    }

    //CREAMOS PEDIDO EN LA BASE DE DATOS
    const crearPedido = async () =>{
        

        //CREAMOS LA CABECERA PARA HACER EL PUT, CON EL TOKEN
        let config = {
            headers: { Authorization: `Bearer ${props.datosLogin.token}` }
        };

        //CREAMOS EL BODY PARA HACER EL PUT
        let body = {
            peliculaId: props.controlarMensajeAlquiler.peliculaBuscada.id,
            usuarioId: props.datosLogin.usuario.id,
            fecha_alquiler: "2021/10/10",
            fecha_devolucion: "2021/10/20"
        }
        
        //HACEMOS EL PUT A LA BASE DE DATOS
        let res = await axios.post(`https://aramossanchez-videoclub-api.herokuapp.com/pedidos`, body, config);
        console.log(res);
    }
    return(
        <div id="container-mensaje-alquilar">
            <div id="cuador-mensaje-alquilar">
                <div id="cerrar-mensaje-alquilar" onClick={()=>cerrarMensajeAlquiler()}>X</div>
                <h2>Elige cuantos días quieres alquilar la película</h2>
                <div id="opciones-alquiler">
                    <div className="boton" onClick={()=>crearPedido()}>2 días (3,95€)</div>
                    <div className="boton" onClick={()=>crearPedido()}>3 días (4,95€)</div>
                    <div className="boton" onClick={()=>crearPedido()}>7 días (6.95€)</div>
                </div>
            </div>
        </div>
    )
}

export default connect((state)=>({
    controlarMensajeAlquiler: state.controlarMensajeAlquiler,
    datosLogin: state.datosLogin,
}))(AlquilarPelicula);