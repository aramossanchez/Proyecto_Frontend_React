import React, {useEffect, useState} from 'react';
import Lateral from '../../Components/Lateral/Lateral';
import './BuscarUsuario.css';
import { connect } from 'react-redux';
import axios from 'axios';
import lupa from '../../img/lupa.png';
import { GUARDAR_ID_USUARIO } from '../../redux/types';

const BuscarUsuario = (props) =>{

    let config = {
        headers: { Authorization: `Bearer ${props.datosLogin.token}` }
    };

    //HOOKS
    //ID CON EL QUE BUSCAREMOS AL USUARIO
    const [IDbusqueda, setIDbusqueda] = useState(0);
    const [mensajeError, setmensajeError] = useState("");

    //DATOS DEL USUARIO BUSCADO
    const [usuarioBuscado, setUsuarioBuscado] = useState({});


    //AL CARGAR EL COMPONENTE COMPRUEBO SI idUsuarioBuscado TIENE VALOR DISTINTO DE 0. SI LO TIENE, QUE BUSQUE UN USUARIO CON ESE ID. CUANDO TERMINE TODAS LAS COMPROBACIONES, GUARDARÁ EN REDUX EL VALOR 0  
    useEffect(()=>{
        if (props.idUsuarioBuscado !== 0) {
            const buscarUsuarioDesdeListado = async () => {
            document.getElementById("busqueda-usuario-id").value = props.idUsuarioBuscado;
            let res = await axios.get(`https://aramossanchez-videoclub-api.herokuapp.com/usuarios/${props.idUsuarioBuscado}`, config);
            setUsuarioBuscado(res.data);
            setIDbusqueda(props.idUsuarioBuscado)
            }
            buscarUsuarioDesdeListado();
        } else{
            document.getElementById("busqueda-usuario-id").value = "";
        }
        props.dispatch({type:GUARDAR_ID_USUARIO, payload: 0});
    }, [])

    //GUARDO ID DE USUARIO AL ACTUALIZAR EL INPUT
    const guardarID = (e) =>{
        setIDbusqueda(e.target.value);
    }

    //GUARDAMOS EN HOOK LOS DATOS DEL USUARIO BUSCADO POR ID
    const obtenerUsuarioPorID = async () => {
        let res = await axios.get(`https://aramossanchez-videoclub-api.herokuapp.com/usuarios/${IDbusqueda}`, config);
        setUsuarioBuscado(res.data);
    }

    //LOS CAMBIOS EN LOS INPUTS CAMBIAN EL HOOK DONDE GUARDAMOS LOS DATOS QUE VAMOS A ACTUALIZAR DEL USUARIO
    const cambiarDatosParaActualizar = (e) =>{
        setUsuarioBuscado({...usuarioBuscado, [e.target.name]: e.target.value})
    }

    const actualizarRegistro = async () =>{
        try {
            let res = await axios.put(`https://aramossanchez-videoclub-api.herokuapp.com/usuarios/${IDbusqueda}`, usuarioBuscado, config);            
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

    const borrarRegistro = async () =>{
        try {
            //BORRO USUARIO EN BASE DE DATOS
            await axios.delete(`https://aramossanchez-videoclub-api.herokuapp.com/usuarios/${IDbusqueda}`, config);
            
            //BORRO CONTENIDO DE TODOS LOS INPUTS
            let parrafos = document.getElementById("datos-usuario-id").childNodes            
            for (let i = 0; i < parrafos.length; i++) {
                parrafos[i].childNodes[1].value = "";
            }

            //SETEO A VACIO EL USUARIO BUSCADO
            setUsuarioBuscado({});

            //SETEAMOS MENSAJE INDICANDO QUE EL CAMBIO SE HA EFECTUADO CORRECTAMENTE
            setmensajeError("Usuario borrado correctamente.");

            //TRAS 4 SEGUNDOS, HAGO DESAPARECER EL MENSAJE
            setTimeout(() => {
                setmensajeError("");
            }, 4000);

            
        } catch (error) {
            //SETEO MENSAJE DE ERROR
            setmensajeError("Ha habido un error al intentar borrar el usuario.");

            //TRAS 4 SEGUNDOS, HAGO DESAPARECER EL MENSAJE
            setTimeout(() => {
                setmensajeError("");
            }, 4000);            
        }
        
    }


    return(
        <div id="container-buscar-usuario">
            <Lateral/>
            {/* BUSQUEDA DE USUARIO POR ID */}
            <div id="cuadro-usuario-id">
                <h2>Buscar usuario por ID</h2>
                {/* SI mensajeError ESTÁ VACIO NO MUESTRA NADA. SI TIENE ALGO, MUESTRA EL MENSAJE */}
                {!mensajeError
                ?
                ""
                :
                <div className="mensaje-error">{mensajeError}</div>    
                }
                <div className="barra-busqueda-usuario">
                    <input type="text" name="busqueda" id="busqueda-usuario-id" autoComplete="off" onChange={(e)=>guardarID(e)}/>
                    <div className="boton-lupa"><img onClick={()=>obtenerUsuarioPorID()} src={lupa} alt="Lupa" /></div>                    
                </div>
                <div id="datos-usuario-id">
                    <p><span>Correo electrónico:</span><input readOnly type="text" name="correo" value={usuarioBuscado.correo}/></p>
                    <p><span>DNI:</span><input autoComplete="off" type="text" name="dni" onChange={(e)=>cambiarDatosParaActualizar(e, "dni")} value={usuarioBuscado.dni}/></p>
                    <p><span>Nombre:</span><input autoComplete="off" type="text" name="nombre" onChange={(e)=>cambiarDatosParaActualizar(e, "nombre")} value={usuarioBuscado.nombre}/></p>
                    <p><span>Apellidos:</span><input autoComplete="off" type="text" name="apellidos" onChange={(e)=>cambiarDatosParaActualizar(e, "apellidos")} value={usuarioBuscado.apellidos}/></p>
                    <p><span>Direccion:</span><input autoComplete="off" type="text" name="direccion" onChange={(e)=>cambiarDatosParaActualizar(e, "direcccion")} value={usuarioBuscado.direccion}/></p>
                    <p><span>Ciudad:</span><input autoComplete="off" type="text" name="ciudad" onChange={(e)=>cambiarDatosParaActualizar(e, "ciudad")} value={usuarioBuscado.ciudad}/></p>
                    <p><span>Telefono:</span><input autoComplete="off" type="text" name="telefono" onChange={(e)=>cambiarDatosParaActualizar(e, "telefono")} value={usuarioBuscado.telefono}/></p>
                    <p><span>Fecha de alta:</span><input readOnly type="text" name="createdAt" value={usuarioBuscado.createdAt}/></p>
                </div>
                <div id="botones-buscar-usuario">
                    <div className="boton" onClick={()=>actualizarRegistro()}>ACTUALIZAR DATOS DE USUARIO</div>
                    <div className="boton" onClick={()=>borrarRegistro()}>BORRAR USUARIO</div>
                </div>
                
            </div>
        </div>
    )
};

export default connect((state)=>({
    datosLogin: state.datosLogin,
    idUsuarioBuscado: state.idUsuarioBuscado
}))(BuscarUsuario);