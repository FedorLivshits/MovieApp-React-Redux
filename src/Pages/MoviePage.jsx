import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {getMovieCast, getMovieDetails, getSimilarMovies} from "../redux/moviePage-reducer";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {Button, Card, Carousel, Container, ListGroup, Spinner} from "react-bootstrap";


const MoviePage = ({movieDetails, getMovieDetails, match, isFetching, getSimilarMovies, getMovieCast, movieCast, similarMovies}) => {

    let params = match.params

    useEffect(() => {
        getMovieDetails(params.id)
        getSimilarMovies(params.id)
        getMovieCast(params.id)
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
                                {/*<div className="movie-content">*/}
                                {/*    <div className="movie-background__img">*/}
                                {/*        <img className="d-block w-100" src={movieDetails.backPoster} alt=""/>*/}
                                {/*    </div>*/}
                                {/*</div>*/}

                                <Carousel controls={false} indicators={false}>
                                    <Carousel.Item className="carousel-img">
                                        <img
                                            className="d-block w-100"
                                            src={movieDetails.backPoster}
                                            alt="First slide"
                                        />
                                        <div className="input-section-title">
                                            <h2 className="input-title justify-content-center">{movieDetails.title}</h2>
                                            {/*<p className="movie-overview">{movieDetails.overview}</p>*/}
                                            <Button variant="primary">Watch Trailer</Button>
                                        </div>
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
                                                <p>"{movieDetails.tagline}"</p>
                                                <h4>Overview:</h4>
                                                <p>{movieDetails.overview}</p>
                                            </div>
                                        </div>
                                    </div>

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


const mapStateToProps = (state) => {
    return {
        movieDetails: state.moviePage.movieDetails,
        movieCast: state.moviePage.movieCast,
        similarMovies: state.moviePage.similarMovies,
        isFetching: state.moviesPage.isFetching
    }
}
export default compose(
    connect(mapStateToProps, {getMovieDetails, getSimilarMovies, getMovieCast}),
    withRouter,
)(MoviePage);