import { motion } from 'framer-motion'
import React from 'react'
import {
    Button,
    Card, Col, Row
} from 'react-bootstrap'
import ReactStars from 'react-rating-stars-component'
import FadeInWhenVisible from '../FadeInWhenVisible/FadeInWhenVisible'
import { IsImageNull } from '../IsImageNull/IsImageNull'

const MovieCard = ({movieDetails, onAddMovieToWatchlist, disabledBtn, screenWidth, handleShow}) => {
    return (
        <Row>
        <Col md={4} sm={6} xs={12}>
            <Card
                as={motion.div}
                initial={{ y: 100, opacity: 0 }}
                animate={{
                    y: 0,
                    opacity: 1,
                    transition: { duration: 0.8 },
                }}
                className='mb-3'>
                <IsImageNull inputImage={movieDetails.poster} />
                <Card.Body>
                    <Button
                        onClick={() => onAddMovieToWatchlist(movieDetails)}
                        variant='primary w-100'
                        disabled={disabledBtn()}>
                        Add to watchlist
                    </Button>
                </Card.Body>
            </Card>
        </Col>
        <Col md={8} sm={6} xs={12}>
            <FadeInWhenVisible>
                <h2 className='mb-0'>{movieDetails.title}</h2>
                <ReactStars
                    value={movieDetails.rating}
                    count={10}
                    size={15}
                    color1={'#f4c10f'}
                />
                <p className='mt-1'>
                    {movieDetails.release_date
                        .split('-')
                        .reverse()
                        .join('/')}{' '}
                    {movieDetails.genres.map(g => (
                        <span key={g.id} className='ml-1'>
                            {g.name},
                        </span>
                    ))}
                </p>
                {movieDetails.tagline ? (
                    <p className='font-italic mt-3'>
                        "{movieDetails.tagline}"
                    </p>
                ) : (
                    ''
                )}
                <h5>Overview:</h5>
                <p>{movieDetails.overview}</p>
                {screenWidth <= 710 && (
                    <Button
                        className='w-100'
                        variant='primary'
                        onClick={handleShow}>
                        Watch Trailer
                    </Button>
                )}
            </FadeInWhenVisible>
        </Col>
    </Row>
    )
}

export default MovieCard