import React, {useEffect, useState} from 'react';
import Lateral from '../../Components/Lateral/Lateral';
import './BuscarUsuario.css';
import { connect } from 'react-redux';
import axios from 'axios';
import lupa from '../../img/lupa.png';
import { GUARDAR_ID_USUARIO } from '../../redux/types';
import PantallaError from '../PantallaError/PantallaError';

const BuscarUsuario = (props) =>{

    let config = {
        headers: { Authorization: `Bearer ${props.datosLogin.token}` }
    };

    //HOOKS
    //ID CON EL QUE BUSCAREMOS AL USUARIO
    const [IDbusqueda, setIDbusqueda] = useState(0);
    const [mensajeError, setmensajeError] = useState("");
    
    //COMPROBAR ID INTRODUCIDO
    const [comprobarID, setComprobarID] = useState(false);
    
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

    //DATOS DEL USUARIO BUSCADO. SE CREA CON PROPIEDAD vacio PARA SABER SI ESTÁ EN ESTADO INICIAL
    const [usuarioBuscado, setUsuarioBuscado] = useState({vacio:true});


    //AL CARGAR EL COMPONENTE COMPRUEBO SI idUsuarioBuscado TIENE VALOR DISTINTO DE 0. SI LO TIENE, QUE BUSQUE UN USUARIO CON ESE ID. CUANDO TERMINE TODAS LAS COMPROBACIONES, GUARDARÁ EN REDUX EL VALOR 0  
    useEffect(()=>{
        if (props.idUsuarioBuscado !== 0) {
            const buscarUsuarioDesdeListado = async () => {
            document.getElementById("busqueda-usuario-id").value = props.idUsuarioBuscado;
            let res = await axios.get(`https://aramossanchez-videoclub-api.herokuapp.com/usuarios/${props.idUsuarioBuscado}`, config);
            setUsuarioBuscado(res.data);
            setIDbusqueda(props.idUsuarioBuscado);
            }
            buscarUsuarioDesdeListado();
        } else{
            document.getElementById("busqueda-usuario-id").value = "";console.log(datosCorrectos)
        }
        props.dispatch({type:GUARDAR_ID_USUARIO, payload: 0});
    }, []);

    useEffect(()=>{
        if (comprobarDNI && comprobarNombre && comprobarApellidos && comprobarDireccion && comprobarCiudad && comprobarTelefono) {
            setDatosCorrectos(true);
        }else{
            setDatosCorrectos(false);
        }
    }, [usuarioBuscado])

    //COMPROBAR CUADRO DE BUSQUEDA
    const comprobarIdBusqueda = (e) =>{
        let er = /^[0-9]+$/;
        if (er.test(e.target.value)) {
            setComprobarID(true);
        }else{
            setComprobarID(false);
        }
        console.log(comprobarID)
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
    //GUARDO ID DE USUARIO AL ACTUALIZAR EL INPUT
    const guardarID = (e) =>{
        setIDbusqueda(e.target.value);
    }

    //GUARDAMOS EN HOOK LOS DATOS DEL USUARIO BUSCADO POR ID
    const obtenerUsuarioPorID = async () => {
        try {
            let res = await axios.get(`https://aramossanchez-videoclub-api.herokuapp.com/usuarios/${IDbusqueda}`, config);
            setUsuarioBuscado(res.data);            
        } catch (error) {
            //SETEO MENSAJE PARA MOSTRAR ERROR
            setmensajeError("Ha surgido un error al intentar buscar el usuario.");//TRAS 4 SEGUNDOS, SETEO MENSAJE A STRING VACIO
            setTimeout(() => {
                setmensajeError("");
            }, 4000);
        }
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

    //TRADUCE FECHA DE FORMATO BBDD A FORMATO ESPAÑOL
    const calcularFecha = (fecha) =>{
        let fechaBBDD = fecha.split(/[- : T .]/);
        let fechaProvisional = [fechaBBDD[2], fechaBBDD[1], fechaBBDD[0]];
        return fechaProvisional.join('-');
    }

    if (props.datosLogin.usuario.rol !== "administrador") {
        return(
            <PantallaError/>
        )
    } else{
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
                        <input type="text" name="busqueda" id="busqueda-usuario-id" autoComplete="off" onChange={(e)=>{guardarID(e);comprobarIdBusqueda(e)}}/>
                        <div className={comprobarID ? "boton-lupa": "boton-lupa deshabilitado"}><img onClick={()=>obtenerUsuarioPorID()} src={lupa} alt="Lupa" /></div>                    
                    </div>
                    <div id="datos-usuario-id">
                        <p><span>Correo electrónico:</span><input readOnly type="text" name="correo" value={usuarioBuscado.correo}/></p>
                        <p><span>DNI:</span><input autoComplete="off" type="text" name="dni" onChange={(e)=>{cambiarDatosParaActualizar(e, "dni");entradaDNI(e)}} value={usuarioBuscado.dni}/></p>
                        <p><span>Nombre:</span><input autoComplete="off" type="text" name="nombre" onChange={(e)=>{cambiarDatosParaActualizar(e, "nombre");entradaNombre(e)}} value={usuarioBuscado.nombre}/></p>
                        <p><span>Apellidos:</span><input autoComplete="off" type="text" name="apellidos" onChange={(e)=>{cambiarDatosParaActualizar(e, "apellidos");entradaApellidos(e)}} value={usuarioBuscado.apellidos}/></p>
                        <p><span>Direccion:</span><input autoComplete="off" type="text" name="direccion" onChange={(e)=>{cambiarDatosParaActualizar(e, "direcccion");entradaDireccion(e)}} value={usuarioBuscado.direccion}/></p>
                        <p><span>Ciudad:</span><input autoComplete="off" type="text" name="ciudad" onChange={(e)=>{cambiarDatosParaActualizar(e, "ciudad");entradaCiudad(e)}} value={usuarioBuscado.ciudad}/></p>
                        <p><span>Telefono:</span><input autoComplete="off" type="text" name="telefono" onChange={(e)=>{cambiarDatosParaActualizar(e, "telefono");entradaTelefono(e)}} value={usuarioBuscado.telefono}/></p>
                        {/* INDICO QUE SI AUN NO SE HA CARGADO usuarioBuscado, NO HAGA NADA. SI SE CARGA, INDICO QUE EJECUTE LA FUNCION DE CONVERSION DE FORMATO DE FECHA */}
                        <p><span>Fecha de alta:</span><input readOnly type="text" name="createdAt" value={usuarioBuscado.createdAt !== undefined ? calcularFecha(usuarioBuscado.createdAt) : ""}/></p>
                    </div>
                    <div id="botones-buscar-usuario">
                        <div className={!datosCorrectos || usuarioBuscado.vacio ? "boton deshabilitado" : "boton"} onClick={()=>actualizarRegistro()}>ACTUALIZAR DATOS DE USUARIO</div>
                        <div className={usuarioBuscado.vacio ? "boton deshabilitado" : "boton"} onClick={()=>borrarRegistro()}>BORRAR USUARIO</div>
                    </div>
                    
                </div>
            </div>
        )
    }
};

export default connect((state)=>({
    datosLogin: state.datosLogin,
    idUsuarioBuscado: state.idUsuarioBuscado
}))(BuscarUsuario);