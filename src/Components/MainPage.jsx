import React, {useEffect} from 'react';
import CarouselComponent from "./CarouselComponent";
import {connect} from "react-redux";
import {getActualFilms, getGenre} from "../redux/movie-reducer";

function MainPage({movies, getActualFilms, getGenre, genres}) {

    useEffect(() => {
        getActualFilms()
        getGenre()
    }, [])

    return (
        <div className="container">
            <CarouselComponent movies={movies}/>
            <ul className="genres">
                {genres.map(g => {
                    return <li key={g.id}>{g.name}</li>
                })}
            </ul>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        movies: state.movieApp.movies,
        genres: state.movieApp.genres
    }
}

export default connect(mapStateToProps, {getActualFilms, getGenre})(MainPage);