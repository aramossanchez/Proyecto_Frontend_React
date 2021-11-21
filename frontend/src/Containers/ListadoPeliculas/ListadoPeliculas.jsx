import React, { useEffect, useState } from 'react';
import './ListadoPeliculas.css';
import axios from 'axios';
import Lateral from '../../Components/Lateral/Lateral';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import { GUARDAR_ID_PELICULA } from '../../redux/types';
import loading from '../../img/loading.svg';
import PantallaError from '../PantallaError/PantallaError';

const ListadoPeliculas = (props) =>{

    const navigate = useNavigate();

    //HOOKS
    const [listaPeliculas, setListaPeliculas] = useState([])
    //CREADO PARA MOSTRAR ICONO CARGANDO
    const [cargando, setCargando] = useState(false);
    
    //HACE QUE SE VEA EL ICONO DE CARGANDO DURANTE 1.25 SEGUNDOS
    const mostrarLoading = () =>{
        setCargando(true);
        setTimeout(() => {
            setCargando(false);
        }, 1250);
    }

    //HACEMOS LA CONSULTA DE TODOS LOS PELICULAS A LA BASE DE DATOS Y LA GUARDAMOS EN EL HOOK
    useEffect(()=>{
        const guardarListaPeliculas = async () =>{
            let res = await axios.get("https://aramossanchez-videoclub-api.herokuapp.com/peliculas");
            setListaPeliculas(res.data);
        }
        guardarListaPeliculas();
        mostrarLoading();
    },[]);

    //REDIRECCIONAMOS HACIA BUSQUEDA POR ID DE LA PELICULA CLICKADO
    const buscarPelicula = (id) =>{
        props.dispatch({type:GUARDAR_ID_PELICULA, payload: id});
        navigate("/buscarPelicula");
    };

    //TRADUCE FECHA DE ALTA DE FORMATO BBDD A FORMATO ESPAÑOL
    const calcularFechaAlta = (fecha) =>{
        let fechaBBDD = fecha.split(/[- : T .]/);
        let fechaProvisional = [fechaBBDD[2], fechaBBDD[1], fechaBBDD[0]];
        return fechaProvisional.join('-');
    }

    if (props.datosLogin.usuario.rol !== "administrador") {
        return(
            <PantallaError/>
        )
    } else{
        return(
            <div id="container-listado-peliculas">
                <Lateral/>
                <div id="contenido-listado-peliculas">
                    <h2>Listado de peliculas dadas de alta</h2>
                    <div id="nombres-columnas-listado-peliculas">
                        <div>ID</div>
                        <div>Título</div>
                        <div>Género</div>
                        <div>Protagonista</div>
                        <div>Ciudad</div>
                        <div>Alquilada</div>
                        <div>Fecha</div>
                    </div>
                    {/* MOSTRAR LAS PELICULAS O ICONO DE CARGANDO*/}
                    {cargando
                    ?
                    <img src={loading} alt="loading" />
                    :
                    <div id="lista-listado-peliculas">
                        {listaPeliculas?.map((pelicula)=>{
                            return <div key={pelicula.id} className="pelicula-lista-individual" onClick={()=>buscarPelicula(pelicula.id)}>
                                <p>{pelicula.id}</p>
                                <p>{pelicula.titulo}</p>
                                <p>{pelicula.genero}</p>
                                <p>{pelicula.actor_principal}</p>
                                <p>{pelicula.ciudad}</p>
                                <p>{pelicula.alquilada ? "Si" : "No"}</p>
                                <p>{calcularFechaAlta(pelicula.createdAt)}</p>                        
                            </div>
                        })}
                    </div>
                    }
                </div>    
            </div>
        )
    }
}

export default connect((state)=>({
    datosLogin: state.datosLogin,
}))(ListadoPeliculas);