import "./index.css";
import NavInicio from "../../components/NavInicio/NavInicio";
import Slider from "../../components/Slider/Slider";
import { Container, Button, Card, Row, Col } from "react-bootstrap";

import imageUrl from "../../img/imagenIndex.jpg";
import { Link } from 'react-router-dom';
import CustomImageList from "../galeria/galeria";

import Footer from "../../components/Footer/footer";


const Inicio = () => {
    return(
        <div className="homeContainer">
        <div className="header">
            <Container fluid>
                <NavInicio />
                <Slider />
                <br />
                    <Row xs={1} md={2}>
                        <Col>
                        <Card className="text-center" border="secondary">
                            <Card.Header>Historia</Card.Header>
                            <Card.Body>
                                <Card.Title>
                                    CASA JAGUI Concept House
                                </Card.Title>
                                <Card.Text style={{color:"#333" }}>
                                    Es una empresa dedicada a los servicios
                                    de hostelería, restauración, asesoría y turismo.
                                </Card.Text>
                                <Card.Text style={{color:"#333" }}>
                                El concepto de este proyecto ha sido creado con la finalidad de integrar en su totalidad
                                a las áreas de reciente apertura: Doggy Boogie, Dulce Vainilla y Estación 417; así como aquellas que ya se encontraban
                                en operación: JaguiTour, AVA Concultores, Airbnb Casa Jagui y Portal 500 Café.
                                Hoy en día, Casa Jagui ofrece una amplia gama de servicios que tiene como objetivo mantener
                                y aumentar el flujo turístico en la ciudad de Acámbaro, y ser una de las primeras empresas
                                de concepto en la región. 
                                </Card.Text>
                                <Link to="/MenuInicio">
                                    <Button variant="outline-secondary">Menú</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                        </Col>
                        <Col>
                        <Card style={{ width: '100%' }} border="Warning">
                            <Card.Img variant="top" src={imageUrl} style={{ height: '300px', objectFit: 'flid' }}/>
                        </Card>
                        </Col>
                        
                    </Row>
                    <br />
                    <Row>
                        <Col>
                        <Card className="text-center" border="secondary">
                            <h2>Galeria de imagenes</h2>
                            <CustomImageList />
                        </Card>
                        </Col>
                    </Row>

                    
                    

            </Container>
            
        </div>
        {/* Footer */}
        <footer>
            <Footer></Footer>
        </footer>
    </div>
    
    );
}

export default Inicio;