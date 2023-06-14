import axios from 'axios'
export const AGREGAR_AL_CARRITO = 'AGREGAR_AL_CARRITO';
export const AUMENTAR_CANTIDAD = 'AUMENTAR_CANTIDAD';
export const DISMINUIR_CANTIDAD = 'DISMIMUIR_CANTIDAD'
export const ELIMINAR_DEL_CARRITO = 'ELIMINAR_DEL_CARRITO'
export const FINALIZAR_Y_VACIAR = 'FINALIZAR_Y_VACIAR'
export const SACAR_LOS_SIN_STOCK = 'SACAR_LOS_SIN_STOCK'

export const agregarAlCarrito = (obj) => async (dispatch) => {
    let newOb = {
        ...obj,
        cantidad: obj.cantidad ? obj.cantidad : 1,
        talle: obj.talle ? obj.talle : null,
        color: obj.color ? obj.color : null,
        productoId: obj.id,
    }
    return dispatch({type:AGREGAR_AL_CARRITO, payload: newOb})
}

export const aumentarCantidad = (elemento) => async (dispatch) => {
    return dispatch({type: AUMENTAR_CANTIDAD, payload: elemento})
}


export const disminuirCantidad = (elemento) => async (dispatch) => {
    return dispatch({type: DISMINUIR_CANTIDAD, payload: elemento})
}

export const eliminarDelCarrito = (id) => async (dispatch) => {
    return dispatch({type: ELIMINAR_DEL_CARRITO, payload: id})
}

export const finalizarCompra = () => async (dispatch) => {
    return dispatch({type: FINALIZAR_Y_VACIAR, payload: 'hola'})
}

export const sacarTodosLosQueNoTienenStock = ()  => async (dispatch) => {
    return dispatch({type: SACAR_LOS_SIN_STOCK, payload: 'hola'})
}