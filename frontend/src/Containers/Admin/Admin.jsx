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
        dni:"",
        nombre:"",
        apellidos:"",
        direccion:"",
        ciudad:"",
        telefono:"",
        createdAt:""
    });
    //ID CON EL QUE BUSCAREMOS AL USUARIO
    const [IDbusqueda, setIDbusqueda] = useState(0);

    //ACTUALIZAR DATOS DE USUARIO
    const [datosParaActualizar, setdatosParaActualizar] = useState(
        {
            correo:"",
            dni:"",
            nombre:"",
            apellidos:"",
            direccion:"",
            ciudad:"",
            telefono:"",
            createdAt:""
        }
    );

    //LISTADO DE USUARIOS
    const [datosTodosUsuarios, setDatosTodosUsuarios] = useState ([]);

    //LISTADO DE PEDIDOS
    const [listadoPedidos, setlistadoPedidos] = useState ([]);

    //CADA VEZ QUE SE CAMBIA EL HOOK DE usuarioID, SE ACTUALIZAN LOS CAMPOS DE datosParaActualizar CON ESOS CAMBIOS
    useEffect(()=>{
        setdatosParaActualizar(
            {
                correo: usuarioID.correo,
                dni: usuarioID.dni,
                nombre: usuarioID.nombre,
                apellidos: usuarioID.apellidos,
                direccion: usuarioID.direccion,
                ciudad: usuarioID.ciudad,
                telefono: usuarioID.telefono,
                createdAt: usuarioID.createdAt
            }
        )
    },[usuarioID]);

    //HANDLERS
    //REGISTRO DE USUARIOS
    const guardarDatosRegistro = (e) =>{
        setDatosRegistro({...datosRegistro, [e.target.name]: e.target.value})
    };

    const registrarUsuario = async () =>{
        await axios.post("https://aramossanchez-videoclub-api.herokuapp.com/usuarios/registro", datosRegistro, config);
    }

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
    //LISTADO DE TODOS LOS PEDIDOS
    const guardarListaPedidos = async () =>{
        let res = await axios.get("https://aramossanchez-videoclub-api.herokuapp.com/pedidos",config);
        setlistadoPedidos(res.data);
    }

    return(
        <div id="container-admin">
            {/* REGISTRO DE USUARIO NUEVO */}
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
            {/* BUSQUEDA DE USUARIO POR ID */}
            <div id="cuadro-usuario-id">
                <h2>Buscar usuario por ID</h2>
                <div className="barra-busqueda-usuario">
                    <input type="text" name="busqueda" id="busqueda-usuario-id" autoComplete="off" onChange={(e)=>guardarID(e)}/>
                    <div className="boton-lupa"><img onClick={()=>obtenerUsuarioPorID()} src={lupa} alt="Lupa" /></div>                    
                </div>
                <div id="datos-usuario-id">
                    <p><span>Correo electrónico:</span><input readOnly type="text" name="correo" value={usuarioID.correo}/></p>
                    <p><span>DNI:</span><input autoComplete="off" type="text" name="dni" onChange={(e)=>cambiarDatosParaActualizar(e, "dni")} value={datosParaActualizar.dni}/></p>
                    <p><span>Nombre:</span><input autoComplete="off" type="text" name="nombre" onChange={(e)=>cambiarDatosParaActualizar(e, "nombre")} value={datosParaActualizar.nombre}/></p>
                    <p><span>Apellidos:</span><input autoComplete="off" type="text" name="apellidos" onChange={(e)=>cambiarDatosParaActualizar(e, "apellidos")} value={datosParaActualizar.apellidos}/></p>
                    <p><span>Direccion:</span><input autoComplete="off" type="text" name="direccion" onChange={(e)=>cambiarDatosParaActualizar(e, "direcccion")} value={datosParaActualizar.direccion}/></p>
                    <p><span>Ciudad:</span><input autoComplete="off" type="text" name="ciudad" onChange={(e)=>cambiarDatosParaActualizar(e, "ciudad")} value={datosParaActualizar.ciudad}/></p>
                    <p><span>Telefono:</span><input autoComplete="off" type="text" name="telefono" onChange={(e)=>cambiarDatosParaActualizar(e, "telefono")} value={datosParaActualizar.telefono}/></p>
                    <p><span>Fecha de alta:</span><input readOnly type="text" name="createdAt" value={usuarioID.createdAt}/></p>
                </div>
                <div className="boton" onClick={()=>actualizarRegistro()}>ACTUALIZAR</div>
                <div className="boton" onClick={()=>borrarRegistro()}>BORRAR</div>
            </div>
            {/* LISTADO DE TODOS LOS USUARIOS */}
            {datosTodosUsuarios[1]?.nombre
            ? 
                <div id="cuadro-usuarios">
                    {datosTodosUsuarios.map((usuario)=>{
                        return(
                            <div key={usuario.id} className="articulo-en-lista">
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
            :
                <div id="container-boton-lista">
                    <div className="boton" onClick={()=>guardarListaUsuarios()}>Mostrar todos los usuarios</div>
                </div>
            }
            {/* LISTADO DE TODOS LOS USUARIOS */}
            {listadoPedidos[1]?.peliculaId
            ? 
                <div id="cuadro-usuarios">
                    {listadoPedidos.map((pedido)=>{
                        return(
                            <div key={pedido.id} className="articulo-en-lista">
                                <p><span>ID: </span>{pedido.id}</p>
                                <p><span>ID de película: </span>{pedido.peliculaId}</p>
                                <p><span>Titulo de película: </span>{pedido.pelicula.titulo}</p>
                                <p><span>ID de usuario: </span>{pedido.usuarioId}</p>
                                <p><span>Correo de usuario: </span>{pedido.usuario.correo}</p>
                                <p><span>Fecha de alquiler: </span>{pedido.fecha_alquiler}</p>
                                <p><span>Fecha de devolución: </span>{pedido.fecha_devolucion}</p>
                            </div>
                        )
                    })}
                </div>
            :
                <div id="container-boton-lista">
                    <div className="boton" onClick={()=>guardarListaPedidos()}>Mostrar todos los pedidos</div>
                </div>
            }
        </div>
    )
};

export default Admin;