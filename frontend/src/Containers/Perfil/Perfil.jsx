import React, {useState, useEffect} from 'react';
import './Perfil.css';
import axios from 'axios';
import Lateral from '../../Components/Lateral/Lateral';
import FotoUsuario from '../../img/usuario.png';
import { connect } from 'react-redux';
import { COPIA_DATOS_LOGIN, GUARDA_CAMBIOS_ACTUALIZAR, ACTUALIZA_DATOS_LOGIN } from '../../redux/types';
import PantallaError from '../PantallaError/PantallaError';

const Perfil = (props) =>{

    //HOOK
    //MENSAJE DE ERROR O DE TODO OK
    const [mensajeError, setmensajeError] = useState("");
    //GUARDO FECHA CONVERTIDA A FORMATO ESPAÑOL 
    const [fechaReal, setFechaReal] = useState("");
    //TODOS LOS CAMPOS SE HAN INTRODUCIDO CORRECTAMENTE
    const [datosCorrectos, setDatosCorrectos] = useState(false);
    //COMPROBAR DNI INTRODUCIDO
    const [comprobarDNI, setComprobarDNI] = useState(true);
    //COMPROBAR NOMBRE INTRODUCIDO
    const [comprobarNombre, setComprobarNombre] = useState(true);
    //COMPROBAR APELLIDOS INTRODUCIDO
    const [comprobarApellidos, setComprobarApellidos] = useState(true);
    //COMPROBAR DIRECCION INTRODUCIDA
    const [comprobarDireccion, setComprobarDireccion] = useState(true);
    //COMPROBAR CIUDAD INTRODUCIDA
    const [comprobarCiudad, setComprobarCiudad] = useState(true);
    //COMPROBAR TELEFONO INTRODUCIDO
    const [comprobarTelefono, setComprobarTelefono] = useState(true);

    //LA PRIMERA VEZ QUE CARGA EL COMPONENTE, CREO UNA COPIA DE LOS DATOS DEL USUARIO LOGUEADO EN REDUX
    useEffect(()=>{
        props.dispatch({type:COPIA_DATOS_LOGIN, payload: props.datosLogin.usuario});
        calcularFecha();
    }, [])

    //COMPRUEBA CADA VEZ QUE SE ACTUALIZA ALGUN INPUT SI ESTÁN TODOS LOS INPUTS CORRECTOS REVISANDO LOS HOOKS. SI LO ESTÁN, HABILITA EL BOTON
    useEffect(()=>{
        if (comprobarDNI && comprobarNombre && comprobarApellidos && comprobarDireccion && comprobarCiudad && comprobarTelefono) {
            setDatosCorrectos(true);
        }else{
            setDatosCorrectos(false);
        }
    }, [props.datosActualizarUsuario])

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

    

    //CAMBIA LOS VALORES GUARDADOS DE LA COPIA DE DATOS DE USUARIO LOGUEADO POR LOS DE LOS INPUT
    const actualizarDatos = (e, propiedad) =>{
        props.dispatch({type:GUARDA_CAMBIOS_ACTUALIZAR, payload: {propiedad: propiedad, valor:e.target.value}});
    };

    const actualizarRegistro = async () =>{
        //CREAMOS LA CONFIGURACIÓN DEL HEADER QUE SE VA A MANDAR
        let config = {
            headers: { Authorization: `Bearer ${props.datosLogin.token}` }
        };

        try {
            //MODIFICO USUARIO EN LA BASE DE DATOS
            let res = await axios.put(`https://aramossanchez-videoclub-api.herokuapp.com/usuarios/${props.datosLogin.usuario.id}`, props.datosActualizarUsuario, config)
            
            //CAMBIO LOS DATOS DE USUARIO LOGUEADO GUARDADOS POR LOS DATOS ACTUALES DEL USUARIO, TRAS ACTUALIZARLOS
            props.dispatch({type:ACTUALIZA_DATOS_LOGIN, payload: props.datosActualizarUsuario});

            //SETEAMOS MENSAJE INDICANDO QUE EL CAMBIO SE HA EFECTUADO CORRECTAMENTE
            setmensajeError("Datos actualizados correctamente.");

            //TRAS 4 SEGUNDOS, HAGO DESAPARECER EL MENSAJE
            setTimeout(() => {
                setmensajeError("");
            }, 4000);            
        } catch (error) {
            //SETEO MENSAJE DE ERROR
            setmensajeError("Ha habido un error al intentar cambiar los datos del usuario.");

            //TRAS 4 SEGUNDOS, HAGO DESAPARECER EL MENSAJE
            setTimeout(() => {
                setmensajeError("");
            }, 4000);
        }
        
    }

    //TRADUCE FECHA DE FORMATO BBDD A FORMATO ESPAÑOL
    const calcularFecha = () =>{
        let fechaBBDD = props.datosLogin.usuario.createdAt.split(/[- : T .]/);
        let fechaProvisional = [fechaBBDD[2], fechaBBDD[1], fechaBBDD[0]];
        setFechaReal(fechaProvisional.join('-'));
    }

    if (props.datosLogin.usuario.rol !== "usuario") {
        return(
            <PantallaError/>
        )
    } else{
        return(
            <div id="container-perfil">
                <Lateral/>
                <div id="container-usuario">
                    {/* SI mensajeError ESTÁ VACIO NO MUESTRA NADA. SI TIENE ALGO, MUESTRA EL MENSAJE */}
                    {!mensajeError
                    ?
                    ""
                    :
                    <div className="mensaje-error">{mensajeError}</div>    
                    }
                    <h2>Tus Datos</h2>
                    <div id="datos-usuario">
                        <div id="foto-usuario"><img src={FotoUsuario} alt="Foto de usuario" /></div>
                        <p><span>Correo electrónico:</span><input readOnly type="text" name="correo" value={props.datosLogin.usuario.correo}/></p>
                        <p><span>DNI:</span><input autoComplete="off" type="text" name="dni" onChange={(e)=>{actualizarDatos(e, "dni"); entradaDNI(e)}} value={props.datosActualizarUsuario.dni}/></p>
                        <p><span>Nombre:</span><input autoComplete="off" type="text" name="nombre" onChange={(e)=>{actualizarDatos(e, "nombre"); entradaNombre(e)}} value={props.datosActualizarUsuario.nombre}/></p>
                        <p><span>Apellidos:</span><input autoComplete="off" type="text" name="apellidos" onChange={(e)=>{actualizarDatos(e, "apellidos"); entradaApellidos(e)}} value={props.datosActualizarUsuario.apellidos}/></p>
                        <p><span>Direccion:</span><input autoComplete="off" type="text" name="direccion" onChange={(e)=>{actualizarDatos(e, "direccion"); entradaDireccion(e)}} value={props.datosActualizarUsuario.direccion}/></p>
                        <p><span>Ciudad:</span><input autoComplete="off" type="text" name="ciudad" onChange={(e)=>{actualizarDatos(e, "ciudad");entradaCiudad(e)}} value={props.datosActualizarUsuario.ciudad}/></p>
                        <p><span>Telefono:</span><input autoComplete="off" type="text" name="telefono" onChange={(e)=>{actualizarDatos(e, "telefono"); entradaTelefono(e)}} value={props.datosActualizarUsuario.telefono}/></p>
                        <p><span>Fecha de alta:</span><input readOnly type="text" name="createdAt" value={fechaReal}/></p>
                    </div>
                    <div className={datosCorrectos ? "boton" : "boton deshabilitado"} onClick={()=>actualizarRegistro()}>ACTUALIZAR TUS DATOS</div>
                </div>      
            </div>
        )
    }
}

export default connect((state)=>({
    datosLogin: state.datosLogin,
    datosActualizarUsuario: state.datosActualizarUsuario
}))(Perfil);