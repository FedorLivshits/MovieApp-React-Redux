import {motion} from 'framer-motion'
import React from 'react'
import {
    Button, Carousel
} from 'react-bootstrap'
import {IsImageNull} from '../IsImageNull/IsImageNull'

const CarouselForMovie = ({movieDetails, handleShow}) => {
    return (
        <Carousel controls={false} indicators={false}>
            <Carousel.Item className='carousel-img'>
                {console.log('poster: ' + movieDetails.backPoster)}
                <IsImageNull
                    inputImage={movieDetails.backPoster}
                    className={'d-block w-100'}
                    blackBackground={true}
                />
                <motion.div
                    className='carousel-content'
                    initial={{opacity: 0}}
                    animate={{
                        opacity: 1,
                        transition: {delay: 0.2, duration: 0.4},
                    }}>
                    <h2 className='carousel-title justify-content-center'>
                        {movieDetails.title}
                    </h2>
                </motion.div>
                <Carousel.Caption>
                    <Button variant='primary' onClick={handleShow}>
                        Watch Trailer
                    </Button>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}

export default CarouselForMovie
