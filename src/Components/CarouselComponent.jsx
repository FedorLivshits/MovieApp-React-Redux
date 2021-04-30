import React from 'react';
import {Carousel} from "react-bootstrap";

function CarouselComponent({movies}) {

    if(!movies.length) return null

    return (
        <Carousel>
            {movies.map(m => {
                return  <Carousel.Item interval={3000}>
                    <img
                        className="d-block w-100"
                        src={m.backPoster}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>{m.title}</h3>
                        <p>{m.overview}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            })}
        </Carousel>
    );
}

export default CarouselComponent;