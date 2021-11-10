import React, { useState } from 'react';
import './Inicio.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { LOGIN } from '../../redux/types';

const Inicio = (props) =>{
    
    const navigate = useNavigate();//CREADO PARA REDIRECCIONAR ENTRE CONTAINERS

    //HOOKS
    const [datosUsuario, setdatosUsuario] = useState({correo:"", clave:""});
    const [mensajeError, setmensajeError] = useState("");

    //HANDLERS
    const rellenarDatos = (e) =>{
        setdatosUsuario({...datosUsuario, [e.target.name]: e.target.value})
    }

    //FUNCIÓN PARA LOGUEAR USUARIO
    const loguear = async () => {

        let body = {
            correo: datosUsuario.correo,
            clave: datosUsuario.clave
        };

        let res = await axios.post("https://aramossanchez-videoclub-api.herokuapp.com/usuarios/login", body);
        
        try {
            props.dispatch({type:LOGIN, payload: res.data});
            navigate("/tuzona");
        } catch (error) {
            setmensajeError(error);
        }
    }

    //FUNCION PARA IR A CONTACTO
    const irContacto = () =>{
        navigate("/contacto");
    }

    return(
        <div id="container-inicio">
            <div id="mensaje-inicio">
                <h2>Bienvenido</h2>
            </div>
            <div id="login-inicio">
                <h2>Login</h2>
                <input type="email" name="correo" id="correo" title="correo" placeholder="Correo Electrónico" autoComplete="off" onChange={(e)=>rellenarDatos(e)}/>
                <input type="password" name="clave" id="clave" title="clave" placeholder="Contraseña" autoComplete="off" onChange={(e)=>rellenarDatos(e)}/>
                <div className="boton" onClick={()=>loguear()}>LOGIN</div>
                <div id="enlace-contacto">
                    <p>¿No tienes cuenta? <strong onClick={()=>irContacto()}>Contacta con nosotros</strong></p>
                </div>
                <div id="error-login">{mensajeError}</div>
            </div>
        </div>
    )
}

export default connect()(Inicio);