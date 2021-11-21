import React, {useEffect, useState} from 'react';
import Lateral from '../../Components/Lateral/Lateral';
import './BuscarPelicula.css';
import { connect } from 'react-redux';
import axios from 'axios';
import lupa from '../../img/lupa.png';
import { GUARDAR_ID_PELICULA } from '../../redux/types';
import PantallaError from '../PantallaError/PantallaError';

const BuscarPelicula = (props) =>{

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
    //COMPROBAR TITULO INTRODUCIDO
    const [comprobarTitulo, setComprobarTitulo] = useState(true);
    //COMPROBAR CARATULA INTRODUCIDA
    const [comprobarCaratula, setComprobarCaratula] = useState(true);
    //COMPROBAR IMAGEN PROMOCIONAL INTRODUCIDA
    const [comprobarImagenPromocional, setComprobarImagenPromocional] = useState(true);
    //COMPROBAR GENERO INTRODUCIDO
    const [comprobarGenero, setComprobarGenero] = useState(true);
    //COMPROBAR ACTOR PRINCIPAL INTRODUCIDO
    const [comprobarActorPrincipal, setComprobarActorPrincipal] = useState(true);
    //COMPROBAR CIUDAD INTRODUCIDA
    const [comprobarCiudad, setComprobarCiudad] = useState(true);

    //DATOS DEL USUARIO BUSCADO
    const [peliculaBuscada, setPeliculaBuscada] = useState({vacia:true});


    //AL CARGAR EL COMPONENTE COMPRUEBO SI idpeliculaBuscada TIENE VALOR DISTINTO DE 0. SI LO TIENE, QUE BUSQUE UN USUARIO CON ESE ID. CUANDO TERMINE TODAS LAS COMPROBACIONES, GUARDARÁ EN REDUX EL VALOR 0  
    useEffect(()=>{
        if (props.idPeliculaBuscada !== 0) {
            const buscarPeliculaDesdeListado = async () => {
            document.getElementById("busqueda-pelicula-id").value = props.idPeliculaBuscada;
            let res = await axios.get(`https://aramossanchez-videoclub-api.herokuapp.com/peliculas/${props.idPeliculaBuscada}`);
            setPeliculaBuscada(res.data);
            setIDbusqueda(props.idPeliculaBuscada);
            }
            buscarPeliculaDesdeListado();
        } else{
            document.getElementById("busqueda-pelicula-id").value = "";
        }
        props.dispatch({type:GUARDAR_ID_PELICULA, payload: 0});
    }, []);

    useEffect(()=>{
        if (comprobarTitulo && comprobarCaratula && comprobarImagenPromocional && comprobarGenero && comprobarCiudad && comprobarActorPrincipal) {
            setDatosCorrectos(true);
        }else{
            setDatosCorrectos(false);
        }
    }, [peliculaBuscada])

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

    //COMPROBAR ENTRADA DE TITULO
    const entradaTitulo = (e) =>{
        if((e.target.value.length > 0)){
            setComprobarTitulo(true);
        }
        else{
            setComprobarTitulo(false);
        }
    }

    //COMPROBAR ENTRADA DE CARATULA
    const entradaCaratula = (e) =>{
        let er = /^(ftp|http|https):\/\/[^ "]+$/;
        if (er.test(e.target.value)) {
            setComprobarCaratula(true);
        }else{
            setComprobarCaratula(false);
        }
    }

    //COMPROBAR ENTRADA DE IMAGEN PROMOCIONAL
    const entradaImagenPromocional = (e) =>{
        let er = /^(ftp|http|https):\/\/[^ "]+$/;
        if (er.test(e.target.value)) {
            setComprobarImagenPromocional(true);
        }else{
            setComprobarImagenPromocional(false);
        }
    }

    //COMPROBAR ENTRADA DE GENERO
    const entradaGenero = (e) =>{
        if (e.target.value.length > 0) {
            setComprobarGenero(true);
        }else{
            setComprobarGenero(false);
        }
    }

    //COMPROBAR ENTRADA DE ACTOR PRINCIPAL
    const entradaActorPrincipal = (e) =>{
        let er = /^([a-z ñáéíóú]{1,120})$/i;
        if(er.test(e.target.value)){
            setComprobarActorPrincipal(true);
        }
        else{
            setComprobarActorPrincipal(false);
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

    //GUARDO ID DE USUARIO AL ACTUALIZAR EL INPUT
    const guardarID = (e) =>{
        setIDbusqueda(e.target.value);
    }

    //GUARDAMOS EN HOOK LOS DATOS DEL USUARIO BUSCADO POR ID
    const obtenerPeliculaPorID = async () => {
        try {
            let res = await axios.get(`https://aramossanchez-videoclub-api.herokuapp.com/peliculas/${IDbusqueda}`, config);
            setPeliculaBuscada(res.data);            
        } catch (error) {
            //SETEO MENSAJE PARA MOSTRAR ERROR
            setmensajeError("Ha surgido un error al intentar buscar la película.");//TRAS 4 SEGUNDOS, SETEO MENSAJE A STRING VACIO
            setTimeout(() => {
                setmensajeError("");
            }, 4000);
        }
    }

    //LOS CAMBIOS EN LOS INPUTS CAMBIAN EL HOOK DONDE GUARDAMOS LOS DATOS QUE VAMOS A ACTUALIZAR DEL USUARIO
    const cambiarDatosParaActualizar = (e) =>{
        setPeliculaBuscada({...peliculaBuscada, [e.target.name]: e.target.value})
    }

    const actualizarPelicula = async () =>{
        try {
            let res = await axios.put(`https://aramossanchez-videoclub-api.herokuapp.com/peliculas/${IDbusqueda}`, peliculaBuscada, config);            
            //SETEAMOS MENSAJE INDICANDO QUE EL CAMBIO SE HA EFECTUADO CORRECTAMENTE
            setmensajeError("Datos actualizados correctamente.");

            //TRAS 4 SEGUNDOS, HAGO DESAPARECER EL MENSAJE
            setTimeout(() => {
                setmensajeError("");
            }, 4000);
        } catch (error) {
            //SETEO MENSAJE DE ERROR
            setmensajeError("Ha habido un error al intentar cambiar los datos de la pelicula.");

            //TRAS 4 SEGUNDOS, HAGO DESAPARECER EL MENSAJE
            setTimeout(() => {
                setmensajeError("");
            }, 4000);
        }
    }

    const borrarPelicula = async () =>{
        try {
            //BORRO PELICULA EN BASE DE DATOS
            await axios.delete(`https://aramossanchez-videoclub-api.herokuapp.com/peliculas/${IDbusqueda}`, config);
            
            //BORRO CONTENIDO DE TODOS LOS INPUTS
            let parrafos = document.getElementById("datos-pelicula-id").childNodes            
            for (let i = 0; i < parrafos.length; i++) {
                parrafos[i].childNodes[1].value = "";
            }

            //SETEO A VACIO EL USUARIO BUSCADO
            setPeliculaBuscada({});

            //SETEAMOS MENSAJE INDICANDO QUE EL CAMBIO SE HA EFECTUADO CORRECTAMENTE
            setmensajeError("Película borrada correctamente.");

            //TRAS 4 SEGUNDOS, HAGO DESAPARECER EL MENSAJE
            setTimeout(() => {
                setmensajeError("");
            }, 4000);

            
        } catch (error) {
            //SETEO MENSAJE DE ERROR
            setmensajeError("Ha habido un error al intentar borrar la película.");

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
            <div id="container-buscar-pelicula">
                <Lateral/>
                {/* BUSQUEDA DE pelicula POR ID */}
                <div id="cuadro-pelicula-id">
                    <h2>Buscar película por ID</h2>
                    {/* SI mensajeError ESTÁ VACIO NO MUESTRA NADA. SI TIENE ALGO, MUESTRA EL MENSAJE */}
                    {!mensajeError
                    ?
                    ""
                    :
                    <div className="mensaje-error">{mensajeError}</div>
                    }
                    <div className="barra-busqueda-pelicula">
                        <input type="text" name="busqueda" id="busqueda-pelicula-id" autoComplete="off" onChange={(e)=>{guardarID(e);comprobarIdBusqueda(e)}}/>
                        <div className={comprobarID ? "boton-lupa": "boton-lupa deshabilitado"}><img onClick={()=>obtenerPeliculaPorID()} src={lupa} alt="Lupa" /></div>                    
                    </div>
                    <div id="datos-pelicula-id">
                        <p><span>Título:</span><input autoComplete="off" type="text" name="titulo" onChange={(e)=>{cambiarDatosParaActualizar(e, "titulo");entradaTitulo(e)}} value={peliculaBuscada.titulo}/></p>
                        <p><span>Caratula:</span><input autoComplete="off" type="text" name="caratula" onChange={(e)=>{cambiarDatosParaActualizar(e, "caratula");entradaCaratula(e)}} value={peliculaBuscada.caratula}/></p>
                        <p><span>Imagen promocional:</span><input autoComplete="off" type="text" name="imagen_promocional" onChange={(e)=>{cambiarDatosParaActualizar(e, "imagen_promocional");entradaImagenPromocional(e)}} value={peliculaBuscada.imagen_promocional}/></p>
                        <p><span>Genero:</span><input autoComplete="off" type="text" name="genero" onChange={(e)=>{cambiarDatosParaActualizar(e, "genero");entradaGenero(e)}} value={peliculaBuscada.genero}/></p>
                        <p><span>Protagonista:</span><input autoComplete="off" type="text" name="actor_principal" onChange={(e)=>{cambiarDatosParaActualizar(e, "actor_principal");entradaActorPrincipal(e)}} value={peliculaBuscada.actor_principal}/></p>
                        <p><span>Ciudad:</span><input autoComplete="off" type="text" name="ciudad" onChange={(e)=>{cambiarDatosParaActualizar(e, "ciudad");entradaCiudad(e)}} value={peliculaBuscada.ciudad}/></p>
                        {/* INDICO QUE SI AUN NO SE HA CARGADO peliculaBuscada, NO HAGA NADA. SI SE CARGA, INDICO QUE EJECUTE LA FUNCION DE CONVERSION DE FORMATO DE FECHA */}
                        <p><span>Fecha de alta:</span><input readOnly type="text" name="createdAt" value={peliculaBuscada.createdAt !== undefined ? calcularFecha(peliculaBuscada.createdAt) : ""}/></p>
                    </div>
                    <div id="botones-buscar-pelicula">
                        <div className={!datosCorrectos || peliculaBuscada.vacia ? "boton deshabilitado" : "boton "} onClick={()=>actualizarPelicula()}>ACTUALIZAR DATOS DE PELICULA</div>
                        <div className={peliculaBuscada.vacia ? "boton deshabilitado" : "boton"} onClick={()=>borrarPelicula()}>BORRAR PELICULA</div>
                    </div>
                    
                </div>
            </div>
        )
    }
};

export default connect((state)=>({
    datosLogin: state.datosLogin,
    idPeliculaBuscada: state.idPeliculaBuscada
}))(BuscarPelicula);