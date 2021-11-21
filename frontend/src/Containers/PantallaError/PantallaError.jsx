import React from 'react';
import './PantallaError.scss';
import gato from '../../img/gato-trabajando.png';

const PantallaError = () =>{

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

export default PantallaError;