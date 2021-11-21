import React, {useState, useEffect} from 'react';
import Lateral from '../../Components/Lateral/Lateral';
import './RegistroPeliculas.css';
import { connect } from 'react-redux';
import axios from 'axios';
import PantallaError from '../PantallaError/PantallaError';

const RegistroPeliculas = (props) =>{

    let config = {
        headers: { Authorization: `Bearer ${props.datosLogin.token}` }
    };

    //HOOKS
    //REGISTRO DE USUARIOS
    const [datosRegistro, setDatosRegistro] = useState ({});
    const [mensajeError, setmensajeError] = useState("");

    //TODOS LOS CAMPOS SE HAN INTRODUCIDO CORRECTAMENTE
    const [datosCorrectos, setDatosCorrectos] = useState(false);
    //COMPROBAR TITULO INTRODUCIDO
    const [comprobarTitulo, setComprobarTitulo] = useState(false);
    //COMPROBAR CARATULA INTRODUCIDA
    const [comprobarCaratula, setComprobarCaratula] = useState(false);
    //COMPROBAR IMAGEN PROMOCIONAL INTRODUCIDA
    const [comprobarImagenPromocional, setComprobarImagenPromocional] = useState(false);
    //COMPROBAR GENERO INTRODUCIDO
    const [comprobarGenero, setComprobarGenero] = useState(false);
    //COMPROBAR ACTOR PRINCIPAL INTRODUCIDO
    const [comprobarActorPrincipal, setComprobarActorPrincipal] = useState(false);
    //COMPROBAR CIUDAD INTRODUCIDA
    const [comprobarCiudad, setComprobarCiudad] = useState(false);
    //COMPROBAR SINOPSIS INTRODUCIDA
    const [comprobarSinopsis, setComprobarSinopsis] = useState(false);
    //COMPROBAR ALQUILADA INTRODUCIDA
    const [comprobarAlquilada, setComprobarAlquilada] = useState(false);

    //SE VAN GUARDANDO LOS CAMBIOS EN DATOS REGISTRO, EN FUNCION DE MODIFICACIONES EN LOS INPUTS
    const guardarDatosRegistro = (e) =>{
        setDatosRegistro({...datosRegistro, [e.target.name]: e.target.value})
        console.log(datosCorrectos)
    }

    //GUARDAMOS PELICULA NUEVA EN BASE DE DATOS
    const registrarPelicula = async () =>{

        try {
            //CREO PELICULA NUEVA
            let res = await axios.post("https://aramossanchez-videoclub-api.herokuapp.com/peliculas", datosRegistro, config);
            
            //DEJO VACIOS LOS DATOS EN EL HOOK
            setDatosRegistro(({}));

            //VACIO LOS INPUTS
            let inputs = document.getElementById("cuadro-registro-pelicula").childNodes
            for (let i = 0; i < inputs.length; i++) {
                inputs[i].value = "";
            }

            //SETEO MENSAJE DE PELICULA CREADA CORRECTAMENTE, Y DESPUES LO DEJO VACÍO
            setmensajeError("Película creada correctamente.");
            setTimeout(() => {
                setmensajeError("");
            }, 4000);
        } catch (error) {
            //SETEO MENSAJE DE ERROR, Y LO DEJO VACIO TRAS 4 SEGUNDOS
            setmensajeError("Ha habido un error al intentar crear una película nueva.");
            setTimeout(() => {
                setmensajeError("");
            }, 4000);
        }
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//CONTROL DE ENTRADA DE DATOS
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //COMPRUEBA CADA VEZ QUE SE ACTUALIZA ALGUN INPUT, SI ESTÁN TODOS LOS INPUTS CORRECTOS REVISANDO LOS HOOKS. SI LO ESTÁN, HABILITA EL BOTON
    useEffect(()=>{
        if (comprobarTitulo && comprobarCaratula && comprobarImagenPromocional && comprobarGenero && comprobarActorPrincipal && comprobarCiudad && comprobarSinopsis && comprobarAlquilada) {
            setDatosCorrectos(true);
        }else{
            setDatosCorrectos(false);
        }
    }, [datosRegistro]);

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

    //COMPROBAR ENTRADA DE SINOPSIS
    const entradaSinopsis = (e) =>{
        if (e.target.value.length > 10 && e.target.value.length < 500) {
            setComprobarSinopsis(true);
        }else{
            setComprobarSinopsis(false);
        }
    }
    
    //COMPROBAR ENTRADA DE ALQUILADA
    const entradaAlquilada = (e) =>{
        if (e.target.value === "false") {
            setComprobarAlquilada(true);
        }else{
            setComprobarAlquilada(false);
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
            <div id="container-registro-pelicula">
                <Lateral/>
                <div id="contenido-registro-pelicula">
                    <h2>Registrar Película</h2>
                    {/* SI mensajeError ESTÁ VACIO NO MUESTRA NADA. SI TIENE ALGO, MUESTRA EL MENSAJE */}
                    {!mensajeError
                    ?
                    ""
                    :
                    <div className="mensaje-error">{mensajeError}</div>    
                    }
                    <div id="cuadro-registro-pelicula">
                        <input autoComplete="off" placeholder="Título" type="text" name="titulo" id="titulo-registro" onChange={(e)=>{guardarDatosRegistro(e); entradaTitulo(e)}}/>
                        <input autoComplete="off" placeholder="Carátula (introduce URL de imagen vertical)" type="text" name="caratula" id="caratula-registro" onChange={(e)=>{guardarDatosRegistro(e); entradaCaratula(e)}}/>
                        <input autoComplete="off" placeholder="Imagen promocional (introduce URL de imagen horizontal)" type="text" name="imagen_promocional" id="imagen_promocional-registro" onChange={(e)=>{guardarDatosRegistro(e); entradaImagenPromocional(e)}}/>
                        <input autoComplete="off" placeholder="Género" type="text" name="genero" id="genero-registro" onChange={(e)=>{guardarDatosRegistro(e); entradaGenero(e)}}/>
                        <input autoComplete="off" placeholder="Actor principal" type="text" name="actor_principal" id="actor_principal-registro" onChange={(e)=>{guardarDatosRegistro(e); entradaActorPrincipal(e)}}/>
                        <input autoComplete="off" placeholder="Ciudad (Valencia, Getafe o Albacete)" type="text" name="ciudad" id="ciudad-pelicula-registro" onChange={(e)=>{guardarDatosRegistro(e); entradaCiudad(e)}}/>
                        <input autoComplete="off" placeholder="Alquilada (false)" type="text" name="alquilada" id="alquilada-pelicula-registro" onChange={(e)=>{guardarDatosRegistro(e); entradaAlquilada(e)}}/>
                        <textarea autoComplete="off" placeholder="Sinopsis (entre 10 y 500 palabras)" name="sinopsis" id="sinopsis-registro" onChange={(e)=>{guardarDatosRegistro(e); entradaSinopsis(e)}}/>
                    </div>
                    <div className={datosCorrectos ? "boton" : "boton deshabilitado"} onClick={()=>registrarPelicula()}>CREAR PELICULA NUEVA</div>
                </div>
            </div>
        )
    }
};

export default connect((state)=>({
    datosLogin: state.datosLogin
}))(RegistroPeliculas);