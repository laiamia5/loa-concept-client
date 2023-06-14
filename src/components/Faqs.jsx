import React from "react";
import ima from '../tools/4044.jpg'
import '../styles/faqs.css'

export default function Faqs () {
    return(
        <>
            <header class="entry-header header_faqs">
                <img src={ima} alt="404" className="img_faqs"/>
                <h1 class="entry-title" className="h1_faqs">Oops! página no encontrada.</h1>
                <p className="p_faqs">Lo sentimos, esta sección de la página se encuentra en mantenimiento.</p>
            </header>
        </>
    )
}

