import React, { useEffect , useState} from "react";
import '../styles/allStyles.css'
import '../styles/moreStyles.css'
import axios from 'axios'

export default function Contacto (){

    const [info, setInfo] = useState({})
    const [datos, setDatos] = useState({
        email: null,
        asunto: null,
        mensaje: null
    })

    useEffect(() => {
        axios.get('http://localhost:3001/info')
        .then((res) => setInfo(res.data))
        .catch((err) => console.log(err))
    }, [])

    const handleSubmit = () => {
        axios.post('http://localhost:3001/info/contacto', datos)
    }

    return(
        <>
        
    {/* <!-- Page Header Start --> */}
            <div class="container-fluid bg-secondary mb-5">
                <div class="d-flex flex-column align-items-center justify-content-center" style={{minHeight:' 300px'}}>
                    <h1 class="font-weight-semi-bold text-uppercase mb-3">Contactanos</h1>
                    <div class="d-inline-flex">
                        <p class="m-0"><a href="">Inicio</a></p>
                        <p class="m-0 px-2">-</p>
                        <p class="m-0">Contacto</p>
                    </div>
                </div>
            </div>
            {/* <!-- Page Header End --> */}


            {/* <!-- Contact Start --> */}
            <div class="container-fluid pt-5">
                <div class="text-center mb-4">
                    <h2 class="section-title px-5"><span class="px-2">Contactanos por cualquier consulta</span></h2>
                </div>
                <div class="row px-xl-5">
                    <div class="col-lg-7 mb-5">
                        <div class="contact-form">
                            <div id="success"></div>
                            <form name="sentMessage" id="contactForm" novalidate="novalidate" onSubmit={handleSubmit}>
                                <div class="control-group">
                                    <input type="text" class="form-control" id="name" placeholder="Tu nombre"
                                        required="required" data-validation-required-message="Please enter your name"/>
                                    <p class="help-block text-danger"></p>
                                </div>
                                <div class="control-group">
                                    <input type="email" class="form-control" id="email" placeholder="Tu email"
                                        required="required" data-validation-required-message="Please enter your email"  onChange={(e) => setDatos({...datos, email: e.target.value })}/>
                                    <p class="help-block text-danger"></p>
                                </div>
                                <div class="control-group">
                                    <input type="text" class="form-control" id="subject" placeholder="Asunto"
                                        required="required" data-validation-required-message="Please enter a subject" onChange={(e) => setDatos({...datos, asunto: e.target.value })}/>
                                    <p class="help-block text-danger"></p>
                                </div>
                                <div class="control-group">
                                    <textarea class="form-control" rows="6" id="message" placeholder="Mensaje" onChange={(e) => setDatos({...datos, mensaje: e.target.value })}
                                        required="required"
                                        data-validation-required-message="Please enter your message"></textarea>
                                    <p class="help-block text-danger"></p>
                                </div>
                                <div>
                                    <button class="btn btn-primary py-2 px-4" type="submit" id="sendMessageButton" onClick={handleSubmit}>Enviar mensaje</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="col-lg-5 mb-5">
                        <h5 class="font-weight-semi-bold mb-3">Avisos importantes</h5>
                        <p>{info?.avisos}</p>
                        <div class="d-flex flex-column mb-3">
                            <h5 class="font-weight-semi-bold mb-3">Nuestras redes</h5>
                            <p class="mb-2"><i class="fab fa-instagram text-primary mr-3" style={{transform: 'scale(1.3)'}}></i>{info.instagram}</p>
                            <p class="mb-2"><i class="fa fa-envelope text-primary mr-3"></i>i{info?.email}</p>
                            <p class="mb-2"><i class="fa fa-phone-alt text-primary mr-3"></i>{info?.numero}</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Contact End --> */}

        </>
    )
}