import React, { useEffect, useState } from "react";
import axios from 'axios'
import { useParams } from "react-router";
import {useDispatch} from 'react-redux'
import { agregarAlCarrito, agregarDesdeDetalle } from '../redux/actions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showToastMessage, corroborarStock } from "../tools/funcionesII";
const host = process.env.REACT_APP_BACKEND_URL

export default function Detalle(){
    const [prod, setProd] = useState({})
    const {id} = useParams() 
    const dispatch = useDispatch()

    useEffect(() => {
        axios.get(`${host}/productos/${id}`)
        .then((res) => {
            setProd({...res.data, cantidad: 0})
            console.log(res.data)
        })
        .catch((err) => console.log(err) )
        controlarButtons()
    }, [])

    const seteoDeEstados = async (estado) => {
        let cs = await corroborarStock(prod.id, prod.cantidad + 1);
        console.log(prod)
        if(estado === true){
            cs === true 
            ? setProd((prevProd) => ({ ...prevProd, cantidad: prevProd.cantidad + 1 }))
            : showToastMessage('error', 'Ha superado el límite de stock de este producto')
        }else{
            Math.sign(prod.cantidad - 1) === 1 
            && setProd((prevProd) => ({ ...prevProd, cantidad: prevProd.cantidad - 1 })) 
        }    
      };

    const controlarButtons = async () => {
       let valorActivo = await document.querySelectorAll('input[name="color"]');
       await valorActivo.forEach((ele) => {
        if(ele.checked == true) prod.color = ele.value
        console.log(prod)
       })
    }
    

    return(
        <>
        <ToastContainer />
         {/* <!-- Page Header Start --> */}
            <div class="container-fluid bg-secondary mb-5">
                <div class="d-flex flex-column align-items-center justify-content-center" style={{minHeight: "300px"}}>
                    <h1 class="font-weight-semi-bold text-uppercase mb-3">Shop Detail</h1>
                    <div class="d-inline-flex">
                        <p class="m-0"><a href="">Home</a></p>
                        <p class="m-0 px-2">-</p>
                        <p class="m-0">Shop Detail</p>
                    </div>
                </div>
            </div>
            {/* <!-- Page Header End --> */}     
            {/* <!-- Shop Detail Start --> */}
            <div class="container-fluid py-5">
                <div class="row px-xl-5">
                    <div class="col-lg-5 pb-5">
                        <div id="product-carousel" class="carousel slide" data-ride="carousel">
                            <div class="carousel-inner border">
                                <div class="carousel-item active" style={{maxHeight: '490px', maxWidth: 'auto', overflow: 'hidden'}}>
                                    <img class="w-100 h-100" src={prod.img} alt="Image" />
                                </div>
                                <div class="carousel-item">
                                    <img class="w-100 h-100" src="img/product-2.jpg" alt="Image"/>
                                </div>
                                <div class="carousel-item">
                                    <img class="w-100 h-100" src="img/product-3.jpg" alt="Image"/>
                                </div>
                                <div class="carousel-item">
                                    <img class="w-100 h-100" src="img/product-4.jpg" alt="Image"/>
                                </div>
                            </div>
                            <a class="carousel-control-prev" href="#product-carousel" data-slide="prev">
                                <i class="fa fa-2x fa-angle-left text-dark"></i>
                            </a>
                            <a class="carousel-control-next" href="#product-carousel" data-slide="next">
                                <i class="fa fa-2x fa-angle-right text-dark"></i>
                            </a>
                        </div>
                    </div>

                    <div class="col-lg-7 pb-5">
                        <h3 class="font-weight-semi-bold">{prod.nombre}</h3>
                        
                        <p class="mb-4">{prod.descripcion}</p>
                        <h3 class="font-weight-semi-bold mb-4">${prod.precio}</h3>

                        <div class="d-flex mb-3">
                            <p class="text-dark font-weight-medium mb-0 mr-3">Talles:</p>
                            <form>
                            {
                                prod.talles?.split(', ').map((e, index) => {
                                    let je = index + 1
                                    return(
                                        <div key={index} class="custom-control custom-radio custom-control-inline">
                                            <input type="radio" class="custom-control-input"  name="size" value={e} id={'size-' + index} onChange={() => setProd({...prod, talle: e})}/>
                                            <label class="custom-control-label" for={'size-' + index}>{e}</label>
                                        </div>
                                        )
                                    })
                            }
                                {/* <div class="custom-control custom-radio custom-control-inline">
                                    <input type="radio" class="custom-control-input" id="size-1" name="size"/>
                                    <label class="custom-control-label" for="size-1">XS</label>
                                </div>
                                <div class="custom-control custom-radio custom-control-inline">
                                    <input type="radio" class="custom-control-input" id="size-2" name="size"/>
                                    <label class="custom-control-label" for="size-2">S</label>
                                </div>
                                <div class="custom-control custom-radio custom-control-inline">
                                    <input type="radio" class="custom-control-input" id="size-3" name="size"/>
                                    <label class="custom-control-label" for="size-3">M</label>
                                </div>
                                <div class="custom-control custom-radio custom-control-inline">
                                    <input type="radio" class="custom-control-input" id="size-4" name="size"/>
                                    <label class="custom-control-label" for="size-4">L</label>
                                </div>
                                <div class="custom-control custom-radio custom-control-inline">
                                    <input type="radio" class="custom-control-input" id="size-5" name="size"/>
                                    <label class="custom-control-label" for="size-5">XL</label>
                                </div> */}
                            </form>
                        </div>
                        <div class="d-flex mb-4">
                            <p class="text-dark font-weight-medium mb-0 mr-3">Colores:</p>
                            <form>
                                {
                                    prod.colores?.split(', ').map((e, index) => {
                                        return(
                                        <div key={index} class="custom-control custom-radio custom-control-inline">
                                            <input type="radio" class={'custom-control-input '+ e} value={e} id={'color-' + index} name='color' onChange={() => {
                                                setProd({...prod, color: e})
                                                console.log(prod)
                                                } }/>
                                            <label class="custom-control-label" for={'color-' + index}> {e} </label>
                                        </div>
                                        )
                                    })
                                }
                            </form>
                        </div>

                        <div class="d-flex align-items-center mb-4 pt-2">
                            <div class="input-group quantity mr-3" style={{width: "130px"}}>
                                <div class="input-group-btn">
                                    <button class="btn btn-primary btn-minus" 
                                        onClick={() => {
                                            seteoDeEstados(false)
                                        }}>
                                    <i class="fa fa-minus"></i>
                                    </button>
                                </div>
                                <input type="text" class="form-control bg-secondary text-center" value={prod.cantidad}/>
                                <div class="input-group-btn">
                                    <button class="btn btn-primary btn-plus"
                                        onClick={() => {
                                            seteoDeEstados(true)
                                            }}>
                                        <i class="fa fa-plus"></i>
                                    </button>
                                </div>
                            </div>

                            <button class="btn btn-primary px-3" onClick={() => {
                               if(prod.cantidad !== 0 ){
                                dispatch(agregarAlCarrito(prod)) 
                                showToastMessage('success', 'el producto ha sido agregado al carrito!' )
                                prod.cantidad = 0
                                }else showToastMessage('err', 'debe seleccionar la cantidad a agregar' )
                                }}>
                                <i class="fa fa-shopping-cart mr-1"></i>
                                Agregar al carrito
                            </button>
                        </div>
                        <div class="d-flex pt-2">
                            <p class="text-dark font-weight-medium mb-0 mr-2">Share on:</p>
                            <div class="d-inline-flex">
                                <a class="text-dark px-2" href="">
                                    <i class="fab fa-facebook-f"></i>
                                </a>
                                <a class="text-dark px-2" href="">
                                    <i class="fab fa-twitter"></i>
                                </a>
                                <a class="text-dark px-2" href="">
                                    <i class="fab fa-linkedin-in"></i>
                                </a>
                                <a class="text-dark px-2" href="">
                                    <i class="fab fa-pinterest"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Shop Detail End --> */}
        </>
    )
}