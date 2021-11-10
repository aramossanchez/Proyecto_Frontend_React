import React from 'react';
import Lateral from '../../Components/Lateral/Lateral';
import './RegistroUsuarios.css';

const RegistroUsuarios = () =>{

    const guardarDatosRegistro = () =>{

    }

    const registrarUsuario = () =>{
        
    }

    return(
        <div id="container-registro">
            <Lateral/>
            <div id="contenido-registro">
                <div id="cuadro-registro">
                    <h2>Registrar Usuario</h2>
                    <input autoComplete="off" placeholder="Correo electrónico" type="email" name="correo" id="correo-registro" onChange={(e)=>guardarDatosRegistro(e)}/>
                    <input autoComplete="off" placeholder="Contraseña" type="password" name="clave" id="clave-registro" onChange={(e)=>guardarDatosRegistro(e)}/>
                    <input autoComplete="off" placeholder="DNI de usuario" type="text" name="dni" id="dni-registro" onChange={(e)=>guardarDatosRegistro(e)}/>
                    <input autoComplete="off" placeholder="Nombre de usuario" type="text" name="nombre" id="nombre-registro" onChange={(e)=>guardarDatosRegistro(e)}/>
                    <input autoComplete="off" placeholder="Apellidos de usuario" type="text" name="apellidos" id="apellidos-registro" onChange={(e)=>guardarDatosRegistro(e)}/>
                    <input autoComplete="off" placeholder="Dirección (calle, portal y piso)" type="text" name="direccion" id="direccion-registro" onChange={(e)=>guardarDatosRegistro(e)}/>
                    <input autoComplete="off" placeholder="Ciudad (Valencia, Getafe o Albacete)" type="text" name="ciudad" id="ciudad-registro" onChange={(e)=>guardarDatosRegistro(e)}/>
                    <input autoComplete="off" placeholder="Telefono" type="text" name="telefono" id="telefono-registro" onChange={(e)=>guardarDatosRegistro(e)}/>
                    <input autoComplete="off" placeholder="Rol (usuario o administrador)" type="text" name="rol" id="rol-registro" onChange={(e)=>guardarDatosRegistro(e)}/>
                    <div  className="boton" onClick={()=>registrarUsuario()}>REGISTRAR</div>
                </div>
            </div>
        </div>
    )
};

export default RegistroUsuarios;