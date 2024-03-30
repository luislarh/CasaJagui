import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form, Badge  } from 'react-bootstrap';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import NavInicio from '../../components/NavInicio/NavInicio';
import Slider from '../../components/Slider/Slider';
import "./menu.css";
import Footer from '../../components/Footer/footer';

const MenuInicio = () => {
    const [data, setData] = useState({});
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const unsub = onSnapshot(
            collection(db, "menu"),
            (snapshot) => {
                let list = {};
                snapshot.docs.forEach((doc) => {
                    const data = doc.data();
                    if (list[data.category]) {
                        list[data.category].push({ id: doc.id, ...data });
                    } else {
                        list[data.category] = [{ id: doc.id, ...data }];
                    }
                });
                setData(list);
            },
            (error) => {
                console.log(error);
            }
        );

        return () => unsub();
    }, []);

    // Filtrar las categorías
    const categoriasFiltradas = Object.keys(data).filter((category) =>
        ["Comida", "Crepas y waffles", "Bebidas", "Almuerzos"].includes(category)
    );

    // Filtrar los elementos según el término de búsqueda
    const filteredData = Object.keys(data).reduce((acc, category) => {
        const filteredItems = data[category].filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (filteredItems.length > 0) {
            acc[category] = filteredItems;
        }
        return acc;
    }, {});

    return (
        <div>
        <Container fluid>
            <NavInicio />
            <Slider />
            <br />
            <Row className="my-3 justify-content-center">
                <Col xs={12} className="text-center">
                    <h2>Menú Casa JAGUI</h2>
                </Col>
                <Col xs={12}>
                    <Form className="d-flex justify-content-center">
                        <Form.Control
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="Buscar por nombre o descripción"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ width: '50%', //centra el buscador
                                    backgroundColor: '#FDFCE0', // Color de fondo
                                    color: '#745022', // Color del texto
                                    borderColor: '#f0e68c' // Color del borde
                                    }} 
                        />
                    </Form>
                </Col>
            </Row>
            <Row
            xs={1}
            md={3}
            className={`g-4 ${categoriasFiltradas.length === 1 ? 'justify-content-md-center single-column' : ''}`}
            >
            {categoriasFiltradas.map(category => (
                filteredData[category] && filteredData[category].length > 0 && (
                    <Col key={category} md={{ span: 4 }}>
                        <Card className="h-100 shadow card-gradient" border="dark">
                            <Card.Body>
                                <Card.Title className="text-center mb-3"><Badge bg="secondary">{category}</Badge></Card.Title>
                                {filteredData[category].map(item => (
                                    <div key={item.id} className="mb-3">
                                        <Card.Text className="fw-bold"  style={{color:"#333" }}>
                                            {item.name}
                                            <span className="float-end"  style={{color:"#333" }}>$ {item.precio}</span>
                                        </Card.Text>
                                        <footer className="blockquote-footer">
                                            {item.description}
                                        </footer>
                                    </div>
                                ))}
                            </Card.Body>
                        </Card>
                    </Col>
                )
            ))}
            </Row>

        </Container>
        <footer>
            <Footer></Footer>
        </footer>
    </div>
    );
};

export default MenuInicio;
