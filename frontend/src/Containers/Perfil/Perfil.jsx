import React, {useState, useEffect} from 'react';
import './Perfil.css';
import axios from 'axios';
import Lateral from '../../Components/Lateral/Lateral';

const Perfil = () =>{

    //HOOKS
    //ESTOS SERÁN LOS DATOS QUE SE MANDARÁN PARA ACTUALIZAR EL REGISTRO
    const [datosActualizar, setdatosActualizar] = useState(
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

    //ESTOS SON LOS DATOS RECOGIDOS DEL LOGIN
    const [datosUsuario, setdatosUsuario] = useState(
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
            dni: datosPerfil.usuario.dni,
            nombre: datosPerfil.usuario.nombre,
            apellidos: datosPerfil.usuario.apellidos,
            correo: datosPerfil.usuario.correo,
            direccion: datosPerfil.usuario.direccion,
            ciudad: datosPerfil.usuario.ciudad,
            telefono: datosPerfil.usuario.telefono,
            createdAt: datosPerfil.usuario.createdAt,
        });
    }, [])

    //AL ACTUALIZAR datosUsuario, datosActualizar SE ACTUALIZA CON ESTOS CAMBIOS 
    useEffect(()=>{
        setdatosActualizar(
            {
                correo: datosUsuario.correo,
                dni: datosUsuario.dni,
                nombre: datosUsuario.nombre,
                apellidos: datosUsuario.apellidos,
                direccion: datosUsuario.direccion,
                ciudad: datosUsuario.ciudad,
                telefono: datosUsuario.telefono,
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
            <Lateral/>
            <div id="container-usuario">
                <h2>Tus Datos</h2>
                <div id="datos-usuario">
                    <p><span>Correo electrónico:</span><input readOnly type="text" name="correo" value={datosUsuario.correo}/></p>
                    <p><span>DNI:</span><input autoComplete="off" type="text" name="dni" onChange={(e)=>actualizarDatos(e, "dni")} value={datosActualizar.dni}/></p>
                    <p><span>Nombre:</span><input autoComplete="off" type="text" name="nombre" onChange={(e)=>actualizarDatos(e, "nombre")} value={datosActualizar.nombre}/></p>
                    <p><span>Apellidos:</span><input autoComplete="off" type="text" name="apellidos" onChange={(e)=>actualizarDatos(e, "apellidos")} value={datosActualizar.apellidos}/></p>
                    <p><span>Direccion:</span><input autoComplete="off" type="text" name="direccion" onChange={(e)=>actualizarDatos(e, "direcccion")} value={datosActualizar.direccion}/></p>
                    <p><span>Ciudad:</span><input autoComplete="off" type="text" name="ciudad" onChange={(e)=>actualizarDatos(e, "ciudad")} value={datosActualizar.ciudad}/></p>
                    <p><span>Telefono:</span><input autoComplete="off" type="text" name="telefono" onChange={(e)=>actualizarDatos(e, "telefono")} value={datosActualizar.telefono}/></p>
                    <p><span>Fecha de alta:</span><input readOnly type="text" name="createdAt" value={datosUsuario.createdAt}/></p>
                </div>
                <div className="boton" onClick={()=>actualizarRegistro()}>ACTUALIZAR</div>
            </div>      
        </div>
    )
}

export default Perfil;