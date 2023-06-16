import React from "react";
import '../styles/allStyles.css'
import '../styles/moreStyles.css'
import { useEffect, useState } from "react";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { agregarAlCarrito } from "../redux/actions";
import '../styles/Tienda.css'
import { useLocation } from "react-router-dom";
import { corroborarStock } from "../tools/funcionesII";
import host from './variables'


export default function Tienda (props){

    const {search} = useLocation()
    const dispatch = useDispatch()
    //--------estados-----------
    const [ productos , setProductos] = useState([]) // => productos que se van a renderizar en el dom
    const [arrayInicial , setArrayInicial] = useState([]) // => array inicial que usare para poder configurar los filtros precio y talle
    const [cantidad , setCantidad] = useState([]) // => array entero con paginado y todo (lo uso para saber cuantas paginas hacer)
    const [page, setPage] = useState(0) // => numero de la pagina en la cual esta parado actualmente
    // const [preciosFiltro, setPreciosFiltro] = useState([])
    const [input, setInput] = useState('')

    useEffect(() => {
        
        if(search) handleFiltros()
        else handleProducts(0);

    }, [search])

    const handleProducts = (pagina) => {

        if(cantidad.length === 0){
            axios.get(`${host}/productos/paginado`)
            .then((res) => {
                setCantidad(res.data)
                setPage(pagina)
                setProductos(res.data[pagina])
                setArrayInicial(res.data)
            })
            .catch((err) => console.log(err))
        }else{

            if(pagina !== cantidad.length && Math.sign(pagina) == 1 || pagina == 0 ){ 
                setPage(pagina)
                setProductos(cantidad[pagina])
            }else return  showToastMessage('error', 'no hay mas páginas')
        }  
    }

    const handleSearch = (value, pag) => {
        axios.get(`${host}/productos/buscar?nombre=${value}`)
        .then((res) => {
            if(res.data.length === 0) return showToastMessage('error', 'no se hallaron productos')
            else{
                setCantidad(res.data)
                setProductos(res.data[pag])
                setArrayInicial(res.data)
                // console.log(res.data)
            }
        })
        .catch((err) => console.log(err))
    }

    const showToastMessage = (status, mensaje) => {
        status == 'success'
        ? toast.success(mensaje, {
            position: toast.POSITION.TOP_RIGHT
        })
        : toast.error(mensaje, {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    const handleProductsForce = () => {
        axios.get(`${host}/productos/paginado`)
        .then((res) => {
            setCantidad(res.data)
            setPage(0)
            setProductos(res.data[0])
            setArrayInicial(res.data)
        })
        .catch((err) => console.log(err))
    }

    const handleFiltros = () => {
        let parametro = search.split('=')
        if(parametro[0].includes('filtrar')){
            axios.get(`${host}/productos/buscar?categoria=${parametro[1]}`)
            .then((res) => {
                setCantidad(res.data)
                setProductos(res.data[0])
                setArrayInicial(res.data)
            })
            .catch((err) => console.log(err) )
        }
        else {
            axios.get(`${host}/productos/buscar?nombre=${parametro[1]}`)
            .then((res) => {
                setCantidad(res.data)
                setProductos(res.data[0])
                setArrayInicial(res.data)
            })
            .catch((err) => console.log(err) )
        }
    }

    const aumento = async (e) => {
        const CS = await corroborarStock(e.id, 1)
        if(CS === true){
            dispatch(agregarAlCarrito(e)) 
            showToastMessage('success', "producto agregado al carrito")
        }else showToastMessage('error', 'La cantidad del producto solicitado excede nuestro límite de stock')
    }
// ------------------------------FUNCIONES PARA EL FILTRO DE PRECIOS-------------------------------

    const [filtrar, setFiltrar] = useState({
        precio_0_2500 : {
            estado: false,
            value: '&precios=0-2500'
        },
        precio_2500_5000 : {
            estado: false,
            value: '&precios=2500-5000'
        },
        precio_5000_7500 : {
            estado: false,
            value: '&precios=5000-7500'
        },
        precio_7500_10000 : {
            estado: false,
            value: '&precios=7500-10000'
        },
        precio_10000_adelante : {
            estado: false,
            value:'&precios=10000-1000000'
        }
    })

    const handleObj = async (prop) => {
        const newObj = filtrar //pongo en una variable el estado que tiene un objeto que quiero editar
        if(newObj[prop].estado === false) newObj[prop] = {estado: true, value: newObj[prop].value} //cada vez que se haga click en el checkbox voy a ver si es true se setee en false si es false se setee en true
        else newObj[prop] = {estado: false, value: newObj[prop].value}  
        let resultQuery = await handleCheckBox()//funcion quesirve para ver que propiedades del objeto estan seteados en true, aquellos seteados en true, los guardara en un estado para posteriormente hacer la peticion
        // -----------------
        if(resultQuery.length !== 0 && arrayInicial.length !== 0){
            axios.post(`${host}/productos/filtrar?${resultQuery}`, arrayInicial)
            .then((res) => {
                console.log(res.data)
                setCantidad(res.data)
                setProductos(res.data[0])
            })
            .catch((err) => console.log(err))
        }else{
            setCantidad(arrayInicial)
            setProductos(arrayInicial[0])
        }
    }

    const handleCheckBox = async () => {
        let querys = ''
        for(const i in filtrar){
           if(filtrar[i].estado === true)  querys += filtrar[i].value   
        }
        let newQuery = querys.substr(1)
        return newQuery
    }  
// ------------------------------------------TERMINAN FUNCIONES PARA EL FILTRO DE PRECIOS------------------------------


    return(
        <>
        <ToastContainer />
        {/* <!-- Page Header Start --> */}
        <div class="container-fluid bg-secondary mb-5">
            <div class="d-flex flex-column align-items-center justify-content-center" style={{minHeight: "300px"}}> {/* style="min-height: 300px"*/}
                <h1 class="font-weight-semi-bold text-uppercase mb-3">Nuestra tienda</h1>
                <div class="d-inline-flex">
                    <Link to='/'><p class="m-0"><a href="">Inicio</a></p></Link>
                    <p class="m-0 px-2">-</p>
                    <p class="m-0">Tienda</p>
                </div>
            </div>
        </div>
        {/* <!-- Page Header End --> */}


        {/* <!-- Shop Start --> */}
        <div class="container-fluid pt-5">
            <div class="row px-xl-5">
                {/* <!-- Shop Sidebar Start --> */}
                <div class="col-lg-3 col-md-12">
                    <div class="border-bottom mb-4 pb-4">
                        <h5 class="font-weight-semi-bold mb-4">Filtrar por precio</h5>
                        <form>
                            <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                <input type="checkbox" class="custom-control-input" checked id="price-all"/>
                                <label class="custom-control-label" for="price-all">Todos los precios</label>
                                {/* <span class="badge border font-weight-normal">1000</span> */}
                            </div>
                            <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                <input type="checkbox" className="custom-control-input checkear" id="price-1"  onClick={() => handleObj('precio_0_2500')}/>
                                <label className="custom-control-label" for="price-1">$0 - $2.500</label>
                                {/* <span class="badge border font-weight-normal">150</span> */}
                            </div>
                            <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                <input type="checkbox" className="custom-control-input checkear" id="price-2"  onClick={() => handleObj('precio_2500_5000')}/>
                                <label className="custom-control-label" for="price-2">$2.500 - $5.000</label>
                                {/* <span class="badge border font-weight-normal">295</span> */}
                            </div>
                            <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                <input type="checkbox" className="custom-control-input checkear" id="price-3"  onClick={() => handleObj('precio_5000_7500')}/>
                                <label class="custom-control-label" for="price-3">$5.000 - $7.500</label>
                                {/* <span class="badge border font-weight-normal">246</span> */}
                            </div>
                            <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                <input type="checkbox" className="custom-control-input checkear" id="price-4"  onClick={() => handleObj('precio_7500_10000')}/>
                                <label className="custom-control-label" for="price-4">$7.500 - $10.000</label>
                                {/* <span class="badge border font-weight-normal">145</span> */}
                            </div>
                            <div className="custom-control custom-checkbox d-flex align-items-center juifsty-content-between">
                                <input type="checkbox" className="custom-control-input checkear" id="price-5" onClick={() => handleObj('precio_10000_adelante')}/>
                                <label className="custom-control-label" for="price-5">$10.000 +</label>
                                {/* <span class="badge border font-weight-normal">168</span> */}
                            </div>
                        </form>
                    </div>
                    
                    {/* <!-- Size End --> */}
                </div>
                {/* <!-- Shop Sidebar End --> */}
               {/* ----------------------------------------------------tienda-------------------------------- */}
                    <div class="col-lg-9 col-md-12">
                        <div class="row pb-3">
                            <div class="col-12 pb-1">
                                <div class="d-flex align-items-center justify-content-between mb-4">
                                    <form action="">
                                        <div class="input-group">
                                            <input 
                                                type="text" 
                                                class="form-control" 
                                                placeholder="buscar productos" 
                                                onChange={(e) => setInput(e.target.value)}
                                            />
                                            <div class="input-group-append" onClick={() => handleSearch(input, 0)}>
                                                <span class="input-group-text bg-transparent text-primary">
                                                    <i class="fa fa-search"></i>
                                                </span>
                                            </div>
                                            <button 
                                                style={{marginLeft: '10px'}}
                                                class="btn border " 
                                                type="button" 
                                                aria-expanded="false"
                                                onClick={() => {
                                                    handleProductsForce()
                                                }}
                                                >
                                                Traer todos
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            { cantidad.length === 0 ? 
                            <div class="pagination justify-content-center mb-3 col-12 pb-1" style={{height: '200px'}}>
                                <div class="page-item" style={{marginTop:'10%'}}>no hay stock disponible</div>
                            </div> :
                            productos.map((e, index) => {
                                return(
                                    <div class="col-lg-4 col-md-6 col-sm-12 pb-1" key={index}>
                                        <div class="card product-item border-0 mb-4">
                                            {e.display == false 
                                            ? <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0 contenedor_imagen_tienda" style={{ height: '46vh !important', overflow: 'hidden !important', display: 'flex', alignItems: 'center'}}>
                                                <img class="img-fluid w-100 " src={e.img } alt="/" style={{filter: 'grayscale(1)'}}/>
                                                <div style={{alignItems: 'center', display: 'flex', justifyContent: 'center', position: 'absolute', width: '100%' , color: 'black', backgroundColor: 'rgba(243, 243, 243, 0.28)', }}>no hay stock disponible</div>
                                            </div>
                                            : <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0 contenedor_imagen_tienda" style={{ height: '46vh !important', overflow: 'hidden !important'}}>
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
                            <div class="col-12 pb-1">
                                <nav aria-label="Page navigation">
                                <ul class="pagination justify-content-center mb-3">
                                    <li class="page-item disabled"  onClick={(e) => handleProducts(page - 1)}>
                                    <a class="page-link" aria-label="Previous">
                                        <span aria-hidden="true">&laquo;</span>
                                        <span class="sr-only">Previous</span>
                                    </a>
                                    </li>
                                { cantidad.map((e, index) => {
                                    return (
                                    <li 
                                        key={index}
                                        class={page == index ? "page-item active" : "page-item"} 
                                        onClick={() => handleProducts(index)}>
                                            <a class="page-link">{index + 1}</a>
                                    </li>)
                                })}
                                    <li class="page-item" onClick={(e) => handleProducts(page + 1)}>
                                    <a class="page-link" aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                        <span class="sr-only">Next</span>
                                    </a>
                                    </li>
                                </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
               {/* -------------------------------------------termina tienda-------------------------------------- */}
            </div>
        </div>
    </>
        
          
    )
}