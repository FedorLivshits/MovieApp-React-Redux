import React from 'react';
import {Carousel} from "react-bootstrap";

function CarouselComponent({movies}) {

    if(!movies.length) return null

    return (
        <Carousel>
            {movies.map(m => {
                return  <Carousel.Item className="carousel-img" interval={3000}>
                    <img
                        style={{height: 600}}
                        className="d-block w-100"
                        src={m.backPoster}
                        alt="First slide"
                     />
                    <Carousel.Caption>
                        <h2>Now at the cinema</h2>
                        <h3>{m.title}</h3>
                    </Carousel.Caption>
                </Carousel.Item>
            })}
        </Carousel>
    );
}

export default CarouselComponent;