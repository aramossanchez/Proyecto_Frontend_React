import React, {useEffect, useState} from 'react';
import Lateral from '../../Components/Lateral/Lateral';
import './BuscarPedido.css';
import { connect } from 'react-redux';
import axios from 'axios';
import lupa from '../../img/lupa.png';
import { GUARDAR_ID_USUARIO } from '../../redux/types';

const BuscarPedido = (props) =>{

    let config = {
        headers: { Authorization: `Bearer ${props.datosLogin.token}` }
    };


    const guardarId = () =>{

    }

    //AL CARGAR EL COMPONENTE COMPRUEBO SI idUsuarioBuscado TIENE VALOR DISTINTO DE 0. SI LO TIENE, QUE BUSQUE UN USUARIO CON ESE ID. CUANDO TERMINE TODAS LAS COMPROBACIONES, GUARDARÁ EN REDUX EL VALOR 0  
    useEffect(()=>{
        
    }, [])

    
    return(
        <div id="container-buscar-pedido">
            <Lateral/>
            <div id="contenido-buscar-pedido">
                <h2>Buscar usuario por ID</h2>
                <div className="barra-busqueda-pedido">
                    <input type="text" name="busqueda" id="busqueda-pedido-id" autoComplete="off" onChange={(e)=>guardarId(e)}/>
                    <div className="boton-lupa"><img src={lupa} alt="Lupa" /></div>                    
                </div>
                <div id="datos-usuario-id">
                    <p><span>Usuario que hizo el pedido:</span><input readOnly value={""}/></p>
                    <p><span>Pelicula alquilada:</span><input readOnly value={""}/></p>
                    <p><span>Fecha de alquiler:</span><input readOnly value={""}/></p>
                    <p><span>Fecha de devolución:</span><input readOnly value={""}/></p>
                    <p><span>Precio:</span><input readOnly value={""}/></p>
                   </div>
            </div>
        </div>
    )
};

export default connect((state)=>({
    datosLogin: state.datosLogin,
    idUsuarioBuscado: state.idUsuarioBuscado
}))(BuscarPedido);