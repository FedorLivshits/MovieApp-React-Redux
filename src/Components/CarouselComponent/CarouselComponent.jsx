import React from 'react';
import {Carousel} from "react-bootstrap";

const CarouselComponent = ({movies}) => {

    if (!movies.length) return null

    return (
        <Carousel fade controls={false}>
            {movies.map(m => {
                return <Carousel.Item key={m.id} className="carousel-img" interval={2000}>
                    <img
                        className="d-block w-100"
                        src={m.backPoster}
                        alt="First slide"
                    />
                        <div className="input-section-title">
                            <h2 className="input-title ">Welcome.</h2>
                            <h3 className="input-title-descr">Millions of movie to discover. Explore now.</h3>
                        </div>
                    <Carousel.Caption>
                        <h3>{m.title}</h3>
                    </Carousel.Caption>
                </Carousel.Item>
            })}
        </Carousel>
    );
};

export default CarouselComponent;