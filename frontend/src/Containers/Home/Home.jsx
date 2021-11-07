import React, { useState } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react/cjs/react.development';

const Home = () =>{
    
    const navigate = useNavigate();//CREADO PARA REDIRECCIONAR ENTRE CONTAINERS

    //HOOKS
    const [datosUsuario, setdatosUsuario] = useState({correo:"", clave:""});
    const [mensajeError, setmensajeError] = useState("");

    //HANDLERS
    const rellenarDatos = (e) =>{
        setdatosUsuario({...datosUsuario, [e.target.name]: e.target.value})
    }

    useEffect(()=>{
        localStorage.setItem("perfil", "visitante");
    }, [])

    //FUNCIÓN PARA LOGUEAR USUARIO
    const loguear = async () => {

        let body = {
            correo: datosUsuario.correo,
            clave: datosUsuario.clave
        };

        let res = await axios.post("https://aramossanchez-videoclub-api.herokuapp.com/usuarios/login", body);
        
        try {
            localStorage.setItem("datosLogin", JSON.stringify(res.data));
            if(res.data.usuario.rol === "administrador"){
                localStorage.setItem("perfil", "administrador");
            }else{
                localStorage.setItem("perfil", "usuario");
            }
            navigate("/perfil");
        } catch (error) {
            setmensajeError(error);
            console.log(mensajeError);
        }
    }

    return(
        <div id="container-home">
            <div id="mensaje-inicio">
                <h2>Bienvenido</h2>
            </div>
            <div id="login-inicio">
                <h2>Login</h2>
                <input type="email" name="correo" id="correo" title="correo" placeholder="Correo Electrónico" autoComplete="off" onChange={(e)=>rellenarDatos(e)}/>
                <input type="password" name="clave" id="clave" title="clave" placeholder="Contraseña" autoComplete="off" onChange={(e)=>rellenarDatos(e)}/>
                <div id="boton-login" onClick={()=>loguear()}>LOGIN</div>
                <div id="error-login">{setmensajeError}</div>
            </div>
        </div>
    )
}

export default Home;