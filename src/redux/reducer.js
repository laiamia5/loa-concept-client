import {
    AGREGAR_AL_CARRITO,
    AUMENTAR_CANTIDAD,
    DISMINUIR_CANTIDAD,
    ELIMINAR_DEL_CARRITO,
    FINALIZAR_Y_VACIAR,
    SACAR_LOS_SIN_STOCK
} from './actions'

let storage = localStorage.getItem('carrito')
let parseo = JSON.parse(storage) 

const initialState = {
    carrito: parseo ? parseo : [] ,
    categoria : null
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case  AGREGAR_AL_CARRITO:
            console.log(state)
            let encontrarProd = state.carrito.find((e) => e.id === action.payload.id && e.color === action.payload.color && e.talle === action.payload.talle)
            if(!encontrarProd){
                return{
                    ...state,
                    carrito:[...state.carrito, action.payload]
                }
            }else encontrarProd.cantidad += action.payload.cantidad
        case AUMENTAR_CANTIDAD:
            state.carrito.find((e) => e == action.payload).cantidad ++
            return{
                ...state,
                carrito: state.carrito
            }
        case DISMINUIR_CANTIDAD:
            let productoCarr = state.carrito.find((e) => e == action.payload)
            productoCarr.cantidad !== 0 && productoCarr.cantidad --
            return{
                ...state,
                carrito: productoCarr.cantidad === 0 ?  state.carrito.filter((e) => e !== action.payload) : state.carrito
            }
        case ELIMINAR_DEL_CARRITO:
            return{
                ...state,
                carrito: state.carrito.filter((e) => e !== action.payload) 
            }
        case FINALIZAR_Y_VACIAR:
            return{
                ...state,
                carrito: []
            }
        case SACAR_LOS_SIN_STOCK:
            return{
                ...state,
                carrito: state.carrito.filter((e) =>  Math.sign(e.stock) === 1 )
            }
        default :
            return state
        }
}

export default reducer;