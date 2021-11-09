import React, {useState, useEffect} from 'react';
import './TuZona.css';
import axios from 'axios';
import Header from '../../Components/Lateral/Lateral';

const TuZona = () =>{

    return(
        <div id="container-tuzona">
            <Header/>
            <div id="contenido-tuzona">
                <h2>Bienvenido a Tu Zona</h2>
            </div>
        </div>
    )
}

export default TuZona;