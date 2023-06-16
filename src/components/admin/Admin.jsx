import React from "react";
import axios from 'axios'
import {useState} from 'react'
import '../../styles/admin.css'
import { cloudinary, crearProd } from "../../tools/funcionesII";

export default function Admin () {
//arreglar q el stock y precio s deben ser vairables de tipo number

    const [form, setForm] = useState({
            nombre: null,
            precio: null,
            precio_anterior: null,
            categoria: 'tops',
            descripcion: null,
            marca: null,
            stock: null,
            img: null,
            colores: null,
            talles: null,
    })

    const handleForm = (propi, value) => {
        let copiaDatos = form
        delete copiaDatos.undefined
        copiaDatos[propi] =  value
        setForm(copiaDatos)
        console.log(copiaDatos)
    }

    const setearChecks = async  () => {
        let todosColores = []
        let todosTalles = []
        let todosCheckBox = await document.querySelectorAll('input[type="checkbox"]')
        await todosCheckBox.forEach((e) => {
            if(e.checked ){
                e.name == 'color' ? todosColores.push(e.value) : todosTalles.push(e.value)
            }
        })
        setForm({...form, colores: todosColores.join(', ') , talles: todosTalles.join(', ') })
    }


    return(
        <div>
            <div className="body_admin">
                <form className="form_admin" onSubmit={() => crearProd(form)}>
                        <h1>Subir productos</h1>
                        <section id="preguntas" >
                            <p>
                                <label className="label_admin">Nombre del producto:</label>
                                <input type="text" className="input_admin" onChange={(e) => handleForm('nombre', e.target.value )}/>
                            </p>
                            <p>
                                <label className="label_admin">precio:</label>
                                <input type="number" className="input_admin" onChange={(e) => handleForm('precio', e.target.value )} />
                            </p>
                            <p>
                                <label className="label_admin" >Precio Anterior:</label>
                                <input type="number" className="input_admin" onChange={(e) => handleForm('precio_anterior', e.target.value )}/>
                            </p>
                            <p>
                                <label className="label_admin" >Stock:</label>
                                <input type="number" className="input_admin" onChange={(e) => handleForm('stock', e.target.value )}/>
                            </p>
                            <p>
                                <label className="label_admin" >Descripcion:</label>
                                <input type="text" className="input_admin" onChange={(e) => handleForm('descripcion', e.target.value )}/>
                            </p>
                            <p>
                                <label className="label_admin" >Marca:</label>
                                <input type="text" className="input_admin" onChange={(e) => handleForm('marca', e.target.value )}/>
                            </p>
                            <p>
                                <label className="label_admin" >imagen del producto</label>
                                <input type="file" className="input_file_admin input_admin"id="foto" multiple accept="image/*, video/*" onChange={(e) =>  cloudinary(e).then((res) => handleForm('img', res.url) ).catch(err => console.log(err)) }/>
                            </p>   
                            <p>
                                <label className="label_admin" >Categoria :</label>
                                <select type="file" className="input_admin" onChange={(e) => handleForm('categoria', e.target.value )}>
                                    <option value="tops">top</option>
                                    <option value="jeans">jean</option>
                                    <option value="buzos">buzo</option>
                                    <option value="camperas">campera</option>
                                    <option value="polleras">pollera/mini</option>
                                </select>
                            </p>  
                            <p>
                                 <label className="label_admin" >Colores:</label>
                                 <div style={{display: 'flex', flexWrap: 'wrap'}}>
                                     <div style={{margin: '5px'}}>
                                         <p style={{fontSize: '12px'}}>blanco</p>
                                        <input type="checkbox" value='blanco' name='color' onChange={() => setearChecks()}/>
                                     </div>
                                     <div style={{margin: '5px'}}>
                                         <p style={{fontSize: '12px'}}>gris</p>
                                         <input type="checkbox" value='gris' name='color'  onChange={() => setearChecks()}/>
                                     </div>
                                     <div style={{margin: '5px'}}>
                                         <p style={{fontSize: '12px'}}>negro</p>
                                         <input type="checkbox" value='negro' name='color' onChange={() => setearChecks()}/>
                                    </div>
                                     <div style={{margin: '5px'}}>
                                        <p style={{fontSize: '12px'}}>rosa</p>
                                         <input type="checkbox" value='rosa' name='color' onChange={() => setearChecks()}/>
                                    </div>
                                     <div style={{margin: '5px'}}>
                                         <p style={{fontSize: '12px'}}>rojo</p>
                                         <input type="checkbox" value='rojo' name='color' onChange={() => setearChecks()}/>
                                     </div>
                                     <div style={{margin: '5px'}}>
                                         <p style={{fontSize: '12px'}}>azul</p>
                                         <input type="checkbox" value='azul' name='color' onChange={() => setearChecks()}/>
                                     </div>
                                     <div style={{margin: '5px'}}>
                                         <p style={{fontSize: '12px'}}>celeste</p>
                                         <input type="checkbox" value='celeste' name='color' onChange={() => setearChecks()}/>
                                     </div>
                                     <div style={{margin: '5px'}}>
                                         <p style={{fontSize: '12px'}}>verde</p>
                                         <input type="checkbox" value='verde' name='color' onChange={() => setearChecks()}/>
                                     </div>
                                     <div style={{margin: '5px'}}>
                                         <p style={{fontSize: '12px'}}>amarillo</p>
                                         <input type="checkbox" value='amarillo' name='color' onChange={() => setearChecks()}/>
                                    </div>
                                     <div style={{margin: '5px'}}>
                                        <p style={{fontSize: '12px'}}>violeta</p>
                                         <input type="checkbox" value='violeta' name='color' onChange={() => setearChecks()}/>
                                     </div>
                                 </div>
                             </p> 
                             <p>
                                 <label className="label_admin" >Talles:</label>
                                 <div style={{display: 'flex', flexWrap: 'wrap'}}>
                                     <div style={{margin: '5px'}}>
                                         <p style={{fontSize: '12px'}}>unico</p>
                                         <input type="checkbox" value='unico' name='talle' onChange={() => setearChecks()}/>
                                     </div>
                                     <div style={{margin: '5px'}}>
                                         <p style={{fontSize: '12px'}}>XS</p>
                                         <input type="checkbox" value='XS'  name='talle' onChange={() => setearChecks()}/>
                                     </div>
                                     <div style={{margin: '5px'}}>
                                         <p style={{fontSize: '12px'}}>S</p>
                                         <input type="checkbox" value='S'  name='talle' onChange={() => setearChecks()}/>
                                     </div>
                                     <div style={{margin: '5px'}}>
                                         <p style={{fontSize: '12px'}}>M</p>
                                         <input type="checkbox" value='M'  name='talle' onChange={() => setearChecks()}/>
                                     </div>
                                     <div style={{margin: '5px'}}>
                                         <p style={{fontSize: '12px'}}>L</p>
                                         <input type="checkbox" value='L'  name='talle' onChange={() => setearChecks()}/>
                                     </div>
                                     <div style={{margin: '5px'}}>
                                         <p style={{fontSize: '12px'}}>XL</p>
                                         <input type="checkbox" value='XL'  name='talle' onChange={() => setearChecks()}/>
                                       </div>
                                      <div style={{margin: '5px'}}>
                                         <p style={{fontSize: '12px'}}>XXL</p>
                                          <input type="checkbox" value='XXL'  name='talle' onChange={() => setearChecks()}/>
                                      </div>
                                      <div style={{margin: '5px'}}>
                                          <p style={{fontSize: '12px'}}>26</p>
                                          <input type="checkbox" value='26'  name='talle' onChange={() => setearChecks()}/>
                                      </div>
                                      <div style={{margin: '5px'}}>
                                          <p style={{fontSize: '12px'}}>28</p>
                                          <input type="checkbox" value='28'  name='talle' onChange={() => setearChecks()}/>
                                      </div>
                                      <div style={{margin: '5px'}}>
                                          <p style={{fontSize: '12px'}}>30</p>
                                          <input type="checkbox" value='30'  name='talle' onChange={() => setearChecks()}/>
                                      </div>
                                      <div style={{margin: '5px'}}>
                                          <p style={{fontSize: '12px'}}>32</p>
                                          <input type="checkbox" value='32'  name='talle' onChange={() => setearChecks()}/>
                                      </div>
                                      <div style={{margin: '5px'}}>
                                          <p style={{fontSize: '12px'}}>34</p>
                                          <input type="checkbox" value='34'  name='talle' onChange={() => setearChecks()}/>
                                      </div>
                                    
                                      <div style={{margin: '5px'}}>
                                          <p style={{fontSize: '12px'}}>38</p>
                                          <input type="checkbox" value='38'  name='talle' onChange={() => setearChecks()}/>
                                      </div>
                                      <div style={{margin: '5px'}}>
                                          <p style={{fontSize: '12px'}}>40</p>
                                          <input type="checkbox" value='40'  name='talle' onChange={() => setearChecks()}/>
                                      </div>
                                      <div style={{margin: '5px'}}>
                                          <p style={{fontSize: '12px'}}>42</p>
                                          <input type="checkbox" value='42'  name='talle' onChange={() => setearChecks()}/>
                                      </div>
                                  </div>
                              </p> 
                            {/* <fieldset>
                                <legend className="legend_admin">Sexo:</legend>
                                <ul style={{display: 'flex', marginLeft: '80px', marginBottom: '50px'}}>
                                    <li>
                                        <label className="label_admin">
                                            <input type="radio" name="sexo" value="hombre" className="input_admin" style={{width: '150px'}}/>
                                            Hombre
                                        </label>
                                    </li>
                                    <li>
                                        <label className="label_admin">
                                            <input type="radio" name="sexo" value="mujer" className="input_admin" style={{width: '150px'}}/>
                                            Mujer
                                        </label>
                                    </li>
                                </ul>
                            </fieldset> */}
                        
                            <input type="hidden" name="idioma" value="spanish"  className="input_admin"/>
                        </section>
                        <section id="botones">
                            <p>
                                <input type="submit" className="input_submit_admin input_admin"/>
                            </p>
                            <p>
                                <input type="reset" className="input_reset_admin input_admin"/>
                            </p>
                        </section>
                </form>
            </div>
        </div>
    )
}

