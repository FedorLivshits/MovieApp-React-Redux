import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {compose} from 'redux'
import {Button, Card, Carousel, Col, Container, Row, Spinner} from 'react-bootstrap'
import SimilarMovies from '../Components/SimilarMovies/SimilarMovies'
import MovieCast from '../Components/MovieCast/MovieCast'
import ReactStars from 'react-rating-stars-component'
import TrailerModal from '../Components/Modal/TrailerModal'
import {initializeMoviePage} from '../redux/initial-reducer'
import {setIsMoviePageOpen} from '../redux/moviePage-reducer'
import {addMovieToWatchlist} from '../redux/watchlist-reducer'
import {motion} from 'framer-motion'
import FadeInWhenVisible from '../Components/FadeInWhenVisible/FadeInWhenVisible'


const MoviePage = ({movieDetails, match, isFetching, movieCast, similarMovies, trailer, initializeMoviePage, initializedMoviePage, watchlist, setIsMoviePageOpen, addMovieToWatchlist, screenWidth}) => {
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const disabledBtn = () => {
        if (movieDetails) {
            let storedMovie = watchlist.find(o => o.id === movieDetails.id)
            return !!storedMovie
        }
    }


    let params = match.params

    useEffect(() => {
        initializeMoviePage(params.id)
        setIsMoviePageOpen(true)
        return function cleanup() {
            setIsMoviePageOpen(false)
        }
    }, [params.id])

    const isNotEmptyObj = (obj) => {
        for (let key in obj) {
            return true
        }
        return false
    }
    const onAddMovieToWatchlist = (movieDetails) => {
        addMovieToWatchlist(movieDetails)
    }
    if (!initializedMoviePage) {
        return <Row className="mt-5 d-flex justify-content-center">
            <Spinner animation="grow" variant="primary"/>
        </Row>
    }
    return (
        <>
            {
                (isNotEmptyObj(movieDetails))
                    ?
                    <>
                        {isFetching
                            ?
                            <div className="row mt-3 d-flex justify-content-center">
                                <Spinner animation="grow" variant="primary"/>
                            </div>
                            :
                            <div className="movie-page">
                                {screenWidth > 710
                                    ?
                                    <Carousel controls={false} indicators={false}>
                                        <Carousel.Item className="carousel-img">
                                            <img
                                                className="d-block w-100"
                                                src={movieDetails.backPoster}
                                                alt="First slide"
                                            />
                                            <motion.div className="carousel-content"
                                                 initial={{opacity: 0}}
                                                 animate={{opacity: 1, transition:{delay: .2, duration: .4}}}
                                            >
                                                <h2 className="carousel-title justify-content-center">{movieDetails.title}</h2>
                                            </motion.div>
                                            <Carousel.Caption>
                                                <Button variant="primary" onClick={handleShow}>Watch Trailer</Button>
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                    </Carousel>
                                    :
                                    null
                                }
                                <Col className="mt-5 mb-5">
                                    <Container>
                                        <Row>
                                            <Col md={4} sm={6} xs={12}>
                                                <Card as={motion.div}
                                                      initial={{y: 100, opacity: 0}}
                                                      animate={{y: 0, opacity: 1, transition:{duration: .8}}}
                                                      className="mb-3">
                                                    <Card.Img variant="top" src={movieDetails.poster} fluid/>
                                                    <Card.Body>
                                                        <Button onClick={() => onAddMovieToWatchlist(movieDetails)}
                                                                variant="primary w-100" disabled={disabledBtn()}>Add
                                                            to
                                                            watchlist</Button>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                            <Col md={8} sm={6} xs={12}>
                                                <FadeInWhenVisible>
                                                <h2 className="mb-0">{movieDetails.title}</h2>
                                                <ReactStars
                                                    value={movieDetails.rating}
                                                    count={10}
                                                    size={15}
                                                    color1={'#f4c10f'}
                                                />
                                                <p className="mt-1">{movieDetails.release_date.split('-').reverse().join('/')} {movieDetails.genres.map(g =>
                                                    <span key={g.id} className="ml-1">{g.name},</span>)}
                                                </p>
                                                {movieDetails.tagline
                                                    ?
                                                    <p className="font-italic mt-3">"{movieDetails.tagline}"</p>
                                                    :
                                                    ''
                                                }
                                                <h5>Overview:</h5>
                                                <p>{movieDetails.overview}</p>
                                                {screenWidth <= 710
                                                &&
                                                <Button className="w-100" variant="primary" onClick={handleShow}>Watch
                                                    Trailer</Button>
                                                }
                                                </FadeInWhenVisible>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Col>
                                <Container>
                                    <MovieCast movieCast={movieCast}/>
                                    {similarMovies.length
                                        ?
                                        <SimilarMovies similarMovies={similarMovies}/>
                                        :
                                        ''
                                    }
                                    <TrailerModal show={show} onHide={handleClose} trailer={trailer}
                                                  isNotEmptyObj={isNotEmptyObj}/>
                                </Container>
                            </div>
                        }
                    </>
                    :
                    ''
            }
        </>
    )
}


const mapStateToProps = (state) => {
    return {
        movieDetails: state.moviePage.movieDetails,
        movieCast: state.moviePage.movieCast,
        similarMovies: state.moviePage.similarMovies,
        trailer: state.moviePage.trailer,
        isFetching: state.moviesPage.isFetching,
        initializedMoviePage: state.initial.initializedMoviePage,
        watchlist: state.watchlistPage.watchlist
    }
}
export default compose(
    connect(mapStateToProps, {initializeMoviePage, setIsMoviePageOpen, addMovieToWatchlist}),
    withRouter,
)(MoviePage)