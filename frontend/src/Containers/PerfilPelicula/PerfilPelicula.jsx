import React, { useEffect, useState } from 'react';
import './PerfilPelicula.css';
import { connect } from 'react-redux';
import axios from 'axios';

const PerfilPelicula = (props) =>{

    //HOOK
    const [peliculaBuscada, setPeliculaBuscada] = useState({});

    useEffect(()=>{
        const guardarPelicula = async () => {
            let res = await axios.get(`https://aramossanchez-videoclub-api.herokuapp.com/peliculas/${props.idPeliculaBuscada}`)
            setPeliculaBuscada(res.data);
        }
        guardarPelicula();
    }, [])

    return(
        <div id="container-perfil-pelicula">
            <div id="contenedor-caratula">
                <div id="caratula-pelicula"></div>
                <div id="datos-pelicula">
                    <div><span>Titulo: </span>{peliculaBuscada.titulo}</div>
                    <div><span>Genero: </span>{peliculaBuscada.genero}</div>
                    <div><span>Protagonista: </span>{peliculaBuscada.actor_principal}</div>
                    <div><span>Sinopsis: </span></div>
                </div>
            </div>
        </div>
    )
}
export default connect((state)=>({
    idPeliculaBuscada: state.idPeliculaBuscada,
}))(PerfilPelicula);