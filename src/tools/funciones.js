import axios from 'axios'
const host = process.env.REACT_APP_BACKEND_URL

//pago (pendiente o realizado), medio de pago
//('mercado pago', 'transferencia bancaria')

export let procesarCompra = (productos, usuario, medioDePago) => {
	let idDelProd = [];
	let respuesta;
  
	const realizarCompraBack = (productos, usuario) => {
	  return new Promise((resolve, reject) => {
		const promises = productos.map(async (ele) => {
		  try {
			const res = await axios.post(`${host}/realizar-pedido`, {
			  talle: ele.talle,
			  color: ele.color,
			  cantidad: ele.cantidad,
			  productoId: ele.id
			});
  
			idDelProd.push(res.data.id);
			descontarStock(ele.id, ele.cantidad);
		  } catch (err) {
			console.log(err);
		  }
		});
  
		Promise.all(promises)
		  .then(async () => {
			await realizarCompraBack2(usuario);
			resolve();
		  })
		  .catch((err) => {
			console.log(err);
			reject(err);
		  });
	  });
	};
  
	const realizarCompraBack2 = (usuario) => {
		//primero me fijo si el usuario ya esta registrado en la base de datos
		//si el usuario ya existe y la prop registrado es true usare ese usuario
		//si el usuario existe pero no esta registrado o el usuario no existe lo creare
		//a este punto ya tengo el id del usuario y el array de pedidos solo hacen falta los datos de la compra
	  return new Promise((resolve, reject) => {
		axios.get(`${host}/usuarios/${usuario.dni}`)
		  .then(async (res) => {
			if (res.data) {
			  await finalizarLaCompraBack(res.data.id);
			} else {
			  const response = await axios.post(`${host}/usuarios/signup`, {
				apellido: usuario.apellido,
				direccion_barrio: usuario.direccion_barrio,
				direccion_calles: usuario.direccion_calles,
				direccion_localidad: usuario.direccion_localidad,
				direccion_provincia: usuario.direccion_provincia,
				dni: usuario.dni,
				email: usuario.email,
				nombre: usuario.nombre,
				telefono: usuario.telefono,
				codigo_postal: usuario.codigo_postal
			  });
			  await finalizarLaCompraBack(response.data.id);
			}
			resolve();
		  })
		  .catch((err) => {
			console.log(err);
			reject(err);
		  });
	  });
	};
  
	const finalizarLaCompraBack = async (idUsuario) => {
		try {
		  const monto = await montoFinal(productos);
		  const res = await axios.post(`${host}/compras`, {
			usuarioId: idUsuario,
			pedidos: idDelProd,
			monto_final: monto,
			medio_de_pago: medioDePago === true ? 'transferencia bancaria' : 'mercado pago'
		  });
		  respuesta = res.data;
		  return res.data;
		} catch (err) {
		  console.log(err);
		  throw err;
		}
	  };
  
	return new Promise((resolve, reject) => {
	  realizarCompraBack(productos, usuario)
		.then(() => {
		  console.log(respuesta);
		  resolve(respuesta);//la funcion en su totalidad retornara esta respuesta
		})
		.catch((err) => {
		  console.log(err);
		  reject(err);
		});
	});
  };



	// ...................................................................................................
	const descontarStock = (id, cantidad) => {
		axios.put(`${host}/productos/descontar-stock/${id}`, {cantidad: cantidad})
		.then((res) => 'nose')
		.then((err) => console.log(err))
	}

	export const montoFinal = async (carrito) => {//es un dato para pasarle a 'compras'
		let monto = await obtenerElEnvio().then((res) => res)
		await carrito.reduce((acc, item) => {
			monto += acc + item.precio * item.cantidad;
		}, 0)
		return monto
	}

	export const obtenerElEnvio = async () => {
		try {
		  const response = await axios.get(`${host}/info`);
		  return response.data.envio
		} catch (error) {
		  console.error(error);
		  throw error;
		}
	  };
