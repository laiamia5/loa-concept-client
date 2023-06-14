import React from "react";
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { useEffect, useState } from "react";
import { aumentarCantidad, disminuirCantidad, eliminarDelCarrito , sacarTodosLosQueNoTienenStock, agregarAlCarrito} from "../redux/actions";
import store from '../redux/store'
import { obtenerElEnvio } from "../tools/funciones";
import { corroborarStock , corroborarStock2, showToastMessage} from "../tools/funcionesII";
import { ToastContainer, toast } from 'react-toastify';


export default function Carrito (){
    let dispatch = useDispatch()
    let carrito_redux = useSelector(state => state.carrito)
    const [carrito, setCarrito] = useState([]) 
    const [cambio, setCambio] = useState(0)
    // let precioEnvio = 1000
    const[envio, setEnvio] = useState(0)


    useEffect(() => {
        obtenerElEnvio().then((res) => setEnvio(res))//obtener el monto deenvio
        dispatch(sacarTodosLosQueNoTienenStock())
        setCarrito(carrito_redux) 
    }, [cambio])

    const aumento = async (e) => {
        const CS = await corroborarStock(e.id, 1)
        CS === true ? dispatch(aumentarCantidad(e)) : showToastMessage('error', 'La cantidad del producto solicitado excede nuestro límite de stock')
    }

  
    return(<>
        {/* <!-- Page Header Start --> */}
    <div class="container-fluid bg-secondary mb-5">
        <ToastContainer/>
        <div class="d-flex flex-column align-items-center justify-content-center" style={{minHeight: '300px'}}>
            <h1 class="font-weight-semi-bold text-uppercase mb-3">Carrito</h1>
            <div class="d-inline-flex">
                <Link to='/'><p class="m-0"><a href="">Inicio</a></p></Link>
                <p class="m-0 px-2">-</p>
                <p class="m-0">Carrito</p>
            </div>
        </div>
    </div>
    {/* <!-- Page Header End --> */}
     {/* <!-- Cart Start --> */}
    <div class="container-fluid pt-5">
        <div class="row px-xl-5">
            <div class="col-lg-8 table-responsive mb-5" >
                <table class="table table-bordered text-center mb-0">
                    <thead class="bg-secondary text-dark">
                        <tr>
                            <th>Productos</th>
                            <th>Talle</th>
                            <th>Color</th>
                            <th>Precios</th>
                            <th>Cantidad</th>
                            <th>Total</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                        {carrito.length === 0 ?
                        <div class="align-middle" style={{ display: 'table-row',border: '1px solid #EDF1FF', height: '100px'}}><p style={{position: 'absolute', marginLeft: '35%', marginTop: '4%'}}>agrega productos al carrito</p></div> :
                        <tbody class="align-middle">
                            { carrito.map((e) => {
                                return(
                                    <tr>
                                        <td class="align-middle"><img src={e?.img} alt="" style={{width: "50px"}}/>{e?.nombre}</td>
                                        <td class="align-middle">{e?.talle ? e.talle : 'sin definir'}</td>
                                        <td class="align-middle">{e?.color ? e.color : 'sin definir'}</td>
                                        <td class="align-middle">${e?.precio}</td>
                                        <td class="align-middle">
                                            <div class="input-group quantity mx-auto" style={{width: "100px"}}>
                                                <div class="input-group-btn">
                                                    <button class="btn btn-sm btn-primary btn-minus" onClick={() => {
                                                        setCambio(Math.random())
                                                        dispatch(disminuirCantidad(e))
                                                        console.log('click')
                                                        }}>
                                                    <i class="fa fa-minus"></i>
                                                    </button>
                                                </div>
                                                <input type="text" class="form-control form-control-sm bg-secondary text-center" value={e.cantidad}/>
                                                <div class="input-group-btn">
                                                    <button class="btn btn-sm btn-primary btn-plus" 
                                                            onClick={() => {
                                                            setCambio(Math.random())
                                                            aumento(e)
                                                            }}>
                                                        <i class="fa fa-plus"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="align-middle">${e.precio * e.cantidad}</td>
                                        <td class="align-middle"><button class="btn btn-sm btn-primary" onClick={() => {
                                            dispatch(eliminarDelCarrito(e))
                                            setCambio(Math.random())
                                        }}><i class="fa fa-times"></i></button></td>
                                    </tr>
                                )
                            })}
                        </tbody>}
                </table>
            </div>
            <div class="col-lg-4">
                {/* CUPON------------------------------------- */}
                {/* <form class="mb-5" action="">
                    <div class="input-group">
                        <input type="text" class="form-control p-4" placeholder="Coupon Code"/>
                        <div class="input-group-append">
                            <button class="btn btn-primary">Apply Coupon</button>
                        </div>
                    </div>
                </form> */}
                <div class="card border-secondary mb-5">
                    <div class="card-header bg-secondary border-0">
                        <h4 class="font-weight-semi-bold m-0">Resumen de compra</h4>
                    </div>
                    <div class="card-body">
                        <div class="d-flex justify-content-between mb-3 pt-1">
                            <h6 class="font-weight-medium">Subtotal</h6>
                            <h6 class="font-weight-medium">$
                            {carrito.reduce((acc, item) => {
                                return acc + item.precio * item.cantidad;
                                }, 0)}</h6>
                        </div>
                        <div class="d-flex justify-content-between">
                            <h6 class="font-weight-medium">Envío</h6>
                            <h6 class="font-weight-medium">${envio}</h6>
                        </div>
                    </div>
                    <div class="card-footer border-secondary bg-transparent">
                        <div class="d-flex justify-content-between mt-2">
                            <h5 class="font-weight-bold">Total</h5>
                            <h5 class="font-weight-bold">${
                            carrito.length === 0 ? 0 :
                            carrito.reduce((acc, item) => {
                                return acc + item.precio * item.cantidad;
                                }, envio)}</h5>
                        </div>
                        <Link to='/finalizar-compra' style={{textDecoration: 'none'}}><button class="btn btn-block btn-primary my-3 py-3">Realizar compra</button></Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* <!-- Cart End --> */}

    </>)
}