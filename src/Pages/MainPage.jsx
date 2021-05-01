import React, {useEffect} from 'react';
import CarouselComponent from "../Components/CarouselComponent/CarouselComponent";
import {connect} from "react-redux";
import {getActualFilms, getPopularMovies, getTopRatedMovies, getTrendingPerson} from "../redux/movie-reducer";
import {Container} from "react-bootstrap";
import TrendingPersons from "../Components/TrendingPersons/TrendingPersons";
import TopRatedMovies from "../Components/TopRatedMovies/TopRatedMovies";
import PopularMovies from "../Components/PopularMovies/PopularMovies";

function MainPage(props) {

    useEffect(() => {
        props.getActualFilms()
        props.getTopRatedMovies()
        props.getTrendingPerson()
        props.getPopularMovies()
    }, [])

    return (
        <>
            <CarouselComponent movies={props.movies}/>
            <Container>
                <PopularMovies popularMovies={props.popularMovies}/>
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
        topRatedMovies: state.movieApp.topRatedMovies,
        popularMovies: state.movieApp.popularMovies
    }
}

export default connect(mapStateToProps, {
    getActualFilms,
    getTrendingPerson,
    getTopRatedMovies,
    getPopularMovies
})(MainPage);