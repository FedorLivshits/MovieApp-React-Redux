import React from 'react'
import {Carousel, Container} from 'react-bootstrap'

const CarouselComponent = ({movies, screenWidth}) => {

    if (!movies.length) return null

    return (
        screenWidth > 550
            ?
            <>
                <Carousel fade controls={false}>
                    {movies.map(m => {
                        return <Carousel.Item key={m.id} className="carousel-img" interval={1000000}>
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
            </>
            :
            <>
               <div className='top'>
                   <Container>
                       <div className='top__inner'>
                           <div className='top__content'>
                               <h2 className="top__title">Welcome.</h2>
                               <p className="top__text">Millions of movie to discover. Explore now.</p>
                           </div>
                       </div>
                   </Container>
               </div>
            </>
    )
}

export default CarouselComponent