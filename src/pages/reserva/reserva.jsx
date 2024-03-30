import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Container, Badge,Alert   } from 'react-bootstrap';
import "./reserva.css";
import NavInicio from '../../components/NavInicio/NavInicio';
import Slider from '../../components/Slider/Slider';
import Footer from '../../components/Footer/footer';


function Reserva() {

    const form = useRef();

    const [isSent, setIsSent] = useState(false);
    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs
            .sendForm('service_n2fdt2t', 'template_g0yprng', form.current, {
            publicKey: 'YnSzzLsrSg5cRUH13',
            })
            .then(
            () => {
                console.log('SUCCESS!');
                setIsSent(true);
                form.current.reset();
            },
            (error) => {
                console.log('FAILED...', error.text);
            },
            );
    };

    function generateTimeOptions() {
        const options = [];
        for (let hour = 10; hour <= 22; hour++) {
            options.push(
                <option key={hour} value={`${hour}:00`}>
                    {hour < 12 ? `${hour} am` : `${hour === 12 ? hour : hour - 12} pm`}
                </option>
            );
        }
        return options;
    }

    return (
        <>
        <Container fluid>
            <NavInicio />
            <Slider />
            <br />
            <div className="containerR">
            <div className="row">
                <div className="col-lg-6">
                    <h2>Reserva <Badge bg="secondary">Aqui</Badge></h2>
                    {isSent &&(
                        <Alert variant="success" className="mt-3">¡Reserva enviada correctamente!</Alert>
                    )}
                    <form ref={form} onSubmit={sendEmail}>
                        <div className="mb-3">
                            <label className="form-label">Nombre</label>
                            <input type="text" className="form-control" placeholder="Ingresa nombre" name="user_name" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Correo</label>
                            <input type="email" className="form-control" placeholder="Ingresa Correo" name="user_email" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Teléfono</label>
                            <input type="text" className="form-control" placeholder="Ingresa Telefono" name="user_telefono" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Número de personas</label>
                            <input type="text" className="form-control" placeholder="Número de personas" name="user_Npersonas" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Horario</label>
                            <select className="form-control" name="user_horario" required>
                                {generateTimeOptions()}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Fecha</label>
                            <input type="date" className="form-control" placeholder="Selecciona fecha" name="user_fecha" />
                        </div>
                        <div className="mb-3">
                            <label  className="form-label">Message</label>
                            <textarea className="form-control" placeholder="Escribe un mensaje" name="message" />
                        </div>
                        <input className="butt" type="submit" value="Enviar" />
                    </form>
                </div>

                <div className="col-lg-6 location-section">
                    <h2 className="location-title">Ubicacion <Badge bg="secondary">Ven a visitarnos</Badge></h2>
                    <div className="location-map">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7496.767054356219!2d-100.73013369845582!3d20.034372143138686!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842cd734ae9b24a5%3A0x3f2908f3aef079df!2sCASA%20JAGUI!5e0!3m2!1ses-419!2smx!4v1711403209236!5m2!1ses-419!2smx" width="100%" height="300" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                    <div className="contact-info">
                        <p className='contact-item'>Correo: <a className='aa' href="mailto:casajagui@gmail.com">casajagui@gmail.com</a></p>
                        <p className='contact-item'>Telefono: <a className='aa' href="tel:+4172061373"> 4172061373</a></p>
                    </div>
                    <br />
                    <a href="https://wa.me/%2B524172061373?text=Buenos%20días,%20me%20gustaría%20obtener%20información" target="_blank" rel="noopener noreferrer">
                        <button className="whatsapp-button">Whatsapp</button>
                    </a>
                </div>
            </div>
        </div>
        </Container>
        <br />
        <footer>
            <Footer></Footer>
        </footer>
        </>
    );
}
export default Reserva;