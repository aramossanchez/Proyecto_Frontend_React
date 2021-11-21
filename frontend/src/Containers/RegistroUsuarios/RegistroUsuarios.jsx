import React, {useState, useEffect} from 'react';
import Lateral from '../../Components/Lateral/Lateral';
import './RegistroUsuarios.scss';
import { connect } from 'react-redux';
import axios from 'axios';
import PantallaError from '../PantallaError/PantallaError';

const RegistroUsuarios = (props) =>{

    let config = {
        headers: { Authorization: `Bearer ${props.datosLogin.token}` }
    };

    //HOOKS
    //REGISTRO DE USUARIOS
    const [datosRegistro, setDatosRegistro] = useState ({});
    const [mensajeError, setmensajeError] = useState("");

    //TODOS LOS CAMPOS SE HAN INTRODUCIDO CORRECTAMENTE
    const [datosCorrectos, setDatosCorrectos] = useState(false);
    //CONTROLA QUE EL INPUT DE EMAIL TENGA DATOS CORRECTOS
    const [comprobarEmail , setComprobarEmail] = useState(false);
    //CONTROLA QUE EL INPUT DE CONTRASEÑA TENGA DATOS CORRECTOS
    const [comprobarContraseña , setComprobarContraseña] = useState(false);
    //COMPROBAR DNI INTRODUCIDO
    const [comprobarDNI, setComprobarDNI] = useState(false);
    //COMPROBAR NOMBRE INTRODUCIDO
    const [comprobarNombre, setComprobarNombre] = useState(false);
    //COMPROBAR APELLIDOS INTRODUCIDO
    const [comprobarApellidos, setComprobarApellidos] = useState(false);
    //COMPROBAR DIRECCION INTRODUCIDA
    const [comprobarDireccion, setComprobarDireccion] = useState(false);
    //COMPROBAR CIUDAD INTRODUCIDA
    const [comprobarCiudad, setComprobarCiudad] = useState(false);
    //COMPROBAR TELEFONO INTRODUCIDO
    const [comprobarTelefono, setComprobarTelefono] = useState(false);
    //COMPROBAR ROL INTRODUCIDO
    const [comprobarRol, setComprobarRol] = useState(false);

    const guardarDatosRegistro = (e) =>{
        setDatosRegistro({...datosRegistro, [e.target.name]: e.target.value})
    }

    const registrarUsuario = async () =>{

        try {
            //CREO USUARIO NUEVO
            let res = await axios.post("https://aramossanchez-videoclub-api.herokuapp.com/usuarios/registro", datosRegistro, config);
            
            //DEJO VACIOS LOS DATOS EN EL HOOK
            setDatosRegistro(({}));

            //VACIO LOS INPUTS
            let inputs = document.getElementById("cuadro-registro").childNodes
            for (let i = 0; i < inputs.length; i++) {
                inputs[i].value = "";
            }

            //SETEO MENSAJE DE USUARIO CREADO CORRECTAMENTE, Y DESPUES LO DEJO VACÍO
            setmensajeError("Usuario creado correctamente.");
            setTimeout(() => {
                setmensajeError("");
            }, 4000);
        } catch (error) {
            //SETEO MENSAJE DE ERROR, Y LO DEJO VACIO TRAS 4 SEGUNDOS
            setmensajeError("Ha habido un error al intentar crear un usuario nuevo.");
            setTimeout(() => {
                setmensajeError("");
            }, 4000);
        }
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//CONTROL DE ENTRADA DE DATOS
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //COMPRUEBA CADA VEZ QUE SE ACTUALIZA ALGUN INPUT SI ESTÁN TODOS LOS INPUTS CORRECTOS REVISANDO LOS HOOKS. SI LO ESTÁN, HABILITA EL BOTON
    useEffect(()=>{
        if (comprobarContraseña && comprobarEmail && comprobarRol && comprobarDNI && comprobarNombre && comprobarApellidos && comprobarDireccion && comprobarCiudad && comprobarTelefono) {
            setDatosCorrectos(true);
        }else{
            setDatosCorrectos(false);
        }
    }, [datosRegistro]);

    //FUNCION PARA CONTROLAR ENTRADA DE EMAIL. SI EL CORREO ESTA OK SETEA HOOK A TRUE
    const entradaEmail = (e) =>{
        let er = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
        if(er.test(e.target.value)){
            setComprobarEmail(true);
        }else{
            setComprobarEmail(false);
        }
    }

    //FUNCION PARA CONTROLAR ENTRADA DE CONTRASEÑA. SI LA CONTRASEÑA ESTA OK SETEA HOOK A TRUE
    const entradaContraseña = (e) =>{
        if (e.target.value.length < 8) {
            setComprobarContraseña(false);
        }else{
            setComprobarContraseña(true);
        }
    }

    //COMPROBAR ENTRADA DE DNI
    const entradaDNI = (e) =>{
        let er = /^\d{8}[a-zA-Z]$/;
        if (er.test(e.target.value)) {
            setComprobarDNI(true);
        }else{
            setComprobarDNI(false);
        }
    }

    //COMPROBAR ENTRADA DE NOMBRE
    const entradaNombre = (e) =>{
        let er = /^([a-z ñáéíóú]{2,60})$/i;
        if(er.test(e.target.value)){
            setComprobarNombre(true);
        }
        else{
            setComprobarNombre(false);
        }
    }

    //COMPROBAR ENTRADA DE APELLIDOS
    const entradaApellidos = (e) =>{
        let er = /^([a-z ñáéíóú]{2,60})$/i;
        if (er.test(e.target.value)) {
            setComprobarApellidos(true);
        }else{
            setComprobarApellidos(false);
        }
    }

    //COMPROBAR ENTRADA DE DIRECCION
    const entradaDireccion = (e) =>{
        if (e.target.value.length > 0) {
            setComprobarDireccion(true);
        }else{
            setComprobarDireccion(false);
        }
    }

    //COMPROBAR ENTRADA DE CIUDAD
    const entradaCiudad = (e) =>{
        let er = /Valencia|Getafe|Albacete/;
        if (er.test(e.target.value)) {
            setComprobarCiudad(true);
        }else{
            setComprobarCiudad(false);
        }
    }

    //COMPROBAR ENTRADA DE TELEFONO
    const entradaTelefono = (e) =>{
        let er = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
        if (er.test(e.target.value) && e.target.value.length > 12) {
            setComprobarTelefono(true);
        }else{
            setComprobarTelefono(false);
        }
    }
    
    //COMPROBAR ENTRADA DE ROL
    const entradaRol = (e) =>{
        let er = /usuario|administrador/;
        if (er.test(e.target.value)){
            setComprobarRol(true);
        }else{
            setComprobarRol(false);
        }
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//RETURN
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    if (props.datosLogin.usuario.rol !== "administrador") {
        return(
            <PantallaError/>
        )
    } else{
        return(
            <div id="container-registro">
                <Lateral/>
                <div id="contenido-registro">
                    <h2>Registrar Usuario</h2>
                    {/* SI mensajeError ESTÁ VACIO NO MUESTRA NADA. SI TIENE ALGO, MUESTRA EL MENSAJE */}
                    {!mensajeError
                    ?
                    ""
                    :
                    <div className="mensaje-error">{mensajeError}</div>    
                    }
                    <div id="cuadro-registro">
                        <input autoComplete="off" placeholder="Correo electrónico" type="email" name="correo" id="correo-registro" onChange={(e)=>{guardarDatosRegistro(e); entradaEmail(e)}}/>
                        <input autoComplete="off" placeholder="Contraseña" type="password" name="clave" id="clave-registro" onChange={(e)=>{guardarDatosRegistro(e); entradaContraseña(e)}}/>
                        <input autoComplete="off" placeholder="DNI de usuario" type="text" name="dni" id="dni-registro" onChange={(e)=>{guardarDatosRegistro(e); entradaDNI(e)}}/>
                        <input autoComplete="off" placeholder="Nombre de usuario" type="text" name="nombre" id="nombre-registro" onChange={(e)=>{guardarDatosRegistro(e); entradaNombre(e)}}/>
                        <input autoComplete="off" placeholder="Apellidos de usuario" type="text" name="apellidos" id="apellidos-registro" onChange={(e)=>{guardarDatosRegistro(e); entradaApellidos(e)}}/>
                        <input autoComplete="off" placeholder="Dirección (calle, portal y piso)" type="text" name="direccion" id="direccion-registro" onChange={(e)=>{guardarDatosRegistro(e); entradaDireccion(e)}}/>
                        <input autoComplete="off" placeholder="Ciudad (Valencia, Getafe o Albacete)" type="text" name="ciudad" id="ciudad-registro" onChange={(e)=>{guardarDatosRegistro(e); entradaCiudad(e)}}/>
                        <input autoComplete="off" placeholder="Telefono (+XX-XXXXXXXXX)" type="text" name="telefono" id="telefono-registro" onChange={(e)=>{guardarDatosRegistro(e); entradaTelefono(e)}}/>
                        <input autoComplete="off" placeholder="Rol (usuario o administrador)" type="text" name="rol" id="rol-registro" onChange={(e)=>{guardarDatosRegistro(e); entradaRol(e)}}/>
                    </div>
                    <div className={datosCorrectos ? "boton" : "boton deshabilitado"} onClick={()=>registrarUsuario()}>CREAR USUARIO NUEVO</div>
                </div>
            </div>
        )
    }
};

export default connect((state)=>({
    datosLogin: state.datosLogin
}))(RegistroUsuarios);