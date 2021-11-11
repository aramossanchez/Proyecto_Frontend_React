import React, {useState} from 'react';
import Lateral from '../../Components/Lateral/Lateral';
import './RegistroUsuarios.css';
import { connect } from 'react-redux';
import axios from 'axios';

const RegistroUsuarios = (props) =>{

    let config = {
        headers: { Authorization: `Bearer ${props.datosLogin.token}` }
    };

    //HOOKS
    //REGISTRO DE USUARIOS
    const [datosRegistro, setDatosRegistro] = useState ({});

    const guardarDatosRegistro = (e) =>{
        setDatosRegistro({...datosRegistro, [e.target.name]: e.target.value})
    }

    const registrarUsuario = async () =>{
        
        //CREO USUARIO NUEVO
        await axios.post("https://aramossanchez-videoclub-api.herokuapp.com/usuarios/registro", datosRegistro, config);
        
        //DEJO VACIOS LOS DATOS EN EL HOOK
        setDatosRegistro(({}));

        //VACIO LOS INPUTS
        let inputs = document.getElementById("cuadro-registro").childNodes
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].value = "";
        }

    }

    return(
        <div id="container-registro">
            <Lateral/>
            <div id="contenido-registro">
                <h2>Registrar Usuario</h2>
                <div id="cuadro-registro">
                    <input autoComplete="off" placeholder="Correo electrónico" type="email" name="correo" id="correo-registro" onChange={(e)=>guardarDatosRegistro(e)}/>
                    <input autoComplete="off" placeholder="Contraseña" type="password" name="clave" id="clave-registro" onChange={(e)=>guardarDatosRegistro(e)}/>
                    <input autoComplete="off" placeholder="DNI de usuario" type="text" name="dni" id="dni-registro" onChange={(e)=>guardarDatosRegistro(e)}/>
                    <input autoComplete="off" placeholder="Nombre de usuario" type="text" name="nombre" id="nombre-registro" onChange={(e)=>guardarDatosRegistro(e)}/>
                    <input autoComplete="off" placeholder="Apellidos de usuario" type="text" name="apellidos" id="apellidos-registro" onChange={(e)=>guardarDatosRegistro(e)}/>
                    <input autoComplete="off" placeholder="Dirección (calle, portal y piso)" type="text" name="direccion" id="direccion-registro" onChange={(e)=>guardarDatosRegistro(e)}/>
                    <input autoComplete="off" placeholder="Ciudad (Valencia, Getafe o Albacete)" type="text" name="ciudad" id="ciudad-registro" onChange={(e)=>guardarDatosRegistro(e)}/>
                    <input autoComplete="off" placeholder="Telefono" type="text" name="telefono" id="telefono-registro" onChange={(e)=>guardarDatosRegistro(e)}/>
                    <input autoComplete="off" placeholder="Rol (usuario o administrador)" type="text" name="rol" id="rol-registro" onChange={(e)=>guardarDatosRegistro(e)}/>
                </div>
                <div  className="boton" onClick={()=>registrarUsuario()}>REGISTRAR</div>
            </div>
        </div>
    )
};

export default connect((state)=>({
    datosLogin: state.datosLogin
}))(RegistroUsuarios);