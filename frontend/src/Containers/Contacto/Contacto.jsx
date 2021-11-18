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
                    {registro
                    ?
                    <div id="formulario-cuenta">
                        <h3>Datos para crear una cuenta</h3>
                        <div className="cerrar-formulario" onClick={()=>cerrarFormulario()}>X</div>
                        <input autoComplete="off" placeholder="Correo electrónico" type="email" name="correo" id="correo-registro-contacto"/>
                        <input autoComplete="off" placeholder="Contraseña" type="password" name="clave" id="clave-registro-contacto"/>
                        <input autoComplete="off" placeholder="DNI de usuario" type="text" name="dni" id="dni-registro-contacto"/>
                        <input autoComplete="off" placeholder="Nombre de usuario" type="text" name="nombre" id="nombre-registro-contacto"/>
                        <input autoComplete="off" placeholder="Apellidos de usuario" type="text" name="apellidos" id="apellidos-registro-contacto"/>
                        <input autoComplete="off" placeholder="Dirección (calle, portal y piso)" type="text" name="direccion" id="direccion-registro-contacto"/>
                        <input autoComplete="off" placeholder="Ciudad (Valencia, Getafe o Albacete)" type="text" name="ciudad" id="ciudad-registro-contacto"/>
                        <input autoComplete="off" placeholder="Telefono" type="text" name="telefono" id="telefono-registro-contacto"/>
                        <input autoComplete="off" placeholder="Rol (usuario o administrador)" type="text" name="rol" id="rol-registro-contacto"/>
                        <div className="boton">Enviar datos</div>
                    </div>
                    :
                    ""
                    }
                    {pregunta
                    ?
                    <div id="formulario-pregunta">
                        <h3>Datos para mandar pregunta o sugerencia</h3>
                        <div className="cerrar-formulario" onClick={()=>cerrarFormulario()}>X</div>
                        <input autoComplete="off" placeholder="Nombre" type="text" name="nombre" id="nombre-contacto"/>
                        <input autoComplete="off" placeholder="Correo electrónico" type="email" name="correo" id="correo-contacto"/>
                        <textarea name="pregunta" id="pregunta-contacto" placeholder="Escribe aquí tu mensaje"></textarea>
                        <div className="boton">Enviar una pregunta o sugerencia</div>
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