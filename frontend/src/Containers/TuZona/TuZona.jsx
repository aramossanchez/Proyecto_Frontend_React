import React, {useState, useEffect} from 'react';
import './TuZona.css';
import Lateral from '../../Components/Lateral/Lateral';
import PantallaError from '../PantallaError/PantallaError';
import { connect } from 'react-redux';

const TuZona = (props) =>{

    if (props.datosLogin.usuario.rol === undefined) {
        console.log("Maquina")
        return(
            <PantallaError/>
        )
    }else{
        return(
            <div id="container-tuzona">
                <Lateral/>
                <div id="contenido-tuzona">
                    <h2>Bienvenido a Tu Zona</h2>
                </div>
            </div>
        )
    }
}

export default connect((state)=>({
    datosLogin: state.datosLogin
}))(TuZona);