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

        //CREO BODY PARA MANDAR AL POST DE LOGIN
        let body = {
            correo: datosUsuario.correo,
            clave: datosUsuario.clave
        };

        try {
            //OBTENGO DATOS DE USUARIO LOGADO DE BASE DE DATOS
            let res = await axios.post("https://aramossanchez-videoclub-api.herokuapp.com/usuarios/login", body);

            //GUARDO EN REDUX DATOS OBTENIDOS DEL USUARIO LOGADO, Y SU TOKEN
            props.dispatch({type:LOGIN, payload: res.data});

            //SETEO MENSAJE PARA MOSTRAR TRAS LOGIN CON EXITO
            setmensajeError("Login correcto. Bienvenido " + res.data.usuario.nombre);

            //TRAS 2 SEGUNDOS, CAMBIO A PANTALLA TUZONA
            setTimeout(() => {
                navigate("/tuzona");
            }, 2000);
        } catch (error) {
            //SETEO MENSAJE PARA MOSTRAR ERROR
            setmensajeError("Ha habido un error al intentar conectar con la base de datos.");

            //TRAS 4 SEGUNDOS, SETEO MENSAJE A STRING VACIO
            setTimeout(() => {
                setmensajeError("");
            }, 4000);
        }
    }

    //FUNCION PARA IR A CONTACTO
    const irContacto = () =>{
        navigate("/contacto");
    }

    return(
        <div id="container-inicio">
            <div id="mensaje-inicio">
                <h2>Alquila tu película <span>DESDE LA WEB</span></h2>
                <h2>Espera a que te la llevemos <span>A TU CASA</span></h2>
                <h2>Disfruta del <span>CINE</span> </h2>
                {/* SI mensajeError ESTÁ VACIO NO MUESTRA NADA. SI TIENE ALGO, MUESTRA EL MENSAJE */}
                {!mensajeError
                ?
                ""
                :
                <div className="mensaje-error">{mensajeError}</div>    
                }
            </div>
            <div id="login-inicio">
                <h2>Login</h2>
                <input type="email" name="correo" id="correo" title="correo" placeholder="Correo Electrónico" autoComplete="off" onChange={(e)=>rellenarDatos(e)}/>
                <input type="password" name="clave" id="clave" title="clave" placeholder="Contraseña" autoComplete="off" onChange={(e)=>rellenarDatos(e)}/>
                <div className="boton" onClick={()=>loguear()}>LOGIN</div>
                
                <div id="enlace-contacto">
                    <p>¿No tienes cuenta? <strong onClick={()=>irContacto()}>Contacta con nosotros</strong></p>
                </div>
            </div>
        </div>
    )
}

export default connect()(Inicio);