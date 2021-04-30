import React from 'react';
import {Carousel} from "react-bootstrap";

function CarouselComponent({movies}) {

    if(!movies.length) return null

    return (
        <Carousel>
            {movies.map(m => {
                return  <Carousel.Item className="carousel-img" interval={5000}>
                    <img
                        className="d-block w-100"
                        src={m.backPoster}
                        alt="First slide"
                     />
                    <Carousel.Caption>
                        <div className="container">
                            <div className="input-section-title">
                                <h2 className="input-title ">Welcome.</h2>
                                <h3 className="input-title-descr">Millions of movie to discover. Explore now.</h3>
                            </div>
                            <div className="input-wrapper">
                                <input type="text" placeholder="Search for a movie"/>
                                <button  className="search-film-btn">
                                    search
                                </button>
                            </div>
                        </div>
                        <h3>{m.title}</h3>
                    </Carousel.Caption>
                </Carousel.Item>
            })}
        </Carousel>
    );
}

export default CarouselComponent;