import React, { useEffect, useState } from 'react';
import './PerfilPelicula.css';
import { connect } from 'react-redux';
import axios from 'axios';
import flecha from '../../img/flecha.png';
import { useNavigate } from 'react-router';

const PerfilPelicula = (props) =>{

    const navigate = useNavigate();

    //HOOK
    const [peliculaBuscada, setPeliculaBuscada] = useState({});

    useEffect(()=>{
        const guardarPelicula = async () => {
            let res = await axios.get(`https://aramossanchez-videoclub-api.herokuapp.com/peliculas/${props.idPeliculaBuscada}`)
            setPeliculaBuscada(res.data);
        }
        guardarPelicula();
    }, []);

    const volverAtras = () =>{
        navigate("/peliculas")
    }

    return(
        <div id="container-perfil-pelicula" style={{backgroundImage: `url(${peliculaBuscada.imagen_promocional})`}}>
            
            <div id="contenido-perfil-pelicula">
                <h2>{peliculaBuscada.titulo}</h2>
                <div id="informacion-pelicula">
                    <div id="caratula-pelicula">
                        <img src={peliculaBuscada.caratula} alt="Caratula" />
                    </div>
                    <div id="datos-pelicula">
                        <div><span>ID de película: </span>{peliculaBuscada.id}</div>
                        <div><span>Género: </span>{peliculaBuscada.genero}</div>
                        <div><span>Protagonista: </span>{peliculaBuscada.actor_principal}</div>
                        <div><span>Sinopsis: </span></div>
                    </div>
                </div>
                <div id="botones-perfil-pelicula">
                    <div id="flecha-regreso" onClick={()=>volverAtras()}>
                        <img src={flecha} alt="Flecha volver atrás"/>
                        <p>Volver al listado de películas</p>
                    </div>      
                    <div className="boton">ALQUILAR PELÍCULA</div>      
                </div>
            </div>
            
        </div>
    )
}
export default connect((state)=>({
    idPeliculaBuscada: state.idPeliculaBuscada,
}))(PerfilPelicula);