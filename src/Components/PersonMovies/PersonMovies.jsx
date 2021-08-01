import React from 'react';
import {Link} from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import {Card, Col, Image, Row} from 'react-bootstrap'

const PersonMovies = ({personMovies}) => (
    <section>
        <Row className="mt-5 mb-3">
            <Col className="ml-3">
                <p className="font-weight-bold">
                  Known for
                </p>
            </Col>
        </Row>
        <div className="scrolling-wrapper">
            {personMovies.map(m => {
                return <Col lg={2} md={3} sm={4} xs={6} className="my-card" key={m.id}>
                    <Card>
                        <Link to={`/movie/${m.id}`}>
                            <Image fluid rounded src={m.poster} alt={m.title}/>
                        </Link>
                    </Card>
                    <div className="mt-2">
                        <p style={{fontWeight: "bolder"}}>{m.title}</p>
                        <p className="mb-0">Rated: {m.rating}</p>
                        <ReactStars
                            value={m.rating}
                            count={10}
                            size={15}
                            color1={"#f4c10f"}
                        />
                    </div>
                </Col>
            })}
        </div>
    </section>
);

export default PersonMovies;