import React, {useState, useEffect} from 'react';
import './Perfil.css';
import axios from 'axios';
import Lateral from '../../Components/Lateral/Lateral';
import FotoUsuario from '../../img/usuario.png';
import { connect } from 'react-redux';
import { COPIA_DATOS_LOGIN, GUARDA_CAMBIOS_ACTUALIZAR, ACTUALIZA_DATOS_LOGIN } from '../../redux/types';

const Perfil = (props) =>{
    
    // let body =  {
    //     correo: props.datosLogin.usuario.correo,
    //     dni: props.datosLogin.usuario.dni,
    //     nombre: props.datosLogin.usuario.nombre,
    //     apellidos: props.datosLogin.usuario.apellidos,
    //     direccion: props.datosLogin.usuario.direccion,
    //     ciudad: props.datosLogin.usuario.ciudad,
    //     telefono: props.datosLogin.usuario.telefono,
    //     createdAt: props.datosLogin.usuario.createdAt
    // }

    //RELLENA LOS CAMPOS DE datosUsuario RECORRIENDO TODOS LOS INPUTS, Y DESPUES ACTUALIZA EL CAMPO SELECCIONADO CON LOS CAMBIOS QUE HACEMOS EN LOS INPUTS
    const actualizarDatos = (e, propiedad) =>{
        props.dispatch({type:GUARDA_CAMBIOS_ACTUALIZAR, payload: {propiedad: propiedad, valor:e.target.value}});
    };

    useEffect(()=>{
        props.dispatch({type:COPIA_DATOS_LOGIN, payload: props.datosLogin.usuario});
    }, [])

    const actualizarRegistro = async () =>{

        // //CREAMOS LA CONFIGURACIÓN DEL HEADER QUE SE VA A MANDAR
        let config = {
            headers: { Authorization: `Bearer ${props.datosLogin.token}` }
        };

        await axios.put(`https://aramossanchez-videoclub-api.herokuapp.com/usuarios/${props.datosLogin.usuario.id}`, props.datosActualizarUsuario, config)
    
        props.dispatch({type:ACTUALIZA_DATOS_LOGIN, payload: props.datosActualizarUsuario});

    }

    return(
        <div id="container-perfil">
            <Lateral/>
            <div id="container-usuario">
                <h2>Tus Datos</h2>
                <div id="datos-usuario">
                    <div id="foto-usuario"><img src={FotoUsuario} alt="Foto de usuario" /></div>
                    <p><span>Correo electrónico:</span><input readOnly type="text" name="correo" value={props.datosLogin.usuario.correo}/></p>
                    <p><span>DNI:</span><input autoComplete="off" type="text" name="dni" onChange={(e)=>actualizarDatos(e, "dni")} value={props.datosActualizarUsuario.dni}/></p>
                    <p><span>Nombre:</span><input autoComplete="off" type="text" name="nombre" onChange={(e)=>actualizarDatos(e, "nombre")} value={props.datosActualizarUsuario.nombre}/></p>
                    <p><span>Apellidos:</span><input autoComplete="off" type="text" name="apellidos" onChange={(e)=>actualizarDatos(e, "apellidos")} value={props.datosActualizarUsuario.apellidos}/></p>
                    <p><span>Direccion:</span><input autoComplete="off" type="text" name="direccion" onChange={(e)=>actualizarDatos(e, "direcccion")} value={props.datosActualizarUsuario.direccion}/></p>
                    <p><span>Ciudad:</span><input autoComplete="off" type="text" name="ciudad" onChange={(e)=>actualizarDatos(e, "ciudad")} value={props.datosActualizarUsuario.ciudad}/></p>
                    <p><span>Telefono:</span><input autoComplete="off" type="text" name="telefono" onChange={(e)=>actualizarDatos(e, "telefono")} value={props.datosActualizarUsuario.telefono}/></p>
                    <p><span>Fecha de alta:</span><input readOnly type="text" name="createdAt" value={props.datosLogin.usuario.createdAt}/></p>
                </div>
                <div className="boton" onClick={()=>actualizarRegistro()}>ACTUALIZAR</div>
            </div>      
        </div>
    )
}

export default connect((state)=>({
    datosLogin: state.datosLogin,
    datosActualizarUsuario: state.datosActualizarUsuario
}))(Perfil);