import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {getMovieCast, getMovieDetails, getSimilarMovies, getTrailer} from "../redux/moviePage-reducer";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {Button, Card, Carousel, Container, Spinner} from "react-bootstrap";
import SimilarMovies from "../Components/SimilarMovies/SimilarMovies";
import MovieCast from "../Components/MovieCast/MovieCast";
import ReactStars from "react-rating-stars-component";
import TrailerModal from "../Components/Modal/TrailerModal";
import {getPersonDetail, getPersonMovies} from "../redux/personPage-reducer";
import PersonMovies from "../Components/PersonMovies/PersonMovies";


const PersonPage = ({personDetail, match, getPersonDetail, isFetching, getPersonMovies, personMovies}) => {


    let params = match.params

    useEffect(() => {
        getPersonDetail(params.id)
        getPersonMovies(params.id)
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
                (isNotEmptyObj(personDetail))
                    ?
                    <>
                        {isFetching
                            ?
                            <div className="row mt-3 d-flex justify-content-center">
                                <Spinner animation="grow" variant="primary"/>
                            </div>
                            :
                            <div className="movie-page">
                                <Container>
                                    <div className="movie-page__content">
                                        <div className="row">
                                            <div className="col-4">
                                                <Card style={{width: '18rem'}} className="movie-card">
                                                    <Card.Img variant="top" src={'https://image.tmdb.org/t/p/w200' + personDetail['profile_path']}/>
                                                </Card>
                                            </div>
                                            <div className="col-8">
                                                <h2>{personDetail.name}</h2>
                                                <p>{personDetail.birthday.split("-").reverse().join('/')}</p>
                                                <h4>Biography:</h4>
                                                <p>{personDetail.biography}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <PersonMovies personMovies={personMovies}/>
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
        personDetail: state.personPage.personDetail,
        personMovies: state.personPage.personMovies,
        isFetching: state.moviesPage.isFetching
    }
}
export default compose(
    connect(mapStateToProps, {getPersonDetail, getPersonMovies}),
    withRouter,
)(PersonPage);