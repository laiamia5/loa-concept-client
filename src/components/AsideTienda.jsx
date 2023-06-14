// import React from "react";
// import '../styles/allStyles.css'
// import '../styles/moreStyles.css'
// import Tienda from './Tienda'
// import {Link} from "react-router-dom"
// import {useState} from 'react'

// export default function AsideTienda (){

//     // -------------------------------funcion de aside tienda----------------------------------------
//     const [filtrar, setFiltrar] = useState({
//         precio_0_2500 : false,
//         precio_2500_5000 : false,
//         precio_5000_7500 : false,
//         precio_7500_10000 : false,
//         precio_10000_adelante : false
//     })

//     const handleObj = (prop) => {
//         const newObj = filtrar
//         newObj[prop] === true ?  newObj[prop] = false :  newObj[prop] = true 
//         setFiltrar(newObj)
//         console.log(filtrar)
//     }
// // -----------------------------terminan las funciones de aside tienda---------------------------
//     return(
    // <>
    //     {/* <!-- Page Header Start --> */}
    //     <div class="container-fluid bg-secondary mb-5">
    //         <div class="d-flex flex-column align-items-center justify-content-center" style={{minHeight: "300px"}}> {/* style="min-height: 300px"*/}
    //             <h1 class="font-weight-semi-bold text-uppercase mb-3">Nuestra tienda</h1>
    //             <div class="d-inline-flex">
    //                 <Link to='/'><p class="m-0"><a href="">Inicio</a></p></Link>
    //                 <p class="m-0 px-2">-</p>
    //                 <p class="m-0">Tienda</p>
    //             </div>
    //         </div>
    //     </div>
    //     {/* <!-- Page Header End --> */}


    //     {/* <!-- Shop Start --> */}
    //     <div class="container-fluid pt-5">
    //         <div class="row px-xl-5">
    //             {/* <!-- Shop Sidebar Start --> */}
    //             <div class="col-lg-3 col-md-12">
    //                 <div class="border-bottom mb-4 pb-4">
    //                     <h5 class="font-weight-semi-bold mb-4">Filtrar por precio</h5>
    //                     <form>
    //                         <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
    //                             <input type="checkbox" class="custom-control-input" checked id="price-all"/>
    //                             <label class="custom-control-label" for="price-all">Todos los precios</label>
    //                             <span class="badge border font-weight-normal">1000</span>
    //                         </div>
    //                         <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
    //                             <input type="checkbox" class="custom-control-input" id="price-1"  onClick={() => handleObj('precio_0_2500')}/>
    //                             <label class="custom-control-label" for="price-1">$0 - $2.500</label>
    //                             <span class="badge border font-weight-normal">150</span>
    //                         </div>
    //                         <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
    //                             <input type="checkbox" class="custom-control-input" id="price-2"  onClick={() => handleObj('precio_2500_5000')}/>
    //                             <label class="custom-control-label" for="price-2">$2.500 - $5.000</label>
    //                             <span class="badge border font-weight-normal">295</span>
    //                         </div>
    //                         <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
    //                             <input type="checkbox" class="custom-control-input" id="price-3"  onClick={() => handleObj('precio_5000_7500')}/>
    //                             <label class="custom-control-label" for="price-3">$5.000 - $7.500</label>
    //                             <span class="badge border font-weight-normal">246</span>
    //                         </div>
    //                         <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
    //                             <input type="checkbox" class="custom-control-input" id="price-4"  onClick={() => handleObj('precio_7500_10000')}/>
    //                             <label class="custom-control-label" for="price-4">$7.500 - $10.000</label>
    //                             <span class="badge border font-weight-normal">145</span>
    //                         </div>
    //                         <div class="custom-control custom-checkbox d-flex align-items-center juifsty-content-between">
    //                             <input type="checkbox" class="custom-control-input" id="price-5" onClick={() => handleObj('precio_10000_adelante')}/>
    //                             <label class="custom-control-label" for="price-5">$10.000 +</label>
    //                             <span class="badge border font-weight-normal">168</span>
    //                         </div>
    //                     </form>
    //                 </div>
                    
    //                 {/* <!-- Size End --> */}
    //             </div>
    //             {/* <!-- Shop Sidebar End --> */}
    //             <Tienda filtrar={filtrar}/>
    //         </div>
    //     </div>
    // </>
//     )
// }