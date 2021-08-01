import React from 'react'
import {Carousel} from 'react-bootstrap'
import TopSectionMobile from '../TopSectionMobile/TopSectionMobile'

const CarouselComponent = ({movies, screenWidth}) => {

    if (!movies.length) return null

    return (
        screenWidth > 710
            ?
            <>
                <Carousel fade controls={false}>
                    {movies.map(m => {
                        return <Carousel.Item key={m.id} className="carousel-img" interval={3000}>
                            <img
                                className="d-block w-100"
                                src={m.backPoster}
                                alt="First slide"
                            />
                            <div className="carousel-content">
                                <h2 className="carousel-title ">Welcome.</h2>
                                <h3 className="carousel-text">Millions of movie to discover. Explore now.</h3>
                            </div>
                            <Carousel.Caption>
                                <h3>{m.title}</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                    })}
                </Carousel>
            </>
            :
            <>
              <TopSectionMobile/>
            </>
    )
}

export default CarouselComponent