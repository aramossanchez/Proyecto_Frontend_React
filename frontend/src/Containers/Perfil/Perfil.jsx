import React, {useState, useEffect} from 'react';
import './Perfil.css';
import axios from 'axios';

const Perfil = () =>{

    //HOOKS
    //ESTOS SERÁN LOS DATOS QUE SE MANDARÁN PARA ACTUALIZAR EL REGISTRO
    const [datosActualizar, setdatosActualizar] = useState(
        {
            correo:"",
            nombre:"",
            ciudad:"",
            createdAt:""
        }
    );

    //ESTOS SON LOS DATOS RECOGIDOS DEL LOGIN
    const [datosUsuario, setdatosUsuario] = useState(
        {
            nombre: "",
            correo: "",
            ciudad: "",
            createdAt: "",
        }
    );

    //HANDLERS
    //RELLENA LOS CAMPOS DE datosUsuario RECORRIENDO TODOS LOS INPUTS, Y DESPUES ACTUALIZA EL CAMPO SELECCIONADO CON LOS CAMBIOS QUE HACEMOS EN LOS INPUTS
    const actualizarDatos = (e, campo) =>{
        setdatosUsuario({...datosUsuario, [e.target.name]: e.target.value});
        setdatosActualizar({
            [campo]:e.target.value
        })
    };

    //AL CARGAR EL COMPONENTE, GUARDA EN datosUsuario LOS DATOS GUARDADOS EN LOCALSTORAGE, Y GUARDO EN token EL TOKEN OBTENIDO
    useEffect(()=>{
        let datosPerfil = JSON.parse(localStorage.getItem("datosLogin"));
        //GUARDAMOS EL TOKEN EL LOCALSTORAGE
        localStorage.setItem("token", datosPerfil.token);

        //GUARDAMOS EL PERFIL DE USUARIO EN LOCALSTORAGE
        localStorage.setItem("perfil", datosPerfil.usuario.rol);    

        setdatosUsuario({
            id: datosPerfil.usuario.id,
            nombre: datosPerfil.usuario.nombre,
            correo: datosPerfil.usuario.correo,
            ciudad: datosPerfil.usuario.ciudad,
            createdAt: datosPerfil.usuario.createdAt,
        });
    }, [])

    //AL ACTUALIZAR datosUsuario, datosActualizar SE ACTUALIZA CON ESTOS CAMBIOS 
    useEffect(()=>{
        setdatosActualizar(
            {
                correo: datosUsuario.correo,
                nombre: datosUsuario.nombre,
                ciudad: datosUsuario.ciudad,
                createdAt: datosUsuario.createdAt
            }
        )
    },[datosUsuario]);

    const actualizarRegistro = async () =>{
        //RECUPERAMOS TOKEN
        let token = localStorage.getItem("token");
        //CREAMOS LA CONFIGURACIÓN DEL HEADER QUE SE VA A MANDAR
        let config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        await axios.put(`https://aramossanchez-videoclub-api.herokuapp.com/usuarios/${datosUsuario.id}`, datosActualizar, config)
    }

    return(
        <div id="container-perfil">
            <div id="container-usuario">
                <h2>Tus Datos</h2>
                <hr />
                <div id="datos-usuario">
                    <p className="input-readOnly"><span>Correo electrónico:</span><input readOnly type="text" name="correo" value={datosUsuario.correo}/></p>
                    <p><span>Nombre:</span><input autoComplete="off" type="text" name="nombre" onChange={(e)=>actualizarDatos(e, "nombre")} value={datosActualizar.nombre}/></p>
                    <p><span>Ciudad:</span><input autoComplete="off" type="text" name="ciudad" onChange={(e)=>actualizarDatos(e, "ciudad")} value={datosActualizar.ciudad}/></p>
                    <p><span>Fecha de alta:</span><input readOnly type="text" name="createdAt" value={datosUsuario.createdAt}/></p>
                </div>
                <div id="boton-actualizar-usuario" onClick={()=>actualizarRegistro()}>ACTUALIZAR</div>
            </div>   
            <div id="container-pedido">
                <h2>Tus Pedidos</h2>
                <hr />
            </div>         
        </div>
    )
}

export default Perfil;