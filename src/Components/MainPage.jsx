import React, {useEffect} from 'react';
import CarouselComponent from "./CarouselComponent";
import {connect} from "react-redux";
import {getActualFilms, getGenre, getMovieByGenre, getTopRatedMovies, getTrendingPerson} from "../redux/movie-reducer";
import {Link} from "react-router-dom";
import {Container} from "react-bootstrap";
import ReactStars from "react-rating-stars-component";

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
                <div className="row mt-3">
                    {props.moviesByGenre.map(m => {
                        return  <div className="col-md-3 col-sm-6" key={m.id}>
                            <div className="card">
                                <Link to={`/movie/${m.id}`}>
                                    <img className="img-fluid" src={m.poster} alt={m.title}/>
                                </Link>
                            </div>
                            <div className="mt-3">
                                <p style={{ fontWeight: "bolder" }}>{m.title}</p>
                                <p>Rated: {m.rating}</p>
                                <ReactStars
                                    value={m.rating}
                                    count={10}
                                    size={20}
                                    color1={"#f4c10f"}
                                />
                            </div>
                        </div>
                    })}
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <p className="font-weight-bold" style={{ color: "#5a606b" }}>
                            TRENDING PERSONS ON THIS WEEK
                        </p>
                    </div>
                </div>

                <div className="row mt-3">
                    {props.trendingPersons.slice(0,4).map(p => {
                        return   <div className="col-md-3 text-center" key={p.id}>
                            <img
                                className="img-fluid rounded-circle mx-auto d-block"
                                src={p.profileImg}
                                alt={p.name}
                            />
                            <p className="font-weight-bold text-center">{p.name}</p>
                            <p
                                className="font-weight-light text-center"
                                style={{ color: "#5a606b" }}
                            >
                                Trending for {p.known}
                            </p>
                        </div>
                    })}
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <p className="font-weight-bold" style={{ color: "#5a606b" }}>
                            TOP RATED MOVIES
                        </p>
                    </div>
                </div>
                <div className="row mt-3">
                    {props.topRatedMovies.slice(0,4).map(m => {
                        return    <div className="col-md-3" key={m.id}>
                            <div className="card">
                                <Link to={`/movie/${m.id}`}>
                                    <img className="img-fluid" src={m.poster} alt={m.title}/>
                                </Link>
                            </div>
                            <div className="mt-3">
                                <p style={{ fontWeight: "bolder" }}>{m.title}</p>
                                <p>Rated: {m.rating}</p>
                                <ReactStars
                                    value={m.rating}
                                    count={10}
                                    size={20}
                                    color1={"#f4c10f"}
                                />
                            </div>
                        </div>
                    })}
                </div>
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