import "./restaurantes.css";

import Slider from "../../components/Slider/Slider";
import NavInicio from "../../components/NavInicio/NavInicio";
import Footer from "../../components/Footer/footer";

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";


function Portal() {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        const unsub = onSnapshot(
            collection(db, "companies"),
            (snapshot) => {
                const listaCompanies = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setCompanies(listaCompanies);
            },
            (error) => {
                console.log(error);
            }
        );

        return () => unsub();
    }, []);

    const [selectedImg, setSelectedImg] = useState(null);

    return (
        <>
            
            <Container fluid>
                <NavInicio />
                <Slider />
                <br />
                <h1>Restaurantes</h1>
                <Row>
                {companies.filter(company => company.categoria === "restaurante").map((company) => (
                    <Col key={company.id} mxs={12} sm={6} md={4} lg={12} className="mb-4">
                        <div className="company-card">
                            <img src={company.img} alt={company.name} className="company-logo" />
                            <div className="company-details">
                                <h3 className="company-name">{company.name}</h3>
                                <p className="company-description">{company.description}</p>
                                <div className="additional-images">
                                    {company.additionalImages.map((image, index) => (
                                        <div key={index} className="additional-image" onClick={() => setSelectedImg(image)}>
                                            <img src={image} alt={`Imagen ${index + 1}`} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="contact-info">
                                <p className="company-info">Encargado: {company.contactName}</p>
                                <p className="company-info">Teléfono: {company.phoneNumber}</p>
                                <p className="company-info">Correo: {company.email}</p>
                            </div>
                            <div className="social-links">
                                <Button href={company.social} variant="primary" target="_blank">Mas información</Button>
                                <Button href={`https://wa.me/+52${company.phoneNumber}`} variant="success" target="_blank">WhatsApp</Button>
                            </div>
                        </div>
                    </Col>
                ))}
                </Row>
            </Container>

            {selectedImg && (
                <div className="lightbox" onClick={() => setSelectedImg(null)}>
                    <img src={selectedImg} alt="Selected" />
                </div>
            )}

            <footer>
                <Footer />
            </footer>
        </>
    );
}

export default Portal;
