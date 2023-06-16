import axios from 'axios'
import { toast } from 'react-toastify';
import store from '../redux/store';
const host = process.env.REACT_APP_BACKEND_URL

export const datos = async () => {
    try {
        const response = await axios.get(`${host}/info`);
        return response.data
      } catch (error) {
        console.error(error);
        throw error;
      }
}

export const showToastMessage = (status, mensaje) => {
  status == 'success'
  ? toast.success(mensaje, {
      position: toast.POSITION.TOP_RIGHT
  })
  : toast.error(mensaje, {
      position: toast.POSITION.TOP_RIGHT
  });
}

export const corroborarStock = async (id, cantidad) => {
  let stock = await axios.get(`${host}/productos/${id}`).then((res) => res.data.stock).catch((err) => console.log(err))
  let ps = await store.getState().carrito.filter((ele) => ele.id == id).map((e) => e.cantidad)
  let sumario = await ps.reduce((acc, x) => acc + x , 0)
  let total = sumario + cantidad

  if(total <= stock) return true
  else return false
}


// export const cloudinary = async (element) => {
//   const imageFile = element.target.files[0];
  
//   const formData = new FormData();
//   formData.append('image', imageFile);
  
//   axios.post('http://localhost:3001/upload', formData)
//     .then(response => {
//       console.log(response.data); // Manejar la respuesta como desees
//     })
//     .catch(error => {
//       console.error(error); // Manejar el error como desees
//     });
//   console.log(element)
// }

export const cloudinary = async (element) => {
  const imageFile = element.target.files[0];
  
  const formData = new FormData();
  formData.append('image', imageFile);
  
  try {
    const response = await axios.post(`${host}/upload`, formData);
    return response.data; // Retorna response.data
  } catch (error) {
    console.error(error); // Manejar el error como desees
    throw error; // Opcionalmente, puedes lanzar el error para que sea manejado por el código que llama a la función
  }
};

export const crearProd = (form) => {
  axios.post(`${host}/productos`, form)
  .then((res) => console.log(res))
  .then((err) => console.log(err))
}