import React from "react";
import '../styles/allStyles.css'
import '../styles/moreStyles.css'
import { useLocation } from "react-router-dom";
import { useState } from "react";
import '../styles/Nav.css'
import { Link } from "react-router-dom";
import {useSelector} from 'react-redux'
import '../styles/responsive.css'
import { useNavigate } from "react-router-dom";
const host = process.env.REACT_APP_BACKEND_URL

export default function Nav () {
    let navigate = useNavigate()
let productos_length = useSelector(state => state.carrito.length)
let location = useLocation()
let [clase, setClase ] = useState('dropdown-menu rounded-0 m-0')
let [busqueda, setBusqueda] = useState('')
let [navResp, setNavResp] = useState(false)
let [menu, setMenu] = useState(false)

const cambiarClase = () => {
    if(clase === 'dropdown-menu rounded-0 m-0'){
        setClase('dropdown-menu rounded-0 m-0 ver')
    }else{
        setClase('dropdown-menu rounded-0 m-0')
    }
}

    return(
        <>
             {/* <!-- Topbar Start --> */}
            <div class="container-fluid">
                <div class="row bg-secondary py-2 px-xl-5">
                    <div class="col-lg-6 d-none d-lg-block">
                        <div class="d-inline-flex align-items-center">
                            <Link to='/faqs'><a class="text-dark">FAQs</a></Link>
                            <span class="text-muted px-2">|</span>
                            {/* <a class="text-dark" href="">ayuda</a> */}
                        </div>
                    </div>
                    <div class="col-lg-6 text-center text-lg-right">
                        <div class="d-inline-flex align-items-center">
                            <a class="text-dark px-2" href="https://www.facebook.com/profile.php?id=100093227119864">
                                <i class="fab fa-facebook-f"></i>
                            </a>
                            <a class="text-dark px-2" href="https://www.instagram.com/loa_concept/">
                                <i class="fab fa-instagram"></i>
                            </a>
                            <a class="text-dark pl-2" href="">
                            <svg style={{marginBottom: '5px'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16"> <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/></svg>

                            </a>
                        </div>
                    </div>
                </div>
                <div class="row align-items-center py-3 px-xl-5" id='contenedor_search_carrito'>
                    <div class="col-lg-3 d-none d-lg-block">
                        <a class="text-decoration-none">
                            <h1 class="m-0 display-5 font-weight-semi-bold" >
                                <span style={{fontSize: '2vh', position: 'absolute', color: '#D19C97', marginLeft: '5px'}}>♡</span> 
                                <span class="text-primary font-weight-bold border px-3 mr-1 color_transparente">LOA</span>
                                <span style={{fontFamily: 'Playball, cursive', fontSize: '7vh', color: '#D19C97'}}>Concept </span>
                            </h1>
                        </a>
                    </div>
                    <div class="col-lg-6 col-6 text-left">
                        <form onSubmit={(event) => {
                            event.preventDefault();
                            navigate(busqueda == '' ? '/' : `/tienda?buscar=${busqueda}`)
                            }}>
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="Buscar Productos" onChange={(e) => setBusqueda(e.target.value)}/>
                                <div class="input-group-append">
                                    <span class="input-group-text bg-transparent text-primary">
                                        <i class="fa fa-search"></i>
                                    </span>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="col-lg-3 col-6 text-right">
                        {/* <a href="" class="btn border">
                            <i class="fas fa-heart text-primary"></i>
                            <span class="badge">0</span>
                        </a> */}
                        <Link to='/carrito' style={{textDecoration: 'none'}}><a  class="btn border">
                            <i class="fas fa-shopping-cart text-primary"></i>
                            <span class="badge">{productos_length}</span>
                        </a></Link>
                    </div>
                </div>
            </div>
            {/* <!-- Topbar End --> */}


            {/* <!-- Navbar Start --> */}
            {location.pathname !== "/administrador" && 
            <div class="container-fluid mb-5">
                <div class="row border-top px-xl-5" >
                    <div class="col-lg-3 d-none d-lg-block" 
                    onClick={() => menu === false ? setMenu(true) : setMenu(false) } 
                    >
                        <a class="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100" data-toggle="collapse" style={{height: '55px', marginTop:' -1px', padding: '0 30px'}} > {/* style="height: 65px; margin-top: -1px; padding: 0 30px;" */}
                            <h6 class="m-0">Categorias</h6>
                            <i class="fa fa-angle-down text-dark"></i>
                        </a>
                        {location.pathname === "/" || menu == true ?
                        (<nav  class="position-absolute navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0 bg-light collapse show" id="navbar-vertical" style={{width: 'calc(100% - 30px)' , zIndex: '1'}}>
                            <div class="navbar-nav w-100 overflow-hidden" > {/*style="" */}
                                {/* <div class="nav-item dropdown">
                                    <a href="#" class="nav-link" data-toggle="dropdown">Vestidos<i class="fa fa-angle-down float-right mt-1"></i></a>
                                    <div class="dropdown-menu position-absolute bg-secondary border-0 rounded-0 w-100 m-0">
                                        <a href="" class="dropdown-item">Men's Dresses</a>
                                        <a href="" class="dropdown-item">Women's Dresses</a>
                                        <a href="" class="dropdown-item">Baby's Dresses</a>
                                    </div>
                                </div> */}
                               <Link to='/tienda?filtrar=tops' style={{textDecoration: 'none'}}><a class="nav-item nav-link">Tops</a></Link> 
                               <Link to='/tienda?filtrar=lenceria' style={{textDecoration: 'none'}}><a class="nav-item nav-link">Lenceria</a></Link>
                               <Link to='/tienda?filtrar=polleras' style={{textDecoration: 'none'}}><a class="nav-item nav-link">Polleras</a></Link>
                               <Link to='/tienda?filtrar=zapatos' style={{textDecoration: 'none'}}><a class="nav-item nav-link">Zapatos</a></Link>
                               <Link to='/tienda?filtrar=zapatos' style={{textDecoration: 'none'}}><a class="nav-item nav-link">Zapatos</a></Link>
                                {/* <a href="" class="nav-item nav-link">Sportswear</a> */}
                                {/* <a href="" class="nav-item nav-link">Jumpsuits</a> */}
                                {/* <a href="" class="nav-item nav-link">Blazers</a> */}
                                {/* <a href="" class="nav-item nav-link">Jackets</a> */}
                                {/* <a href="" class="nav-item nav-link">Shoes</a> */}
                            </div>
                        </nav>)
                        : <div style={{height: '0', width: '0'}}></div>
                        }
                    </div>
                    <div class="col-lg-9">
                        <nav class="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
                            <a href="" class="text-decoration-none d-block d-lg-none">
                                <h1 class="m-0 display-5 font-weight-semi-bold"><span class="text-primary font-weight-bold border px-3 mr-1">Loa</span>Concept</h1>
                            </a>
                             {/* -----------responsive--------- */}
                                <Link to='/carrito' style={{textDecoration: 'none'}} className="disp">
                                    <a  class="btn border">
                                        <i class="fas fa-shopping-cart text-primary"></i>
                                        <span class="badge">{productos_length}</span>
                                    </a>
                                </Link>
                            {/* -------------------------------- */}
                            <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse" onClick={() => navResp == true ? setNavResp(false) : setNavResp(true)}>
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class={navResp == false ? "collapse navbar-collapse justify-content-between" : "collapse navbar-collapse justify-content-between display_block anim" } id="navbarCollapse">
                                <div class="navbar-nav mr-auto py-0">
                                  <Link to='/' style={{textDecoration: 'none'}}><a class={ location.pathname === "/" ? "nav-item nav-link active" : "nav-item nav-link"}>Inicio</a></Link>  
                                  <Link to='/tienda' style={{textDecoration: 'none'}}><a class={ location.pathname === "/tienda" ? "nav-item nav-link active" : "nav-item nav-link"}>Tienda</a></Link> 
                                    <div class="nav-item dropdown">
                                        <a data-toggle="dropdown" onClick={cambiarClase} class={ location.pathname === "/carrito" ? "active nav-link dropdown-toggle pages" : "nav-link dropdown-toggle pages"}>Compras</a>
                                        <div class= {clase} onClick={cambiarClase}>
                                            <Link to='/carrito' style={{textDecoration: 'none'}}><a class="dropdown-item">Carrito</a></Link>
                                            <Link to='/finalizar-compra' style={{textDecoration: 'none'}}><a class="dropdown-item">Finalizar Compra</a></Link>
                                        </div>
                                    </div>
                                    <Link to='/contacto' style={{textDecoration: 'none'}}>  <a class={ location.pathname === "/contacto" ? "nav-item nav-link active" : "nav-item nav-link"}>Contacto</a></Link>
                                </div>
                                {/* <div class="navbar-nav ml-auto py-0">
                                    <a href="" class="nav-item nav-link">Iniciar sesión </a>
                                    <a href="" class="nav-item nav-link">Registrarse</a>
                                </div> */}
                            </div>
                        </nav>
                        {location.pathname === "/" && 
                        <div id="header-carousel" class="carousel slide" data-ride="carousel">
                            <div class="carousel-inner">
                                <div class="carousel-item active" > {/* style="height: 410px;"*/}
                                    <img class="img-fluid" src="data:image/jpeg;base64,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" alt="Image"/>
                                    <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                        <div class="p-3" > {/*style="max-width: 700px;" */}
                                            <h4 class="text-light text-uppercase font-weight-medium mb-3">10% Off Your First Order</h4>
                                            <h3 class="display-4 text-white font-weight-semi-bold mb-4">Fashionable Dress</h3>
                                            <a href="" class="btn btn-light py-2 px-3">Shop Now</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="carousel-item"> {/* style="height: 410px;" */}
                                    <img class="img-fluid" src="https://marketplace.canva.com/EAFHvx67lpg/1/0/1600w/canva-portada-de-facebook-recortes-con-frase-simple-color-marr%C3%B3n-tXDCYFde8is.jpg" alt="Image"/>
                                    <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                        <div class="p-3" > {/*style="max-width: 700px;" */} 
                                            <h4 class="text-light text-uppercase font-weight-medium mb-3">10% Off Your First Order</h4>
                                            <h3 class="display-4 text-white font-weight-semi-bold mb-4">Reasonable Price</h3>
                                            <a href="" class="btn btn-light py-2 px-3">Shop Now</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <a class="carousel-control-prev" href="#header-carousel" data-slide="prev">
                               <div class="btn btn-dark">  {/*  style="width: 45px; height: 45px;" */}
                                    <span class="carousel-control-prev-icon mb-n2"></span>
                                </div>
                            </a>
                            <a class="carousel-control-next" href="#header-carousel" data-slide="next">
                                 <div class="btn btn-dark" > {/* style="width: 45px; height: 45px;" */}
                                    <span class="carousel-control-next-icon mb-n2"></span>
                                </div>
                            </a>
                        </div>
                        }
                    </div>
                </div>
            </div>
            }
            {/* <!-- Navbar End --> */}

        </>
    )
}
