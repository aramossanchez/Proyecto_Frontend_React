import React from 'react';
import './Lateral.css';
import { useNavigate } from 'react-router-dom';

const Lateral = () =>{

    const navigate = useNavigate();//CREADO PARA REDIRECCIONAR ENTRE CONTAINERS

    const redireccionar = (destino) =>{
        navigate(destino)
    };

    return(
        <div id="container-lateral">
            <div className="enlace-lateral" onClick={()=>redireccionar("/perfil")}>Tu Perfil</div>
            <div className="enlace-lateral" onClick={()=>redireccionar("/perfil")}>Tus alquileres</div>
            <div className="enlace-lateral" onClick={()=>redireccionar("/peliculas")}>Catálogo de películas</div>
            <div className="enlace-lateral" onClick={()=>redireccionar("/peliculasdisponibles")}>Películas disponibles para alquilar en tu ciudad</div>
            <div className="enlace-lateral" onClick={()=>redireccionar("/admin")}>Logout</div>

        </div>
    )
}

export default Lateral;