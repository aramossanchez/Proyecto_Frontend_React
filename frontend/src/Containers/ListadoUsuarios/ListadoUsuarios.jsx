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
            <div id="lista-usuarios">
                {listaUsuarios?.map((usuario)=>{
                    return <div key={usuario.id} className="usuario-individual">
                        <div></div>
                        <p><span>ID:</span> {usuario.id}</p>
                        <p><span>Correo:</span> {usuario.correo}</p>
                        <p><span>DNI:</span> {usuario.dni}</p>
                        <p><span>Nombre:</span> {usuario.nombre}</p>
                        <p><span>Apellidos:</span> {usuario.apellidos}</p>
                        <p><span>Direccion:</span> {usuario.direccion}</p>
                        <p><span>Ciudad:</span> {usuario.ciudad}</p>
                        <p><span>Telefono:</span> {usuario.telefono}</p>
                        <p><span>Fecha de alta:</span> {usuario.createdAt}</p>                        
                    </div>
                })}
            </div>
            
        </div>
    )
}

export default connect((state)=>({
    datosLogin: state.datosLogin,
}))(ListadoUsuarios);