import React from "react";
import axios from 'axios'
import { useEffect, useState } from "react";
import {useSelector} from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import CompraFinalizada from "./CompraFinalizada";
import {useDispatch} from 'react-redux'
import { procesarCompra , obtenerElEnvio , montoFinal} from "../tools/funciones";
import {crearProdCarr} from '../tools/funciones'
import { sacarTodosLosQueNoTienenStock } from "../redux/actions";
import {useNavigate} from "react-router-dom";
import { finalizarCompra } from "../redux/actions";
import {controlarFormulario} from '../tools/formController'

export default function Pagar (){
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [usuarioId, setUsuarioId] = useState({
        id: ""
    })
    const[envio, setEnvio] = useState(0)
    const [divPagar, setDivPagar] = useState(false)
    const [preferenceId, setPreferenceId] = useState(null)
    const [medioDePago, setMedioDePago] = useState(null) //true = cbu o false = mercadopago
    const carritoCompleto = useSelector(state => state.carrito)
    const [datos, setDatos] = useState({
        nombre : '',
        apellido: '',
        dni: 0,
        email: '',
        telefono: '',
        direccion_calles: '',
        direccion_localidad: '' ,
        direccion_provincia: 'Buenos Aires',
        direccion_barrio:'',
        codigo_postal: ''
    })
    const [permiso, setPermiso] = useState(false)

    useEffect(() => {
        if(carritoCompleto.length !== 0){
            obtenerElEnvio().then((res) => setEnvio(res))//obtener el monto deenvio
            dispatch(sacarTodosLosQueNoTienenStock())
        }
        else showToastMessage()
    }, [])

    let repes = 0
    const showToastMessage = () => {
        repes++
        if(repes <= 1){
            toast.error('debe agregar productos al carrito para realizar la compra', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }
    const handleForm = (propi, value) => {//setea los valores corriespondientes en el estado datos
        let copiaDatos = datos
        delete copiaDatos.undefined
        copiaDatos[propi] =  value
        setDatos(copiaDatos)
        console.log(copiaDatos)
    }

    const handleErrorSubmit = async () => {
        let inputs =  document.querySelectorAll('.form-control')//VUELVE A PONER LOS VALORES CORRIESPONDIENTES EN EL ESTADO INPUT EN CASO DE Q ELCOMPONENTE SEA DEMONTADO
        await inputs.forEach((e) => {
            handleForm(e.name, e.value)
        })

        if(medioDePago === null){// corroborar que el medio de pago fue seleccionado!
            toast.error('debes seleccionar un metodo de pago', {
                position: toast.POSITION.TOP_RIGHT
            });
        }else{
            controlarFormulario(datos).then(async (res) =>{
                if(res === true){
                    let ola = await procesarCompra(carritoCompleto, datos, medioDePago)
                    console.log(ola)
                    
                    if( medioDePago === false ){//si eligio pagar atravez de mercado pago :
                        await axios.post(`http://localhost:3001/pagar/${ola.id}`, [...carritoCompleto, {nombre: 'envio', cantidad: 1, precio: envio}])
                        .then((res) => window.open(res.data, '_blank'))
                        .catch((err) => alert(err))
                        // dispatch(finalizarCompra())//vacia el carrito 
                    }else{
                        await navigate(`/compra-realizada/${ola.id}`);
                        dispatch(finalizarCompra())
                    }
                }else{
                    toast.error(res, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }
            })
        }
    }

    return(
        <>
            <ToastContainer />
         {/* <!-- Page Header Start --> */}
            <div class="container-fluid bg-secondary mb-5">
                <div class="d-flex flex-column align-items-center justify-content-center" style={{minHeight: "300px"}}>
                    <h1 class="font-weight-semi-bold text-uppercase mb-3">Finalizar compra</h1>
                    <div class="d-inline-flex">
                        <p class="m-0"><a href="">Home</a></p>
                        <p class="m-0 px-2">-</p>
                        <p class="m-0">Finalizar compra</p>
                    </div>
                </div>
            </div>
            {/* <!-- Page Header End --> */}

            {/* <!-- Checkout Start --> */}
            <div class="container-fluid pt-5">
                <div class="row px-xl-5">
                    <div class="col-lg-8">
                        <div class="mb-4">
                            <h4 class="font-weight-semi-bold mb-4">Datos del cliente</h4>
                            <div class="row">
                                <div class="col-md-6 form-group">
                                    <label>Nombre</label>
                                    <input class="form-control" type="text" placeholder="Loa" name='nombre' onChange={(e) => handleForm(e.target.name, e.target.value)} />
                                </div>
                                <div class="col-md-6 form-group">
                                    <label>Apellido</label>
                                    <input class="form-control" type="text" placeholder="Concept"  name='apellido' onChange={(e) => handleForm(e.target.name, e.target.value) }/>
                                </div>
                                <div class="col-md-6 form-group">
                                    <label>DNI</label>
                                    <input class="form-control" type="number" placeholder="44123455"  name='dni' onChange={(e) => handleForm(e.target.name, e.target.value) }/>
                                </div>
                                <div class="col-md-6 form-group">
                                    <label>Email</label>
                                    <input class="form-control" type="text" placeholder="example@email.com"  name='email' onChange={(e) => handleForm(e.target.name, e.target.value) }/>
                                </div>
                                <div class="col-md-6 form-group">
                                    <label>Teléfono</label>
                                    <input class="form-control" type="text" placeholder="+54 9 11 2121 4545"  name='telefono' onChange={(e) => handleForm(e.target.name, e.target.value)}/>
                                </div>
                                <div class="col-md-6 form-group">
                                    <label>Provincia</label>
                                    <select class="custom-select" name='direccion_provincia' onChange={(e) => handleForm(e.target.name, e.target.value) }>
                                        <option selected>Buenos Aires</option>
                                        <option>La Pampa</option>
                                        <option>Corrientes</option>
                                        <option>Santa Fe</option>
                                        <option>Tucuman</option>
                                    </select>
                                </div>
                                <div class="col-md-6 form-group">
                                    <label>Localidad</label>
                                    <input class="form-control" type="text" placeholder="tu localidad"  name='direccion_localidad' onChange={(e) => handleForm(e.target.name, e.target.value) }/>
                                </div>
                                <div class="col-md-6 form-group">
                                    <label>Barrio</label>
                                    <input class="form-control" type="text" placeholder="tu barrio"  name='direccion_barrio' onChange={(e) => handleForm(e.target.name, e.target.value) }/>
                                </div>
                                <div class="col-md-6 form-group">
                                    <label>Calle y Altura</label>
                                    <input class="form-control" type="text" placeholder="tu direccion"  name='direccion_calles' onChange={(e) => handleForm(e.target.name, e.target.value) }/>
                                </div>
                                <div class="col-md-6 form-group">
                                    <label>Código postal</label>
                                    <input class="form-control" type="text" placeholder="tu direccion"  name='codigo_postal' onChange={(e) => handleForm(e.target.name, e.target.value) }/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="card border-secondary mb-5">
                            <div class="card-header bg-secondary border-0">
                                <h4 class="font-weight-semi-bold m-0">Pedido</h4>
                            </div>
                            <div class="card-body">
                                <h5 class="font-weight-medium mb-3">Productos</h5>
                                {carritoCompleto.map((e) => {
                                    return(
                                        <div class="d-flex justify-content-between">
                                            <p>{e.cantidad}</p>
                                            <p>{e.nombre}</p>
                                            <p>${e.precio}</p>
                                        </div>
                                    )
                                })}
                                <hr class="mt-0"/>
                                <div class="d-flex justify-content-between mb-3 pt-1">
                                    <h6 class="font-weight-medium">Subtotal</h6>
                                    <h6 class="font-weight-medium">${carritoCompleto.reduce((acc, item) => {
                                            return acc + item.precio * item.cantidad;
                                        }, 0)}</h6>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <h6 class="font-weight-medium">Envío</h6>
                                    <h6 class="font-weight-medium">${envio}
                                    </h6>
                                </div>
                            </div>
                            <div class="card-footer border-secondary bg-transparent">
                                <div class="d-flex justify-content-between mt-2">
                                    <h5 class="font-weight-bold">Total</h5>
                                    <h5 class="font-weight-bold">${
                                    carritoCompleto.length === 0 ? 0 : carritoCompleto.reduce((acc, item) => {
                                            return acc + item.precio * item.cantidad;
                                        }, envio)}</h5>
                                </div>
                            </div>
                        </div>
                        <div class="card border-secondary mb-5">
                            <div>
                                <div class="card-header bg-secondary border-0">
                                    <h4 class="font-weight-semi-bold m-0">Realizar Pago</h4>
                                </div>
                                <div class="card-body">
                                    <div class="form-group">
                                        <div class="custom-control custom-radio">
                                            <input type="radio" class="custom-control-input" name="payment" id="paypal"  onClick={() => setMedioDePago(false)}/>
                                            <label class="custom-control-label" for="paypal">Mercado Pago</label>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="custom-control custom-radio">
                                            <input type="radio" class="custom-control-input" name="payment" id="directcheck" onClick={() => setMedioDePago(true)}/>
                                            <label class="custom-control-label" for="directcheck">Transferencia bancaria</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                             
                            {/* ---------------------- */}
                            {/* <div class="card-footer border-secondary bg-transparent" >
                                {carritoCompleto.length !== 0 //el carrito tiene algo?
                                    ? medioDePago === false  //medio de pago false = mp true = cbu
                                        ?   <a style={{textDecoration: 'none'}} href={permiso === true && preferenceId}>
                                                <button class="btn btn-lg btn-block btn-primary font-weight-bold my-3 py-3" onClick={() => handleErrorSubmit()}>Realizar Compra</button>
                                            </a>
                                        : <button class="btn btn-lg btn-block btn-primary font-weight-bold my-3 py-3" onClick={async () => handleErrorSubmit() }>Realizar Compra</button>
                                    : <button class="btn btn-lg btn-block btn-primary font-weight-bold my-3 py-3" disabled >Realizar Compra</button>
                                } 
                            </div> */}
                            {carritoCompleto.length !== 0 ?
                            <button class="btn btn-lg btn-block btn-primary font-weight-bold my-3 py-3" onClick={async () => handleErrorSubmit()}>Realizar Compra</button> :
                            <button class="btn btn-lg btn-block btn-primary font-weight-bold my-3 py-3" disabled >Realizar Compra</button>
                            }


                        </div>
                    </div>
                </div>
            </div>
          { divPagar === true && <CompraFinalizada ide={usuarioId?.id}></CompraFinalizada>}
        </>
    )}