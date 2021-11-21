import React, { useEffect } from 'react';
import './Lateral.scss';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { LOGOUT } from '../../redux/types';
import logo from '../../img/logo.png';

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

    useEffect(()=>{
        //OBTENGO RUTA COMPLETA, Y GUARDO EN LA POSICION 3 DEL ARRAY rutaEnArray EL FINAL DE LA URL ACTUAL, COINCIDIENDO CON LOS IDS DE LOS ENLACES
        let rutaCompleta = window.location.href;
        let rutaEnArray = rutaCompleta.split(/[/]/);
        let componente = document.getElementById(rutaEnArray[3]);
        if(componente!==null){
            componente.classList.add("enlace-actual");
        }
    }, [])

    return(
        <div id="container-lateral">
            <div id="logo-lateral"><img src={logo} alt="Logo" /></div>
            {/* ENLACES SOLO PARA USUARIO */}
            {props.datosLogin.usuario.rol === "usuario"
            ?
            <div id="opciones-user">
                <div id="perfil" className="enlace-lateral" onClick={()=>redireccionar("/perfil")}>Tu Perfil</div>
                <div id="alquileres" className="enlace-lateral" onClick={()=>redireccionar("/alquileres")}>Tus alquileres</div>
                <div id="peliculas" className="enlace-lateral" onClick={()=>redireccionar("/peliculas")}>Catálogo de películas</div>
                <div id="peliculasdisponibles" className="enlace-lateral" onClick={()=>redireccionar("/peliculasdisponibles")}>Películas disponibles para alquilar en tu ciudad</div>
            </div>
            :
            ""
            }
            {/* ENLACES SOLO PARA ADMINISTRADOR */}
            {props.datosLogin.usuario.rol === "administrador"
            ?
            <div id="opciones-admin">
                <div id="registrousuarios" className="enlace-lateral" onClick={()=>redireccionar("/registrousuarios")}>Registro de usuarios</div>
                <div id="buscarusuario" className="enlace-lateral" onClick={()=>redireccionar("/buscarusuario")}>Buscar usuario por ID</div>
                <div id="listadousuarios" className="enlace-lateral" onClick={()=>redireccionar("/listadousuarios")}>Listado de todos los usuarios</div>
                <div id="registropeliculas" className="enlace-lateral" onClick={()=>redireccionar("/registropeliculas")}>Registro de peliculas</div>
                <div id="buscarpelicula" className="enlace-lateral" onClick={()=>redireccionar("/buscarpelicula")}>Buscar película por ID</div>
                <div id="listadopeliculas" className="enlace-lateral" onClick={()=>redireccionar("/listadopeliculas")}>Listado de todas las peliculas</div>
                <div id="buscarpedido" className="enlace-lateral" onClick={()=>redireccionar("/buscarpedido")}>Buscar pedido por ID</div>
                <div id="listadopedidos" className="enlace-lateral" onClick={()=>redireccionar("/listadopedidos")}>Listado de todos los pedidos</div>
            </div>
            :
            ""
            }
            <div id ="logout-lateral" className="enlace-lateral" onClick={()=>{logout(); redireccionar("/")}}>Logout</div>
        </div>
    )
}

export default connect((state)=>({
    datosLogin: state.datosLogin
}))(Lateral);