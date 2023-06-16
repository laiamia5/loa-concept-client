import React, { useEffect, useState } from "react";
import '../styles/allStyles.css'
import '../styles/moreStyles.css'
import Servicios from '../components/Servicios'
import Categorias from "./Categorias";
import axios from 'axios'
import {Link} from 'react-router-dom'
import { useDispatch } from "react-redux";
import { agregarAlCarrito } from "../redux/actions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { corroborarStock } from "../tools/funcionesII";
import host from './variables'

export default function Inicio (){
    console.log(host)
    let dispatch = useDispatch()
    const [cards, setCards] = useState([])

    useEffect(() => {
        axios.get(`${host}/productos`)
        .then((res) => {
            let copia = res.data.slice(0,12)
            setCards(copia)
        })
        .catch((err) => console.log(err))
    },[])

    const showToastMessage = (status, mensaje) => {
        status == 'success'
        ? toast.success(mensaje, {
            position: toast.POSITION.BOTTOM_RIGHT
        })
        : toast.error(mensaje, {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    }

    const aumento = async (e) => {
        const CS = await corroborarStock(e.id)
        if(CS === true){
            dispatch(agregarAlCarrito(e)) 
            showToastMessage('success', "producto agregado al carrito")
        }else showToastMessage('error', 'La cantidad del producto solicitado excede nuestro límite de stock')
    }

    return(
        <>
            <Servicios/>
            <Categorias/>
            <ToastContainer />

            {/* ----------- */}
            <div class="container-fluid pt-5" >
                <div class="text-center mb-4">
                    <h2 class="section-title px-5"><span class="px-2">Nuestros Productos</span></h2>
                </div>
                <div class="row px-xl-5 pb-3" >
                {cards?.map((e, index) => {
                    return(
                        <div class="col-lg-3 col-md-6 col-sm-12 pb-1" key={index}>
                        <div class="card product-item border-0 mb-4">
                            {e.display == false 
                                ?   <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0 contenedor_imagen_tienda" style={{ height: '46vh !important', overflow: 'hidden !important', display: 'flex', alignItems: 'center'}}>
                                        <img class="img-fluid w-100 " src={e.img } alt="/" style={{filter: 'grayscale(1)'}}/>
                                        <div style={{alignItems: 'center', display: 'flex', justifyContent: 'center', position: 'absolute', width: '100%' , color: 'black', backgroundColor: 'rgba(243, 243, 243, 0.28)', }}>no hay stock disponible</div>
                                    </div>
                                :   <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0 contenedor_imagen_tienda" style={{ height: '46vh !important', overflow: 'hidden !important'}}>
                                        <img class="img-fluid w-100 " src={e.img } alt="/" />
                                    </div>
                            }
                            <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                <h6 class="text-truncate mb-3">{e.nombre}</h6>
                                <div class="d-flex justify-content-center">
                                    <h6>${e.precio}</h6><h6 class="text-muted ml-2"><del>${e.precio_anterior}</del></h6>
                                </div>
                            </div>
                            { e.display !== false 
                                            ? <div class="card-footer d-flex justify-content-between bg-light border">
                                                <Link to={`/detalle/${e.id}`} style={{textDecoration: 'none'}}><a class="btn btn-sm text-dark p-0"><i class="fas fa-eye text-primary mr-1"></i>ver producto</a></Link>
                                                <a class="btn btn-sm text-dark p-0" 
                                                    onClick={() => {
                                                    aumento(e)
                                                    }}><i class="fas fa-shopping-cart text-primary mr-1"></i>agregar</a>
                                            </div>
                                            : <div class="card-footer d-flex justify-content-between bg-light border">
                                                <a class="btn btn-sm text-dark p-0" onClick={() => showToastMessage('error', "no contamos con stock disponible por el momento")}><i class="fas fa-eye text-primary mr-1"></i>ver producto</a>
                                                <a class="btn btn-sm text-dark p-0" 
                                                    onClick={() => {
                                                    showToastMessage('error', "no se puede agregar, no hay stock disponible");
                                                    }}><i class="fas fa-shopping-cart text-primary mr-1"></i>agregar</a>
                                            </div>
                            }
                        </div>
                    </div>
                    )
                })}
                </div> 
            </div>
        </>
    )
}