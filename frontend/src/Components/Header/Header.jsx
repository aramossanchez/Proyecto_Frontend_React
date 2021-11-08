import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';

const Header = () =>{

    const navigate = useNavigate();//CREADO PARA REDIRECCIONAR ENTRE CONTAINERS

    const redireccionar = (destino) =>{
        navigate(destino)
    };

    return(
        <div id="container-header">
            <div className="enlace-header" onClick={()=>redireccionar("/")}>Home</div>
            <div className="enlace-header" onClick={()=>redireccionar("/perfil")}>Perfil</div>
            <div className="enlace-header" onClick={()=>redireccionar("/peliculas")}>Peliculas</div>
            <div className="enlace-header" onClick={()=>redireccionar("/contacto")}>Contacto</div>
            <div className="enlace-header" onClick={()=>redireccionar("/admin")}>Admin</div>

        </div>
    )
}

export default Header;