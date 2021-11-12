import React from 'react';
import './AlquilarPelicula.css';
import { connect } from 'react-redux';
import { MENSAJE_ALQUILAR } from '../../redux/types';

const AlquilarPelicula = (props) =>{

    //CAMBIAMOS ESTADO DE REDUX A FALSE, PARA DEJAR DE MOSTRAR MENSAJE DE ALQUILER DE PELICULAS
    const cerrarMensajeAlquiler = () =>{
        props.dispatch({type:MENSAJE_ALQUILAR, payload: false});
    }
    return(
        <div id="container-mensaje-alquilar">
            <div id="cuador-mensaje-alquilar">
                <div id="cerrar-mensaje-alquilar" onClick={()=>cerrarMensajeAlquiler()}>X</div>
                <h2>Elige cuantos días quieres alquilar la película</h2>
                <div id="opciones-alquiler">
                    <div className="boton">2 días (3,95€)</div>
                    <div className="boton">3 días (4,95€)</div>
                    <div className="boton">7 días (6.95€)</div>
                </div>
            </div>
        </div>
    )
}

export default connect((state)=>({
    controlarMensajeAlquiler: state.controlarMensajeAlquiler
}))(AlquilarPelicula);