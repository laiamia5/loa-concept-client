import './App.css';
import './styles/scroll.css'
import {Route, Routes} from 'react-router-dom'
import Nav from './components/Nav'
import Inicio from './components/Inicio'
import Tienda from './components/Tienda'
import './styles/allStyles.css'
import './styles/moreStyles.css'
import Footer from './components/Footer'
import Carrito from './components/Carrito'
import Detalle from './components/Detalle'
import Contacto from './components/Contacto';
import Pagar from './components/Pagar'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Admin from './components/admin/Admin'
import CompraFinalizada from './components/CompraFinalizada';
import Faqs from './components/Faqs.jsx'
const host = process.env.REACT_APP_BACKEND_URL

function App() {

  let carritoCompleto = useSelector(state => state.carrito)
  const scrollear = () => {
		window.scrollTo(0,0)
	}

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carritoCompleto))
  }, [carritoCompleto])

  return (
    <div className="App">
      <Nav/>
      <Routes>
        <Route path='/' element={<Inicio></Inicio>}/>
        <Route path='/tienda' element={<Tienda/>} />
        <Route path='/carrito' element={<Carrito/>}/>
        <Route path='/contacto' element={<Contacto/>}/>
        <Route path='/finalizar-compra' element={<Pagar/>}/>
        <Route path='/administrador' element={<Admin/>}/>
        <Route path='/detalle/:id' element={<Detalle/>}/>
        <Route path='/compra-realizada/:id' element={<CompraFinalizada/>}/>
        <Route path='/faqs' element={<Faqs/>}/>
      </Routes>
      <Footer/>
      {/* <!-- Back to Top --> */}
      <button class="boton_scroll boton_scroll_posicion" onClick={scrollear}><i class="fa fa-angle-double-up"></i></button>
    </div>
  );
}

export default App;
