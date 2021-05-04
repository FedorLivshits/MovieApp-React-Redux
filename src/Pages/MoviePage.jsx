import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {getMovieCast, getMovieDetails, getSimilarMovies, getTrailer} from "../redux/moviePage-reducer";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {Button, Card, Carousel, Container, ListGroup, Modal, Spinner} from "react-bootstrap";
import SimilarMovies from "../Components/SimilarMovies/SimilarMovies";
import MovieCast from "../Components/MovieCast/MovieCast";
import ReactStars from "react-rating-stars-component";
import ReactPlayer from "react-player";


const MoviePage = ({movieDetails, getMovieDetails, match, isFetching, getSimilarMovies, getMovieCast, movieCast, similarMovies, getTrailer, trailer}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let params = match.params

    useEffect(() => {
        getMovieDetails(params.id)
        getSimilarMovies(params.id)
        getMovieCast(params.id)
        getTrailer(params.id)
    }, [params.id])

    const isNotEmptyObj = (obj) => {
        for (let key in obj) {
            return true;
        }
        return false;
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
                                <Carousel controls={false} indicators={false}>
                                    <Carousel.Item className="carousel-img">
                                        <img
                                            className="d-block w-100"
                                            src={movieDetails.backPoster}
                                            alt="First slide"
                                        />
                                        <div className="input-section-title">
                                            <h2 className="input-title justify-content-center">{movieDetails.title}</h2>

                                        </div>
                                        <Carousel.Caption>
                                            <Button variant="primary" onClick={handleShow}>Watch Trailer</Button>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                </Carousel>
                                <Container>
                                    <div className="movie-page__content">
                                        <div className="row">
                                            <div className="col-4">
                                                <Card style={{width: '18rem'}} className="movie-card">
                                                    <Card.Img variant="top" src={movieDetails.poster}/>
                                                    <Card.Body>
                                                        <Button variant="primary w-100">Add to watchlist</Button>
                                                    </Card.Body>
                                                </Card>
                                            </div>
                                            <div className="col-8">

                                                <h2>{movieDetails.title}</h2>

                                                <p>{movieDetails.release_date.split("-").reverse().join('/')} {movieDetails.genres.map(g =>
                                                    <span className="ml-1">*{g.name}*</span>)}</p>

                                                {movieDetails.tagline
                                                    ?
                                                    <p>"{movieDetails.tagline}"</p>
                                                    :
                                                    ""
                                                }
                                                <ReactStars
                                                    value={movieDetails.rating}
                                                    count={10}
                                                    size={15}
                                                    color1={"#f4c10f"}
                                                />
                                                <h4>Overview:</h4>
                                                <p>{movieDetails.overview}</p>

                                            </div>
                                        </div>
                                    </div>
                                    <MovieCast movieCast={movieCast}/>
                                    {similarMovies.length
                                        ?
                                        <SimilarMovies similarMovies={similarMovies}/>
                                        :
                                        ""
                                    }
                                    <TrailerModal show={show} onHide={handleClose} trailer={trailer}/>
                                </Container>

                            </div>

                        }
                    </>
                    :
                    ""
            }
        </>
    );
}
function TrailerModal(props) {
    const youtubeUrl = "https://www.youtube.com/watch?v=";
    return (
        <Modal
            {...props}
            size='lg'
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body className="m-0 p-0">
                <ReactPlayer
                    className="container-fluid p-0"
                    url={youtubeUrl + props.trailer.key}
                    playing
                    width="100%"
                />
            </Modal.Body>
        </Modal>
    );
}


const mapStateToProps = (state) => {
    return {
        movieDetails: state.moviePage.movieDetails,
        movieCast: state.moviePage.movieCast,
        similarMovies: state.moviePage.similarMovies,
        trailer: state.moviePage.trailer,
        isFetching: state.moviesPage.isFetching
    }
}
export default compose(
    connect(mapStateToProps, {getMovieDetails, getSimilarMovies, getMovieCast, getTrailer}),
    withRouter,
)(MoviePage);