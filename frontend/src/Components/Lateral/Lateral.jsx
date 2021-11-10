import React from 'react';
import './Lateral.css';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { LOGOUT } from '../../redux/types';

const Lateral = (props) =>{

    const navigate = useNavigate();//CREADO PARA REDIRECCIONAR ENTRE CONTAINERS

    const redireccionar = (destino) =>{
        navigate(destino)
    };
    
    //BORRAMOS LOS DATOS DEL USUARIO LOGUEADO Y LOS RESETEAMOS A VALOR VACÍO
    const logout = () => {
        let datosBorradosLogin = {
            token : '',
            usuario : {}
        }
        props.dispatch({type:LOGOUT, payload: datosBorradosLogin});
    }

    return(
        <div id="container-lateral">
            <div className="enlace-lateral" onClick={()=>redireccionar("/perfil")}>Tu Perfil</div>
            <div className="enlace-lateral" onClick={()=>redireccionar("/perfil")}>Tus alquileres</div>
            <div className="enlace-lateral" onClick={()=>redireccionar("/peliculas")}>Catálogo de películas</div>
            <div className="enlace-lateral" onClick={()=>redireccionar("/peliculasdisponibles")}>Películas disponibles para alquilar en tu ciudad</div>
            {/* ENLACES SOLO PARA ADMINISTRADOR */}
            {props.datosLogin.usuario.rol === "administrador"
            ?
            <div id="opciones-admin">
            <div className="enlace-lateral" onClick={()=>redireccionar("/registrousuarios")}>Registro de usuarios</div>
            <div className="enlace-lateral" onClick={()=>redireccionar("/peliculasdisponibles")}>Buscar usuario por ID</div>
            <div className="enlace-lateral" onClick={()=>redireccionar("/peliculasdisponibles")}>Listado de todos los usuarios</div>
            <div className="enlace-lateral" onClick={()=>redireccionar("/peliculasdisponibles")}>Buscar pedido por ID</div>
            <div className="enlace-lateral" onClick={()=>redireccionar("/peliculasdisponibles")}>Listado de todos los pedidos</div>
            </div>
            :
            ""
            }
            <div className="enlace-lateral" onClick={()=>{logout(); redireccionar("/")}}>Logout</div>
        </div>
    )
}

export default connect((state)=>({
    datosLogin: state.datosLogin
}))(Lateral);