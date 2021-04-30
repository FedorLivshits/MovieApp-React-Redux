import React, {useEffect} from 'react';
import CarouselComponent from "./CarouselComponent";
import {connect} from "react-redux";
import {getActualFilms} from "../redux/movie-reducer";

function MainPage({movies, getActualFilms}) {

    useEffect(() => {
        getActualFilms()
    }, [])

    return (
        <div className="container">
            <CarouselComponent movies={movies}/>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        movies: state.movieApp.movies
    }
}

export default connect(mapStateToProps, {getActualFilms})(MainPage);