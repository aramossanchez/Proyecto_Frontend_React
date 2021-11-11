import React, { useEffect, useState } from 'react';
import './ListadoUsuarios.css';
import axios from 'axios';
import Lateral from '../../Components/Lateral/Lateral';
import { connect } from 'react-redux';

const ListadoUsuarios = (props) =>{

    //CREAMOS LA CONFIGURACIÓN DEL HEADER QUE SE VA A MANDAR
    let config = {
        headers: { Authorization: `Bearer ${props.datosLogin.token}` }
    };

    //HOOKS
    const [listaUsuarios, setListaUsuarios] = useState([])

    //HACEMOS LA CONSULTA DE TODOS LOS USUARIOS A LA BASE DE DATOS Y LA GUARDAMOS EN EL HOOK
    useEffect(()=>{
        const guardarListaUsuarios = async () =>{
            let res = await axios.get("https://aramossanchez-videoclub-api.herokuapp.com/usuarios",config);
            setListaUsuarios(res.data);
        }
        guardarListaUsuarios();
    },[]);

    return(
        <div id="container-usuarios">
            <Lateral/>
            <div id="contenido-usuarios">
                <h2>Listado de usuarios dados de alta</h2>
                <div id="nombres-columnas-usuarios">
                    <div>ID de usuario</div>
                    <div>Correo</div>
                    <div>DNI</div>
                    <div>Nombre</div>
                    <div>Apellidos</div>
                    <div>Direccion</div>
                    <div>Ciudad</div>
                    <div>Telefono</div>
                    <div>Fecha de alta</div>       
                </div>
                <div id="lista-usuarios">
                    {listaUsuarios?.map((usuario)=>{
                        return <div key={usuario.id} className="usuario-individual">
                            <p>{usuario.id}</p>
                            <p>{usuario.correo}</p>
                            <p>{usuario.dni}</p>
                            <p>{usuario.nombre}</p>
                            <p>{usuario.apellidos}</p>
                            <p>{usuario.direccion}</p>
                            <p>{usuario.ciudad}</p>
                            <p>{usuario.telefono}</p>
                            <p>{usuario.createdAt}</p>                        
                        </div>
                    })}
                </div>
            </div>
            
        </div>
    )
}

export default connect((state)=>({
    datosLogin: state.datosLogin,
}))(ListadoUsuarios);