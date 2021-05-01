import React, {useEffect} from 'react';
import CarouselComponent from "../Components/CarouselComponent/CarouselComponent";
import {connect} from "react-redux";
import {getActualFilms, getTopRatedMovies, getTrendingPerson} from "../redux/movie-reducer";
import {Container} from "react-bootstrap";
import TrendingPersons from "../Components/TrendingPersons/TrendingPersons";
import TopRatedMovies from "../Components/TopRatedMovies/TopRatedMovies";

function MainPage(props) {

    useEffect(() => {
        props.getActualFilms()
        props.getTopRatedMovies()
        props.getTrendingPerson()
    }, [])

    return (
        <>
            <CarouselComponent movies={props.movies}/>
            <Container>
                <TopRatedMovies topRatedMovies={props.topRatedMovies}/>
                <TrendingPersons trendingPersons={props.trendingPersons}/>
            </Container>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        movies: state.movieApp.movies,
        trendingPersons: state.movieApp.trendingPersons,
        topRatedMovies: state.movieApp.topRatedMovies
    }
}

export default connect(mapStateToProps, {
    getActualFilms,
    getTrendingPerson,
    getTopRatedMovies
})(MainPage);