import React, { useEffect } from "react";
import axios from "axios";
import {useParams} from 'react-router-dom';
import { useState } from "react";
import { ToastContainer, toast} from 'react-toastify';


export default function CompraFinalizada(){
    const [compra, setCompra] = useState(null)
    let { id } = useParams();
    useEffect(() => {
        axios.get(`http://localhost:3001/compras/${id}`)
        .then((res) =>{ 
            setCompra(res.data)
            console.log(res.data)
        })
        .catch((err) => {
            setCompra(undefined)
            toast.error('el id de compra proporcionado no existe', {
                position: toast.POSITION.TOP_RIGHT
            })
        })
    }, [])
    if(compra !== null){
    return(
        <div style={{display: 'flex'}} class="d-flex justify-content-center flex-wrap">
            <div class="col-lg-4 border-secondary" style={{ border: '1px solid #EDF1FF !important'}}>
                    <div class="card-header bg-secondary border-0" >
                        <h4 class="font-weight-semi-bold m-0">Datos para la transferencia</h4>
                    </div>
                    <div class="card-body border-secondary">
                        <div class="form-group">
                            <div class="custom-control custom-radio">
                                <p>cvu: 23434243234234</p>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="custom-control custom-radio">
                                <p>alias: laiamiaperezlupia.</p>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="custom-control custom-radio">
                                <p>LAIA MIA PEREZ LUPIA</p>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="custom-control custom-radio">
                                <p>utiliza estos datos para realizar el pago y luego envía el comprobante a nuestro whatsapp, lo puedes encontrar en el pie página</p>
                            </div>
                        </div>
                    </div>
            </div>

            <div class="col-lg-4">
                        <div class="card border-secondary mb-5">
                            <div class="card-header bg-secondary border-0">
                                <h4 class="font-weight-semi-bold m-0">Información de tu compra</h4>
                            </div>
                            <div class="card-body">
                                    <div class="d-flex justify-content-between">
                                        <strong>destinatario :</strong>
                                        <p>{compra?.usuario?.nombre + ' ' + compra?.usuario?.apellido}</p>
                                    </div>
                                    <div class="d-flex justify-content-between">
                                        <strong>estado del envío :</strong>
                                        <p>{compra?.entrega}</p>
                                    </div>
                                    <div class="d-flex justify-content-between">
                                        <strong>método de pago :</strong>
                                        <p>{compra?.medio_de_pago}</p>
                                    </div>
                                    <div class="d-flex justify-content-between">
                                        <strong>estado del pago :</strong>
                                        <p>{compra?.pago}</p>
                                    </div>
                                    <div class="d-flex justify-content-between">
                                        <strong>domicilio :</strong>
                                        <p>{compra?.usuario?.direccion_provincia + ' ' + compra?.usuario?.direccion_localidad + ' ' + compra?.usuario?.direccion_calles}</p>
                                    </div>
                            </div>
                        </div>
                        </div>
        </div>
       
        )}else return <div className="clas"> <ToastContainer/></div>
}