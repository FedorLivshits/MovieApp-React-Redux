import React from 'react';
import {Link} from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import {Col, Row} from 'react-bootstrap'

const TopRatedMovies = ({topRatedMovies}) => (
    <>
        <Row className="mt-5 mb-3">
            <Col className="ml-3">
                <p className="font-weight-bold">
                  Top Rated Movies
                </p>
            </Col>
        </Row>
        <div className="scrolling-wrapper">
            {topRatedMovies.map(m => {
                return <Col lg={2} md={3} sm={4} xs={6} className="my-card" key={m.id}>
                    <div className="card">
                        <Link to={`/movie/${m.id}`}>
                            <img className="img-fluid" src={m.poster} alt={m.title}/>
                        </Link>
                    </div>
                    <div className="mt-2">
                        <p style={{fontWeight: "bolder"}}>{m.title}</p>
                        <p>Rated: {m.rating}</p>
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
    </>
);

export default TopRatedMovies;