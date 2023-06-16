import React, { useEffect , useState} from "react";
import axios from 'axios'
import {Link} from 'react-router-dom'
import '../styles/scroll.css'
const host = process.env.REACT_APP_BACKEND_URL

export default function Footer (){
    const [info, setInfo] = useState({})
    const [subs , setSubs] = useState({
        nombre: '',
        email: ''
    })

    useEffect(() => {
        axios.get(`${host}/info`)
        .then((res) => setInfo(res.data))
        .catch((err) => console.log(err))
    }, [])

    const scrollear = () => {
		window.scrollTo(0,0)
	}

    const subscribirse = () => {
        axios.post(`${host}/subscripcion`, subs)
    }
    return(
        <>
            {/* <!-- Footer Start --> */}
            <div class="container-fluid bg-secondary text-dark mt-5 pt-5">
                <div class="row px-xl-5 pt-5">
                    <div class="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5">
                        <a href="" class="text-decoration-none">
                            <h1 class="mb-4 display-5 font-weight-semi-bold"><span class="text-primary font-weight-bold border border-white px-3 mr-1">Loa</span>Concept</h1>
                        </a>
                        <p>{info?.descripcion}</p>
                        <p class="mb-2"><i class="fab fa-instagram text-primary mr-3" style={{transform: 'scale(1.3)'}}></i>{info?.instagram}</p>
                        <p class="mb-2"><i class="fa fa-envelope text-primary mr-3"></i>{info?.email}</p>
                        <p class="mb-0"><i class="fa fa-phone-alt text-primary mr-3"></i>{info?.numero}</p>
                    </div>
                    <div class="col-lg-8 col-md-12">
                        <div class="row">
                            <div class="col-md-4 mb-5">
                                <h5 class="font-weight-bold text-dark mb-4">Recomendaciones</h5>
                                <div class="d-flex flex-column justify-content-start">
                                <Link to='/tienda?filtrar=tops' style={{textDecoration: 'none'}} class="text-dark mb-2"><a class="text-dark mb-2" ><i class="fa fa-angle-right mr-2"></i>Tops</a></Link>
                                <Link to='/tienda?filtrar=lenceria' style={{textDecoration: 'none'}} class="text-dark mb-2"><a class="text-dark mb-2" ><i class="fa fa-angle-right mr-2"></i>Lenceria</a></Link>
                                <Link to='/tienda?filtrar=remerones' style={{textDecoration: 'none'}} class="text-dark mb-2"><a class="text-dark mb-2" ><i class="fa fa-angle-right mr-2"></i>Remerones</a></Link>
                                <Link to='/tienda?filtrar=buzos' style={{textDecoration: 'none'}} class="text-dark mb-2"><a class="text-dark mb-2" ><i class="fa fa-angle-right mr-2"></i>Buzos</a></Link>
                                <Link to='/tienda?filtrar=polleras' style={{textDecoration: 'none'}} class="text-dark mb-2"><a class="text-dark mb-2" ><i class="fa fa-angle-right mr-2"></i>Polleras</a></Link>
                                </div>
                            </div>
                            <div class="col-md-4 mb-5">
                                <h5 class="font-weight-bold text-dark mb-4">Links</h5>
                                <div class="d-flex flex-column justify-content-start">
                                    <Link to='/' style={{textDecoration: 'none'}} class="text-dark mb-2" onClick={scrollear}><a class="text-dark mb-2" ><i class="fa fa-angle-right mr-2"></i>Inicio</a></Link>
                                    <Link to='/tienda' style={{textDecoration: 'none'}} class="text-dark mb-2" onClick={scrollear}><a class="text-dark mb-2" ><i class="fa fa-angle-right mr-2"></i>Nuestra tienda</a></Link>
                                    <Link to='/carrito' style={{textDecoration: 'none'}} class="text-dark mb-2" onClick={scrollear}><a class="text-dark mb-2" ><i class="fa fa-angle-right mr-2"></i>Carrito</a></Link>
                                    <Link to='/contacto' style={{textDecoration: 'none'}} class="text-dark mb-2" onClick={scrollear}><a class="text-dark" ><i class="fa fa-angle-right mr-2"></i>Contacto</a></Link>
                                    <Link to='/finalizar-compra' style={{textDecoration: 'none'}} class="text-dark mb-2" onClick={scrollear}><a class="text-dark mb-2" ><i class="fa fa-angle-right mr-2"></i>medios de pago</a></Link>

                                </div>
                            </div>
                            
                            <div class="col-md-4 mb-5">
                                <h5 class="font-weight-bold text-dark mb-4">Quiero recibir ofertas</h5>
                                <form action="" onSubmit={() => subscribirse()}>
                                    <div class="form-group">
                                        <input type="text" class="form-control border-0 py-4" placeholder="Nombre" required="required" onChange={(e) => setSubs({...subs, nombre: e.target.value})}/>
                                    </div>
                                    <div class="form-group">
                                        <input type="email" class="form-control border-0 py-4" placeholder="Email"
                                            required="required" onChange={(e) => setSubs({...subs, email: e.target.value})}/>
                                    </div>
                                    <div>
                                        <button class="btn btn-primary btn-block border-0 py-3" type="submit">Subscribirse</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row border-top border-light mx-xl-5 py-4">
                    <div class="col-md-6 px-xl-0">
                        <p class="mb-md-0 text-center text-md-left text-dark">
                            &copy; Desarrollado por <a class="text-dark font-weight-semi-bold" target='_blank' href="https://www.instagram.com/inside.solution/">Inside Solution</a>
                        </p>
                    </div>
                    <div class="col-md-6 px-xl-0 text-center text-md-right">
                        <img class="img-fluid" src="img/payments.png" alt=""/>
                    </div>
                </div>
            </div>
            {/* <!-- Footer End --> */}
            
        </>
    )
}