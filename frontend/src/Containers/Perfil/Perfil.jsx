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

    //LA PRIMERA VEZ QUE CARGA EL COMPONENTE, CREO UNA COPIA DE LOS DATOS DEL USUARIO LOGUEADO EN REDUX
    useEffect(()=>{
        props.dispatch({type:COPIA_DATOS_LOGIN, payload: props.datosLogin.usuario});
        calcularFecha();
    }, [])

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
                        <p><span>DNI:</span><input autoComplete="off" type="text" name="dni" onChange={(e)=>actualizarDatos(e, "dni")} value={props.datosActualizarUsuario.dni}/></p>
                        <p><span>Nombre:</span><input autoComplete="off" type="text" name="nombre" onChange={(e)=>actualizarDatos(e, "nombre")} value={props.datosActualizarUsuario.nombre}/></p>
                        <p><span>Apellidos:</span><input autoComplete="off" type="text" name="apellidos" onChange={(e)=>actualizarDatos(e, "apellidos")} value={props.datosActualizarUsuario.apellidos}/></p>
                        <p><span>Direccion:</span><input autoComplete="off" type="text" name="direccion" onChange={(e)=>actualizarDatos(e, "direccion")} value={props.datosActualizarUsuario.direccion}/></p>
                        <p><span>Ciudad:</span><input autoComplete="off" type="text" name="ciudad" onChange={(e)=>actualizarDatos(e, "ciudad")} value={props.datosActualizarUsuario.ciudad}/></p>
                        <p><span>Telefono:</span><input autoComplete="off" type="text" name="telefono" onChange={(e)=>actualizarDatos(e, "telefono")} value={props.datosActualizarUsuario.telefono}/></p>
                        <p><span>Fecha de alta:</span><input readOnly type="text" name="createdAt" value={fechaReal}/></p>
                    </div>
                    <div className="boton" onClick={()=>actualizarRegistro()}>ACTUALIZAR TUS DATOS</div>
                </div>      
            </div>
        )
    }
}

export default connect((state)=>({
    datosLogin: state.datosLogin,
    datosActualizarUsuario: state.datosActualizarUsuario
}))(Perfil);