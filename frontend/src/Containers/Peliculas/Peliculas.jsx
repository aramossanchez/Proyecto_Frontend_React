import React, { useEffect, useState } from 'react';
import './Peliculas.css';
import axios from 'axios';

const Peliculas = () =>{

    //HOOKS
    const [peliculas, setPeliculas] = useState([]);

    //HANDLERS
    const filtrarPorCiudad = async (e) =>{
        let indiceCiudadSeleccionada = e.target.selectedIndex;
        let ciudadSeleccionada = e.target.options[indiceCiudadSeleccionada].text;
        console.log(ciudadSeleccionada);
        let res = await axios.get(`https://aramossanchez-videoclub-api.herokuapp.com/peliculas${ciudadSeleccionada == "Todas" ? "" : "/ciudad/" + ciudadSeleccionada}`);
        setPeliculas((res.data));
    };

    useEffect(async ()=>{
        let res = await axios.get("https://aramossanchez-videoclub-api.herokuapp.com/peliculas/");
        setPeliculas((res.data));
    }, [])

    return(
        <div id="container-peliculas">
            <div id="filtros-peliculas">
                <div id="pelicula-ciudad">
                    <p>Películas disponibles en tu zona</p>
                    <select name="ciudades" id="ciudades-disponibles" onChange={(e)=>filtrarPorCiudad(e)}>
                        <option value="Todas">Todas</option>
                        <option value="Valencia">Valencia</option>
                        <option value="Getafe">Getafe</option>
                        <option value="Albacete">Albacete</option>
                    </select>
                </div>
            </div>
            <div id="listado-peliculas">
                {peliculas.map((pelicula)=>{
                    return <div key={pelicula.id} className="pelicula-individual">
                        <p>Título: {JSON.stringify(pelicula.titulo)}</p>
                        <p>Ciudad disponible: {JSON.stringify(pelicula.ciudad)}</p>
                        <p>Disponible para alquilar: {JSON.stringify(pelicula.alquilada)}</p>
                        
                        </div>
                })}
            </div>
        </div>
    )
}

export default Peliculas;