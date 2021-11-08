import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './Admin.css';
import lupa from '../../img/lupa.png';

const Admin = () =>{

    //DATOS ESENCIALES PARA LAS CONSULTAS CON TOKEN

        //RECUPERAMOS TOKEN
        let token = localStorage.getItem("token");

        //CREAMOS LA CONFIGURACIÓN DEL HEADER QUE SE VA A MANDAR
        let config = {
            headers: { Authorization: `Bearer ${token}` }
        };

    //HOOKS
    //REGISTRO DE USUARIOS
    const [datosRegistro, setDatosRegistro] = useState ({});

    //USUARIO POR ID
    //DATOS DEL USUARIO BUSCADO
    const [usuarioID, setUsuarioID] = useState({
        correo:"",
        nombre:"",
        ciudad:"",
        createdAt:""
    });
    //ID CON EL QUE BUSCAREMOS AL USUARIO
    const [IDbusqueda, setIDbusqueda] = useState(0);

    //ACTUALIZAR DATOS DE USUARIO
    const [datosParaActualizar, setdatosParaActualizar] = useState(
        {
            correo:"",
            nombre:"",
            ciudad:"",
            createdAt:""
        }
    );

    //LISTADO DE USUARIOS
    const [datosTodosUsuarios, setDatosTodosUsuarios] = useState ([]);

    //CADA VEZ QUE SE CAMBIA EL HOOK DE usuarioID, SE ACTUALIZAN LOS CAMPOS DE datosParaActualizar CON ESOS CAMBIOS
    useEffect(()=>{
        setdatosParaActualizar(
            {
                correo: usuarioID.correo,
                nombre: usuarioID.nombre,
                ciudad: usuarioID.ciudad,
                createdAt: usuarioID.createdAt
            }
        )
    },[usuarioID]);

    //HANDLERS
    //REGISTRO DE USUARIOS
    const guardarDatosRegistro = (e) =>{
        setDatosRegistro({...datosRegistro, [e.target.name]: e.target.value})
    };

    //USUARIO POR ID
    //GUARDAR ID EN HOOK
    const guardarID = (e) =>{
        setIDbusqueda(e.target.value);
    }
    //OBTENER DATOS DEL USUARIO POR ID
    const obtenerUsuarioPorID = async () =>{
        let res = await axios.get(`https://aramossanchez-videoclub-api.herokuapp.com/usuarios/${IDbusqueda}`, config);
        setUsuarioID(res.data);
    }

    //ACTUALIZAR USUARIOS
    //RELLENA LOS CAMPOS DE datosUsuario RECORRIENDO TODOS LOS INPUTS, Y DESPUES ACTUALIZA EL CAMPO SELECCIONADO CON LOS CAMBIOS QUE HACEMOS EN LOS INPUTS
    const cambiarDatosParaActualizar = (e, campo) =>{
        setUsuarioID({...usuarioID, [e.target.name]: e.target.value});
        setdatosParaActualizar({
            [campo]:e.target.value
        })
    };

    //ACTUALIZO REGISTRO DE USUARIO BUSCADO POR ID EN BASE DE DATOS
    const actualizarRegistro = async () =>{
        await axios.put(`https://aramossanchez-videoclub-api.herokuapp.com/usuarios/${usuarioID.id}`, datosParaActualizar, config)
    }

    //BORRO USUARIO BUSCADO POR ID
    const borrarRegistro = () =>{
        axios.delete(`https://aramossanchez-videoclub-api.herokuapp.com/usuarios/${usuarioID.id}`, config);
    }
    //LISTADO DE TODOS LOS USUARIOS
    const guardarListaUsuarios = async () =>{
        let res = await axios.get("https://aramossanchez-videoclub-api.herokuapp.com/usuarios",config);
        setDatosTodosUsuarios(res.data);
    }

    const registrarUsuario = async () =>{
        await axios.post("https://aramossanchez-videoclub-api.herokuapp.com/usuarios/registro", datosRegistro, config);
    }

    return(
        <div id="container-admin">
            {/* REGISTRO DE USUARIO NUEVO */}
            <div id="cuadro-registro">
                <h2>Registrar Usuario</h2>
                <input autoComplete="off" placeholder="Nombre de usuario" type="text" name="nombre" id="nombre-registro" onChange={(e)=>guardarDatosRegistro(e)}/>
                <input autoComplete="off" placeholder="Correo electrónico" type="email" name="correo" id="correo-registro" onChange={(e)=>guardarDatosRegistro(e)}/>
                <input autoComplete="off" placeholder="Contraseña" type="password" name="clave" id="clave-registro" onChange={(e)=>guardarDatosRegistro(e)}/>
                <input autoComplete="off" placeholder="Ciudad (Valencia, Getafe o Albacete)" type="text" name="ciudad" id="ciudad-registro" onChange={(e)=>guardarDatosRegistro(e)}/>
                <input autoComplete="off" placeholder="Rol (usuario o administrador)" type="text" name="rol" id="rol-registro" onChange={(e)=>guardarDatosRegistro(e)}/>
                <div  className="boton" onClick={()=>registrarUsuario()}>REGISTRAR</div>
            </div>
            {/* BUSQUEDA DE USUARIO POR ID */}
            <div id="cuadro-usuario-id">
                <h2>Buscar usuario por ID</h2>
                <div className="barra-busqueda-usuario">
                    <input type="text" name="busqueda" id="busqueda-usuario-id" autoComplete="off" onChange={(e)=>guardarID(e)}/>
                    <div className="boton-lupa"><img onClick={()=>obtenerUsuarioPorID()} src={lupa} alt="Lupa" /></div>                    
                </div>
                <div id="datos-usuario-id">
                    <p><span>Correo electrónico:</span><input readOnly type="text" name="correo" value={usuarioID.correo}/></p>
                    <p><span>Nombre:</span><input autoComplete="off" type="text" name="nombre" onChange={(e)=>cambiarDatosParaActualizar(e, "nombre")} value={datosParaActualizar.nombre}/></p>
                    <p><span>Ciudad:</span><input autoComplete="off" type="text" name="ciudad" onChange={(e)=>cambiarDatosParaActualizar(e, "ciudad")} value={datosParaActualizar.ciudad}/></p>
                    <p><span>Fecha de alta:</span><input readOnly type="text" name="createdAt" value={usuarioID.createdAt}/></p>
                </div>
                <div className="boton" onClick={()=>actualizarRegistro()}>ACTUALIZAR</div>
                <div className="boton" onClick={()=>borrarRegistro()}>BORRAR</div>
            </div>
            {/* LISTADO DE TODOS LOS USUARIOS */}
            <div id="cuadro-usuarios">
                {datosTodosUsuarios.map((usuario)=>{
                    return(
                        <div key={usuario.id} className="usuario-en-lista">
                            <p><span>ID: </span>{usuario.id}</p>
                            <p><span>Nombre: </span>{usuario.nombre}</p>
                            <p><span>Correo: </span>{usuario.correo}</p>
                            <p><span>Ciudad: </span>{usuario.ciudad}</p>
                            <p><span>Rol: </span>{usuario.rol}</p>
                            <p><span>Fecha de alta: </span>{usuario.createdAt}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
};

export default Admin;