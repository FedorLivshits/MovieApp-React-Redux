import React, {useEffect} from 'react';
import CarouselComponent from "./CarouselComponent";
import {connect} from "react-redux";
import {getActualFilms, getGenre, getMovieByGenre, getTopRatedMovies, getTrendingPerson} from "../redux/movie-reducer";
import {Link} from "react-router-dom";
import {Button, Card, Carousel, Container} from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import TrendingPersons from "./TrendingPersons";
import TopRatedMovies from "./TopRatedMovies";

function MainPage(props) {

    useEffect(() => {
        props.getActualFilms()
        props.getGenre()
        props.getTopRatedMovies()
        props.getTrendingPerson()
    }, [])

    const onGenreChange = (id) => {
        props.getMovieByGenre(id)
    }

    return (
        <>
            <CarouselComponent movies={props.movies}/>
            <Container>
                <div className="genre-list-wrapper">
                    <ul className="genre-list">
                        {props.genres.map(g => {
                            return <li key={g.id} className="list-inline-item">
                                <button className="btn btn-outline-info"
                                        onClick={() => onGenreChange(g.id)}>{g.name}</button>
                            </li>
                        })}
                    </ul>
                </div>
                <div className="row mt-2">
                    {props.moviesByGenre.slice(0,6).map(m => {
                        return  <div className="col-md-2 col-sm-3" key={m.id}>
                            <div className="card">
                                <Link to={`/movie/${m.id}`}>
                                    <img className="img-fluid" src={m.poster} alt={m.title}/>
                                </Link>
                            </div>
                            <div className="mt-2">
                                <p style={{ fontWeight: "bolder" }}>{m.title}</p>
                                <p>Rated: {m.rating}</p>
                                <ReactStars
                                    value={m.rating}
                                    count={10}
                                    size={15}
                                    color1={"#f4c10f"}
                                />
                            </div>
                        </div>
                    })}
                </div>
                <TopRatedMovies topRatedMovies={props.topRatedMovies}/>
                <TrendingPersons trendingPersons={props.trendingPersons}/>
            </Container>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        movies: state.movieApp.movies,
        genres: state.movieApp.genres,
        moviesByGenre: state.movieApp.moviesByGenre,
        trendingPersons: state.movieApp.trendingPersons,
        topRatedMovies: state.movieApp.topRatedMovies
    }
}

export default connect(mapStateToProps, {
    getActualFilms,
    getGenre,
    getMovieByGenre,
    getTrendingPerson,
    getTopRatedMovies
})(MainPage);