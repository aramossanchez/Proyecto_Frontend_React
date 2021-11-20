import  React, { useState } from 'react';
import './Contacto.css';
import flecha from '../../img/flecha.png';
import { Navigate, useNavigate } from 'react-router';

const Contacto = () =>{

    const navigate = useNavigate();

    //HOOK
    //CONTROLA SI SE PULSÓ EL BOTÓN PARA CREAR UNA CUENTA
    const [registro, setRegistro] = useState(false);

    //CONTROLA SI SE PULSÓ EL BOTÓN PARA HACER UNA PREGUNTA
    const [pregunta, setPregunta] = useState(false);
    
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
    //COMPROBAR PREGUNTA INTRODUCIDA
    const [comprobarPregunta, setComprobarPregunta] = useState(false);

    //SE MUESTRA EL FORMULARIO CORRESPONDIENTE
    const mostrarFormulario = (formulario) =>{
        if(formulario === "registro"){
            setRegistro(true);
            setPregunta(false);
        }else{
            setPregunta(true);
            setRegistro(false);
        }
    }

    //SE CIERRAN LOS FORMULARIOS
    const cerrarFormulario = () =>{
        setRegistro(false);
        setPregunta(false);
    }

    //REDIRECCION A LA PAGINA DE INICIO
    const irInicio = () =>{
        navigate("/");
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//CONTROL DE ENTRADA DE DATOS
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

    //COMPROBAR ENTRADA DE PREGUNTA
    const entradaPregunta = (e) =>{
        if (e.target.value.length > 10 && e.target.value.length < 500) {
            setComprobarPregunta(true);
        }else{
            setComprobarPregunta(false);
        }
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//RETURN
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return(
        <div id="container-contacto">
            <div id="contenido-contacto">
                <h2>Contacto</h2>
                <div id="flecha-inicio" onClick={()=>irInicio()}><img src={flecha} alt="Flecha Home" /></div>
                <div id="formularios">
                    <div id="contacto-inicial">
                        <p>Si quieres crear una <span onClick={()=>mostrarFormulario("registro")}>CUENTA EN NUESTRO VIDEOCLUB</span>, pincha en este enlace y rellena los datos en el formulario correspondiente, ¡y en menos de 24 horas la tendrás creada!</p>
                        <p>Si quieres mandarnos alguna <span onClick={()=>mostrarFormulario("pregunta")}>DUDA O SUGERENCIA</span>, pincha en este enlace y dejanos tus datos y tu mensaje en el formulario correspondiente.</p>
                    </div>
                    {/* SE MUESTRA EL FORMULARIO DE REGISTRO SI SE PULSA EL ENLACE */}
                    {registro
                    ?
                    <div id="formulario-cuenta">
                        <h3>Datos para crear una cuenta</h3>
                        <div className="cerrar-formulario" onClick={()=>cerrarFormulario()}>X</div>
                        <form action="mailto:armandoramossanchez@gmail.com?subject=Alta Nueva" method="post" enctype="text/plain">
                        <input autoComplete="off" placeholder="Tu correo electrónico" type="email" name="correo" id="correo-registro-contacto" onChange={(e)=>entradaEmail(e)}/>
                        <input autoComplete="off" placeholder="Contraseña (mínimo 8 caracteres)" type="password" name="clave" id="clave-registro-contacto" onChange={(e)=>entradaContraseña(e)}/>
                        <input autoComplete="off" placeholder="Tu DNI" type="text" name="dni" id="dni-registro-contacto" onChange={(e)=>entradaDNI(e)}/>
                        <input autoComplete="off" placeholder="Tu nombre" type="text" name="nombre" id="nombre-registro-contacto" onChange={(e)=>entradaNombre(e)}/>
                        <input autoComplete="off" placeholder="Tus apellidos" type="text" name="apellidos" id="apellidos-registro-contacto" onChange={(e)=>entradaApellidos(e)}/>
                        <input autoComplete="off" placeholder="Tu dirección (calle, portal y piso)" type="text" name="direccion" id="direccion-registro-contacto" onChange={(e)=>entradaDireccion(e)}/>
                        <input autoComplete="off" placeholder="Tu ciudad (Valencia, Getafe o Albacete)" type="text" name="ciudad" id="ciudad-registro-contacto" onChange={(e)=>entradaCiudad(e)}/>
                        <input autoComplete="off" placeholder="Tu telefono" type="text" name="telefono" id="telefono-registro-contacto" onChange={(e)=>entradaTelefono(e)}/>
                        {/* SI TODOS LOS CAMPOS ESTÁN RELLENOS DE MANERA CORRECTA, HABILITO EL BOTÓN */}
                        <button className={comprobarContraseña && comprobarEmail && comprobarDNI && comprobarNombre && comprobarApellidos && comprobarDireccion && comprobarCiudad && comprobarTelefono ? "boton" : "boton deshabilitado"}>ENVIAR DATOS</button>
                        </form>
                    </div>
                    :
                    ""
                    }
                    {/* SE MUESTRA EL FORMULARIO DE PREGUNTA SI SE PULSA EL ENLACE */}
                    {pregunta
                    ?
                    <div id="formulario-pregunta">
                        <h3>Datos para mandar pregunta o sugerencia</h3>
                        <div className="cerrar-formulario" onClick={()=>cerrarFormulario()}>X</div>
                        <form action="mailto:armandoramossanchez@gmail.com?subject=Pregunta" method="post" enctype="text/plain">
                        <input autoComplete="off" placeholder="Nombre" type="text" name="nombre" id="nombre-contacto" onChange={(e)=>entradaNombre(e)}/>
                        <input autoComplete="off" placeholder="Correo electrónico" type="email" name="correo" id="correo-contacto" onChange={(e)=>entradaEmail(e)}/>
                        <textarea name="pregunta" id="pregunta-contacto" placeholder="Escribe aquí tu mensaje (mínimo 10 caracteres, máximo 500 caracteres)." onChange={(e)=>entradaPregunta(e)}></textarea>
                        <button className={comprobarNombre && comprobarEmail && comprobarPregunta ? "boton" : "boton deshabilitado"}>Enviar una pregunta o sugerencia</button>
                        </form>
                    </div>
                    :
                    ""
                    }
                </div>
            </div>
         </div>
    )
}

export default Contacto;