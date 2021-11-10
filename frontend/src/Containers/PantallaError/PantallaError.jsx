import React from 'react';
import './PantallaError.css';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import gato from '../../img/gato-trabajando.png';

const PantallaError = () =>{

    const navigate = useNavigate();//CREADO PARA REDIRECCIONAR ENTRE CONTAINERS

    return(
        <div id="container-error">
            <h2>Ups... parece que algo ha salido mal...</h2>
            <img src={gato} alt="Gato trabajando" id="gato-1" className="gato-trabajando"/>
            <img src={gato} alt="Gato trabajando" id="gato-2" className="gato-trabajando"/>
            <img src={gato} alt="Gato trabajando" id="gato-3" className="gato-trabajando"/>
            <img src={gato} alt="Gato trabajando" id="gato-4" className="gato-trabajando"/>
            <img src={gato} alt="Gato trabajando" id="gato-5" className="gato-trabajando"/>
            <p>Espera un ratito a que nuestro ejército de gatetes técnicos lo solucionen y vuelve a intentarlo más tarde.</p>
        </div>
    )
}

export default connect((state)=>({
    datosLogin: state.datosLogin
}))(PantallaError);