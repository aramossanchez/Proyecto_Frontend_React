import React, { useState } from 'react';
import './Inicio.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { LOGIN } from '../../redux/types';
import logo from '../../img/logo.png';

const Inicio = (props) =>{
    
    const navigate = useNavigate();//CREADO PARA REDIRECCIONAR ENTRE CONTAINERS

    //HOOKS
    const [datosUsuario, setdatosUsuario] = useState({correo:"", clave:""});
    const [mensajeError, setmensajeError] = useState("");
    //CONTROLA QUE EL INPUT DE EMAIL TENGA DATOS CORRECTOS
    const [controlEmail , setControlEmail] = useState(false);
    
    //CONTROLA QUE EL INPUT DE CONTRASEÑA TENGA DATOS CORRECTOS
    const [controlContraseña , setControlContraseña] = useState(false);

    //HANDLERS
    const rellenarDatos = (e) =>{
        setdatosUsuario({...datosUsuario, [e.target.name]: e.target.value})
    }

    //FUNCION PARA CONTROLAR ENTRADA DE EMAIL. SI EL CORREO ESTA OK SETEA HOOK A TRUE
    const entradaEmail = (e) =>{
        let er = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
        if(er.test(e.target.value)){
            setControlEmail(true);
        }else{
            setControlEmail(false);
        }
    }

    //FUNCION PARA CONTROLAR ENTRADA DE CONTRASEÑA. SI LA CONTRASEÑA ESTA OK SETEA HOOK A TRUE
    const entradaContraseña = (e) =>{
        if (e.target.value.length < 8) {
            setControlContraseña(false);
        }else{
            setControlContraseña(true);
        }
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//CONTROL DE ENTRADA DE DATOS POR INPUT
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//RETURN
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return(
        <div id="container-inicio">
            <div id="mensaje-inicio">
                <div id="logo"><img src={logo} alt="Logo" /></div>
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
                <input type="email" name="correo" id="correo" title="correo" placeholder="Correo Electrónico" autoComplete="off" onChange={(e)=>{rellenarDatos(e); entradaEmail(e)}}/>
                <input type="password" name="clave" id="clave" title="clave" placeholder="Contraseña" autoComplete="off" onChange={(e)=>{rellenarDatos(e); entradaContraseña(e)}}/>
                {/* EL BOTON SOLO SERÁ USABEL SI HOOKS DE EMAIL Y CONTRASEÑA ESTÁN A TRUE */}
                <button className={controlEmail && controlContraseña  ? "boton" : "boton deshabilitado"} onClick={()=>loguear()}>LOGIN</button>
                <div id="enlace-contacto">
                    <p>¿No tienes cuenta? <strong onClick={()=>irContacto()}>Contacta con nosotros</strong></p>
                </div>
            </div>
        </div>
    )
}

export default connect()(Inicio);