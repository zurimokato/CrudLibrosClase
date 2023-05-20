

import React,{useState,useEffect} from 'react'
import { db } from '../firebase'
import { collection,doc,addDoc,onSnapshot,deleteDoc,updateDoc, query } from 'firebase/firestore'


function Formulario() {
    const [nombreLibro, setNombreLibro]=useState('');
    const [nombreAutor,setNombreAutor]=useState('');
    const [listaLibros,setListaLibros]=useState([])

    useEffect(()=>{
        const obtenerDatos=async()=>{
            try {
                await onSnapshot(collection(db,'libros',(query)=>{
                    setListaLibros(query.docs.map(doc=>({...doc.data(),id:doc.id}))
                }))
            } catch (error) {
                console.log(error)
            }
        }
    });

    const guardarLibros=async(e)=>{
        e.preventDefault();
        try{

            const data=await addDoc(collection(db,'libros'),{
                nombreLibro:nombreLibro,
                nombreAutor:nombreAutor
            })

          
            setListaLibros([...listaLibros,{
                nombreLibro:nombreLibro,
                nombreAutor:nombreAutor,
                id:data.id
            }]);

            setNombreAutor('');
            setNombreLibro('');

        

        }catch(error){
            console.log(error);
        }
    }
  return (
    <div className='container mt-5'>
        <h1 className='text-center'> Crudo de Libros</h1>
        <hr/>
        <div className="row">
            <div className="col-8">
                <h4 className="text-center">Listado de libros</h4>
                <ul className='list-group'>
                    <li className='list-group-item'>
                        <span className='lead'>Test</span>
                        <button className="btn btn-danger btn-sm float-end mx-2">Eliminar</button>
                        <button className="btn btn-warning btn-sm float-end">Editar</button>
                    </li>
                </ul>
            </div>
            <div className="col-4">
                <h4 className="text-center">Agregar Libros</h4>
                <form onSubmit={guardarLibros}>
                    <input type="text" className="form-control mb-2" placeholder='Ingrese el Nombre del Libro' value={nombreLibro} onChange={(e)=>setNombreLibro(e.target.value)} />
                    <input type="text" className="form-control mb-2" placeholder='Ingrese el Autor' value={nombreAutor} onChange={(e)=>setNombreAutor(e.target.value)}/>
                    <button className="btn btn-primary btn-block">Agregar</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Formulario