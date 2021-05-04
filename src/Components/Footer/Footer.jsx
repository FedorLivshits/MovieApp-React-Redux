import React from 'react';
import {Container, Row} from "react-bootstrap";

const Footer = () => {
    return (
        <footer className="footer">
           <Container>
                <div className="footer-inner">
                    <Row className="footer-info">
                        <p>This app use <a
                            href="https://developers.themoviedb.org/3/getting-started/introduction">The
                            Movie Database API</a></p>
                        <p>App made by <a href="https://github.com/FedorLivshits/MovieApp-React-Redux">Fedor
                            Livshits</a></p>
                    </Row>
                </div>
           </Container>
        </footer>
    );
};

export default Footer;
